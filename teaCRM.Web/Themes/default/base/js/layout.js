//*主项目头部js
//*作者：唐有炜
//*时间：2014年07月28日
$(document).ready(function() {
    //显示欢迎
    welcome();
    //显示更多
    showMore();
    //显示个人信息
    showUserInfo();
});

$(function() {
    //菜单切换
    changeTab();
});

//显示个人信息
function showUserInfo() {
    var d_user;
    $("#user-pic").click(function() {
        d_user = dialog({
            content: '<div class="tips">欢迎您选用C+企业云平台！</div>',
            quickClose: true // 点击空白处快速关闭
        });
        d_user.show(this);
    });
}

//显示更多
function showMore() {
    var d_more;
    $("#nav-more").click(function() {
            d_more = dialog({
                content: ' <ul class="nav" style="background:#1173ee;margin:10px 10px -10px 10px;"><li id="nav-sale"><a href="/Apps/Sale/">销售</a></li><li id="nav-product"><a href="/Apps/Product/">产品</a></li><li id="nav-service"><a href="/Apps/Service/">服务</a></li></ul>',
                quickClose: true // 点击空白处快速关闭
            });
            d_more.show(this);
        })
        //.mouseout(function() {
        // setTimeout(function() {
        //    d_more.close().remove();
        //}, 10000);
        //    })
        ;
}

//显示欢迎
function welcome() {
    $("#sayHello").html(sayHello());
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
    return welcome;
}

//菜单切换
function changeTab() {
    var url = location.href;
    $(".nav li").removeClass("selected");
    //alert(url);
    if (url.indexOf("/Apps/CRM/") > 0) {
        //alert("customer");
        $("#nav-customer").addClass("selected");
        $("#menu-customer").show();
        //二级分类选中===================================
        $(".nav2 li").removeClass("selected");
          if (url.indexOf("Index") > 0) {
              $("#all").addClass("selected");
          } else if (url.indexOf("Trash") > 0) {
              $("#trash").addClass("selected");
          } else if (url.indexOf("Pub") > 0) {
              $("#pub").addClass("selected");
          } else if (url.indexOf("Contact") > 0) {
              $("#contact").addClass("selected");
          } else {
              $("#all").addClass("selected");  
          }
    } else if (url.indexOf("/Apps/Sale/") > 0) {
        $("#nav-more").addClass("selected");
        $("#menu-sale").show();
    }
    else if ( url.indexOf("/Apps/Product/") > 0) {
        $("#nav-more").addClass("selected");
        $("#menu-product").show();
    }
    else if (url.indexOf("/Apps/Service/")>0) {
        $("#nav-more").addClass("selected");
        $("#menu-service").show();
    }
    else if (url.indexOf("/Apps/Settings/") > 0) {
        //alert("Department");
        $("#nav-settings").addClass("selected");
        $("#menu-settings").show();
        //
    }  else if (url.indexOf("/Apps/") > 0) {
        //alert("index");
        $("#nav-app").addClass("selected");
        $("#menu-app").show();
    } else if (url.indexOf("/Workbench/") > 0) {
        $("#nav-workbench").addClass("selected");
        $("#menu-workbench").show();
    } else {
        $("#nav-workbench").addClass("selected");
        $("#menu-workbench").show();
    }
}