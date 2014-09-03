//*添加客户JS函数
//*作者：唐有炜
//*时间：2014年09月01日

$(document).ready(function() {
    validate_form();
});


$(function() {

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
                remote: { type: "POST", url: '/Apps/CRM/LoadData/ValidatePhone/' }
            }
        },
        messages: {
            cus_name: {
                required: "客户名称不能为空！",
                rangelength: "客户名称长度必须在2-20之间"
            },
            cus_tel: {
                required: "电话或手机号码不能为空！",
                remote: "该电话或手机号码已存在！"
            },
            con_name: {
                required: "主联系人名称不能为空！",
            }
        },

//       onkeyup: false,
//        success: function (element) {
//            var elem = $(element);
//            elem.poshytip('disable');
//            elem.poshytip('destroy');
//        },
//        errorPlacement: function (error, element) {
//            var elem = $(element);
//            if (!error.is(':empty')) {
//                //右：x=right;y=center
//                //左：x=left;y=center
//                //上：x=inner-left
//                //下：x=center;y=bottom
//                var aX = "center";
//                if (elem.attr("positionX") != null) {
//                    aX = elem.attr("positionX");
//                }
//                var aY = "bottom";
//                if (elem.attr("positionY") != null) {
//                    aY = elem.attr("positionY");
//                }
//                elem.filter(':not(.valid)').poshytip({
//                    content: error,
//                    alignTo: 'target',
//                    alignX: aX,
//                    alignY: aY,
//                    offsetX: 0,
//                    offsetY: 5
//                });
//            } else {
//                elem.poshytip('disable');
//                elem.poshytip('destroy');
//            }
//        }
        errorPlacement: function(error, element) {
            var errorMsg = error[0].innerHTML;
            var elementName = element[0].name;
            $("#" + elementName).formtip(errorMsg);
        },
        success: function(element) {
            var elem = $(element)[0].htmlFor;
            $("#" + elem).poshytip('disable');
            $("#" + elem).poshytip('destroy');
            $("#" + elem).css("border", "1px solid green");
        }
//          showErrors: function(errorMap, errorList) {
//             showModal("您的表单包含" + this.numberOfInvalids()
//              + "项错误，请检查！");
//            this.defaultShowErrors();
//        }
    });
}

// /Apps/CRM/Index/Add/页面调用
//添加客户提交
function save_add() {
    var data = $("#form_customer").serialize();
    //alert(data);
    //表单验证
    //validate_form();
    //alert($("#form_customer").valid());
    if (!$("#form_customer").valid()) {
        showMsg("您的表单包含错误，请检查！");
        //$("#form_msg").html("您的表单包含错误，请检查！").show();
        return false;
    }
    $("#form_msg").hide();

    //提交数据
    var url = "/Apps/CRM/Index/Add/";
    $.post(url, data, function(result, status) {
        if (status == "success" && result.Status) {
            //关闭父窗口
            parent.dialog.list['show_add'].close();
            //在iframe里面打开弹出框并自动关闭
            showTopMsg("save_ok", result.Msg);
            //刷新数据
            window.parent.f_reload();
        } else {
            parent.dialog.list['save_ok'].close();
            showTopMsg("save_error", "系统异常！");
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