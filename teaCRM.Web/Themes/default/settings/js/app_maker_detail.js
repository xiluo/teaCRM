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
                    //修改样式
                    $(".mod-item").removeClass("selected");
                    $(this).addClass("selected");
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
                header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"> <div class=\"btn-group\" style=\"float:left;\"> <button data-toggle=\"tooltip\" data-placement=\"bottom\"  class=\"btn btn-default tip\" title=\"添加自定义字段\"  onclick=\" add_field(); \"><span class=\"glyphicon glyphicon-plus\"></span>添加</button><button class=\"btn  btn-default tip\" data-placement=\"bottom\"  title=\"批量删除\" id=\"field-muti-del\"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量删除</button></div>" +
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
                "exp_is_sys": function(column, row) {
                    if (!row.exp_is_sys) {
                        return "否";
                    } else {
                        return "是";
                    }
                },
                "commands": function(column, row) {
                    //alert(row.id);
                    //console.log(row.id+" "+row.id.toString().indexOf("base"));
                    if (row.id.toString().indexOf("base") >= 0) {
                        return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" title=\"内置字段不可更改\" style=\"color: wheat;\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                            "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" title=\"内置字段不可删除\"  style=\"color: wheat;\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
                    } else {
                        return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"edit_field("+row.id+");\" title=\"修改【" + row.exp_title + "】字段\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                            "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"del_field("+row.id+")\" title=\"删除【" + row.exp_title + "】字段\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
                    }
                }
            },
        })
        .on("loaded.rs.jquery.bootgrid", function(e) {
            //按钮提示
            $('.tip').tooltip();
            //按钮气泡
            $('.pop').popover({ html: true, trigger: "hover" });
            //showMsg("字段加载成功！", "Success");
             $("#field-muti-del").on("click", (function() {
        var ids = get_selected_ids("field_grid");
        //console.log(ids);
        if (ids == '') {
            showMsg("请先选择应用在卸载！");
            return;
        }
        //alert(ids);
        del_field(ids);
    }));
  
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
            url: "/api/settings/appMaker/getAllMyAppViews",
            //selection: true,
            multiSelect: true,
            rowSelect: true,
            //keepSelection: true,
            rowCount: [10, 30, 50],
            templates: {
                header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"> <div class=\"btn-group\" style=\"float:left;\"> <button data-toggle=\"tooltip\" data-placement=\"bottom\"  class=\"btn btn-default tip\" title=\"添加视图\"  onclick=\" add_view(); \"><span class=\"glyphicon glyphicon-plus\"></span>添加</button><button class=\"btn  btn-default tip\" data-placement=\"bottom\"  title=\"批量删除\" id=\"view-muti-del\"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量删除</button></div>" +
                    "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                    "<p class=\"{{css.actions}}\"></p></div></div></div>"
            },
            labels: {
                all: "all", //checkbox全选的值
                search: "请输入视图名称",
                loading: "加载中...",
                noResults: "对不起，暂无符合条件的记录！",
                refresh: "刷新",
                infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
            },
            formatters: {
                "commands": function(column, row) {
                    return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"edit_view()\"  title=\"修改\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                        "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"del_view("+row.Id+");\" title=\"删除\" ><span class=\"glyphicon glyphicon-remove\"></span></button>";
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
              $("#view-muti-del").on("click", (function() {
        var ids = get_selected_ids("view_grid");
        //console.log(ids);
        if (ids == '') {
            showMsg("请先选择应用在卸载！");
            return;
        }
        //alert(ids);
        del_view(ids);
    }));
   
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
            url: "/api/settings/appMaker/getAllMyAppToolBars",
            //selection: true,
            multiSelect: true,
            rowSelect: true,
            //keepSelection: true,
            rowCount: [10, 30, 50],
            templates: {
                header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"> <div class=\"btn-group\" style=\"float:left;\"> <button data-toggle=\"tooltip\" data-placement=\"bottom\"  class=\"btn btn-default tip\" title=\"添加操作\"  onclick=\" add_toolbar(); \"><span class=\"glyphicon glyphicon-plus\"></span>添加</button><button class=\"btn  btn-default tip\" data-placement=\"bottom\"  title=\"批量删除\" id=\"toolbar-muti-del\"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量删除</button></div>" +
                    "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                    "<p class=\"{{css.actions}}\"></p></div></div></div>"
            },
            labels: {
                all: "all", //checkbox全选的值
                search: "请输入操作",
                loading: "加载中...",
                noResults: "对不起，暂无符合条件的记录！",
                refresh: "刷新",
                infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
            },
            formatters: {
                "OpeIsSys": function(column, row) {
                    if (!row.OpeIsSys) {
                        return "否";
                    } else {
                        return "是";
                    }
                },
                "OpeIsStatus": function(column, row) {
                    if (!row.OpeIsStatus) {
                        return "否";
                    } else {
                        return "是";
                    }
                },
                "OpeIsFast": function(column, row) {
                    if (!row.OpeIsFast) {
                        return "否";
                    } else {
                        return "是";
                    }
                },
                "commands": function(column, row) {
                    return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"edit_toolbar(" + row.Id + ")\" title=\"修改\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                        "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"del_toolbar("+row.Id+")\" title=\"删除\")><span class=\"glyphicon glyphicon-remove\"></span></button>";
                }
            },


        })
        .on("loaded.rs.jquery.bootgrid", function(e) {
            //按钮提示
            $('.tip').tooltip();
            //按钮气泡
            $('.pop').popover({ html: true, trigger: "hover" });
        
    $("#toolbar-muti-del").on("click", (function() {
        var ids = get_selected_ids("toolbar_grid");
        //console.log(ids);
        if (ids == '') {
            showMsg("请先选择应用在卸载！");
            return;
        }
        //alert(ids);
        del_toolbar(ids);
    }));
        });
}


//添加=====================================================
function add_field() {
    showWindow("show_add", "/Apps/Settings/AppMaker/EditField", "添加自定义字段", 750, 345, function() {
        var form_field = $(window.frames["frm_show_add"].document).find("#form_field");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //var data = $(form_field).serializeObject();
        var data = $(form_field).serialize();
        console.log((data));
        return false;
        $.ajax({
            type: "post",
            cache: false,
            url: "/",
            data: data,
            dataType: "json",
            beforeSend: function() {
                //showMsg("添加中，请稍后...");
            },
            complete: function() {
                //d.close().remove();
            },
            success: function(result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    field_grid.bootgrid("reload");
                    showMsg("用户添加成功！", "Success");
                } else {
                    showMsg("系统异常，用户添加失败！", "Error");
                }
            },
            error: function() {
                showMsg("网络连接错误", "Error");
            }
        });

    });
    //必须有这个，阻止刷新
    return false;
}

