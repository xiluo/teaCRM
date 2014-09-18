//*用户js
//*作者：唐有炜
//*时间：2014年07月231日
//全局变量
var grid;

$(document).ready(function() {
    //创建树形
    createTree("department_tree");
});

$(function() {
    InitGrid();
});


//ZTree==========================================================================
//=================================================================================
function createTree(treeId) {
    //异步加载节点
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: 0
            }
        },
        async: {
            //异步加载
            enable: true,
            url: "/Apps/Settings/Department/AsyncGetNodes/",
            autoParam: ["id", "name", "pId"]
        },
        callback: {
            beforeExpand: function(treeId, treeNode) {
                if (!treeNode.isAjaxing) {
                    return true;
                } else {
                    alert("zTree 正在下载数据中，请稍后展开节点。。。");
                    return false;
                }
            },
            onAsyncSuccess: function(event, treeId, treeNode, msg) {
                //alert(treeNode);
            },
            onAsyncError: function() {
                alert(" 数据加载失败");
            },
            onClick: function(event, treeId, treeNode, clickFlag) {
                //console.log(treeNode.id);
                load_grid_data(treeNode.id);
            }
        }
    };

    $.ajax({
        url: '/Apps/Settings/Department/AsyncGetNodes/', //url  action是方法的名称
        data: { id: 0 },
        type: 'post',
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function(data) {
            $.fn.zTree.init($("#" + treeId), setting, eval('(' + data + ')'));
            zTree = $.fn.zTree.getZTreeObj(treeId);
            //展开一级
            var json_data = eval('(' + data + ')');
            for (var index in json_data) {
                var tnode = json_data[index];
                console.log(tnode);
                var node = zTree.getNodeByParam("id", tnode.id, null);
                zTree.expandNode(node, true, true, true);
            }
//            //默认选中专业节点
//            var treeObj = $.fn.zTree.getZTreeObj(treeId);
//            var json = eval('(' + data + ')');
//            //alert(json[0].id);
//            var node = treeObj.getNodeByParam("id", json[0].id);
//            treeObj.selectNode(node, false);
//            //设置选中节点后右边编辑内容的载入
//             load_grid_data(json[0].id);
        },
        error: function(msg) {
            alert(" 数据加载失败！" + msg);
        }
    });


}
//==================================================================================


function InitGrid() {

    grid = $("#grid-data").bootgrid({
        ajax: true,
        post: function () {
            /* To accumulate custom parameter with the request object */
            return {
                compNum: $("#CompNum").val()
            };
        },
        url: "/api/settings/users/GetAllUsers",
        selection: true,
        multiSelect: true,
        rowSelect: true,
        keepSelection: true,
        rowCount: [10, 30, 50],
        templates: {
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><div class=\"btn-group\" style=\"float:left;\"><button class=\"btn  btn-primary\" title=\"新增\" onclick=\" add(); \">新增</button><button class=\"btn  btn-primary\" title=\"批量删除\" onclick=\" del(); \">批量删除</button></div>" +
                "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                "<p class=\"{{css.actions}}\"></p></div></div></div>"
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
            "UserEnable": function (column, row) {
                if (row.RoleIsSys == 0) {
                    return "禁用";
                } else {
                    return "启用";
                }

            },
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" onclick=edit(" + row.Id + ")><span class=\"fa fa-pencil\"></span>修改</button> " +
                    "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" onclick=del(" + row.Id + ")><span class=\"fa fa-trash-o\"></span>删除</button>";
            }
        }
    });
}

function  load_grid_data(id) {
    console.log("dep_id:" + id);
    grid.bootgrid("search","dep_id="+id);

}


function add() {
    showWindow("show_add", "/Apps/Settings/Users/Add", "添加用户", 750, 345, function () {
        var form_user = $(window.frames["frm_show_add"].document).find("#form_user");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //var data = $(form_user).serializeObject();
        var data = $(form_user).serialize();
        console.log((data));
        $.ajax({
            type: "post",
            cache: false,
            url: "/api/settings/users/addUser",
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
                    showMsg("用户添加成功！", "Success");
                } else {
                    showMsg("系统异常，用户添加失败！", "Error");
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


function edit() {
    showWindow("show_edit", "/Apps/Settings/Users/Edit", "修改用户", 750, 345, function() {
        var form_user = $(window.frames["frm_show_edit"].document).find("#form_user");
        //console.log(form_role);
        var flag = document.getElementById("frm_show_edit").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //var data = $(form_user).serializeObject();
        var data = $(form_user).serialize();
        console.log((data));
    });
}


function del(id) {
    console.log(id);
    showDialog("确认删除该角色吗？", function () {
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
//                    showMsg("角色删除成功！", "Success");
//                } else {
//                    showMsg("系统异常，角色删除失败！", "Error");
//                }
//            },
//            error: function () {
//                showMsg("网络连接错误", "Error");
//            }
        //        });
        showMsg("系统异常，角色删除失败！", "Error");
    });
    //必须有这个，阻止刷新
    return false;
}