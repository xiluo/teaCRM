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
                //alert(treeNode.id);
                //load_form_data(treeNode.id);
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
//            zTree = $.fn.zTree.getZTreeObj(treeId);
//            //默认选中专业节点
//            var treeObj = $.fn.zTree.getZTreeObj(treeId);
//            var json = eval('(' + data + ')');
//            //alert(json[0].id);
//            var node = treeObj.getNodeByParam("id", json[0].id);
//            treeObj.selectNode(node, false);
//            //设置选中节点后右边编辑内容的载入
//            load_form_data(json[0].id);
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
        url: "/api/settings/role/getAllRoles",
        selection: true,
        multiSelect: true,
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
            "RoleIsSys": function (column, row) {
                if (row.RoleIsSys == 0) {
                    return "否";
                } else {
                    return "是";
                }

            },
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" onclick=edit(" + row.Id + ")><span class=\"fa fa-pencil\"></span>修改</button> " +
                    "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" onclick=del(" + row.Id + ")><span class=\"fa fa-trash-o\"></span>删除</button>";
            }
        }
    });
}