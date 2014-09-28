//*添加客户JS函数
//*作者：唐有炜
//*时间：2014年09月01日
//公司编号
var compNum;
//当前模块id
var myappId;


$(document).ready(function() {
    //表单获取焦点
    $("#CusName").focus();
    //加载省市数据
    load_city_data();

    //初始化全局变量
    var CustomerId = $("#CustomerId").val();
    compNum = $("#CompNum").val();
    myappId = $("#myappId").val();
    //加载表单数据
    if (CustomerId != "") {
        load_form_data(CustomerId);
    }

});


$(function() {
    validate_form();
});

//===============================================================================================
//需要引用 <script src="/Themes/default/base/js/city.js" type="text/javascript"></script>
//加载省市数据 2014-09-04 By 唐有炜
function load_city_data() {
    //alert(city_data_2014);
    //预加载
    $("#cus_province option").remove();
    $("#cus_province").prepend("<option value=\"0\">请选择省份</option>"); //为select插入一个option(第一个位置) 
    $("#cus_city option").remove();
    $("#cus_city").prepend("<option value=\"0\">请选择城市</option>"); //为select插入一个option(第一个位置) 
    $("#cus_region option").remove();
    $("#cus_region").prepend("<option value=\"0\">请选择地区</option>"); //为select插入一个option(第一个位置) 
    //加载省份
    $.each(city_data_2014, function(index, field) {
        var prov_name = field.region.name;
        var prov_code = field.region.code;
        $("#cus_province").append("<option value=\"" + prov_code + "\" >" + prov_name + "</option>");
    });
    //级联城市
    $("#cus_province").change(function() {
        var prov_code = $(this).val();
        get_cities_by_prov_code(prov_code);
    });


    //级联地区
    $("#cus_city").change(function() {
        var prov_code = $("#cus_province").val();
        var city_code = $(this).val();
        get_regions_by_provcitycode(prov_code, city_code);
    });
}

//获取当前省份下面的所有城市
function get_cities_by_prov_code(prov_code) {
    $.each(city_data_2014, function (index, field) {
        var state = field.region.state;
        if (prov_code == field.region.code) { //只添加当前省份下的城市
            $("#cus_city option").remove();
            $("#cus_city").prepend("<option value=\"0\">请选择城市</option>"); //为select插入一个option(第一个位置) 
            $.each(state, function (index2, field2) {
                var city_name = field2.name;
                var city_code = field2.code;
                $("#cus_city").append("<option value=\"" + city_code + "\" >" + city_name + "</option>");
            });
        }
    });
}




function get_regions_by_provcitycode(prov_code,city_code) {
     $.each(city_data_2014, function (index, field) {
        var state = field.region.state;
        if (prov_code == field.region.code) { //只添加当前省份下的城市
            $.each(state, function (index2, field2) {
                var city = field2.city;
                if (city_code == field2.code) {
                    $("#cus_region option").remove();
                    $("#cus_region").prepend("<option value=\"0\">请选择地区</option>"); //为select插入一个option(第一个位置) 
                    $.each(city, function (index3, field3) {
                        var region_name = field3.name;
                        var region_code = field3.code;
                        $("#cus_region").append("<option value=\"" + region_code + "\" >" + region_name + "</option>");
                    });
                }
            });
        }
    });
}

//=======================================================================================================

//表单验证
function validate_form() {
    //表单验证
    $("#form_customer").validate({
        debug: true,
        invalidHandler: function(e, validator) {
            var msg = "有 " + validator.numberOfInvalids() + " 项填写有误，请检查！";
            $("#msgprint").html(msg).show().focus();
            setTimeout(function() {
                $("#msgprint").fadeOut(500);
                //如果动画结束则删除节点
                if (!$("#msgprint").is(":animated")) {
                    $("#msgprint").hide();
                }
            }, 1000);
        },
        rules: {
            cus_name: {
                rangelength: [2, 200]
            },
            cus_sname: {
                rangelength: [1, 100]
            },
            cus_tel: {
                remote: { type: "POST", url: '/Apps/CRM/LoadData/ValidatePhone/' }
            },
            con_name: {
                rangelength: [2, 200]
            },
            cus_address: {
                maxlength: 255
            },
            cus_note: {
                maxlength: 255
            },
            con_note: {
                maxlength: 255
            }
        },
        messages: {
            cus_name: {
                required: "客户名称不能为空！",
                rangelength: "客户名称长度必须在2-200之间"
            },
            cus_sname: {
                rangelength: "助记简称长度必须在1-100之间"
            },
            cus_tel: {
                required: "电话或手机号码不能为空！",
                remote: "该电话或手机号码已存在！"
            },
            cus_address: {
                maxlength: "详细地址最长只能为255位"
            },
            cus_note: {
                maxlength: "备注最多只能为255位"
            },
            con_name: {
                required: "主联系人名称不能为空！"
            }
        },

        errorPlacement: function(error, element) {
            var errorMsg = error[0].innerHTML;
            var elementName = element[0].name;
            $("#" + elementName).formtip(errorMsg);
        },
        success: function(element) {
            var elem = $(element)[0].htmlFor;
            $("#" + elem).poshytip('disable');
            $("#" + elem).poshytip('destroy');
            $("#" + elem).removeClass("error").addClass("success");
        }
//          showErrors: function(errorMap, errorList) {
//             showModal("您的表单包含" + this.numberOfInvalids()
//              + "项错误，请检查！");
//            this.defaultShowErrors();
//        }
    });
}

//表单验证方法，供父窗口调用
function form_valid() {
    if ($("#form_customer").valid()) {
//        $('#formTab li:eq(1) a').tab("show");
//        //修复验证bug
//        $("#con_name").focus();
//        if ($("#con_name").val() == "") {
//            $("#con_name").formtip("主联系人不能为空！");
//            return false;
//        } else {
//            return true;
        //  }
        return true;
    } else {
        return false;
    }

}


function load_form_data(CustomerId) {
    //alert(CustomerId);
    var url = "/api/crm/customer/getCustomer?compNum=" + compNum + "&id=" + CustomerId;
    $.ajax({
        type: "get",
        cache: false,
        url: url,
        dataType: "json",
        beforeSend: function() {
            //showLoading();
        },
        complete: function() {
            //hideLoading();
        },
        success: function(result) {
            //console.log(result);
            var obj = JSON.parse(result);
            for (var key in obj) {
                //console.log(key +" "+obj[key]);
                if ($("#" + key) != undefined) {
                    $("#" + key).val(obj[key]);
                    //处理Checkbox
                    //$("#" + key).next().val(result[key]);
                    //特殊处理
                    //省市处理
//                    if (key == "cus_city") {
//                        var city_arr = obj[key].split(",");
//                        $("#cus_province").val(city_arr[0]);
//                        get_cities_by_prov_code(city_arr[0]);
//                        $("#cus_city").val(city_arr[1]);
//                        get_regions_by_provcitycode(city_arr[0], city_arr[1]);
//                        $("#cus_region").val(city_arr[2]);
//                    }
                   
                }
            }
            //console.log("数据加载成功。");
        },
        error: function() {
            //console.log("数据加载失败。");
            showMsg("服务器异常！");
        }
    });

}