//*公共注册JS函数
//*作者：唐有炜
//*时间：2014年08月21日

$(document).ready(function() {
    //初始化
    //Init();
});


$(function() {
    //注册
    do_register();
});

////初始化
//function Init() {
//    $(".phrase-tips").hide();
//    $(".tips-password").hide();
//    $(".tips-rePassword").hide();
//    $(".reg-wrap dd").css("height", "34px");
//}

//显示信息
function showTips(tipId) {
    $("#" + tipId).show();
}

//注册
function do_register() {
    $("#regSubmitBtn").click(function() {
        validateRegister();
    });
}

//注册验证
function validateRegister() {
    var userName = $.trim($("#userName").val());
    var userPhone = $.trim($("#userPhone").val());
    var userPassword = $.trim($("#userPassword").val());
    var userTname = $.trim($("#userTname").val());
    //验证通过
    if (validateInput()) {
        register_ajax(userName, userPhone, userPassword, encodeURI(userTname));
    }
}

function validateInput() {
    var userName = $.trim($("#userName").val());
    var userPhone = $.trim($("#userPhone").val());
    var userPassword = $.trim($("#userPassword").val());
    var rePassword = $.trim($("#rePassword").val());
    var userTname = $.trim($("#userTname").val());
    if (userName == "") {
        showTips(false, $("#tips-userName span"), "请正确填写用户名");
        return false;
    } else {
        var is_chs = /.*?[\u4E00-\u9FFF]+.*/;
        if (is_chs.test(userName)) {
            showTips(false, $("#tips-userName span"), "用户名不能包含中文");
            return false;
        } else {
            if (userName.length < 6 || userName.length > 20) {
                showTips(false, $("#tips-userName span"), "用户名长度错误，只能为6-20位");
            } else {
                showTips(true, $("#tips-userName span"), "输入正确");
            }
        }

    }

   if (userPhone == "") {
       showTips(false, $("#tips-phone span"), "请正确填写手机号码");
       return false;
    } else {
        var flag;
        var reg_phone = /^[1]+[3,5]+\d{9}$/;
        if (!reg_phone.test(userPhone)) {
            showTips(false, $("#tips-phone span"), "手机号码格式错误");
            return false;
        } else {
            showTips(true, $("#tips-phone span"), "输入正确");
        }
    }
    if (userPassword == "") {
        showTips(false, $("#tips-userPassword span"), "请正确填写密码");
        return false;
    } else {
        if (userPassword.length < 6 || userPassword.length > 20) {
            showTips(false, $("#tips-userPassword span"), "密码长度错误，只能为6-20位");
            return false;
        } else {
            showTips(true, $("#tips-userPassword span"), "输入正确");
        }
    }
    if (rePassword == "") {
        showTips(false, $("#tips-rePassword span"), "请正确填写重复密码");
        return false;
    } else {
        if (rePassword != userPassword) {
            showTips(false, $("#tips-rePassword span"), "两次输入的密码不一样，请重新输入");
            return false;
        } else {
            showTips(true, $("#tips-rePassword span"), "输入正确");
                return true; 
        }
    }
}

function showTips(status, obj, msg) {
    obj.removeClass("text-tips").addClass("tips-phrase");
    if (status) {
        obj.removeClass("reg-tips-wrong").addClass("reg-tips-ok").html(msg);
    } else {
        obj.removeClass("reg-tips-ok").addClass("reg-tips-wrong").html(msg);
    }
}

//注册请求
function register_ajax(userName, phone, userPassword, userTname) {
    var url = "/Account/PublicRegister/";

    var d = dialog({
        title: '温馨提示',
        content: '消息内容'
    });
    $.ajax({
        type: "post",
        url: url,
        data: { userName: userName, phone: phone, userPassword: userPassword, userTname: userTname },
        dataType: "json",
        beforeSend: function() {
            d.content("<div class=\"loading\">验证加载中，请稍后...</div>");
            d.showModal();
        },
        complete: function() {
            //d.close().remove();
        },
        success: function(data) {
            $("#hdExtLink").text(data.Msg).removeClass("hide").addClass("show-block");
            if (data.Status) { //登录成功
                d.content("<div class=\"loading\">正在注册中，请稍后...</div>");
                location.href = "/";
            } else {
                d.content("<div class=\"loading\">" + data.Msg + "</div>");
                setTimeout(function () {
                    d.close().remove();
                }, 2000);
            }
        },
        error: function() {
            $("#hdExtLink").text("网络连接错误！").removeClass("hide").addClass("show-block");
            d.content("<div class=\"loading\">网络连接错误！</div>");
            setTimeout(function() {
                d.close().remove();
            }, 2000);
        }
    });

}