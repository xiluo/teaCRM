//*客户JS函数
//*作者：唐有炜
//*时间：2014年08月25日
//*最后修改 2014-09-28

//====================================================================
//全局变量==============================================================
//客户表格
var grid_customer;
//筛选树
var filter_tree;
//公司编号
var compNum;
//当前模块id
var myappId;

$(document).ready(function() {
    //初始化全局变量
    compNum = $("#CompNum").val();
    myappId = $("#myappId").val();

    //初始化筛选条件
    init_single_filter_tree();
    //加载客户
    init_customer_grid();


});

$(function() {
    //首次打开页面时对左侧分类进行高度设定
    $(".layout-left").height($(window).height() -82);
    //按钮提示
    $('.tip').tooltip();
    //按钮气泡
    $('.pop').popover({ html: true, trigger: "hover" });
});

//ZTree==========================================================================
//加载单选树
function init_single_filter_tree() {
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
            url: "/api/crm/customer/asyncGetNodes/",
            autoParam: ["id", "name", "pId", "compNum", "myappId", "click"]
        },
        callback: {
            beforeExpand: function(treeId, treeNode) {
                if (!treeNode.isAjaxing) {
                    return true;
                } else {
                    //showMsg("zTree 正在下载数据中，请稍后展开节点。。。");
                    return false;
                }
            },
            onAsyncSuccess: function(event, treeId, treeNode, msg) {


            },
            onAsyncError: function() {
                //showMsg(" 数据加载失败");
            },
            beforeClick: function(treeId, treeNode, clickFlag) {
                return (treeNode.click != false);
            },
            onClick: function(event, treeId, treeNode, clickFlag) {
                //console.log(treeNode);
                //var seatch_url = "/Apps/CRM/LoadData/GetCustomerLsit/?" + treeNode.content + "&rnd=" + Math.random();
                //do_search(seatch_url);
                showMsg("你选中的节点数据：" + treeNode.id + " " + treeNode.name, "Success");
            }
        }
    };
    $.ajax({
        url: '/api/crm/customer/asyncGetNodes/', //url  action是方法的名称
        data: { compNum: compNum, myappId: myappId, id: 0, click: true },
        type: 'post',
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function(data) {
            $.fn.zTree.init($("#filter_tree"), setting, eval('(' + data + ')'));
            //展开一级
            var json_data = eval('(' + data + ')');
            for (var index in json_data) {
                var tnode = json_data[index];
                //console.log(tnode);
                filter_tree = $.fn.zTree.getZTreeObj("filter_tree");
                var node = filter_tree.getNodeByParam("id", tnode.id, null);
                filter_tree.expandNode(node, true, true, true);
            }
        },
        error: function(e) {
            showMsg(" 数据加载失败！");
        }
    });
}

//加载复选树
function init_multi_filter_tree() {
    var setting1 = {
        check: {
            enable: true
        },
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
            url: "/api/crm/customer/asyncGetNodes/",
            autoParam: ["id", "name", "pId", "compNum", "myappId", "click"]
        },
        callback: {
            beforeExpand: function(treeId, treeNode) {
                if (!treeNode.isAjaxing) {
                    return true;
                } else {
                    //showMsg("zTree 正在下载数据中，请稍后展开节点。。。");
                    return false;
                }
            },
            onAsyncSuccess: function(event, treeId, treeNode, msg) {


            },
            onAsyncError: function() {
                //showMsg(" 数据加载失败");
            },
            beforeClick: function(treeId, treeNode, clickFlag) {
                return (treeNode.click != false);
            }
//            ,
//            onCheck: function (e, treeId, treeNode) {
//                showMsg("你选中的节点数据：" + treeNode.id + " " + treeNode.name, "Success");
//		}	

        }
    };
    $.ajax({
        url: '/api/crm/customer/asyncGetNodes/', //url  action是方法的名称
        data: { compNum: compNum, myappId: myappId, id: 0, click: false },
        type: 'post',
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function(data) {
            $.fn.zTree.init($("#filter_tree"), setting1, eval('(' + data + ')'));
            //展开一级
            var json_data = eval('(' + data + ')');
            for (var index in json_data) {
                var tnode = json_data[index];
                //console.log(tnode);
                filter_tree = $.fn.zTree.getZTreeObj("filter_tree");
                var node = filter_tree.getNodeByParam("id", tnode.id, null);
                filter_tree.expandNode(node, true, true, true);
            }
        },
        error: function(msg) {
            showMsg(" 数据加载失败！" + msg);
        }
    });
}


//复选
function ckeckAll() {
    $("#mselect").hide();
    $("#sselect").show();
    $("#btn-filter").show();
    init_multi_filter_tree();
}

//单选
function unckeckAll() {
    $("#sselect").hide();
    $("#mselect").show();
    $("#btn-filter").hide();
    init_single_filter_tree();
}

//筛选客户信息
function filter_now() {
    var nodes = filter_tree.getCheckedNodes(true);
    //console.log(nodes);
    var ids = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        ids.push(node.id);
    }
    var cids = ids.join(",");
    showMsg("筛选" + cids, "Success");
}


//=============================================================================================

