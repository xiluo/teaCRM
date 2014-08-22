//*账户登陆JS函数
//*作者：唐有炜
//*时间：2014年08月21日

$(document).ready(function() {
    //记住密码
    remember();
});

$(function() {
    //登陆
    do_login();
});

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

//登陆提交
function do_login() {
    $("#btnSubmit").click(function() {
        var userName = $.trim($("#userName").val());
        var userPassword = $.trim($("#userPassword").val());
        validateLogin(userName, userPassword);
        return false;
    });
}

function validateLogin(userName, userPassword) {
    if (userName == "") {
        $("#hdExtLink").text("用户名不能为空！").removeClass("hide").addClass("show-block");
        return false;
    } else if (userPassword == "") {
        $("#hdExtLink").text("密码不能为空！").removeClass("hide").addClass("show-block");
    } else {
        login_ajax(userName, userPassword);
    }
    return true;
}

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
    $.post(url, { type: type, accountType: accountType, userName: userName, userPassword: userPassword, remember: remember, clientIp: clientIp, clientPlace: clientPlace, clientTime: clientTime }, function(data) {
        //alert(data.Status);
        $("#hdExtLink").text(data.Msg).removeClass("hide").addClass("show-block");
        if (data.Status) { //登陆成功
            $.dialog(
                {
                    id: 'loading',
                    lock: true,
                    title: '提示',
                    icon: 'face-smile',
                    content: '<div class="pop-up">正在登录中，请稍后...</div>',
                    time: '2'
                }
            );
            location.href = "/";
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
    var client_ip = returnCitySN["cip"];
    //var client_place = returnCitySN["cname"];
    //alert(client_ip+" "+client_place);
    return client_ip;
}

function get_client_place() {
    var client_place = returnCitySN["cname"];
    //alert(client_place);
    return client_place;
}

//获取客户端时间
function get_client_time() {
    var now = new Date();
    var curr_datetime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return curr_datetime;
}