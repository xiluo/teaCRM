//*模块配置js
//*作者：唐有炜
//*时间：2014年09月19日
//全局变量
var field_grid; //字段表格
var view_frid; //视图表格
var toolbar_grid; //操作表格
var myapp_id; //当前模块id

$(document).ready(function() {

});

$(function() {
    //加载左侧菜单
    var compNum = $("#CompNum").val();
    var appId = $("#AppId").val();
    load_left_menu(compNum, appId);
});

//加载左侧菜单 14-09-18 By 唐有炜
function load_left_menu(compNum, appId) {
    $.ajax({
        url: '/api/settings/appMaker/getAllMyApps', //url
        data: { compNum: compNum, appId: appId },
        type: 'get',
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function(result) {
            var json = JSON.parse(result);
            //console.log(json[0]);
            $(".list-group").append("<a href=\"javascript:;\" class=\"list-group-item active disabled\">" + json[0].MyappName + "</a>");

            if (json.length > 0) {
                //加载左侧菜单
                for (var i = 0; i < json.length; i++) {
                    var mod = json[i];
                    $(".list-group").append("<input type=\"hidden\" value=\"" + mod.Id + "\"><a href=\"javascript:;\" class=\"list-group-item mod-item\" >" + mod.MyappName + "</a>");
                }
                //默认加载第一个模块
                myappId = json[0].Id;
                init_right_grids();

                //注册左侧菜单点击事件
                $(".mod-item").on("click", function() {
                    myappId = $(this).prev().val();
                    reload_right_grids();
                    //alert(myappId);
                });

            } else {
                showMsg("该应用暂无模块！");
            }


        },
        error: function(msg) {
            alert(" 数据加载失败！" + msg);
        }
    });

}

//初始化右侧数据
function init_right_grids() {
    //初始化字段表格
    init_field_grid();
    //初始化视图表格
    init_view_grid();
    //初始化操作表格
    init_toolbar_grid();
    showMsg("myappId：" + myappId + "右侧数据初始化成功！", "Success");
}

//重新加载右侧数据
function reload_right_grids() {
    field_grid.bootgrid("reload");
    view_grid.bootgrid("reload");
    toolbar_grid.bootgrid("reload");
    showMsg("myappId：" + myappId + "右侧数据重新加载成功！", "Success");
}

//初始化字段表格
//myappId 
function init_field_grid() {
    field_grid = $("#field_grid").bootgrid({
            ajax: true,
            post: function() {
                /* To accumulate custom parameter with the request object */
                return {
                    compNum: $("#CompNum").val(),
                    myappId: myappId
                };
            },
            url: "/api/settings/appMaker/getAllMyAppFields",
            //selection: true,
            multiSelect: true,
            rowSelect: true,
            //keepSelection: true,
            rowCount: [10, 30, 50],
            templates: {
                header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"> <div class=\"btn-group\" style=\"float:left;\"> <button data-toggle=\"tooltip\" data-placement=\"bottom\"  class=\"btn btn-default tip\" title=\"添加自定义字段\"  onclick=\" refresh('/Apps/'); \"><span class=\"glyphicon glyphicon-plus\"></span>添加</button><button class=\"btn  btn-default tip\" data-placement=\"bottom\"  title=\"批量删除\" id=\"muti-del\"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量删除</button></div>" +
                    "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                    "<p class=\"{{css.actions}}\"></p></div></div></div>"
            },
            labels: {
                all: "all", //checkbox全选的值
                search: "请输入字段名称",
                loading: "加载中...",
                noResults: "对不起，暂无符合条件的记录！",
                refresh: "刷新",
                infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
            },
            formatters: {
                "commands": function(column, row) {
                    return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"refresh('/Apps/Settings/AppMaker/Detail/" + row.AppId + "')\" title=\"配置" + row.AppName + "模块\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                        "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" title=\"卸载" + row.AppName + "\" onclick=del(" + row.AppId + ")><span class=\"glyphicon glyphicon-remove\"></span></button>";
                }
            },


        })
        .on("loaded.rs.jquery.bootgrid", function(e) {
            //按钮提示
            $('.tip').tooltip();
            //按钮气泡
            $('.pop').popover({ html: true, trigger: "hover" });
            //showMsg("字段加载成功！", "Success");
        });
}


