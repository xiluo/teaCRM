//*客户JS函数
//*作者：唐有炜
//*时间：2014年08月25日

$(function() {
    //加载树形数据
    loadTreeData();
//    //初始化事件
//    initEvents();
});

////初始化事件
//function initEvents() {  
//}

//加载树形数据
function loadTreeData() {
    //$("#filter_tree").ligerTree({ checkbox: false });
    $("#filter_tree").ligerTree({ url: '/Apps/CRM/LoadData/GetFilterTreeData/', ajaxType: 'get', checkbox: false });
}

//添加客户
function show_add() {
    var d = dialog({
        id: 'show_add',
        title: '添加客户',
        //url: '/Apps/CRM/Index/Add/',
        content: '<iframe src="/Apps/CRM/Index/Add/" id="test" name="test" height="400" width="600" frameborder="0"></iframe>',
        //width: '670',
        //height: '480',
        left: 0,
        top: 0,
        fixed: true,
        resize: false,
        drag: false,
        lock: true,
    });
    d.showModal();
}

////////////////////////////////////////////////////////////////////////////////
// /Apps/CRM/Index/Add/页面调用
//添加客户提交
function save_add() {
    var data = $("#form_customer").serialize();
    //alert(data);
    //提交数据
    var url = "/Apps/CRM/Index/Add/";
    $.post(url, data, function(result, status) {
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
        onshow: function() {
            setTimeout(function() {
                top.dialog.list['save_add'].close().remove();
            }, 2000);
        },
        cancel: false
    }).show();
}
///////////////////////////////////////////////////////////////////////////////