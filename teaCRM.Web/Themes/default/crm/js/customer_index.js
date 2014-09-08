//*客户JS函数
//*作者：唐有炜
//*时间：2014年08月25日

//====================================================================
//全局变量
var manager;
var manager1;
var view_auth = false;


$(document).ready(function () {
    createTree();
});


$(function() {
    //加载树形数据
    //loadTreeData();
    //加载客户、联系人、跟进信息
    InitDataGrid();
});

////加载树形数据
//function loadTreeData() {
//    //$("#filter_tree").ligerTree({ checkbox: false });
//    $("#filter_tree").ligerTree({
//        url: '/Apps/CRM/LoadData/GetFilterTreeData/',
//        ajaxType: 'get',
//        checkbox: false,
//        nodeWidth: 76
//    });
//}



//ZTree==========================================================================
//=================================================================================
//异步加载节点
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: 0
        }
    },
    async: {
        //异步加载
        enable: true,
        url: "/Apps/CRM/LoadData/AsyncGetNodes/",
        autoParam: ["id", "name", "pId"]
    },
    callback: {
        beforeExpand: function (treeId, treeNode) {
            if (!treeNode.isAjaxing) {
                return true;
            } else {
                alert("zTree 正在下载数据中，请稍后展开节点。。。");
                return false;
            }
        },
        onAsyncSuccess: function (event, treeId, treeNode, msg) {

        },
        onAsyncError: function () {
            alert(" 数据加载失败");
        },
        onClick: function (event, treeId, treeNode, clickFlag) {
            alert("你选中的节点数据："+treeNode.id+" "+treeNode.name);
        }
    }
};

