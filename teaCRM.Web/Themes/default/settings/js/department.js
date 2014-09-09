//*组织架构js
//*作者：唐有炜
//*时间：2014年07月231日
$(document).ready(function() {
    //创建树形
    createTree("department_tree");
});

$(function () {
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
            beforeExpand: function (treeId, treeNode) {
                if (!treeNode.isAjaxing) {
                    return true;
                } else {
                    alert("zTree 正在下载数据中，请稍后展开节点。。。");
                    return false;
                }
            },
            onAsyncSuccess: function (event, treeId, treeNode, msg) {
                //alert(treeNode);
            },
            onAsyncError: function () {
                alert(" 数据加载失败");
            },
            onClick: function (event, treeId, treeNode, clickFlag) {
                //alert(treeNode.id);
                load_form_data(treeNode.id);
            }
        }
    };
    $.ajax({
        url: '/Apps/Settings/Department/AsyncGetNodes/', //url  action是方法的名称
        data: { id: 0 },
        type: 'Get',
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function(data) {
            $.fn.zTree.init($("#" + treeId), setting, eval('(' + data + ')'));
            //默认选中专业节点
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var json = eval('(' + data + ')');
            //alert(json[0].id);
            var node = treeObj.getNodeByParam("id", json[0].id);
            treeObj.selectNode(node, false);
            //设置选中节点后右边编辑内容的载入
            load_form_data(json[0].id);
        },
        error: function(msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}
//=============================================================================================

//加载表单数据=============================================================
function load_form_data(id) {
    //alert(id);
    //提交数据
    var url = "/Apps/Settings/Department/GetDepartment/";
    $.ajax({
        type: "post",
        cache: false,
        url: url,
        data: { id: id },
        dataType: "json",
        beforeSend: function() {
            showLoading();
        },
        complete: function() {
            hideLoading();
        },
        success: function(result) {
            for (var key in result) {
                //alert(key + " " + result[key]);
                if ($("#" + key) != undefined) {
                    $("#" + key).html(result[key]);
                }
            }
        },
        error: function() {
            showMsg("服务器异常！");
        }
    });
}
//================================================================================

//=================================================================================
var url = "";
//编辑部门信息
function show_edit() {
    url = "/Apps/Settings/Department/Add/";
    showWindow("show");
}

function show_add() {
    url = "/Apps/Settings/Department/Add/";
    showWindow("show_add", url, "添加部门", 680, 480, function () {
        var form_department = $(window.frames["frm_show_add"].document).find("#form_department");
        //alert($(form_department).serialize());
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        //alert(flag); 
          if (!flag) {
            showMsg("您的表单包含错误，请检查！");
            return false;
        }
        return false;
//        var id = $("#btn-edit").prev().val();
//        //alert(id);
        var data = $(form_department).serialize();
        alert(data);
        showMsg("修改成功！");
    });
}

function save_delete() {
    showDialog("确认删除该部门吗？", function() {
        showMsg("删除成功！");
    });
}

//==============================================