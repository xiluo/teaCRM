//*客户JS函数
//*作者：唐有炜
//*时间：2014年08月25日

$(function () {
    //加载树形数据
    loadTreeData();
});

//加载树形数据
function loadTreeData() {
    //$("#filter_tree").ligerTree({ checkbox: false });
    $("#filter_tree").ligerTree({ url: '/Apps/CRM/LoadData/GetTreeData/', ajaxType: 'get', checkbox: false });
   
}