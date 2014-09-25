//*联系人JS函数
//*作者：唐有炜
//*时间：2014年09月24日


var grid;
$(function() {
    InitGrid();
    $("#muti-del").on("click", (function () {
        var ids = get_selected_ids("grid-data");
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
    /// Initializes the grid.
    /// </summary>
    grid = $("#grid-data").bootgrid({
        ajax: true,
        post: function() {
            /* To accumulate custom parameter with the request object */
            return {
                compNum: $("#CompNum").val(),
                cus_id: $("#cus_id").val()
            };
        },
        url: "/api/crm/contact/GetAllContacts",
        selection: true,
        multiSelect: true,
        rowSelect: true,
        keepSelection: true,
        rowCount: [10, 30, 50],
        templates: {
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><div class=\"btn-group\" style=\"float:left;\"><button class=\"btn btn-default tip\" title=\"添加联系人\" onclick=\" add(); \"><span class=\"glyphicon glyphicon-plus\"></span>添加</button><button id=\"muti-del\" class=\"btn btn-default tip\" title=\"删除联系人\" ><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量删除</button></div>" +
                "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                "<p class=\"{{css.actions}}\"></p></div></div></div>"
        },
        labels: {
            all: "all", //checkbox全选的值
            search: "请输入联系人名称",
            loading: "加载中...",
            noResults: "对不起，暂无符合条件的记录！",
            refresh: "刷新",
            infos: "从{{ctx.start}} 到 {{ctx.end}}，共{{ctx.total}} 条记录"
        },
        formatters: {
            "con_is_main": function(column, row) {
                if (!row.con_is_main) {
                    return "否";
                } else {
                    return "是";
                }
            },
            "commands": function(column, row) {
                return "<button type=\"button\"  class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"edit(" + row.id + ");\" title=\"修改联系人【" + row.con_name + "】\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" +
                    "<button type=\"button\" class=\"btn btn-link btn-sm btn-cmd tip\" onclick=\"del(" + row.id + ")\" title=\"删除联系人【" + row.con_name + "】\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
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



/**
*添加联系人
*如果客户id为空直接添加联系人，不为空，则添加当前客户对应的联系人
*@author terwer
*@version 1.0 2014/09/24 
*@param customer_id 客户id（可为空） 
*@return 无返回值
*/
function add(customer_id) {
     top.dialog.list["show"]
     showWindow("show_add_contact", "/Apps/CRM/Contact/Add/", "添加联系人", 800, 360, function () {
         var form_contact = $(window.frames["frm_show_add_contact"].document).find("#form_contact");
         var flag = document.getElementById("frm_show_add_contact").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        var data = $(form_contact).serialize();
        console.log(data);
         return false;
        //提交数据
        var url = "/Apps/CRM/Index/Add/";
        $.ajax({
            type: "post",
            cache: false,
            url: url,
            data: data,
            dataType: "json",
            beforeSend: function() {
                //showMsg("添加中，请稍后...");
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
                    customer_grid_reload();
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


function edit(contact_id) {
    showWindow("show_add", "/Apps/CRM/Contact/Edit/" + contact_id, "修改联系人", 800, 360, function () {
        var form_customer = $(window.frames["frm_show_add"].document).find("#form_customer");
        //var data = $(form_customer).serialize();
        //alert(data);
        //表单验证
        //validate_form();
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        var data = $(form_customer).serialize();
        //console.log(data);
        //提交数据
        var url = "/Apps/CRM/Index/Add/";
        $.ajax({
            type: "post",
            cache: false,
            url: url,
            data: data,
            dataType: "json",
            beforeSend: function() {
                //showMsg("添加中，请稍后...");
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
                    customer_grid_reload();
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


//删除（放入回收站）
function del(ids) {

 var del_tips = "确认卸载该应用吗？";
    try {
        if (ids.toString().indexOf(",") > 0) {
            var del_tips = "确认批量卸载选中应用吗？";
        }
    } catch (e) {
        //console.warn(e.message);
    }
        showDialog(del_tips, function() {
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