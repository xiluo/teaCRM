//*平台公用函数
//*作者：唐有炜
//*时间：2014年08月23日

//兼容ie8支持trim 2014-08-25 By 唐有炜
//================================================================
String.prototype.trim = function() { return Trim(this); };

function LTrim(str) {
    var i;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) != " " && str.charAt(i) != " ")break;
    }
    str = str.substring(i, str.length);
    return str;
}

function RTrim(str) {
    var i;
    for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != " " && str.charAt(i) != " ")break;
    }
    str = str.substring(0, i + 1);
    return str;
}

function Trim(str) {
    return LTrim(RTrim(str));
}

//=========================================================================================

//======================================
//页面刷新 2014-09-10 By 唐有炜
function refresh(url) {
    if (arguments.length > 0) {
        location.href = url;
    } else {
        location.href = "./";
    }
}
//====================================

//弹出框封装结束开始
//需要引用
//<script src="/Themes/default/js/artDialog/lib/jquery-1.10.2.js"></script>
//<link rel="stylesheet" href="/Themes/default/js/artDialog/css/ui-dialog.css">
//<script src="/Themes/default/js/artDialog/dist/dialog-plus-min.js"></script>
//修正margin:10px 10px -10px 10px
function showMsg(msg, msgcss, callback) {
    $("#msgprint").remove();
    var cssname = "";
    switch (msgcss) {
        case "Success":
            cssname = "pcent success";
            break;
        case "Error":
            cssname = "pcent error";
            break;
        case "Warn":
            cssname = "pcent error";
            break;
        default:
            cssname = "pcent warning";
            break;
    }
    var str = "<div id=\"msgprint\" class=\"" + cssname + "\">" + msg + "</div>";
    $("body").append(str);
    $("#msgprint").show();
    //3秒后清除提示
    setTimeout(function () {
        $("#msgprint").fadeOut(500);
        //如果动画结束则删除节点
        if (!$("#msgprint").is(":animated")) {
            $("#msgprint").remove();
        }
    }, 2000);
    //执行回调函数
    if (typeof (callback) == "function") callback();
}

//弹出对话框，带阴影==============================================
function showDialog(msg, okCallback) {
    var d = dialog({
        id:"show_dialog",
        title: '温馨提示',
        content: msg,
        okValue: '确 定',
        ok: okCallback,
        cancelValue: '取消',
        cancel: function() {
            d.close().remove();
        }
    });
    d.showModal();
}

//通过id可以弹出多个框 14-09-17 By 唐有炜
function showMoreDialog(id,msg, okCallback,cancelCallback) {
    var d = dialog({
        id: id,
        title: '温馨提示',
        content: msg,
        okValue: '确 定',
        ok: okCallback,
        cancelValue: '取消',
        cancel: cancelCallback
    });
    d.showModal();
}

//============================================================================
//弹出iframe窗口，带阴影，用作表单===============================================
//2014-09-03 By 唐有炜
//Dialod id:id Iframe id:frm_{id}
function showWindow(id, url, title, w, h,okCallback) {
    var d = dialog({
        id: id,
        title: title,
        //url: url,//此方式不支持滚动条
        content: '<iframe src="' + url + '" id="frm_'+id+'" name="frm_'+id+'" style="border-bottom: 1px solid #E5E5E5;" width="100%" height="100%" width="100%" frameborder="0"></iframe>',
        width: w,
        height: h,
        okValue: '确 定',
        ok: okCallback,
        cancelValue: '取消',
        cancel: function () {
            d.close().remove();
        }
    });
    d.showModal();
}

//============================================================================
//弹出url方式加载的窗口，带阴影，不带添加按钮，用作表单===============================================
//2014-09-03 By 唐有炜
function showContentWindow(id, url, title, w, h) {
    var d = dialog({
        id: id,
        title: title,
        //url: url,//此方式不支持滚动条
        content: '<iframe src="' + url + '" id="frm" name="frm" style="border-bottom: 1px solid #E5E5E5;" width="100%" height="100%" width="100%" frameborder="0"></iframe>',
        width: w,
        height: h,
        left: 0,
        top: 0,
        fixed: true,
        resize: false,
        drag: false,
        lock: true
    });
    d.showModal();
}


//iframe里面弹出对话框并自动关闭
function showTopMsg(id, msg) {
    //在iframe里面打开弹出框并自动关闭
    var d = top.dialog({
        id: id,
        title: '温馨提示',
        content: msg,
        cancel: false
    }).show();
    setTimeout(function() {
        d.close().remove();
    }, 1000);
}

//===========================================================
//弹出框封装结束


//============================================
//formtip===================================
(function($) {
    $.fn.formtip = function(message, second, option) {
//        if (second == undefined)
//            {second = 1;}
        $(".tip-yellow").remove();
        $(this).removeClass("success").addClass("error");
        $(this).poshytip({
            className: 'tip-yellow',
            content: message,
            //timeOnScreen: second * 1000, 
            showOn: 'none',
            alignTo: 'target',
            alignX: 'inner-left',
            offsetX: 0,
            offsetY: 5
        }).poshytip("show");
        //$(this).focus();//注意，要结合jquery.validate必须取消
    }
})(jQuery);

//====================================


//==================================
//显示加载中 14-09-06 By 唐有炜
//需要 <div id="progressBar" class="progressBar" style="">数据加载中，请稍等...</div>
function showLoading() {
    //$(document.body).append("<div id=\"background\" class=\"background\" style=\"display: none; \"></div> <div id=\"progressBar\" class=\"progressBar\" style=\"display: none; \">数据加载中，请稍等...</div> ");
    var ajaxbg = $("#progressBar");
    ajaxbg.show();
}

function hideLoading() {
    var ajaxbg = $("#progressBar");
    ajaxbg.hide();
}
//===================================================


//=================================
//获取bootgrid选中id(兼容LierUI自定义checkbox) 14-09-18 By 唐有炜
function get_selected_ids(grid_id) {
    var c = document.getElementById(grid_id).getElementsByTagName("input");
    var ids = "";
    var rowIds = [];
    for (var i = 0; i < c.length; i++) {
        if (c[i].type == "checkbox" && c[i].checked && c[i].value != "all" && c[i].value != "on") {
            rowIds.push(c[i].value);
        }
    }
    ids = rowIds.join(",");
    return ids;
}
///////////////////////////////////////////////////////////

//====================================
//js字符省略显示 14-09-18 By 唐有炜
function shortString(s, l, tag) {
    if (s.length > l) {
        return s.substring(0, l) + tag;
    } else {
        return s;
    }
}
//======================================