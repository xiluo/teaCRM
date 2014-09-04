//*客户JS函数
//*作者：唐有炜
//*时间：2014年08月25日


$(function() {
    //加载树形数据
    loadTreeData();
    //加载客户、联系人、跟进信息
    InitDataGrid();
});

//加载树形数据
function loadTreeData() {
    //$("#filter_tree").ligerTree({ checkbox: false });
    $("#filter_tree").ligerTree({ url: '/Apps/CRM/LoadData/GetFilterTreeData/', ajaxType: 'get', checkbox: false });
}


//根据id集合获取省市信息=========================================================================
//需要引用 <script src="/Themes/default/base/js/city.js" type="text/javascript"></script>
// 2014-09-04 By 唐有炜
function get_city_by_ids(ids) {
    return "唐有炜写的";
}
