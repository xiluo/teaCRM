//*组织架构js
//*作者：唐有炜
//*时间：2014年07月231日

//加载左侧树形
var defaultTreeID = 10; //默认选中的节点ID
$(function() {
    var menu = $("#department_tree").ligerTree({
        url: '/Settings/Department/GetDepartmentTreeData',
        ajaxType: 'get',
        checkbox: false,
        onClick: function(data) {
            var json = eval(data);
            //alert(json.data.id + " " + json.target.baseURI);
        },
        onSuccess: function(data) {
            var parm = function(data) {
                return data.id == defaultTreeID;
            };
            menu.selectNode(parm);
            //function 中的参数data变量指的是ligerTree中的数据data 
            //data.text指的是data数据表中的text字段，如果有其他字段则换成其他的描述例如ＩＤ字段由这样使用：data.ID //该function的执行过程如下：
            //当menu.selectNode(parm)代码执行时，function(data)则逐调用data中的text属性，然后进行相关的逻辑对比操作只要这个function(data) return true则该项被选中，false则未选中．所以当需要对ligerTree设置项目被选中时，可以通过这个tree.selectNode(parm)来调用　function(data)函数来实现．
        }
    });

    //编辑部门信息
    edit();
});


//编辑部门信息
function edit() {
    $("#btn-edit").click(function () {
        var flag = customer_validate();
        //alert(flag);
        //alert("edit");
    });
}