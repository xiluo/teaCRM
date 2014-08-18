//*主项目头部js
//*作者：唐有炜
//*时间：2014年07月28日
$(function() {
    changeTab();
});

//菜单切换
function changeTab() {
    var url = location.href;
    $(".nav li").removeClass("selected");
    //alert(url);
    if (url.indexOf("Show/Index/1") > 0) {
        //alert("customer");
        $("#nav-customer").addClass("selected");
        $("#menu-customer").show();
    } else if (url.indexOf("Show/Develop/2") > 0) {
        $("#nav-sale").addClass("selected");
        $("#menu-sale").show();
    } else if (url.indexOf("Show/Develop/3") > 0) {
        $("#nav-product").addClass("selected");
        $("#menu-product").show();
    } else if (url.indexOf("Show/Develop/4") > 0) {
        $("#nav-service").addClass("selected");
        $("#menu-service").show();
    } else if (url.indexOf("Show/Develop/5") > 0) {
        $("#nav-app").addClass("selected");
        $("#menu-app").show();
    } else if (url.indexOf("Settings") > 0) {
        //alert("Department");
        $("#nav-settings").addClass("selected");
        $("#menu-settings").show();
        //
    } else if (url.indexOf("Show/Develop/0") > 0) {
        $("#nav-more").addClass("selected");
        $("#menu-more").show();
    } else {
        //alert("index");
        $("#nav-desktop").addClass("selected");
        $("#menu-desktop").show();
    }
}

