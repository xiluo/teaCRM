////////////////////////////////////////////////////////////////////////////////
// /Apps/CRM/Index/Add/页面调用
//添加客户提交
function save_add() {
    var data = $("#form_customer").serialize();
    //alert(data);
    //提交数据
    var url = "/Apps/CRM/Index/Add/";
    $.post(url, data, function (result, status) {
        if (status == "success" && result.Status) {
            //关闭父窗口
            parent.dialog.list['show_add'].close();
            //在iframe里面打开弹出框并自动关闭
            showTopMsg("show_add", result.Msg);
            //刷新数据
            window.parent.f_reload();
        } else {
            parent.dialog.list['show_add'].close();
            showTopMsg("show_add", "系统异常！");
        }
    });
}

//添加客户提交
function cancel_add() {
    parent.dialog.list['show_add'].close();
    top.dialog({
        id: "save_add",
        title: '温馨提示',
        content: "您取消了添加！",
        onshow: function () {
            setTimeout(function () {
                top.dialog.list['save_add'].close().remove();
            }, 2000);
        },
        cancel: false
    }).show();
}
///////////////////////////////////////////////////////////////////////////////