//*客户展示页面JS函数
//*作者：唐有炜
//*时间：2014年09月01日
//联系人列表
var grid;

$(function() {
    var cus_id = $("#cus_id").val();
    //load_main_contact(cus_id);
    //初始化联系人列表
    InitGrid(cus_id);
});


function load_main_contact(cus_id) {
    ///Apps/CRM/LoadData/GetContactList/?cus_id=44
    //alert(cus_id);
//    $.ajax({
//        type: "post",
//        cache: false,
//        url: "/Apps/CRM/LoadData/GetContactList/?cus_id=" + cus_id,
//        //data: data,
//        dataType: "json",
//        beforeSend: function() {
//            //showMsg("添加中，请稍后...");
//        },
//        complete: function() {
//            //d.close().remove();
//        },
//        success: function(result) {
//            //var json_data = eval("(" + result + ")");
//            //console.log(result);
//            //alert(result);
//            var con = result.Rows[0];
//            $("#main-contact").append("<li><b>主联系人：</b>" + con.con_name + "</li>");
//            $("#main-contact").append("<li><b>联系邮箱：</b>" + con.con_email + "</li>");
//            $("#main-contact").append("<li><b>联系 Q Q：</b>" + con.con_qq + "</li>");
//            $("#main-contact").append("<li><b>联系手机：</b>" + con.con_tel + "</li>");
//            $("#main-contact").append("<li><b>生日：</b>" + con.con_bir + "</li>");
//            $("#main-contact").append("<li><b>备注：</b>" + con.con_note + "</li>");
//        },
//        error: function() {
//            showMsg("网络连接错误");
//        }
//    });
}


function InitGrid(cus_id) {

    grid = $("#grid-data").bootgrid({
        ajax: true,
        post: function() {
            /* To accumulate custom parameter with the request object */
            return {
                compNum: $("#CompNum").val()
            };
        },
        url: "/Apps/CRM/LoadData/GetBootContactList/?cus_id=" + cus_id,
        selection: true,
        multiSelect: true,
        rowSelect: true,
        keepSelection: true,
        rowCount: [10, 30, 50],
        templates: {
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><div class=\"btn-group\" style=\"float:left;\"><button class=\"btn btn-default tip\" title=\"添加联系人\" onclick=\" add(); \"><span class=\"glyphicon glyphicon-plus\"></span>添加</button><button class=\"btn btn-default tip\" title=\"删除联系人\" onclick=\" del(); \"><span class=\"glyphicon glyphicon glyphicon glyphicon-trash\"></span>批量删除</button></div>" +
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
        "con_is_main":function(column, row) {
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