//加载客户列表
function init_customer_grid() {
    grid_customer = $("#grid-customer").bootgrid({
        ajax: true,
        post: function() {
            /* To accumulate custom parameter with the request object */
            return {
                compNum: $("#CompNum").val()
            };
        },
        url: "/api/crm/customer/getAllCustomers",
        selection: true,
        multiSelect: true,
        rowSelect: false,
        keepSelection: true,
        rowCount: [10, 30, 50],
        navigation: 3,
        templates: {
            header: $("#customer-toolbar").html()
        },
        labels: {
            all: "all", //checkbox全选的值
            search: "请输入客户名称",
            loading: "加载中...",
            noResults: "对不起，暂无符合条件的记录！",
            refresh: "刷新",
            infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
        },
        formatters: {
            "CusName": function(column, row) {
                return "<a href=\"javascript:;\" onclick=\"view(" + row.Id + ");\" >" + row.CusName + "</a>";
            },
            "commands": function(column, row) {
                return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"edit(" + row.Id + ");\" title=\"修改【" + row.CusName + "】客户\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                    "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"del(" + row.Id + ");\" title=\"删除【" + row.CusName + "】客户\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
            }
        }
    }).on("loaded.rs.jquery.bootgrid", function(e) {
        //按钮提示
        $('.tip').tooltip();
        //按钮气泡
        $('.pop').popover({ html: true, trigger: "hover" });
        //showMsg("字段加载成功！", "Success");
    });
}


//查看客户信息
function view(id) {
    showContentWindow("show_view", "/Apps/CRM/Customer/Show/" + id, "查看客户", 800, 480);
}


//高级搜索
function high_search() {
    showDialog("高级搜索", function() {});
}

//添加客户
function add() {
    showWindow("show_add", "/Apps/CRM/Customer/Add/", "新增客户", 800, 360, function() {
        var form_customer = $(window.frames["frm_show_add"].document).find("#form_customer");
        //var data = $(form_customer).serialize();
        //showMsg(data);
        //表单验证
        //validate_form();
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        var data = $(form_customer).serialize();
        //console.log(data);
        //提交数据
        var url = "/api/crm/customer/addCustomer";
        $.ajax({
            type: "post",
            cache: false,
            url: url,
            data: data,
            dataType: "json",
            beforeSend: function() {
                showMsg("添加中，请稍后...","Success");
            },
            complete: function() {
                //d.close().remove();
            },
            success: function(result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //在iframe里面打开弹出框并自动关闭
                    showMsg(result.Msg, "Success");
                    //刷新数据
                    grid_customer.bootgrid("reload");
                } else {
                    showMsg("系统异常！", "Error");
                }
            },
            error: function() {
                showMsg("网络连接错误");
            }
        });

    });
}


function edit(id) {
    showWindow("show_edit", "/Apps/CRM/Customer/Edit/" + id, "修改客户", 800, 480, function () {
        var form_customer = $(window.frames["frm_show_edit"].document).find("#form_customer");
        //var data = $(form_customer).serialize();
        //showMsg(data);
        //表单验证
        //validate_form();
        var flag = document.getElementById("frm_show_edit").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        var data = $(form_customer).serialize();
        //console.log(data);
        // return 
        //提交数据
        $.ajax({
            type: "post",
            cache: false,
            url: "/api/crm/customer/editCustomer",
            data: data,
            dataType: "json",
            beforeSend: function() {
                showMsg("修改中，请稍后...","Success");
            },
            complete: function() {
                //d.close().remove();
            },
            success: function(result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    showMsg(result.Msg, "Success");
                    //刷新数据
                    grid_customer.bootgrid("reload");
                } else {
                    showMsg("系统异常，客户修改失败！", "Error");
                }
            },
            error: function() {
                showMsg("网络连接错误");
            }
        });

    });

}

function del() {
    to_trash();
}


//删除（放入回收站）
function to_trash() {

    var ids = get_selected_ids("maingrid4");
    //showMsg(ids);

    if (ids == "") { //未选中复选框，启动右键菜单

        showMsg("请选择客户！");

    } else {
        showDialog("确认批量删除选中客户吗？（超级管理员可在回收站恢复）", function() {
            $.ajax({
                url: "/Apps/CRM/LoadData/ToTrash/",
                cache: false,
                type: "POST",
                data: { cus_ids: ids, rnd: Math.random() },
                success: function(result) {
                    var status = result.Status;
                    if (status == true || status == "true" || status == "True") {
                        showMsg("删除成功！", "Success");
                        customer_grid_reload();
                    } else {
                        showMsg("删除失败！", "Error");
                    }
                },
                error: function() {
                    showMsg("操作失败！", "Error");
                }
            });
        });

    }

}


//放入公海
function to_pub() {
    var ids = get_selected_ids("maingrid4");
    //showMsg(ids);

    if (ids == "") { //未选中复选框，启动右键菜单
        showMsg("请选择客户！");
    } else {
        showDialog("确认将选中客户批量放入公海吗？", function() {
            $.ajax({
                url: "/Apps/CRM/LoadData/ToPub/",
                cache: false,
                type: "POST",
                data: { cus_ids: ids, rnd: Math.random() },
                success: function(result) {
                    var status = result.Status;
                    if (status == true || status == "true" || status == "True") {
                        showMsg("放入公海成功！", "Success");
                        f_reload();
                    } else {
                        showMsg("放入公海失败！", "Error");
                    }
                },
                error: function() {
                    showMsg("操作失败！", "Error");
                }
            });
        });
    }
}

//转移
function transfer() {
    showMsg("转移客户！", "Success");
}