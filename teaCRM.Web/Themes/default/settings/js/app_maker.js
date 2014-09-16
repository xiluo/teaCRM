//*应用定制js
//*作者：唐有炜
//*时间：2014年07月231日
//全局变量
var grid;

$(document).ready(function() {
});

$(function() {
    InitGrid();
});


function InitGrid() {

    grid = $("#grid-data").bootgrid({
        ajax: true,
        post: function() {
            /* To accumulate custom parameter with the request object */
            return {
                compNum: $("#CompNum").val()
            };
        },
        url: "/api/settings/appMaker/getAllApps",
        selection: true,
        multiSelect: true,
        rowSelect: true,
        keepSelection: true,
        rowCount: [10, 30, 50],
        templates: {
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><div class=\"btn-group\" style=\"float:left;\"><button class=\"btn  btn-primary\" title=\"去应用市场添加应用\" onclick=\" refresh('/Apps/'); \">去应用市场添加应用</button><button class=\"btn  btn-primary\" title=\"批量卸载\" onclick=\" del(); \">批量卸载</button></div>" +
                "<div class=\"search form-group\"><div class=\"input-group\"><span class=\"icon glyphicon input-group-addon glyphicon-search\"></span> <input type=\"text\" class=\"search-field form-control\" placeholder=\"输入关键字\"></div></div>" +
                "<p class=\"{{css.actions}}\"></p></div></div></div>"
        },
        formatters: {
            "UserEnable": function(column, row) {
                if (row.RoleIsSys == 0) {
                    return "禁用";
                } else {
                    return "启用";
                }

            },
            "commands": function(column, row) {
                return "<a href='/Apps/Settings/AppMaker/Detail/" + row.Id + "'>管理</a>  " +
                    "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" onclick=del(" + row.Id + ")><span class=\"fa fa-trash-o\"></span>卸载</button>";
            }
        }
    });
}


function del(ids) {
    console.log(ids);
    var del_tips = "确认卸载该应用吗？";
    if (del_tips.indexOf(',') > 0) {
        var del_tips = "确认卸载选中应用吗？";
    }
    showDialog(del_tips, function() {
        showMsg("卸载成功！", "Success");
    });
}