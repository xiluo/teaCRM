//*组织架构js
//*作者：唐有炜
//*时间：2014年07月231日


$(document).ready(function () {
    createTree();
});


//加载左侧树形
$(function() {
//    var menu = $("#department_tree").ligerTree({
//        url: '/Apps/Settings/Department/GetDepartmentTreeData',
//        ajaxType: 'get',
//        checkbox: false,
//        onClick: function(data) {
//            var json = eval(data);
//            //alert(json.data.id + " " + json.target.baseURI);
//        },
//        onSuccess: function(data) {
//            load_form_data(data[0].id);
//            menu.selectNode(data[0].id);
//            //function 中的参数data变量指的是ligerTree中的数据data 
//            //data.text指的是data数据表中的text字段，如果有其他字段则换成其他的描述例如ＩＤ字段由这样使用：data.ID //该function的执行过程如下：
//            //当menu.selectNode(parm)代码执行时，function(data)则逐调用data中的text属性，然后进行相关的逻辑对比操作只要这个function(data) return true则该项被选中，false则未选中．所以当需要对ligerTree设置项目被选中时，可以通过这个tree.selectNode(parm)来调用　function(data)函数来实现．
//        }
//    });
//
//    //编辑部门信息
//    edit();
});


//ZTree==========================================================================
//=================================================================================
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
            beforeExpand: function beforeExpand(treeId, treeNode) {
                if (!treeNode.isAjaxing) {
                    return true;
                } else {
                    alert("zTree 正在下载数据中，请稍后展开节点。。。");
                    return false;
                }
            },
            onAsyncSuccess: function onAsyncSuccess(event, treeId, treeNode, msg) {

            },
            onAsyncError: function onAsyncError() {
                alert(" 数据加载失败");
            }
        }
    };

function createTree() {
    $.ajax({
        url: '/Apps/Settings/Department/AsyncGetNodes/', //url  action是方法的名称
        data: { id: 0 },
        type: 'Get',
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
            $.fn.zTree.init($("#department_tree"), setting, eval('(' + data + ')'));
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}
//=============================================================================================

//加载表单数据
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
            //showMsg("请求中，请稍后...");
        },
        complete: function() {
        },
        success: function(result) {
           for (var key in result) {
               //alert(key + " " + result[key]);
               if ($("#"+key)!=undefined) {
                   $("#" + key).val(result[key]);
               }
           }
        },
        error: function() {
            showMsg("网络连接错误");
        }
    });
}

////编辑部门信息
//function edit() {
//    $("#btn-edit").click(function() {
//        var flag = form_validate();
//        //alert(flag);
//        //alert("edit");
//    });
//}