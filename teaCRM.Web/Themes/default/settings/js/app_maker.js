//*应用定制js
//*作者：唐有炜
//*时间：2014年07月231日
//全局变量
var grid;

$(document).ready(function() {
});

$(function() {
    InitGrid();
    $("#muti-del").on("click", (function() {
        var ids = get_selected_ids("grid-data");
        //console.log(ids);
        if (ids == '') {
            showMsg("请先选择应用在卸载！");
            return;
        }
        //alert(ids);
        del(ids);
    }));
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
            //selection: true,
            multiSelect: true,
            rowSelect: true,
            //keepSelection: true,
            rowCount: [10, 30, 50],
            templates: {
                header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"> <div class=\"btn-group\" style=\"float:left;\"> <button data-toggle=\"tooltip\"   class=\"btn btn-default tip\" title=\"去应用市场添加应用\"  onclick=\" refresh('/Apps/'); \"><span class=\"glyphicon glyphicon-briefcase\"></span>应用市场</button><button class=\"btn  btn-default tip\"   title=\"批量卸载\" id=\"muti-del\"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量卸载</button></div>" +
                    "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                    "<p class=\"{{css.actions}}\"></p></div></div></div>"
            },
            labels: {
            all:"all",//checkbox全选的值
                search: "请输入应用名称",
                loading:"加载中...",
                noResults:"对不起，暂无符合条件的记录！",
                refresh:"刷新",
                infos:"从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
            },
            formatters: {
                "AppImgurl32": function(column, row) {
                    return "<img class=\"pop\" src=\"" + row.AppImgurl32 + "\" data-toggle=\"popover\" data-content='<img style=\"float:left;padding-right:15px;\" src=\""+row.AppImgurl75+"\">" + row.AppDes + "' data-original-title=\"应用介绍\"";

                },
                "AppType": function(column, row) {
                    for (var index in cat_data_2014) {
                        var cat = cat_data_2014[index];
                        if (row.AppType == cat.code) {
                            return cat.name;
                        } else {
                            continue;
                        }
                    }
                    return "默认分类";
                },
                "AppInd": function(column, row) {
                    for (var index in ind_data_2014) {
                        var ind = ind_data_2014[index];
                        if (row.AppInd == ind.code) {
                            return ind.name;

                        } else {
                            continue;
                        }
                    }
                    return "默认行业";
                },
                "AppDes": function(column, row) {
                    return "<div class=\"pop\" data-toggle=\"popover\" data-content=\"" + row.AppDes + "\">" + shortString(row.AppDes, 6, '...') + "</div>";
                },
                "AppIsSys": function(column, row) {
                    if (row.RoleIsSys == 0) {
                        return "否";
                    } else {
                        return "是";
                    }

                },
                "commands": function(column, row) {
                    return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"refresh('/Apps/Settings/AppMaker/Detail/" + row.AppId + "')\" title=\"配置" + row.AppName + "模块\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                        "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" title=\"卸载" + row.AppName + "\" onclick=del(" + row.AppId + ")><span class=\"glyphicon glyphicon-remove\"></span></button>";
                }
            },


        })
//    .on("selected.rs.jquery.bootgrid", function(e, rows) {
//        var rowIds = [];
//        for (var i = 0; i < rows.length; i++) {
//            rowIds.push(rows[i].Id);
//        }
//        alert("Select: " + rowIds.join(","));
//    }).on("deselected.rs.jquery.bootgrid", function(e, rows) {
//        var rowIds = [];
//        for (var i = 0; i < rows.length; i++) {
//            rowIds.push(rows[i].Id);
//        } 
//        alert("Deselect: " + rowIds.join(","));
        //    })
        .on("loaded.rs.jquery.bootgrid", function(e) {
            //按钮提示
            $('.tip').tooltip();
            //按钮气泡
            $('.pop').popover({ html : true,trigger: "hover" });
            //alert("loaded");
        })
//        .on("click.rs.jquery.bootgrid", function(e, column, row) {
//                alert(row.AppId);
//            })
            ;
}


function del(ids) {
    //console.log(ids);
    var compNum = $("#CompNum").val();
    var del_tips = "确认卸载该应用吗？";
    try {
        if (ids.toString().indexOf(",") > 0) {
            var del_tips = "确认批量卸载选中应用吗？";
        }
    } catch (e) {
        //console.warn(e.message);
    }

    showMoreDialog("uninstall_dialog", del_tips, function() {

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
                        //grid.bootgrid("reload");
                        showMsg("应用卸载成功！", "Success");
                         refresh();
                    } else {
                        showMsg("系统异常，应用卸载失败！");
                    }

                },
                error: function() {
                    showMsg("网络连接错误");
                }
            });
        }, function() {
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
                         //load_menu();
                        //grid.bootgrid("reload");
                        showMsg("应用卸载成功！", "Success");
                         refresh();
                       
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