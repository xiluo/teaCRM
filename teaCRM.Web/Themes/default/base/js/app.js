//*应用市场js
//*作者：唐有炜
//*时间：2014年09月16日

$(function () {

    //加载应用市场
    load_app_data();
    //加载我的应用
    load_myapp_data();
});

//加载我的应用
function load_myapp_data() {
     $.ajax({
        type: "post",
        cache: false,
        data: {"current":1,"rowCount":10,"sort[AppName]":"asc","searchPhrase":"","compNum":$("#CompNum").val()},
        url: "/api/settings/appMaker/getAllApps",
        dataType: "json",
        beforeSend: function() {
            //showMsg("添加中，请稍后...");
        },
        complete: function() {
            //d.close().remove();
        },
        success: function (result) {
            var json_data = JSON.parse(result);
            //alert(json_data.rows.length);
            $("#my_app_count").html("(" + json_data.rows.length + ")");
            //console.log(result);
          
        },
        error: function() {
            showMsg("网络连接错误", "Error");
        }
    });

}

//加载应用市场
function load_app_data() {
    $.ajax({
        type: "get",
        cache: false,
        url: "/api/app/GetAllApps",
        dataType: "json",
        beforeSend: function() {
            //showMsg("添加中，请稍后...");
        },
        complete: function() {
            //d.close().remove();
        },
        success: function(result) {
            //console.log(result);
            var best_app_ul = $("#best_app");
            var new_app_ul = $("#new_app");
            var latest_app = $("#latest_app");
            //清空 14-09-17  By 唐有炜
            $(best_app_ul).html("");
            $(new_app_ul).html("");
            $(latest_app).html("");
            for (var index in result) {
                //console.log(result[index]);
                var app = result[index];
                var best_li = "  <li class=\"m-appShow\"><a id=\"_mail_link_3_8\" href=\"javascript:void(0)\" class=\"js-component-link m-appshow-name\" hidefocus=\"hidefocus\" title=\"" + app.AppDes + "\"><img src=\"" + app.AppImgurl75 + "\" alt=\"" + app.AppName + "\" onclick=\"add(" + app.Id + "," + $("#CompNum").val() + "," + app.AppType + ")\" />" + app.AppName + "</a><p class=\"m-appShow-counts mod-appShow-name-hover\">33100位用户</p> <div class=\"m-rating-box\"> <div id=\"_mail_component_9_9\" class=\"js-component-component m-rating m-rating-set4\" data-orginal=\"m-rating-set4\"> <a class=\"m-rating-ico ico m-rating-ico-s1\" href=\"javascript:void(0);\">标1星</a> <a class=\"m-rating-ico ico m-rating-ico-s2\" href=\"javascript:void(0);\">标2星</a> <a class=\"m-rating-ico ico m-rating-ico-s3\" href=\"javascript:void(0);\">标3星</a> <a class=\"m-rating-ico ico m-rating-ico-s4\" href=\"javascript:void(0);\">标4星</a> <a class=\"m-rating-ico ico m-rating-ico-s5\" href=\"javascript:void(0);\">标5星</a> <div class=\"doSucc\" style=\"display:none;\">打分成功 </div> </div> </div> <div class=\"doSucc doSuccess\" style=\"display:none;\">打分成功 </div></li>";
                $(best_app_ul).append(best_li);
                var new_li = " <li class=\"ei\" style=\"background-color:#5cc0ff;border-color: #1299e7\"><img src=\"" + app.AppImgurl190 + "\" alt=\"" + app.AppName + "\" /><b id=\"_mail_icon_1_72\" class=\"js-component-icon ico-onBox-new ico \"></b> <div class=\"ea\"> <p class=\"dE\">" + app.AppName + "</p> <div class=\"count\"> <p class=\"user-num\" title=\"已有7550人添加该应用\">7550位用户</p> <div class=\"m-rating-box\"> <div id=\"_mail_component_73_73\" class=\"js-component-component m-rating m-rating-set3\" data-orginal=\"m-rating-set3\"> <a class=\"m-rating-ico ico m-rating-ico-s1\" href=\"javascript:void(0);\">标1星</a>  <a class=\"m-rating-ico ico m-rating-ico-s2\" href=\"javascript:void(0);\">标2星</a> <a class=\"m-rating-ico ico m-rating-ico-s3\" href=\"javascript:void(0);\">标3星</a> <a class=\"m-rating-ico ico m-rating-ico-s4\" href=\"javascript:void(0);\">标4星</a> <a class=\"m-rating-ico ico m-rating-ico-s5\" href=\"javascript:void(0);\">标5星</a> <div class=\"doSucc\" style=\"display:none;\">打分成功 </div> </div> </div> </div> <div class=\"doSucc doSuccess\" style=\"display:none;\">打分成功 </div> <p id=\"_mail_component_75_75\" class=\"js-component-component dM\">" + app.AppDes + "</p> <div class=\"opt\"> <a id=\"_mail_button_0_77\" href=\"javascript:;\" role=\"button\" tabindex=\"0\" class=\"js-component-button btn-Succ btn-success btn btn-hasIco btn-success-hasIco  \" onclick=\"add(" + app.Id + "," + $("#CompNum").val() + "," + app.AppType + ")\"><b id=\"_mail_icon_2_78\" class=\"js-component-icon ico ico-add  \"></b>添加</a> </div> </div></li>";
                $(new_app_ul).append(new_li);
                var latest_li = "<li class=\"dD\"><a id=\"_mail_link_26_109\" href=\"javascript:void(0)\" class=\"js-component-link \" hidefocus=\"hidefocus\" title=\"" + app.AppName + "\"><img src=\"" + app.AppImgurl32 + "\" alt=\"" + app.AppName + "\" /></a></li>";
                $(latest_app).append(latest_li);
            }


        },
        error: function() {
            showMsg("网络连接错误", "Error");
        }
    });

}

//添加应用
function add(id, compNum, appType) {
    //alert(compNum);
    //检测是否安装过同类应用
    var res = $.ajax({ url: "/api/settings/appMaker/isInstalled", data: { id: id, compNum: compNum, appType: appType }, async: false }).responseText;
    var json_data = eval("(" + res + ")");
    var is_installed = json_data.Status;
    //alert(is_installed);
    if (!is_installed) {
        showMsg("对不起，你已经安装过同类应用，请卸载后重装或尝试安装其他应用！", "Error");
        return false;
    }
    //showMsg("您可以安装该应用！", "Success");
    showDialog("确认安装该应用吗？", function () {
          $.ajax({
             type: "get",
             cache: false,
             url: "/api/settings/appMaker/Install",
             data: { id: id, compNum: compNum },
             dataType: "json",
             beforeSend: function () {
                 //showMsg("添加中，请稍后...");
             },
             complete: function () {
                 //showMsg("完成...");
             },
             success: function (result) {
                 //toLowerCase报错
                 //var status = result.Status.toLowerCase();
                 var status = result.Status;
                 if (status == true || status == "true" || status == "True") {
//                     //加载应用市场
//                     load_app_data();
//                     //加载我的应用
//                     load_myapp_data();
                     showMsg("应用安装成功！", "Success");
                     refresh("/Apps");
                 } else {
                     showMsg("系统异常，应用安装失败！");
                 }

             },
             error: function () {
                 showMsg("网络连接错误");
             }
         });
    });
    
        //阻止表单提交
    return false;
}