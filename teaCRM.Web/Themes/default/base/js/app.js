//*应用市场js
//*作者：唐有炜
//*时间：2014年09月16日

$(function() {
    load_app_data();
});


function load_app_data() {
  

    $.ajax({
        type: "get",
        cache: false,
        url: "/api/app/GetAllApps",
        dataType: "json",
        beforeSend: function () {
            //showMsg("添加中，请稍后...");
        },
        complete: function () {
            //d.close().remove();
        },
        success: function (result) {
            //console.log(result);
            var best_app_ul = $("#best_app");
            var new_app_ul = $("#new_app");
            var latest_app = $("#latest_app");
            for (var index in result) {
                //console.log(result[index]);
                var app = result[index];
                var best_li = "  <li class=\"m-appShow\"><a id=\"_mail_link_3_8\" href=\"javascript:void(0)\" class=\"js-component-link m-appshow-name\" hidefocus=\"hidefocus\" title=\"" + app.AppDes + "\"><img src=\"" + app.AppImgurl75 + "\" alt=\"" + app.AppName + "\" />" + app.AppName + "</a><p class=\"m-appShow-counts mod-appShow-name-hover\">33100位用户</p> <div class=\"m-rating-box\"> <div id=\"_mail_component_9_9\" class=\"js-component-component m-rating m-rating-set4\" data-orginal=\"m-rating-set4\"> <a class=\"m-rating-ico ico m-rating-ico-s1\" href=\"javascript:void(0);\">标1星</a> <a class=\"m-rating-ico ico m-rating-ico-s2\" href=\"javascript:void(0);\">标2星</a> <a class=\"m-rating-ico ico m-rating-ico-s3\" href=\"javascript:void(0);\">标3星</a> <a class=\"m-rating-ico ico m-rating-ico-s4\" href=\"javascript:void(0);\">标4星</a> <a class=\"m-rating-ico ico m-rating-ico-s5\" href=\"javascript:void(0);\">标5星</a> <div class=\"doSucc\" style=\"display:none;\">打分成功 </div> </div> </div> <div class=\"doSucc doSuccess\" style=\"display:none;\">打分成功 </div></li>";
                $(best_app_ul).append(best_li);
                var new_li = " <li class=\"ei\" style=\"background-color:#5cc0ff;border-color: #1299e7\"><img src=\"" + app.AppImgurl190 + "\" alt=\"" + app.AppName + "\" /><b id=\"_mail_icon_1_72\" class=\"js-component-icon ico-onBox-new ico \"></b> <div class=\"ea\"> <p class=\"dE\">" + app.AppName + "</p> <div class=\"count\"> <p class=\"user-num\" title=\"已有7550人添加该应用\">7550位用户</p> <div class=\"m-rating-box\"> <div id=\"_mail_component_73_73\" class=\"js-component-component m-rating m-rating-set3\" data-orginal=\"m-rating-set3\"> <a class=\"m-rating-ico ico m-rating-ico-s1\" href=\"javascript:void(0);\">标1星</a>  <a class=\"m-rating-ico ico m-rating-ico-s2\" href=\"javascript:void(0);\">标2星</a> <a class=\"m-rating-ico ico m-rating-ico-s3\" href=\"javascript:void(0);\">标3星</a> <a class=\"m-rating-ico ico m-rating-ico-s4\" href=\"javascript:void(0);\">标4星</a> <a class=\"m-rating-ico ico m-rating-ico-s5\" href=\"javascript:void(0);\">标5星</a> <div class=\"doSucc\" style=\"display:none;\">打分成功 </div> </div> </div> </div> <div class=\"doSucc doSuccess\" style=\"display:none;\">打分成功 </div> <p id=\"_mail_component_75_75\" class=\"js-component-component dM\">" + app.AppDes + "</p> <div class=\"opt\"> <a id=\"_mail_button_0_77\" href=\"javascript:;\" role=\"button\" tabindex=\"0\" class=\"js-component-button btn-Succ btn-success btn btn-hasIco btn-success-hasIco  \"><b id=\"_mail_icon_2_78\" class=\"js-component-icon ico ico-add  \"></b>添加</a> </div> </div></li>";
                $(new_app_ul).append(new_li);
                var latest_li = "<li class=\"dD\"><a id=\"_mail_link_26_109\" href=\"javascript:void(0)\" class=\"js-component-link \" hidefocus=\"hidefocus\" title=\"" + app.AppName + "\"><img src=\"" + app.AppImgurl32 + "\" alt=\"" + app.AppName + "\" /></a></li>";
                $(latest_app).append(latest_li);
            }


        },
        error: function () {
            showMsg("网络连接错误", "Error");
        }
    });

}