function add_view() {
 showWindow("show_add", "/Apps/Settings/AppMaker/EditView", "添加筛选器", 700, 220, function() {
        var form_view = $(window.frames["frm_show_add"].document).find("#form_view");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
         var data = $(form_view).serialize();
        console.log((data));
     return false;
        $.ajax({
            type: "post",
            cache: false,
            url: "/",
            data: data,
            dataType: "json",
            beforeSend: function() {
                //showMsg("添加中，请稍后...");
            },
            complete: function() {
                //d.close().remove();
            },
            success: function(result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    field_grid.bootgrid("reload");
                    showMsg("用户添加成功！", "Success");
                } else {
                    showMsg("系统异常，用户添加失败！", "Error");
                }
            },
            error: function() {
                showMsg("网络连接错误", "Error");
            }
        });

    });
    //必须有这个，阻止刷新
    return false;
}

function add_toolbar() {
 showWindow("show_add", "/Apps/Settings/AppMaker/EditToolbar", "添加操作", 700, 200, function() {
        var form_toolbar = $(window.frames["frm_show_add"].document).find("#form_toolbar");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //var data = $(form_user).serializeObject();
        var data = $(form_toolbar).serialize();
     return false;
        console.log((data));
        $.ajax({
            type: "post",
            cache: false,
            url: "/",
            data: data,
            dataType: "json",
            beforeSend: function() {
                //showMsg("添加中，请稍后...");
            },
            complete: function() {
                //d.close().remove();
            },
            success: function(result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    field_grid.bootgrid("reload");
                    showMsg("用户添加成功！", "Success");
                } else {
                    showMsg("系统异常，用户添加失败！", "Error");
                }
            },
            error: function() {
                showMsg("网络连接错误", "Error");
            }
        });

    });
    //必须有这个，阻止刷新
    return false;
}


//修改========================================================
function edit_field() {
 showWindow("show_add", "/Apps/Settings/AppMaker/EditField", "修改自定义字段", 750, 345, function() {
        var form_field = $(window.frames["frm_show_add"].document).find("#form_field");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //var data = $(form_field).serializeObject();
        var data = $(form_field).serialize();
        console.log((data));
        return false;
        $.ajax({
            type: "post",
            cache: false,
            url: "/",
            data: data,
            dataType: "json",
            beforeSend: function() {
                //showMsg("添加中，请稍后...");
            },
            complete: function() {
                //d.close().remove();
            },
            success: function(result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    field_grid.bootgrid("reload");
                    showMsg("用户添加成功！", "Success");
                } else {
                    showMsg("系统异常，用户添加失败！", "Error");
                }
            },
            error: function() {
                showMsg("网络连接错误", "Error");
            }
        });

    });
    //必须有这个，阻止刷新
    return false;
}

