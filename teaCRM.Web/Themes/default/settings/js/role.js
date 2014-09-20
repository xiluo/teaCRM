//*角色js
//*作者：唐有炜
//*时间：2014年07月231日
//全局变量
var grid;

$(function() {

//初始化表格
    InitGrid();
});


function InitGrid() {
    grid = $("#grid-data").bootgrid({
        ajax: true,
        post: function () {
            /* To accumulate custom parameter with the request object */
            return {
                compNum: $("#CompNum").val()
            };
        },
        url: "/api/settings/role/getAllRoles",
        selection: true,
        multiSelect: true,
        rowSelect: true,
        keepSelection: true,
        rowCount: [10, 30, 50],
        templates: {
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><div class=\"btn-group\" style=\"float:left;\"><button class=\"btn btn-default tip\" title=\"添加角色\" onclick=\" add(); \"><span class=\"glyphicon glyphicon-plus\"></span>添加</button><button class=\"btn btn-default tip\" title=\"批量删除角色\" onclick=\" del(); \"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量删除</button></div>" +
                "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                "<p class=\"{{css.actions}}\"></p></div></div></div>"
        },
        labels: {
            all: "all", //checkbox全选的值
            search: "请输入角色名称",
            loading: "加载中...",
            noResults: "对不起，暂无符合条件的记录！",
            refresh: "刷新",
            infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
        },
        formatters: {
            "RoleType": function (column, row) {
                if (row.RoleType == 0) {
                    return "超级管理员";
                } else if (row.RoleIssys == 1) {
                    return "系统管理员";
                } else {
                    return "普通员工";
                }

            },
            "RoleIsSys": function (column, row) {
                if (row.RoleIsSys == 0) {
                    return "否";
                } else {
                    return "是";
                }

            },
            "commands": function (column, row) {
                return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"refresh('/Apps/Settings/Permission/Function/" + row.Id + "');\" title=\"管理【" + row.RoleName + "】的权限\"><span class=\"glyphicon glyphicon-user\"></span></button>" +
                "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"edit(" + row.Id + ");\" title=\"修改【" + row.RoleName + "】角色\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                      "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"del(" + row.Id + ");\" title=\"删除【" + row.RoleName + "】角色\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
            }
        }
    }).on("loaded.rs.jquery.bootgrid", function (e) {
        //按钮提示
        $('.tip').tooltip();
        //按钮气泡
        $('.pop').popover({ html: true, trigger: "hover" });
        //showMsg("字段加载成功！", "Success");
    }); 
}


function add() {
     showWindow("show_add", "/Apps/Settings/Role/Add", "添加角色", 700, 240, function () {
         var form_role = $(window.frames["frm_show_add"].document).find("#form_role");
         //console.log(form_role);
         var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
         if (!flag) {
             return false;
         }
         //var data = $(form_role).serializeObject();
         var data = $(form_role).serialize();
         //console.log((data));
         $.ajax({
             type: "post",
             cache: false,
             url: "/api/settings/role/addRole",
             data: data,
             dataType: "json",
             beforeSend: function () {
                 //showMsg("添加中，请稍后...");
             },
             complete: function () {
                 //d.close().remove();
             },
             success: function (result) {
                 //toLowerCase报错
                 //var status = result.Status.toLowerCase();
                 var status = result.Status;
                 if (status == true || status == "true" || status == "True") {
                     //刷新数据
                     grid.bootgrid("reload");
                     showMsg("角色添加成功！", "Success");
                 } else {
                     showMsg("系统异常，角色添加失败！", "Error");
                 }
             },
             error: function () {
                 showMsg("网络连接错误", "Error");
             }
         });
         
     });
    //必须有这个，阻止刷新
    return false;
}

function edit(id) {
    var url = "/Apps/Settings/Role/Edit/"+id;
    //console.log(id);
    showWindow("show_edit", url, "修改角色", 700, 240,function() {
        var form_role = $(window.frames["frm_show_edit"].document).find("#form_role");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_edit").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //var data = $(form_role).serializeObject();
        var data = $(form_role).serialize();
        //console.log((data));
        $.ajax({
            type: "post",
            cache: false,
            url: "/api/settings/role/editRole",
            data: data,
            dataType: "json",
            beforeSend: function () {
                //showMsg("添加中，请稍后...");
            },
            complete: function () {
                //d.close().remove();
            },
            success: function (result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    grid.bootgrid("reload");
                    //console.log(grid);
                 
                    showMsg("角色修改成功！", "Success");
                } else {
                    showMsg("系统异常，角色修改失败！", "Error");
                }
            },
            error: function () {
                showMsg("网络连接错误", "Error");
            }
        });



    });

    //必须有这个，阻止刷新
    return false;
}

function del(id) {
     //console.log(id);
    showDialog("确认删除该角色吗？", function() {
        $.ajax({
            type: "get",
            cache: false,
            url: "/api/settings/role/deleteRole/",
            data: { id: id },
            dataType: "json",
            beforeSend: function () {
                //showMsg("添加中，请稍后...");
            },
            complete: function () {
                //d.close().remove();
            },
            success: function (result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    grid.bootgrid("reload");
                    showMsg("角色删除成功！", "Success");
                } else {
                    showMsg("系统异常，角色删除失败！", "Error");
                }
            },
            error: function () {
                showMsg("网络连接错误", "Error");
            }
        });
    });
    //必须有这个，阻止刷新
    return false;
}