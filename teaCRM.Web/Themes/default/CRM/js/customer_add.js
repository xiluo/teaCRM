//*添加客户JS函数
//*作者：唐有炜
//*时间：2014年09月01日

$(document).ready(function() {

});


$(function() {
//表单验证
    validate_form();
});

//表单验证
function validate_form() {
    //表单验证
    $("#form_customer").validate({
        rules: {
            cus_name: {
                rangelength: [2, 20]
            },
            cus_tel: {
                remote: {
                    url: '/Apps/CRM/LoadData/ValidatePhone/'
                    //                    ,data: {
                    //                        action: function () { return "validate_phone"; }
                    //                    }
                },
                con_name: {
                    rangelength: [2, 20]
                }
            }
        },
        messages: {
            cus_name: {
                required: "客户名称不能为空！",
                rangelength: "客户名称长度必须在2-20之间"
            },
            cus_tel: {
                remote: "该电话或手机号码已存在！"
            },
            con_name: {
                required: "主联系人名称不能为空！",
                rangelength: "主联系人名称长度必须在2-20之间"
            }
        },
        errorPlacement: function (error, element) {
            var errorMsg = error[0].innerHTML;
            var elementName = element[0].name;
            //alert(errorMsg);
            //alert(elementName);
            $("#" + elementName).formtip(errorMsg);
        }
    });
}

// /Apps/CRM/Index/Add/页面调用
//添加客户提交
function save_add() {
    var data = $("#form_customer").serialize();
    //alert(data);
    //表单验证
    validate_form();
    alert($("#form_customer").valid());
    var flag = $("#form_customer").valid();
    if (!flag) {
        return false;
    }

    //提交数据
    var url = "/Apps/CRM/Index/Add/";
    $.post(url, data, function(result, status) {
        if (status == "success" && result.Status) {
            //关闭父窗口
            parent.dialog.list['show_add'].close();
            //在iframe里面打开弹出框并自动关闭
            showTopMsg("show_add", result.Msg);
            //刷新数据
            window.parent.f_reload();
        } else {
            parent.dialog.list['show_add'].close();
            showTopMsg("show_add", "系统异常！");
        }
    });
}

//添加客户提交
function cancel_add() {
    parent.dialog.list['show_add'].close();
    top.dialog({
        id: "save_add",
        title: '温馨提示',
        content: "您取消了添加！",
        onshow: function() {
            setTimeout(function() {
                top.dialog.list['save_add'].close().remove();
            }, 2000);
        },
        cancel: false
    }).show();
}
///////////////////////////////////////////////////////////////////////////////