//初始化字段表格
function init_view_grid() {
    view_grid = $("#view_grid").bootgrid({
            ajax: true,
            post: function() {
                /* To accumulate custom parameter with the request object */
                return {
                     compNum: $("#CompNum").val(),
                    myappId: myappId
                };
            },
            url: "/api/settings/appMaker/getAllMyAppFields",
            //selection: true,
            multiSelect: true,
            rowSelect: true,
            //keepSelection: true,
            rowCount: [10, 30, 50],
            templates: {
                header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"> <div class=\"btn-group\" style=\"float:left;\"> <button data-toggle=\"tooltip\" data-placement=\"bottom\"  class=\"btn btn-default tip\" title=\"去应用市场添加应用\"  onclick=\" refresh('/Apps/'); \"><span class=\"glyphicon glyphicon-briefcase\"></span>应用市场</button><button class=\"btn  btn-default tip\" data-placement=\"bottom\"  title=\"批量卸载\" id=\"muti-del\"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量卸载</button></div>" +
                    "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                    "<p class=\"{{css.actions}}\"></p></div></div></div>"
            },
            labels: {
                all: "all", //checkbox全选的值
                search: "请输入字段名称",
                loading: "加载中...",
                noResults: "对不起，暂无符合条件的记录！",
                refresh: "刷新",
                infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
            },
            formatters: {
                "commands": function(column, row) {
                    return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"refresh('/Apps/Settings/AppMaker/Detail/" + row.AppId + "')\" title=\"配置" + row.AppName + "模块\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                        "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" title=\"卸载" + row.AppName + "\" onclick=del(" + row.AppId + ")><span class=\"glyphicon glyphicon-remove\"></span></button>";
                }
            },


        })
        .on("loaded.rs.jquery.bootgrid", function(e) {
            //按钮提示
            $('.tip').tooltip();
            //按钮气泡
            $('.pop').popover({ html: true, trigger: "hover" });
            //alert("loaded");
            //showMsg("视图加载成功！", "Success");
        });
}


//初始化操作表格
function init_toolbar_grid() {
    toolbar_grid = $("#toolbar_grid").bootgrid({
            ajax: true,
            post: function() {
                /* To accumulate custom parameter with the request object */
                return {
                    compNum: $("#CompNum").val(),
                    myappId: myappId
                };
            },
            url: "/api/settings/appMaker/getAllMyAppFields",
            //selection: true,
            multiSelect: true,
            rowSelect: true,
            //keepSelection: true,
            rowCount: [10, 30, 50],
            templates: {
                header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"> <div class=\"btn-group\" style=\"float:left;\"> <button data-toggle=\"tooltip\" data-placement=\"bottom\"  class=\"btn btn-default tip\" title=\"去应用市场添加应用\"  onclick=\" refresh('/Apps/'); \"><span class=\"glyphicon glyphicon-briefcase\"></span>应用市场</button><button class=\"btn  btn-default tip\" data-placement=\"bottom\"  title=\"批量卸载\" id=\"muti-del\"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量卸载</button></div>" +
                    "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                    "<p class=\"{{css.actions}}\"></p></div></div></div>"
            },
            labels: {
                all: "all", //checkbox全选的值
                search: "请输入字段名称",
                loading: "加载中...",
                noResults: "对不起，暂无符合条件的记录！",
                refresh: "刷新",
                infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
            },
            formatters: {
                "commands": function(column, row) {
                    return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"refresh('/Apps/Settings/AppMaker/Detail/" + row.AppId + "')\" title=\"配置" + row.AppName + "模块\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                        "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" title=\"卸载" + row.AppName + "\" onclick=del(" + row.AppId + ")><span class=\"glyphicon glyphicon-remove\"></span></button>";
                }
            },


        })
        .on("loaded.rs.jquery.bootgrid", function(e) {
            //按钮提示
            $('.tip').tooltip();
            //按钮气泡
            $('.pop').popover({ html: true, trigger: "hover" });
            //showMsg("操作加载成功！", "Success");
        });
}