//*平台公用函数
//*作者：唐有炜
//*时间：2014年08月23日

////测试
//$(function() {
//    showMsg("aaa");
//});

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

//弹出框封装结束开始
//需要引用
//<script src="/Themes/default/js/artDialog/lib/jquery-1.10.2.js"></script>
//<link rel="stylesheet" href="/Themes/default/js/artDialog/css/ui-dialog.css">
//<script src="/Themes/default/js/artDialog/dist/dialog-plus-min.js"></script>
//修正margin:10px 10px -10px 10px
function showMsg(Msg, okCallback) {
    if (arguments.length == 1) {
        var d = dialog({
            title: '温馨提示',
            content: Msg,
            quickClose: true,
            cancel: false
        }).show();
        //自动关闭
        setTimeout(function() {
            d.close().remove();
        }, 1000);
    } else if (arguments.length == 2) {
        var d = dialog({
            title: '温馨提示',
            content: Msg,
            okValue: '确 定',
            ok: okCallback,
            cancelValue: '取消',
            quickClose: true,
            cancel: false
        }).show();
        //自动关闭
        setTimeout(function() {
            d.close().remove();
        }, 1000);
    }
}

function showMsgModal(Msg, okCallback) {
    if (arguments.length == 1) {
        var d = dialog({
            title: '温馨提示',
            content: Msg,
            quickClose: true,
            cancel: false
        }).showModal();
        //自动关闭
        setTimeout(function() {
            d.close().remove();
        }, 1000);
    } else if (arguments.length == 2) {
        var d = dialog({
            title: '温馨提示',
            content: Msg,
            okValue: '确 定',
            ok: okCallback,
            cancelValue: '取消',
            quickClose: true,
            cancel: false
        }).showModal();
        //自动关闭
        setTimeout(function() {
            d.close().remove();
        }, 1000);
    }
}

function showDialog(Msg, okCallback) {
    if (arguments.length == 1) {
        var d = dialog({
            title: '温馨提示',
            content: Msg,
            quickClose: true,
            cancel: function() {
                d.close().remove();
            }
        }).show();
    } else if (arguments.length == 2) {
        var d = dialog({
            title: '温馨提示',
            content: Msg,
            okValue: '确 定',
            ok: okCallback,
            cancelValue: '取消',
            quickClose: true,
            cancel: function() {
                d.close().remove();
            }
        }).show();
    }
}

function showDialogModal(Msg, okCallback) {
    if (arguments.length == 1) {
        var d = dialog({
            title: '温馨提示',
            content: Msg,
            quickClose: true,
            cancel: function() {
                d.close().remove();
            }
        }).showModal();

    } else if (arguments.length == 2) {
        var d = dialog({
            title: '温馨提示',
            content: Msg,
            okValue: '确 定',
            ok: okCallback,
            cancelValue: '取消',
            quickClose: true,
            cancel: function() {
                d.close().remove();
            }
        }).showModal();

    }
}


//============================================================================
//弹出iframe窗口，用作表单===============================================
//2014-09-03 By 唐有炜
function showWindow(id, url, title, w, h) {
    var d = dialog({
        id: id,
        title: '添加客户',
        //url: url,//此方式不支持滚动条
        content: '<iframe src="' + url + '" id="frm" name="frm" height="100%" style="border-bottom: 1px solid #E5E5E5;" width="100%" height="100%" width="100%" frameborder="0"></iframe>',
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
function showTopMsg(id, Msg) {
    //在iframe里面打开弹出框并自动关闭
    var d = top.dialog({
        id: id,
        title: '温馨提示',
        content: Msg,
        cancel: false
    }).show();
    setTimeout(function() {
        d.close().remove();
    }, 1000);
}

function showTopModal(id, Msg) {
    //在iframe里面打开弹出框并自动关闭
    var d = top.dialog({
        id: id,
        title: '温馨提示',
        content: Msg,
        cancel: false
    }).showModal();
    setTimeout(function() {
        d.close().remove();
    }, 2000);
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