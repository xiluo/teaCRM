/**************关闭Ajax缓存**************/
$.ajaxSetup({cache: false});

/**************禁用artform提交**************/
$(".aui_outer form").live("submit", function(){
	return false;
});

/**************省/市联动**************/
$("select#province_53kf,select#customer_province").live("change", function(){
	var citys = (new Function('return ' + $(this).children(":selected").attr("citys"))) ();
	var option = '<option value="">--请选择--</option>';
	for(var i in citys){
		option += '<option value="' + i + '">' + citys[i] + '</option>';
	}
	var city = {"province_53kf":$("select#city_53kf"), "customer_province":$("select#customer_city")};
	city[$(this).attr("id")].html(option);
});

/**************部门/工号联动**************/
$("select#dept_53kf").after("<div id='_worker_53kf' style='display:none;'>" + $("select#worker_53kf").html() + "</div>");
$("select#dept_53kf").live("change", function(){
	if($(this).children(":selected").index() == 0){
		$(this).parent().find("select#worker_53kf").html($(this).next("#_worker_53kf").html());
	}else{
		var workers = (new Function('return ' + $(this).children(":selected").attr("workers"))) ();
		var option = "";
		var values = [];
		for(var i in workers){
			option += '<option value="' + workers[i]["id6d"] + '">' + workers[i]["name"] + '</option>';
			values.push(workers[i]["id6d"]);
		}
		$(this).parent().find("select#worker_53kf").html(option);
		if(values.length>0){
			$(this).parent().find("select#worker_53kf").prepend('<option value="' + values.join(",") + '" selected>全部工号</option>');
		}
	}
});

/**************岗位/工号联动**************/
$("select#job_53kf").after("<div id='_worker_53kf' style='display:none;'>" + $("select#worker_53kf").html() + "</div>");
$("select#job_53kf").live("change", function(){
	if($(this).children(":selected").index() == 0){
		$(this).parent().find("select#worker_53kf").html($("#_worker_53kf").html());
	}else{
		var workers = (new Function('return ' + $(this).children(":selected").attr("workers"))) ();
		var option = "";
		var values = [];
		for(var i in workers){
			option += '<option value="' + workers[i]["id6d"] + '">' + workers[i]["name"] + '</option>';
			values.push(workers[i]["id6d"]);
		}
		$(this).parent().find("select#worker_53kf").html(option);
		if(values.length>0){
			$(this).parent().find("select#worker_53kf").prepend('<option value="' + values.join(",") + '" selected>全部工号</option>');
		}
	}
});

/******************无权限******************/
$("ul li a[permission='no']").addClass("nopermission").live("click", function(){
	return false;
});
$("#navibar .nav li a[permission='no']").poshytip({
	className: 'tip-yellow',
	showTimeout: 500,
	alignTo: 'target',
	alignX: 'center',
	offsetY: 5
});

//添加客户里上传文件时
$(".insert_field_file").live('change',function(){
	$(this).siblings('span').remove();
	var value = $(this).val();
	$(this).after('<span style="margin-left:10px;">'+value+'&amp;nbsp;&amp;nbsp;<a class="insert_field_file_delete" href="javascript:void(0);">删除</a></span>');
});
//删除文件
$(".insert_field_file_delete").live('click',function(){
	if($(this).parent().parent().find('input[type=hidden]')){
		$(this).parent().parent().find('input[type=hidden]').val('');
	}
	$(this).parent().remove();
});


//设置每页显示行数
function setPageListRow(row){
	if(row != $.cookie("pageListRow")){
		$.cookie("pageListRow", row);
		topage(1);
	}
}

//翻页函数
function topage(_page){
	if(!_page){
		return false;
	}
	//当前页数
	page = _page;
	switch(action){
		case "index":
			var func = controller+"_list";
		break;
		default:
			var func = action+"_list";
	}
	eval(func)();
}

//比较时间月数
function compareDate(start,end,month){
	var date_start = new Date(start.replace(/-/g, "\/"));
	var date_end = new Date(end.replace(/-/g, "\/"));
	date_start.setMonth(date_start.getMonth()+month);
	if((date_start-date_end)<0){
		return false;
	}
	return true;
}
//打开页面弹出层
function showUrlPage(url,title){
	title = title || url;
	if(controller == 'external'){
		var url = url;
		window.open(url, "_blank", "height=500,width=800,top=180,left=220,status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=yes,location=no,titlebar=no");
	}else{
		$.dialog.open(url,{title:title,width:800,height:500});
	}
}