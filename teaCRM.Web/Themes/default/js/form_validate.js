// 添加或者编辑客户时的表单验证
function form_validate(){
	var validate_flag = true;
	var field_type = ''; //属性类型
	var field_cname = ''; //属性中文名
	var field_ename = ''; //属性英文名
	var field_required = ''; //属性是否必填
	var field_id = ''; //属性的html元素ID
	var max = ''; //数字属性最大值
	var min = ''; //数字属性最小值
	var THIS;
	$("#form_department").find('input').each(function(){
		THIS = $(this);
		field_id = THIS.attr('id');
		field_cname = THIS.attr('field_cname'); //属性中文名
		field_ename =THIS.attr('field_ename'); //属性英文名
		field_required = THIS.attr('field_required'); //属性是否必填
		field_type = THIS.attr('field_type'); //属性类型
		max = THIS.attr('max'); //数字最大项
		min = THIS.attr('min'); //属性类型
		var value = '';
		// 是否必填
		if(field_required == 1){
			//文本，时间
			if(field_type == 'text' || field_type == 'date' || field_type == 'datetime' || field_type == 'file' || field_type == 'link'){
				value = $.trim(THIS.val());
				if(value == ''){
					$("#"+field_id).formtip(field_cname+"不能为空");
					validate_flag = false;
					return false;
				}
			}
			//数字
			if(field_type == 'number'){
				value = $.trim(THIS.val());
				if(value == ''){
					$("#"+field_id).formtip(field_cname+"不能为空");
					validate_flag = false;
					return false;
				}
			}
			//复选框
			if(field_type == 'checkbox'){
				var count = 0;
				$("."+field_id).each(function(){
					is_checked = $(this).is(':checked');
					if(is_checked){
						count++;
					}
				});
				if(count == 0){
					$("#"+field_id).formtip(field_cname+"必选");
					validate_flag = false;
					return false;
				}
			}
			//单选按钮
			if(field_type == 'radio'){
				var input_name = THIS.attr('name');
				var value = $("input[name='"+input_name+"']:checked").val();
				if(!value){
					$("#"+field_id).formtip(field_cname+"必选");
					validate_flag = false;
					return false;
				}﻿
			}
		}
		
		//非必填，但是有其他限制数字
		if(field_type == 'number'){
			value = $.trim(THIS.val());
			//填了数字才验证
			if(value != ''){
				if(!isNum(value)){
					$("#"+field_id).formtip(field_cname+"格式错误");
					validate_flag = false;
					return false;
				}
				if(value>Number(max) || value<Number(min)){
					$("#"+field_id).formtip(field_cname+"取值范围错误");
					validate_flag = false;
					return false;
				}
			}
		}
		
		// 特殊处理的系统属性(邮箱，手机验证)
		if(field_ename == 'mobile'){
			return true;
		/*
			value = $.trim(THIS.val());
			if(value != ''){
				var mobile_partten = /^(13[0-9]|15[012356789]|18[012356789]|14[57])\d{8}$/;
				if(!value.match(mobile_partten)){
					$("#"+field_id).formtip(field_cname+"格式错误");
					validate_flag = false;
					return false;
				}
			}
		*/
		}else if(field_ename == 'email'){
			value = $.trim(THIS.val());
			if(value != ''){
				var email_partten = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
				if(!value.match(email_partten)){
					$("#"+field_id).formtip(field_cname+"格式错误");
					validate_flag = false;
					return false;
				}
			}
		}
	});
	if(!validate_flag){
		//后面的不执行了
		return false;
	}
	//下拉框
	$("#form_department").find('select').each(function(){
		THIS = $(this);
		var value = THIS.find('option:selected').val();
		field_id = THIS.attr('id');
		field_cname = THIS.attr('field_cname'); //属性中文名
		field_ename =THIS.attr('field_ename'); //属性英文名
		field_required = THIS.attr('field_required'); //属性是否必填
		field_type = THIS.attr('field_type'); //属性类型
		// 是否必选
		if(field_required == 1){
			if(value == ''){
				$("#"+field_id).formtip(field_cname+"必选");
				validate_flag = false;
				return false;
			}
		}
	});
	if(!validate_flag){
		//后面的不执行了
		return false;
	}
	//文本框
	$("#form_department").find('textarea').each(function(){
		THIS = $(this);
		var value = THIS.val();
		field_id = THIS.attr('id');
		field_cname = THIS.attr('field_cname'); //属性中文名
		field_ename =THIS.attr('field_ename'); //属性英文名
		field_required = THIS.attr('field_required'); //属性是否必填
		field_type = THIS.attr('field_type'); //属性类型
		// 是否必选
		if(field_required == 1){
			if(value == ''){
				$("#"+field_id).formtip(field_cname+"必选");
				validate_flag = false;
				return false;
			}
		}
	});
	return validate_flag;
}

// 判断数字格式
function isNum(s){
	var pattern = /^-?\d+(\.\d+)?$/;
	if(pattern.test(s)){
		return true;
	}
	return false;
}

// 验证客户手机是否有相同
//function validate_phone(phone, cust_id){
//	if(!cust_id){
//		cust_id = '';
//	}
//	var flag = false;
//	$.ajax({
//		url: '?controller='+controller+'&action=validate_phone&arg='+arg,
//		async: false,
//		type: 'POST',
//		dataType: 'json',
//		data: {cust_id:cust_id,phone:phone},
//		success: function(res) {
//			if(res.status == 'success'){
//				// 手机号码已存在
//				if(res.validate){
//					flag = true;
//				}
//			}else {
//				box.tip(res.msg,"error");
//				flag = false;
//			}
//		}
//	});
//	return flag;
//}