function edit_view() {
showWindow("show_add", "/Apps/Settings/AppMaker/EditView", "修改筛选器", 700, 220, function() {
        var form_view = $(window.frames["frm_show_add"].document).find("#form_view");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
         var data = $(form_view).serialize();
        console.log((data));
     return false;
        $.ajax({
            type: "post",
            cache: false,
            url: "/",
            data: data,
            dataType: "json",
            beforeSend: function() {
                //showMsg("添加中，请稍后...");
            },
            complete: function() {
                //d.close().remove();
            },
            success: function(result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    field_grid.bootgrid("reload");
                    showMsg("用户添加成功！", "Success");
                } else {
                    showMsg("系统异常，用户添加失败！", "Error");
                }
            },
            error: function() {
                showMsg("网络连接错误", "Error");
            }
        });

    });
    //必须有这个，阻止刷新
    return false;
}

function edit_toolbar() {
showWindow("show_add", "/Apps/Settings/AppMaker/EditToolbar", "修改操作", 700, 200, function() {
        var form_toolbar = $(window.frames["frm_show_add"].document).find("#form_toolbar");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //var data = $(form_user).serializeObject();
        var data = $(form_toolbar).serialize();
     return false;
        console.log((data));
        $.ajax({
            type: "post",
            cache: false,
            url: "/",
            data: data,
            dataType: "json",
            beforeSend: function() {
                //showMsg("添加中，请稍后...");
            },
            complete: function() {
                //d.close().remove();
            },
            success: function(result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    field_grid.bootgrid("reload");
                    showMsg("用户添加成功！", "Success");
                } else {
                    showMsg("系统异常，用户添加失败！", "Error");
                }
            },
            error: function() {
                showMsg("网络连接错误", "Error");
            }
        });

    });
    //必须有这个，阻止刷新
    return false;
}


//删除==============================================================
function del_field() {
  //console.log(id);
    showDialog("确认删除该字段吗？", function () {
//        $.ajax({
//            type: "get",
//            cache: false,
//            url: "/api/settings/role/deleteRole/",
//            data: { id: id },
//            dataType: "json",
//            beforeSend: function () {
//                //showMsg("添加中，请稍后...");
//            },
//            complete: function () {
//                //d.close().remove();
//            },
//            success: function (result) {
//                //toLowerCase报错
//                //var status = result.Status.toLowerCase();
//                var status = result.Status;
//                if (status == true || status == "true" || status == "True") {
//                    //刷新数据
//                    grid.bootgrid("reload");
//                    showMsg("字段删除成功！", "Success");
//                } else {
//                    showMsg("系统异常，角色删除失败！", "Error");
//                }
//            },
//            error: function () {
//                showMsg("网络连接错误", "Error");
//            }
        //        });
        showMsg("系统异常，字段删除失败！", "Error");
    });
    //必须有这个，阻止刷新
    return false;
}

function del_view() {
  //console.log(id);
    showDialog("确认删除该筛选器吗？", function () {
//        $.ajax({
//            type: "get",
//            cache: false,
//            url: "/api/settings/role/deleteRole/",
//            data: { id: id },
//            dataType: "json",
//            beforeSend: function () {
//                //showMsg("添加中，请稍后...");
//            },
//            complete: function () {
//                //d.close().remove();
//            },
//            success: function (result) {
//                //toLowerCase报错
//                //var status = result.Status.toLowerCase();
//                var status = result.Status;
//                if (status == true || status == "true" || status == "True") {
//                    //刷新数据
//                    grid.bootgrid("reload");
//                    showMsg("筛选器删除成功！", "Success");
//                } else {
//                    showMsg("系统异常，角色删除失败！", "Error");
//                }
//            },
//            error: function () {
//                showMsg("网络连接错误", "Error");
//            }
        //        });
        showMsg("系统异常，筛选器删除失败！", "Error");
    });
    //必须有这个，阻止刷新
    return false;
}

function del_toolbar() {
  //console.log(id);
    showDialog("确认删除该操作吗？", function () {
//        $.ajax({
//            type: "get",
//            cache: false,
//            url: "/api/settings/role/deleteRole/",
//            data: { id: id },
//            dataType: "json",
//            beforeSend: function () {
//                //showMsg("添加中，请稍后...");
//            },
//            complete: function () {
//                //d.close().remove();
//            },
//            success: function (result) {
//                //toLowerCase报错
//                //var status = result.Status.toLowerCase();
//                var status = result.Status;
//                if (status == true || status == "true" || status == "True") {
//                    //刷新数据
//                    grid.bootgrid("reload");
//                    showMsg("操作删除成功！", "Success");
//                } else {
//                    showMsg("系统异常，角色删除失败！", "Error");
//                }
//            },
//            error: function () {
//                showMsg("网络连接错误", "Error");
//            }
        //        });
        showMsg("系统异常，操作删除失败！", "Error");
    });
    //必须有这个，阻止刷新
    return false;
}