function createTree() {
    $.ajax({
        url: '/Apps/CRM/LoadData/AsyncGetNodes/', //url  action是方法的名称
        data: { id: 0 },
        type: 'Get',
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
            $.fn.zTree.init($("#filter_tree"), setting, eval('(' + data + ')'));
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}
//=============================================================================================


//根据id集合获取省市信息=========================================================================
//需要引用 <script src="/Themes/default/base/js/city.js" type="text/javascript"></script>
// 2014-09-04 By 唐有炜
function get_city_by_ids(ids) {
    return "省市信息";
}

function serchpanel() {
    if ($(".az").css("display") == "none") {
        $("#grid").css("margin-top", $(".az").height() + "px");
        $("#maingrid4").ligerGetGridManager().onResize();
        $("#maingrid5").ligerGetGridManager().onResize();
    } else {
        $("#grid").css("margin-top", "0px");
        $("#maingrid4").ligerGetGridManager().onResize();
        $("#maingrid5").ligerGetGridManager().onResize();
    }
}

//
//$(document).KEYDOWN(function(e) {
//    if (e.keyCode == 13) {
//        doserch();
//        alert("aaa");
//    }
//});

function doserch() {
    //            var sendtxt = "&Action=grid&rnd=" + Math.random();
    //            var serchtxt = $("#serchform :input").fieldSerialize() + sendtxt;
    //            //alert(serchtxt);           
    //            var manager = $("#maingrid4").ligerGetGridManager();
    //
    //            manager.setURL("../../data/crm_customer.ashx?" + serchtxt);
    //            manager.loadData(true);
}

function doclear() {
    //var serchtxt = $("#serchform :input").reset();
    $("#serchform").each(function() {
        this.reset();
        $(".l-selected").removeClass("l-selected");
    });
}

var activeDialog = null;

function f_openWindow(url, title, width, height) {
    var dialogOptions = {
        width: width,
        height: height,
        title: title,
        url: url,
        buttons: [
            {
                text: '保存',
                onclick: function(item, dialog) {
                    f_save(item, dialog);
                }
            },
            {
                text: '关闭',
                onclick: function(item, dialog) {
                    dialog.close();
                }
            }
        ],
        isResize: true,
        timeParmName: 'a'
    };
    activeDialog = parent.jQuery.ligerDialog.open(dialogOptions);
}

//查看客户信息
function view() {
    //    if (view_auth) {
    //        var manager = $("#maingrid4").ligerGetGridManager();
    //        var row = manager.getSelectedRow();
    //        if (row) {
    //            parent.jQuery.ligerDialog.open({ width: 770, height: 490, title: "客户详情", url: "CRM/Customer/Customer_info.aspx?cid=" + row.id, buttons: [{ text: '关闭', onclick: function(item, dialog) { dialog.close(); } }] });
    //        } else {
    //            $.ligerDialog.warn('请选择行！');
    //        }
    //    } else {
    //        $.ligerDialog.warn('权限不够！');
    //    }

    showContentWindow("show_add", "/Apps/CRM/Index/Show/", "查看客户", 800, 480);
}

//添加客户
function add() {
    showWindow("show_add", "/Apps/CRM/Index/Add/", "新增客户", 800, 480);
}

function edit() {
    var manager = $("#maingrid4").ligerGetGridManager();
    var row = manager.getSelectedRow();
    if (row) {
        f_openWindow('CRM/Customer/Customer_add.aspx?cid=' + row.id, "修改客户", 770, 490);
    } else {
        $.ligerDialog.warn('请选择行！');
    }
}

function del() {
    to_trash();
}

//删除（放入回收站）
function to_trash() {
    var manager = $("#maingrid4").ligerGetGridManager();
    var row = manager.getSelectedRow();
    if (row) {
        //                $.ligerDialog.confirm("确定删除？", function(yes) {
        //                    if (yes) {
        //                        $.ajax({
        //                            url: "../../data/CRM_Customer.ashx",
        //                            type: "POST",
        //                            data: { Action: "AdvanceDelete", id: row.id, rnd: Math.random() },
        //                            success: function(result) {
        //                                if (result == "true") {
        //                                    f_reload();
        //                                    f_followreload();
        //                                } else if (result == "delfalse") {
        //                                    top.$.ligerDialog.error('权限不够，删除失败！');
        //                                } else if (result == "false") {
        //                                    top.$.ligerDialog.error('未知错误，删除失败！');
        //                                } else {
        //                                    top.$.ligerDialog.warn('此客户下含有 ' + result + '，删除失败！请先先将这些数据放入回收站。');
        //                                }
        //
        //                            },
        //                            error: function() {
        //                                top.$.ligerDialog.error('删除失败！');
        //                            }
        //                   });
        //                    }
        //                });
        //showDialog(row.id);
        showDialog("确认删除吗？（超级管理员可在回收站恢复）", function() {


            $.ajax({
                url: "/Apps/CRM/LoadData/ToTrash/",
                cache: false,
                type: "POST",
                data: { cus_id: row.id, rnd: Math.random() },
                success: function(result) {
                    var status = result.Status;
                    if (status == true || status == "true" || status == "True") {
                        showMsg("删除成功！","Success");
                        f_reload();
                    } else {
                        showMsg("删除失败！","Error");
                    }
                },
                error: function() {
                    showMsg("操作失败！", "Error");
                }
            });
        });


    } else {
        //$.ligerDialog.warn("请选择客户");
        showMsg("请选择客户！");
    }


}

//放入公海
function to_pub() {
    var manager = $("#maingrid4").ligerGetGridManager();
    var row = manager.getSelectedRow();
    if (row) {
        showDialog("确认放入公海吗？", function() {
            $.ajax({
                url: "/Apps/CRM/LoadData/ToPub/",
                cache: false,
                type: "POST",
                data: { cus_id: row.id, rnd: Math.random() },
                success: function(result) {
                    var status = result.Status;
                    if (status == true || status == "true" || status == "True") {
                        showMsg("放入公海成功！");
                        f_reload();
                    } else {
                        showMsg("放入公海失败！");
                    }
                },
                error: function() {
                    showMsg("操作失败！");
                }
            });
        });
    } else {
        showMsg("请选择客户！");
    }
}

function f_save(item, dialog) {
    var issave = dialog.frame.f_save();
    if (issave) {
        dialog.close();
        top.$.ligerDialog.waitting('数据保存中,请稍候...');
        $.ajax({
            url: "../../data/CRM_Customer.ashx",
            type: "POST",
            data: issave,
            success: function(result) {
                top.$.ligerDialog.closeWaitting();
                f_reload();
            },
            error: function() {
                top.$.ligerDialog.closeWaitting();
                top.$.ligerDialog.error('操作失败！');
            }
        });

    }
}

function f_reload() {
    var manager = $("#maingrid4").ligerGetGridManager();
    manager.loadData(true);
};

//follow
function follow_openWindow(url, title, width, height) {
    var dialogOptions = {
        width: width,
        height: height,
        title: title,
        url: url,
        buttons: [
            {
                text: '保存',
                onclick: function(item, dialog) {
                    f_savefollow(item, dialog);
                }
            },
            {
                text: '关闭',
                onclick: function(item, dialog) {
                    dialog.close();
                }
            }
        ],
        isResize: true,
        timeParmName: 'b'
    };
    activeDialog1 = top.jQuery.ligerDialog.open(dialogOptions);
}

//        function addfollow() {
//            var manager = $("#maingrid4").ligerGetGridManager();
//            var row = manager.getSelectedRow();
//            if (row) {
//                follow_openWindow("CRM/Customer/Customer_follow_add.aspx?cid=" + row.id, "新增跟进", 530, 400);
//            } else {
//                $.ligerDialog.warn('请选择客户！');
//            }
//        }
//
//        function editfollow() {
//            var manager = $("#maingrid5").ligerGetGridManager();
//            var row = manager.getSelectedRow();
//            if (row) {
//                follow_openWindow('CRM/Customer/Customer_follow_add.aspx?fid=' + row.id + "&cid=" + row.Customer_id, "修改跟进", 530, 400);
//            } else {
//                $.ligerDialog.warn('请选择跟进！');
//            }
//        }
//
//        function delfollow() {
//            var manager = $("#maingrid5").ligerGetGridManager();
//            var row = manager.getSelectedRow();
//            if (row) {
//                $.ligerDialog.confirm("确定删除？", function(yes) {
//                    if (yes) {
//                        $.ajax({
//                            url: "../../data/CRM_Follow.ashx",
//                            type: "POST",
//                            data: { Action: "AdvanceDelete", id: row.id, rnd: Math.random() },
//                            success: function(result) {
//                                if (result == "true") {
//                                    f_followreload();
//                                    f_reload();
//                                } else {
//                                    top.$.ligerDialog.error('删除失败！');
//                                }
//
//                            },
//                            error: function() {
//                                top.$.ligerDialog.error('删除失败！');
//                            }
//                        });
//                    }
//                });
//            } else {
//                $.ligerDialog.warn("请选择跟进");
//            }
//        }
//
//        function f_savefollow(item, dialog) {
//            var issave = dialog.frame.f_save();
//            if (issave) {
//                dialog.close();
//                $.ligerDialog.waitting('数据保存中,请稍候...');
//                $.ajax({
//                    url: "../../data/CRM_Follow.ashx",
//                    type: "POST",
//                    data: issave,
//                    success: function(result) {
//                        $.ligerDialog.closeWaitting();
//                        f_followreload();
//                        f_reload();
//                    },
//                    error: function() {
//                        $.ligerDialog.closeWaitting();
//                        $.ligerDialog.error('操作失败！');
//                    }
//                });
//
//            }
//        }
//
//        function f_followreload() {
//            var manager = $("#maingrid5").ligerGetGridManager();
//            manager.loadData(true);
//        };