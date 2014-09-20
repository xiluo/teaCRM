//*组织架构js
//*作者：唐有炜
//*时间：2014年07月231日
//全局变量
var zTree, rMenu;
$(document).ready(function() {
    //创建树形
    createTree("department_tree");
    rMenu = $("#rMenu");
});

$(function() {
});


//ZTree==========================================================================
//=================================================================================
function createTree(treeId) {
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
            url: "/Apps/Settings/Department/AsyncGetNodes/",
            autoParam: ["id", "name", "pId"]
        },
        callback: {
            beforeExpand: function(treeId, treeNode) {
                if (!treeNode.isAjaxing) {
                    return true;
                } else {
                    //alert("zTree 正在下载数据中，请稍后展开节点。。。");
                    return false;
                }
            },
            onAsyncSuccess: function(event, treeId, treeNode, msg) {
                //alert(treeNode);
            },
            onAsyncError: function() {
                //alert(" 数据加载失败");
            },
            onClick: function(event, treeId, treeNode, clickFlag) {
                //alert(treeNode.id);
                load_form_data(treeNode.id);
            },
            onRightClick: function(event, treeId, treeNode) {
                if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
                    zTree.cancelSelectedNode();
                    showRMenu("root", event.clientX, event.clientY);
                } else if (treeNode && !treeNode.noR) {
                    zTree.selectNode(treeNode);
                    showRMenu("node", event.clientX, event.clientY);
                }
            }
        }
    };

    $.ajax({
        url: '/Apps/Settings/Department/AsyncGetNodes/', //url  action是方法的名称
        data: { id: 0 },
        type: 'post',
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function(data) {
            $.fn.zTree.init($("#" + treeId), setting, eval('(' + data + ')'));
            zTree = $.fn.zTree.getZTreeObj(treeId);
            //展开一级
            var json_data = eval('(' + data + ')');
            for (var index in json_data) {
                var tnode = json_data[index];
                //console.log(tnode);
                var node = zTree.getNodeByParam("id", tnode.id, null);
                zTree.expandNode(node, true, true, true);
            }
            //默认选中专业节点
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var json = eval('(' + data + ')');
            //alert(json[0].id);
            var node = treeObj.getNodeByParam("id", json[0].id);
            treeObj.selectNode(node, false);
            //设置选中节点后右边编辑内容的载入
            load_form_data(json[0].id);
        },
        error: function(msg) {
            alert(" 数据加载失败！" + msg);
        }
    });


    function showRMenu(type, x, y) {
        $("#rMenu ul").show();
        if (type == "root") {
            $("#m_edit").hide();
            $("#m_del").hide();
            //$("#m_check").hide();
            //$("#m_unCheck").hide();
        } else {
            $("#m_edit").show();
            $("#m_del").show();
            //$("#m_check").show();
            //$("#m_unCheck").show();
        }
        rMenu.css({ "top": y + "px", "left": x + "px", "visibility": "visible" });

        $("body").bind("mousedown", onBodyMouseDown);
    }

    function hideRMenu() {
        if (rMenu) rMenu.css({ "visibility": "hidden" });
        $("body").unbind("mousedown", onBodyMouseDown);
    }

    function onBodyMouseDown(event) {
        if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
            rMenu.css({ "visibility": "hidden" });
        }
    }

    var addCount = 1;

    function addTreeNode() {
        hideRMenu();
        var newNode = { name: "增加" + (addCount++) };
        if (zTree.getSelectedNodes()[0]) {
            newNode.checked = zTree.getSelectedNodes()[0].checked;
            zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
        } else {
            zTree.addNodes(null, newNode);
        }
    }

}

//=============================================================================================

//加载表单数据=============================================================
function load_form_data(id) {
    //alert(id);
    //提交数据
    var url = "/Apps/Settings/Department/GetDepartment/";
    $.ajax({
        type: "post",
        cache: false,
        url: url,
        data: { id: id },
        dataType: "json",
        beforeSend: function() {
            showLoading();
        },
        complete: function() {
            hideLoading();
        },
        success: function(result) {
            for (var key in result) {
                //alert(key + " " + result[key]);
                if ($("#" + key) != undefined) {
                    $("#" + key).html(result[key]);
                }
            }
        },
        error: function() {
            showMsg("服务器异常！");
        }
    });
}

//================================================================================

//=================================================================================
//添加部门
function add() {
    var node = zTree.getSelectedNodes();
    var id = node[0].id;
    var name = node[0].name;
    //console.log(node);
    var url = "/Apps/Settings/Department/Add/"+id+"/?name="+encodeURI(name);
    showWindow("show_add", url, "添加部门", 800, 480, function() {
        var form_department = $(window.frames["frm_show_add"].document).find("#form_department");
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        var data = $(form_department).serialize();
        //console.log(data);
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
                    //刷新数据
                    //zTree.reAsyncChildNodes(null, "refresh");
                    refresh();
                    showMsg("部门添加成功！","Success");
                } else {
                    showMsg("系统异常，部门添加失败！","Error");
                }
            },
            error: function() {
                showMsg("网络连接错误","Error");
            }
        });

    });
}

//编辑部门信息
function edit() {
    var node = zTree.getSelectedNodes();
    var id = node[0].id;
    //console.log(node);
    var url = "/Apps/Settings/Department/Edit/"+id+"/";
    showWindow("show_add", url, "修改部门", 800, 480, function () {
        var form_department = $(window.frames["frm_show_add"].document).find("#form_department");
        var flag = document.getElementById("frm_show_add").contentWindow.form_valid();
        if (!flag) {
            return false;
        }
        var data = $(form_department).serialize();
        //console.log(data);
        $.ajax({
            type: "post",
            cache: false,
            url: url,
            data: data,
            dataType: "json",
            beforeSend: function () {
                //showMsg("添加中，请稍后...");
            },
            complete: function () {
                //d.close().remove();
            },
            success: function (result) {
                //toLowerCase报错
                //var status = result.Status.toLowerCase();
                var status = result.Status;
                if (status == true || status == "true" || status == "True") {
                    //刷新数据
                    zTree.reAsyncChildNodes(null, "refresh");
                    load_form_data(id);
                    showMsg("部门修改成功！","Success");
                } else {
                    showMsg("系统异常，部门修改失败！","Error");
                }
            },
            error: function () {
                showMsg("网络连接错误","Error");
            }
        });

    });
}


//删除部门
function del() {
    showDialog("确认删除该部门吗？", function () {
        var node = zTree.getSelectedNodes();
        var id = node[0].id;
        //console.log(node);
        if (node[0].isParent) {
            dialog.list['show_dialog'].close();
            showMsg("该部门存在子部门，请先删除子部门！");
            return false;
        }
        var url = "/Apps/Settings/Department/Delete/";
            $.ajax({
                type: "post",
                cache: false,
                url: url,
                data: {id:id},
                dataType: "json",
                beforeSend: function () {
                    //showMsg("添加中，请稍后...");
                },
                complete: function () {
                    //d.close().remove();
                },
                success: function (result) {
                    //toLowerCase报错
                    //var status = result.Status.toLowerCase();
                    var status = result.Status;
                    if (status == true || status == "true" || status == "True") {
                        //刷新数据
                        //zTree.reAsyncChildNodes(null, "refresh");
                        refresh();
                        showMsg("部门删除成功！","Success");
                    } else {
                        showMsg("该部门存在子部门，请先删除子部门！","Error");
                    }
                },
                error: function () {
                    showMsg("网络连接错误","Error");
                }
            });

        });
}

//==============================================