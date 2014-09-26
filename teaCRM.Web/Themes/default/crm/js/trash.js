//*客户JS函数
//*作者：唐有炜
//*时间：2014年09月24日


var trash_grid;
$(function () {
    InitGrid();
    $("#muti-del").on("click", (function () {
        var ids = get_selected_ids("trash-grid-data");
        //console.log(ids);
        if (ids == '') {
            showMsg("请先选择应用在卸载！");
            return;
        }
        //alert(ids);
        del(ids);
    }));
});

function InitGrid() {

    /// <summary>
    /// Initializes the trash_grid.
    /// </summary>
    trash_grid = $("#trash-grid-data").bootgrid({
        ajax: true,
        post: function () {
            /* To accumulate custom parameter with the request object */
            return {
                compNum: $("#CompNum").val()
            };
        },
        url: "/api/crm/customer/getAllCustomers/",
        selection: true,
        multiSelect: true,
        rowSelect: true,
        keepSelection: true,
        rowCount: [10, 30, 50],
        templates: {
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><div class=\"btn-group\" style=\"float:left;\"><button class=\"btn btn-default tip\" title=\"批量还原客户\" onclick=\" add_contact(" + $("#cus_id").val() + ") \"><span class=\"glyphicon glyphicon-share-alt\"></span>还原</button><button id=\"muti-del\" class=\"btn btn-default tip\" title=\"批量彻底删除客户\" ><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>彻底删除</button></div>" +
                "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>"
                + "<p class=\"{{css.actions}}\"></p></div></div></div>"
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
            "con_is_main": function (column, row) {
                if (!row.con_is_main) {
                    return "否";
                } else {
                    return "是";
                }
            },
            "commands": function (column, row) {
                return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"edit_contact(0," + row.id + ");\" title=\"还原客户【" + row.con_name + "】\"><span class=\"glyphicon glyphicon-share-alt\"></span></button>" +
                    "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"del(" + row.id + ")\" title=\"彻底删除客户【" + row.con_name + "】\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
            }
        }
    }).on("loaded.rs.jquery.bootgrid", function (e) {
        //按钮提示
        $('.tip').tooltip();
        //按钮气泡
        $('.pop').popover({ html: true, trigger: "hover" });
        //showMsg("字段加载成功！", "Success");
    });
}


/**
*还原客户
*如果客户customer_id为空直接还原客户，不为空，则还原当前客户对应的客户
*@author terwer
*@version 1.0 2014/09/24 
*@param customer_id 客户id（可为空） 
*@return 无返回值
*/
function add_contact(customer_id) {
    //关闭客户详情窗口
    //parent.dialog.list["show_view"].close();
    //设置当前窗口id，便于后续管理
    var win_id = "show_add_contact";
    //设置不同请求的url
    var show_url = "/Apps/CRM/Contact/Add";
    if (customer_id != undefined) {
        show_url += "?cus_id=" + customer_id;
    }
    showTopWindow(win_id, show_url, "还原客户", 800, 360, function () {
        //调用iframe方法验证表单
        var flag = window.top.document.getElementById("frm_" + win_id).contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //获取iframe表单序列化之后的数据
        var form_contact = $(window.top.frames["frm_" + win_id].document).find("#form_contact");
        var data = $(form_contact).serialize();

        var url = "/api/crm/contact/addContact/";
        //console.log(data);
        //console.log(url);
        //return false;
        //提交数据
        $.ajax({
            type: "post",
            cache: false,
            url: url,
            data: data,
            dataType: "json",
            beforeSend: function () {
                showMsg("还原中，请稍后...", "Success");
            },
            success: function (result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //在iframe里面打开弹出框并自动关闭
                    showMsg(result.Msg, "Success");
                    //刷新数据
                    trash_grid.bootgrid("reload");
                } else {
                    showMsg(result.Msg, "Error");
                }
            },
            error: function () {
                showMsg("系统异常！");
            }
        });

    });
}


/**
*修改客户
*如果客户customer_id为空直接修改客户，不为空，则修改当前客户对应的客户
*@author terwer
*@version 1.0 2014/09/24 
*@param customer_id 客户id（可为空） 
*@return 无返回值
*/
function edit_contact(customer_id, contact_id) {
    //关闭客户详情窗口
    //parent.dialog.list["show_view"].close();
    //设置当前窗口id，便于后续管理
    var win_id = "show_edit_contact";
    //设置不同请求的url
    var show_url = "/Apps/CRM/Contact/Edit/" + contact_id;
    showTopWindow(win_id, show_url, "修改客户", 800, 360, function () {
        //调用iframe方法验证表单
        var flag = window.top.document.getElementById("frm_" + win_id).contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        //获取iframe表单序列化之后的数据
        var form_contact = $(window.top.frames["frm_" + win_id].document).find("#form_contact");
        var data = $(form_contact).serialize();

        var url = "/api/crm/contact/editContact/";
        //console.log(data);
        //console.log(url);
        //return false;
        //提交数据
        $.ajax({
            type: "post",
            cache: false,
            url: url,
            data: data,
            dataType: "json",
            beforeSend: function () {
                showMsg("修改中，请稍后...", "Success");
            },
            success: function (result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //在iframe里面打开弹出框并自动关闭
                    showMsg(result.Msg, "Success");
                    //刷新数据
                    trash_grid.bootgrid("reload");
                } else {
                    showMsg(result.Msg, "Error");
                }
            },
            error: function () {
                showMsg("系统异常！");
            }
        });

    });
}

//删除（放入回收站）
function del(ids) {

    var del_tips = "确认删除该客户吗？";
    try {
        if (ids.toString().indexOf(",") > 0) {
            var del_tips = "确认批量删除选中客户吗？";
        }
    } catch (e) {
        //console.warn(e.message);
    }
    showDialog(del_tips, function () {
        $.ajax({
            url: "/api/crm/contact/toTrash",
            cache: false,
            type: "get",
            data: { ids: ids, rnd: Math.random() },
            success: function (result) {
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    showMsg("删除成功！", "Success");
                    trash_grid.bootgrid("reload");
                } else {
                    showMsg("删除失败！", "Error");
                }
            },
            error: function () {
                showMsg("操作失败！", "Error");
            }
        });
    });


}