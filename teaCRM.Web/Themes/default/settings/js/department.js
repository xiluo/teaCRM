//*组织架构js
//*作者：唐有炜
//*时间：2014年07月231日


$(document).ready(function() {
    //创建树形
    createTree();
    //初始化输入框
    InitInput();
});

//初始化输入框
function InitInput() {
    $("input").css("border", "none").attr("readonly", "readonly");
}


//清空输入框
function ClearInput() {
    dropInput();
    $("input").val("");
}

//开启编辑状态
function dropInput() {
    $("input").css("border", "").removeAttr("readonly");
}

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
    //    
    //表单验证
    validate_form();

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
            //alert(treeNode);
        },
        onAsyncError: function onAsyncError() {
            alert(" 数据加载失败");
        },
        onClick: function(event, treeId, treeNode, clickFlag) {
            //alert(treeNode.id);
            load_form_data(treeNode.id);
        }
    }
};

function createTree() {
    $.ajax({
        url: '/Apps/Settings/Department/AsyncGetNodes/', //url  action是方法的名称
        data: { id: 0 },
        type: 'Get',
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function(data) {
            $.fn.zTree.init($("#department_tree"), setting, eval('(' + data + ')'));
            //默认选中专业节点
            var treeObj = $.fn.zTree.getZTreeObj("department_tree");
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
            showLoading();
        },
        complete: function() {
            hideLoading();
        },
        success: function(result) {
            for (var key in result) {
                //alert(key + " " + result[key]);
                if ($("#" + key) != undefined) {
                    $("#" + key).val(result[key]);
                }
            }
        },
        error: function() {
            showMsg("网络连接错误");
        }
    });
}
//========================================================
//=================================================================================
var url = "";
//编辑部门信息
function show_edit() {
    //开启编辑状态
    dropInput();
    //显示保存按钮
    $("#btn-edit").hide("fast");
    $("#btn-save").text("保存修改").show("fast");
    url = "/add";
    //必须有这个，阻止刷新
    return false;
}

function show_add() {
    ClearInput();
    $("#btn-edit").hide("fast");
    $("#btn-save").text("提交新部门").show("fast");
    url = "/add";
    //必须有这个，阻止刷新
    return false;
}

function save() {
    var flag = $("#form_department").valid();
    //alert(flag);
    if (!flag) {
        showMsg("您的表单包含错误，请检查！");
        return false;
    }
    var id = $("#btn-edit").prev().val();
    //alert(id);
    var data = $("#form_department").serialize();
    //alert(data);
    showMsg("修改成功！");

    //还原只读状态
    InitInput();
    $("#btn-save").hide("fast");
    $("#btn-edit").show("fast");
    //必须有这个，阻止刷新
    return false;
}


function save_delete() {
    showDialog("确认删除该部门吗？", function() {
        showMsg("删除成功！");
    });
}

function validate_form() {
    //表单验证
    $("#form_department").validate({
        errorPlacement: function(error, element) {
            var errorMsg = error[0].innerHTML;
            var elementName = element[0].name;
            $("#" + elementName).formtip(errorMsg);
        },
        success: function(element) {
            var elem = $(element)[0].htmlFor;
            $("#" + elem).poshytip('disable');
            $("#" + elem).poshytip('destroy');
            $("#" + elem).removeClass("error").addClass("success");
        }
    });
}
//==============================================
//=============================================