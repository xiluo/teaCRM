//*主项目头部js
//*作者：唐有炜
//*时间：2014年07月28日
$(document).ready(function() {
    //显示欢迎
    sayHello();
});

$(function() {
    //加载菜单
    load_menu();
});

//显示更多
function showMore() {
    var d_more;
    var d_content = "";
    if ($("#more-content li").length > 0) {
        d_content = $("#more-content").html();
    } else {
        d_content = "<div style=\"padding:15px 15px 0 25px;font-size:18px;\">暂无更多应用。<div>";
    }
    $("#head-nav-More").mouseover(function() {
        d_more = dialog({
            id: "dg_more",
            content: d_content,
            quickClose: true // 点击空白处快速关闭
        });
        d_more.show(this);
    });
    //alert("aaa");
}


//欢迎语
function sayHello() {
    var now = new Date(), hour = now.getHours();
    var welcome = "";
    if (hour < 6) {
        welcome = "凌晨好！";
    } else if (hour < 9) {
        welcome = "早上好！";
    } else if (hour < 12) {
        welcome = "上午好！";
    } else if (hour < 14) {
        welcome = "中午好！";
    } else if (hour < 17) {
        welcome = "下午好！";
    } else if (hour < 19) {
        welcome = "傍晚好！";
    } else if (hour < 22) {
        welcome = "晚上好！";
    } else {
        welcome = "夜里好！";
    }
    $("#sayHello").html(welcome);
}

//加载菜单
function load_menu() {
    $.ajax({
        type: "post",
        cache: false,
        data: { "current": 1, "rowCount": 10, "sort[AppName]": "asc", "searchPhrase": "", "compNum": $("#CompNum").val() },
        url: "/api/settings/appMaker/getAllApps",
        dataType: "json",
        beforeSend: function() {
            //showMsg("添加中，请稍后...");
        },
        complete: function() {
            //d.close().remove();
        },
        success: function(result) {
            var json_data = JSON.parse(result);
            //alert(json_data.rows.length);
            //console.log(result);
            if (json_data.rows.length == 0) {
                if (location.href.indexOf("Desktop") > 0) {
                    showDialog("该公司暂未安装应用，是否立即前往应用市场？", function() {
                        refresh("/Apps/Index");
                    });
                }
            } else {

                //初始化一级菜单
                var head_menu = $("#head-nav");
                $(head_menu).html("");
                //更多菜单
                var more_menu = $("#head-more-nav");
                $(head_menu).append("<li id=\"head-nav-Desktop\" class=\"selected\" ><a href=\"/Desktop/\">桌面</a></li>");
                //加载动态应用（导航第一个）
                var li_id1 = json_data.rows[0].AppLink.split("/")[json_data.rows[0].AppLink.split("/").length - 1];
                $(head_menu).append("<li id=\"head-nav-" + li_id1 + "\"><a href=\"" + json_data.rows[0].AppLink + "\">" + json_data.rows[0].AppName + "</a></li>");
                //加载二级菜单
                load_sub_nav(li_id1, json_data.rows[0].AppId);

                $(head_menu).append(" <li id=\"head-nav-Index\"><a href=\"/Apps/Index/\">应用</a></li><li id=\"head-nav-Settings\"><a href=\"/Apps/Settings/Department/\">设置</a></li><li id=\"head-nav-More\"><a href=\"javascript:void(0);\">更多</a></li>");
                //后面的几个应用
                for (var i = 1; i < json_data.rows.length; i++) {
                    menu = json_data.rows[i];
                    //console.log(menu);
                    var li_id = menu.AppLink.split("/")[menu.AppLink.split("/").length - 1];
                    $(more_menu).append("<li id=\"head-nav-" + li_id + "\"><a href=\"" + menu.AppLink + "\">" + menu.AppName + "</a></li>");
                    //加载二级菜单
                    load_sub_nav(li_id, menu.AppId);
                }
            }


        },
        error: function() {
            showMsg("网络连接错误", "Error");
        }
    });
    //alert("菜单加载完毕！");
}

//加载二级菜单
function load_sub_nav(menu_id, appId) {
    $.ajax({
        type: "get",
        cache: false,
        data: { "compNum": $("#CompNum").val(), appId: appId },
        url: "/api/settings/appMaker/getAllMyApps",
        dataType: "json",
        beforeSend: function() {
            //showMsg("添加中，请稍后...");
        },
        complete: function() {
            //d.close().remove();
        },
        success: function(result) {
            var sub_json_data = JSON.parse(result);
            //console.log(result);
            var sub_nav = $("#main-menu");
            var my_sub_nav = " <div id=\"sub-nav-" + menu_id + "\" class=\"head-nav-header2 hide\"><ul class=\"head-head-nav2\">";
//            for (var index in sub_json_data) {
//                var sub_nav_data = sub_json_data[index];
//                my_sub_nav += "<li class=\"selected\"><a href=\"" + sub_nav_data.MyappLink + "\" >" + sub_nav_data.MyappName + "</a></li>";
//
            //            }
            for (var i = 0; i < sub_json_data.length; i++) {
                var sub_nav_data = sub_json_data[i];
                                my_sub_nav += "<li class=\"selected\"><a href=\"" + sub_nav_data.MyappLink + "\" >" + sub_nav_data.MyappName + "</a></li>";
                
}
            my_sub_nav += "</ul></div>";
            $(sub_nav).append(my_sub_nav);
            // alert("二级菜单加载完毕！");
            //alert(result);

            //菜单切换
            changeTab();
        },
        error: function() {
            showMsg("网络连接错误", "Error");
        }
    });


}


//菜单切换
function changeTab() {
    var url = location.href;
//    //alert(url);

    var flag = false;
    $("#head-nav li").each(function() {
        //alert($(this).attr("id"));
        //head-nav-desktop
        var id = $(this).attr("id");
        var id_length = id.length;
        var mid = id.substring(9, id_length);
        //alert(mid);
        if (url.indexOf(mid) > 0) {
            $(".head-nav li").removeClass("selected");
            $("#head-nav-" + mid).addClass("selected");
            $("#sub-nav-" + mid).removeClass("hide").removeClass("hide").show();
            flag = true;
            //alert(mid);
        }
    });

    //alert(flag);
    if (!flag) { //其他的全部将More选中 14-09-18 By 唐有炜
        $("#head-nav-More").addClass("selected");
        $("#head-nav-Desktop").removeClass("selected");
    }
    //显示更多
    showMore();

}