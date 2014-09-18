//*应用定制js
//*作者：唐有炜
//*时间：2014年07月231日
//全局变量
var grid;

$(document).ready(function() {
});

$(function() {
    InitGrid();
});


function InitGrid() {

    grid = $("#grid-data").bootgrid({
        ajax: true,
        post: function() {
            /* To accumulate custom parameter with the request object */
            return {
                compNum: $("#CompNum").val()
            };
        },
        url: "/api/settings/appMaker/getAllApps",
        selection: true,
        multiSelect: true,
        rowSelect: true,
        keepSelection: true,
        rowCount: [10, 30, 50],
        templates: {
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><div class=\"btn-group\" style=\"float:left;\"><button class=\"btn  btn-primary\" title=\"去应用市场添加应用\" onclick=\" refresh('/Apps/'); \">去应用市场添加应用</button><button class=\"btn  btn-primary\" title=\"批量卸载\" onclick=\" del(); \">批量卸载</button></div>" +
                "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                "<p class=\"{{css.actions}}\"></p></div></div></div>"
        },
        formatters: {
            "UserEnable": function(column, row) {
                if (row.RoleIsSys == 0) {
                    return "禁用";
                } else {
                    return "启用";
                }

            },
            "commands": function(column, row) {
                return "<a href='/Apps/Settings/AppMaker/Detail/" + row.AppId + "'>管理</a>  " +
                    "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" onclick=del(" + row.AppId + ")><span class=\"fa fa-trash-o\"></span>卸载</button>";
            }
        }
    });
}


function del(ids) {
    console.log(ids);
    var compNum = $("#CompNum").val();
    var del_tips = "确认卸载该应用吗？";
    if (del_tips.indexOf(',') > 0) {
        var del_tips = "确认卸载选中应用吗？";
    }
    showMoreDialog("uninstall_dialog", "确认卸载该应用吗？", function() {
      
        showMoreDialog("clear_data_dialog", "是否同时删除数据和配置", function() {
            $.ajax({
                type: "get",
                cache: false,
                url: "/api/settings/appMaker/unInstall",
                data: { ids: ids, compNum: compNum, isClear: true },
                dataType: "json",
                beforeSend: function() {
                    //showMsg("添加中，请稍后...");
                },
                complete: function() {
                    //showMsg("完成...");
                },
                success: function(result) {
                    //toLowerCase报错
                    //var status = result.Status.toLowerCase();
                    var status = result.Status;
                    if (status == true || status == "true" || status == "True") {
                        //刷新我的应用
                        grid.bootgrid("reload");
                        showMsg("应用卸载成功！", "Success");
                    } else {
                        showMsg("系统异常，应用卸载失败！");
                    }

                },
                error: function() {
                    showMsg("网络连接错误");
                }
            });
        }, function () {
              $.ajax({
                type: "get",
                cache: false,
                url: "/api/settings/appMaker/unInstall",
                data: { ids: ids, compNum: compNum, isClear: false },
                dataType: "json",
                beforeSend: function() {
                    //showMsg("添加中，请稍后...");
                },
                complete: function() {
                    //showMsg("完成...");
                },
                success: function(result) {
                    //toLowerCase报错
                    //var status = result.Status.toLowerCase();
                    var status = result.Status;
                    if (status == true || status == "true" || status == "True") {
                        //刷新我的应用
                        grid.bootgrid("reload");
                        showMsg("应用卸载成功！", "Success");
                    } else {
                        showMsg("系统异常，应用卸载失败！");
                    }

                },
                error: function() {
                    showMsg("网络连接错误");
                }
            });
            dialog.list["clear_data_dialog"].close().remove();
        });

    }, function() {
        showMsg("您取消了卸载！", "Error");
        dialog.list["uninstall_dialog"].close().remove();
    });
}