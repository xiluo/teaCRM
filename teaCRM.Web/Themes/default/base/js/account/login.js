//*账户登录JS函数
//*作者：唐有炜
//*时间：2014年08月21日

$(document).ready(function() {
    //记住密码
    remember();
    //自动完成
    auto_complete();
});

$(function() {
    //表单验证
    $("#loginForm").validate({
        rules: {
            userName: {
                rangelength: [6, 20],
                remote: {
                    url: '/Account/ValidateAccount/',
                    data: {
                        validate_action: function() { return "login"; }
                    }
                }
            },
            userPassword: {
                rangelength: [6, 20],
                remote: {
                    url: '/Account/ValidateAccount/',
                    data: {
                        userName: function() { return $.trim($("#userName").val()); },
                        validate_action: function() { return "login"; }
                    }
                }
            }
        },
        messages: {
            userName: {
                required: "用户名不能为空！",
                rangelength: "用户名6-20位,不包括@10000",
                remote: "该用户名不存在！"
            },
            userPassword: {
                required: "密码不能为空！",
                rangelength: "密码长度必须在6-20之间",
                remote: "密码错误！"
            }
        },
//        errorPlacement: function(error, element) {
//            var errorMsg = error[0].innerHTML;
//            var elementName = element[0].name;
//            //$("#" + elementName).formtip(errorMsg);
//            $("#login-tips").text(errorMsg).removeClass("hide").addClass("show-block");
//        },
//        success: function(label) {
//            var elementName = label[0].htmlFor;
//            $("#login-tips").removeClass("hide").addClass("show-block");
        //        }
        focusInvalid: false,
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

    //登录
    do_login();

});

//自动完成
function auto_complete() {
    //===============================================
    //IE不显示智能提示
    if (!$.support.leadingWhitespace) {
        try {
            $('#userName').autocomplete({
                serviceUrl: '/Account/UserNameAuto/',
                onSelect: function(suggestion) {
                    //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
//服务器返回结果
//{
//    "query": "Unit",
//    "suggestions": [
//        {
//            "value": "United Arab Emirates",
//            "data": "AE"
//        },
//        {
//            "value": "United Kingdom",
//            "data": "UK"
//        },
//        {
//            "value": "United States",
//            "data": "US"
//        }
//    ]
//}

//    var countries = [
//   { value: 'Andorra', data: 'AD' },
//        // ...
//   {value: 'Zimbabwe', data: 'ZZ' }
//];
//
//    $('#userName').autocomplete({
//        lookup: countries,
//        onSelect: function (suggestion) {
//            alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
//        }
//    });

}

//记住密码
//$.cookie(‘the_cookie’); // 读取 cookie 
//$.cookie(‘the_cookie’, 'the_value’); // 存储 cookie 
///$.cookie(‘the_cookie’, 'the_value’, { expires: 7 }); // 存储一个带7天期限的 cookie 
//$.cookie(‘the_cookie’, '', { expires: -1 }); // 删除 cookie
function remember() {
    if ($.cookie("remember") == "true") {
        $("#remember").attr("checked", true);
        $("#userName").val($.cookie("userName"));
        $("#userPassword").val($.cookie("userPassword"));
    } else {
        $("#remember").attr("checked", false);
        $("#userName").val("");
        $("#userPassword").val("");
    }
}

//登录提交
function do_login() {
    $("#userName").click(function() {
        $("#login-tips").removeClass("show-block").addClass("hide");
    });
    $("#userPassword").click(function () {
        $("#login-tips").removeClass("show-block").addClass("hide");
    });

    $("#btnSubmit").click(function() {
        //集成jquery validate   
        if (!$("#loginForm").valid()) {
            $("#login-tips").text("用户名或密码错误！").removeClass("hide").addClass("show-block");
            return false;
        } else {
            var userName = $.trim($("#userName").val());
            var userPassword = $.trim($("#userPassword").val());
            login_ajax(userName, userPassword);
            //validateLogin(userName, userPassword);
            return false;
        }
    });
}

//function validateLogin(userName, userPassword) {
//    if (userName == "") {
//        $("#login-tips").text("用户名不能为空！").removeClass("hide").addClass("show-block");
//        return false;
//    } else if (userPassword == "") {
//        $("#login-tips").text("密码不能为空！").removeClass("hide").addClass("show-block");
//    } else {
//        login_ajax(userName, userPassword);
//    }
//    return true;
//}

function login_ajax(userName, userPassword) {
    var url = "/Account/Login/";
    var type = "normal";
    var accountType = get_account_type(userName);
    //var userName = "admin@11524760"; 
    //var userName = "cyutyw@126.com"; 
    //var userName = "15225062328"; 
    //var userPassword = "123456"; 
    var clientIp = get_client_ip();
    var clientPlace = encodeURI(get_client_place());
    var clientTime = get_client_time();
    var remember = $.trim($("#remember").prop("checked"));
    //alert(remember);

    //初始化消息提示框 
    var d = dialog({
        title: '温馨提示',
        content: '消息内容'
    });

    $.ajax({
        type: "post",
        url: url,
        data: { type: type, accountType: accountType, userName: userName, userPassword: userPassword, remember: remember, clientIp: clientIp, clientPlace: clientPlace, clientTime: clientTime },
        dataType: "json",
        beforeSend: function() {
            d.content("<div class=\"loading\">验证加载中，请稍后...</div>");
            d.showModal();
        },
        complete: function() {
            //d.close().remove();
        },
        success: function(data) {
            //$("#login-tips").text(data.Msg).removeClass("hide").addClass("show-block");
            if (data.Status) { //登录成功
                d.content("<div class=\"loading\">正在登录中，请稍后...</div>");
                location.href = "/";
            } else {
                d.close();
            }
        },
        error: function() {
            $("#login-tips").text("网络连接错误！").removeClass("hide").addClass("show-block");
            d.content("<div class=\"loading\">网络连接错误！</div>");
            setTimeout(function() {
                d.close().remove();
            }, 2000);
        }
    });

}

//根据用户名判断账号类型(username,email,phone)
//var userName = "admin@11524760"; 
//var userName = "cyutyw@126.com"; 
//var userName = "15225062328"; 
function get_account_type(userName) {
    var reg_username = /^\w+@[0-9]+$/i;
    var reg_email = /^\w+@[a-z0-9]+\.[a-z]+$/i;
    var reg_phone = /^[1]+[3,5]+\d{9}$/;
    if (reg_username.test(userName)) {
        return "username";
    } else if (reg_email.test(userName)) {
        return "email";
    } else if (reg_phone.test(userName)) {
        return "phone";
    } else {
        return "email";
    }
}

//获取客户端ip
//注意：必须引用 <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script> 
function get_client_ip() {
    var client_ip = "127.0.0.1";
    //防止网络错误
    if ("undefined" != typeof returnCitySN) {
        client_ip = returnCitySN["cip"];
    }
    //var client_place = returnCitySN["cname"];
    //alert(client_ip+" "+client_place);
    return client_ip;
}

function get_client_place() {
    var client_place = "网络错误，定位失败";
    //防止网络错误
    if ("undefined" != typeof returnCitySN) {
        client_place = returnCitySN["cname"];
    }
    //alert(client_place);
    return client_place;
}

//获取客户端时间
function get_client_time() {
    var now = new Date();
    var curr_datetime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return curr_datetime;
}