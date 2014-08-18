function adaptive(){	
	try{							
		if(parent.$("#customer_view").height()){
			var HE=parent.$("#customer_view").height()-20;
		}else{
			var HE=document.documentElement.clientHeight-20;	
		}
		var wh = HE - $("#cus_header").height();
			//alert($('.customer_info').height(wh));
		for(var i=1; i<=7; i++ ){
			$("#oDIV"+i).height(wh);
		}
	}		catch(e){}
}


 
 //标签对应方法数组
 var funcArr = {
 	"1": "load_customer_info",	//客户基本信息
 	"2": "load_locus_list",		//实时轨迹
 	"3": "load_msg_list",		//聊天记录
 	"4": "load_contact_list",	//联系记录
 	"5": "load_order_list",		//订单记录
 	"6": "load_recharge_list",	//充值记录
 	"7": "load_coupon_list"		//优惠券记录
 };
 
 //tab按钮切换
function SwapTab(cnt, cur){
	if(funcArr[cur]) eval(funcArr[cur]+'()');
	for(i=1;i<=cnt;i++){
		if(i==cur){
			$('#tab'+i).addClass('focus');
			$('#oDIV'+i).show();
		}else{
			$('#tab'+i).removeClass('focus');
			$('#oDIV'+i).hide();
		}
	}
}

//异步加载客户信息
function load_customer_info(){
//	$.ajax({
//		url: '?controller=view&action=custinfo_data&arg='+arg,
//		type: 'POST',
//		data: {cust_id:cust_id},
//		beforeSend: function(){
//			$('#loading').css('display','');
//		},
//		success: function(data) {
//			$('#loading').css('display','none');
//			$("#customer_info").html(data);
//		}
//	});
}

//异步加载实时轨迹
function load_locus_list(){
//	$.ajax({
//		url: '?controller=view&action=track_list&arg='+arg+'&guest_id='+guest_id,
//		type: 'POST',
//		beforeSend: function(){
//			$('#loading').css('display','');
//		},
//		success: function(data) {
//			$('#loading').css('display','none');
//			$("#track_list_tb").html(data);
//		}
//	});
}

//异步加载聊天记录
function load_msg_list(search){
//	$.ajax({
//		url: '?controller=view&action=msg_list&arg='+arg+'&guest_id='+guest_id,
//		type: 'POST',
//		data: search,
//		beforeSend: function(){
//			$('#loading').css('display','');
//		},
//		success: function(data) {
//			$('#loading').css('display','none');
//			$("#msg_list_tb").html(data);
//		}
//	});
}

//异步加载联系客户的记录
function load_contact_list(search){
//	$.ajax({
//		url: '?controller=view&action=contact_list&arg='+arg+'&cust_id='+cust_id,
//		type: 'POST',
//		data: search,
//		beforeSend: function(){
//			$('#loading').css('display','');
//		},
//		success: function(data) {
//			$('#loading').css('display','none');
//			$("#contact_list_tb").html(data);
//		}
//	});
}

// 异步加载订单列表
function load_order_list(search){
//	$.ajax({
//		url: '?controller=view&action=order_list&arg='+arg+'&cust_id='+cust_id,
//		type: 'POST',
//		data: search,
//		beforeSend: function(){
//			$('#loading').css('display','');
//		},
//		success: function(data) {
//			$('#loading').css('display','none');
//			$("#order_list_tb").html(data);
//		}
//	});
}

//异步加载充值记录
function load_recharge_list(search){
//	$.ajax({
//		url: '?controller=view&action=recharge_list&arg='+arg+'&cust_id='+cust_id,
//		type: 'POST',
//		data: search,
//		beforeSend: function(){
//			$('#loading').css('display','');
//		},
//		success: function(data) {
//			$('#loading').css('display','none');
//			$("#recharge_list_tb").html(data);
//		}
//	});
}
//异步加载优惠券流水记录
function load_coupon_list(search){
//	$.ajax({
//		url: '?controller=view&action=coupon_list&arg='+arg+'&cust_id='+cust_id,
//		type: 'POST',
//		data: search,
//		beforeSend: function(){
//			$('#loading').css('display','');
//		},
//		success: function(data) {
//			$('#loading').css('display','none');
//			$("#coupon_list_tb").html(data);
//		}
//	});
}

//////////////////////////查询部分//////////////////////////////
//聊天记录查询
function msg_search(){
	//检查搜索时间是否正确输入
	if($("#msg_start_time").val() != "" && $("#msg_end_time").val() != ""){
		var start = $("#msg_start_time").val() + " 00:00:00";
		var end = $("#msg_end_time").val() + " 23:59:59";
		var date1 = new Date(start.replace(/-/g, "\/")); 
		var date2 = new Date(end.replace(/-/g, "\/")); 
		var n = date1.getTime() - date2.getTime();
		if(!(n<=0)){
			box.alert("开始时间不得大于结束时间");
			return false;
		}
	}
	searchs = $("#msg_search").serialize();
	load_msg_list(searchs);
}

//联系记录查询
function contact_search(){
	//检查搜索时间是否正确输入
	if($("#contact_start_Wdate").val() != "" && $("#contact_end_Wdate").val() != ""){
		var start = $("#contact_start_Wdate").val() + " 00:00:00";
		var end = $("#contact_end_Wdate").val() + " 23:59:59";
		var date1 = new Date(start.replace(/-/g, "\/")); 
		var date2 = new Date(end.replace(/-/g, "\/")); 
		var n = date1.getTime() - date2.getTime();
		if(!(n<=0)){
			box.alert("开始时间不得大于结束时间");
			return false;
		}
	}
	searchs = $("#contact_search").serialize();
	load_contact_list(searchs);
}

//订单记录查询
function order_search(){
	var reg = new RegExp(/^[+|-]?\d{0,9}\.?\d{0,2}$/);
	var turnover_min = $('#turnover_min').val();
	var turnover_max = $('#turnover_max').val();
	if(turnover_min!='' || turnover_max!=''){
		if(!reg.test(turnover_min) || !reg.test(turnover_max)){
			box.alert("成交金额为不超过9位或小数位不超过2位的数");
			return false;
		}
		if(turnover_min && turnover_max && parseFloat(turnover_min) >= parseFloat(turnover_max)){
			box.alert("成交金额最大值不能小于最小值");
			return false;
		}
	}
	
	//检查搜索时间是否正确输入
	if($("#order_start_Wdate").val() != "" && $("#order_end_Wdate").val() != ""){
		var start = $("#order_start_Wdate").val() + " 00:00:00";
		var end = $("#order_end_Wdate").val() + " 23:59:59";
		var date1 = new Date(start.replace(/-/g, "\/")); 
		var date2 = new Date(end.replace(/-/g, "\/")); 
		var n = date1.getTime() - date2.getTime();
		if(!(n<=0)){
			box.alert("开始时间不得大于结束时间");
			return false;
		}
	}
	searchs = $("#order_search").serialize();
	load_order_list(searchs);
}

//充值记录查询
function recharge_search(){
	var reg = new RegExp(/^[+|-]?\d{0,9}\.?\d{0,2}$/);
	var recharge_min = $('#recharge_min').val();
	var recharge_max = $('#recharge_max').val();
	if(recharge_min!='' || recharge_max!=''){
		if(!reg.test(recharge_min) || !reg.test(recharge_max)){
			box.alert("充值金额为不超过9位或小数位不超过2位的数");
			return false;
		}
		if(recharge_min && recharge_max && parseFloat(recharge_min) >= parseFloat(recharge_max)){
			box.alert("充值金额最大值不能小于最小值");
			return false;
		}
	}
	
	//检查搜索时间是否正确输入
	if($("#recharge_start_date").val() != "" && $("#recharge_end_date").val() != ""){
		var start = $("#recharge_start_date").val() + " 00:00:00";
		var end = $("#recharge_end_date").val() + " 23:59:59";
		var date1 = new Date(start.replace(/-/g, "\/")); 
		var date2 = new Date(end.replace(/-/g, "\/")); 
		var n = date1.getTime() - date2.getTime();
		if(!(n<=0)){
			box.alert("开始时间不得大于结束时间");
			return false;
		}
	}
	searchs = $("#recharge_search").serialize();
	load_recharge_list(searchs);
}
//优惠券流水记录查询
function coupon_search(){
	var reg = new RegExp(/^[+|-]?\d{0,9}\.?\d{0,2}$/);
	var coupon_min = $('#coupon_min').val();
	var coupon_max = $('#coupon_max').val();
	if(coupon_min!='' || coupon_max!=''){
		if(!reg.test(coupon_min) || !reg.test(coupon_max)){
			box.alert("优惠券金额为不超过9位或小数位不超过2位的数");
			return false;
		}
		if(coupon_min && coupon_max && parseFloat(coupon_min) >= parseFloat(coupon_max)){
			box.alert("优惠券金额最大值不能小于最小值");
			return false;
		}
	}
	
	//检查搜索时间是否正确输入
	if($("#coupon_start_date").val() != "" && $("#coupon_end_date").val() != ""){
		var start = $("#coupon_start_date").val() + " 00:00:00";
		var end = $("#coupon_end_date").val() + " 23:59:59";
		var date1 = new Date(start.replace(/-/g, "\/")); 
		var date2 = new Date(end.replace(/-/g, "\/")); 
		var n = date1.getTime() - date2.getTime();
		if(!(n<=0)){
			box.alert("开始时间不得大于结束时间");
			return false;
		}
	}
	searchs = $("#coupon_search").serialize();
	load_coupon_list(searchs);
}



//////////////////////////公共方法//////////////////////////////

//客户成交，成为会员
function transact_customer(){
	if(!cust_id) return false;
	$.dialog({
		id: 'transactCustomer',
		padding: '10px 10px',
		title: '客户成交',
		lock: true,
		button: [
		    {
		    	name: '成交',
		    	callback: function(){
		    		var transact = $("input[name=transact]:checked").val();
		    		$.ajax({
						type: "POST",
						url: "?controller=customer&action=update_transact_customer&arg="+arg,
						data: {transact:transact,cust_ids:cust_id},
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								box.tip(res.msg,'success');
								//页面刷新
								location.reload();
		    					art.dialog.list['transactCustomer'].close();
							}else {
								box.tip(res.msg,'error');
							}
						}
					});
		    		return false;
		    	},
		    	focus: true
		    },
		    {
		    	name: '成交并添加订单',
		    	callback: function(){
		    		//先去成交
		    		var transact = $("input[name=transact]:checked").val();
		    		$.ajax({
						type: "POST",
						url: "?controller=customer&action=update_transact_customer&arg="+arg,
						data: {transact:transact,cust_ids:cust_id},
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								art.dialog.list['transactCustomer'].close();
								order_add(1);
							}else {
								box.tip(res.msg,'error');
							}
						}
					});
		    		return false;
		    	}
		    }
		]
	});
	$.ajax({
		url: '?controller=customer&action=transact_customer&arg=' + arg,
		success: function(data) {
			$.dialog.list['transactCustomer'].content(data);
		}
	});
}

//编辑客户信息
function customer_edit(){
	if(from){
		var url = '?controller=view&action=edit&arg='+arg+'&from='+from+'&guest_id='+guest_id;
	}else{
		var url = '?controller=view&action=edit&arg='+arg;
	}
	$.ajax({
		url: url,
		type: 'POST',
		data: {cust_id:cust_id},
		success: function(data) {
			$("#customer_info").html(data);
			adaptive();
		}
	});
}

//保存客户页面
function customer_save(){
	var phone = $("#customer_mobile").val();
	var flag = customer_validate();
	if(!flag){
		return false;
	}
	if(validate_phone(phone, cust_id)){
		box.confirm("手机号码已被其他客户使用，是否继续？",function(){
			submit_customer_form();
		},function(){});
	}else {
		submit_customer_form();
	}
}
//编辑客户页面取消按钮
function edit_cancel(){
	load_customer_info();
}

//编辑客户后的消息提示
function edit_tip(msg, type){
	if(type == 'success'){
		save_top();
		box.tip(msg, type);
		setTimeout("load_customer_info()", 1000);
	}else {
		box.tip(msg, 'error');
	}
}

//跨域保存数据操作
function save_top(){
	if(from != 'bench'){
		return true;
	}
	var ifr = document.createElement('iframe');
	ifr.style.display = 'none';
	ifr.src = "http://"+talk_host+'/crm_talk_proxy.html#saveshow';
	document.body.appendChild(ifr);
}

//提交操作
function submit_customer_form(){
	//将添加的标签赋值到隐藏域
	var selected_tags = '';
	$("#selected_tags").find('a').each(function(){
		if($(this).attr('tag_id')){
			selected_tags += $(this).attr('tag_id')+',';
		}
	});
	//去除最后一个逗号
	selected_tags = selected_tags.substring(0, selected_tags.lastIndexOf(','));
	$("#tag_ids").val(selected_tags);

	var action = "?controller="+controller+"&action=update&arg="+arg;
	$("#form_customer").attr("action",action);
	$("#form_customer").submit();
}

//添加下次联系记录
function contact_next_add_ref(){
	var next_contact = $.dialog({
		id: 'next_contact',
		width: '500px',
		title: '添加联系记录',
		lock: true,
		ok: function(){
			if($("#contact_customer_name").val()==""){
				$('#contact_customer_name').formtip("请填写对应客户");
				return false;
			}		
			if($("#contact_date").val()==""){
				$('#contact_date').formtip("请填写联系时间！");
				return false;
			}
			var datas = $("#add_contact").serialize();
			$.ajax({
				type: "POST",
				url: '?controller=contact&action=insert&arg='+arg,
				data: datas,
				dataType: 'json',
				success: function(response){
					if(response.status=="success"){
						load_contact_list();
						if(response.response_cust_id != "false"){
							var notice = $.dialog({
								id: 'notice',
								icon: 'warning',
								width: '200px',
								height: '80px;',
								title: '注意',
								content: '没有下次联系任务，请添加！',
								lock: true,
								close: function(){
									contact_next_add_ref();
								},
								button:[{
									name: "确定",
									callback: function(){
										contact_next_add_ref();
									}
								}]
							})
						}else{
							box.tip(response.msg);
						}
					}else{
						box.alert(response.msg);
						return false;
					}
				}
			})
		},
		cancel: true
	});
	$.ajax({
		url: '?controller=contact&action=add&arg='+arg,
		type: "POST",
		data: {cust_ids:cust_id},
		success: function(data){
			next_contact.content(data);
		}
	});
	showCalendar('EntTime', 'y-mm-dd');
}

// 查看联系记录详细信息
function contact_view(id){
	var contact_view = $.dialog({
		id: 'contact_view',
		width: '500px',
		title: '查看联系记录',
		lock: true,
		cancel: true
	});
	$.get("?controller=contact&action=view&arg="+arg+"&id="+id, function(html){
		contact_view.content(html);
	});
}

//联系记录完成
function contact_finish(id){
	var contact_finish = $.dialog({
		id: 'contact_finish',
		width: '500px',
		title: '联系完成',
		lock: true,
		ok: function(){
			if($("#contact_next_date").val()==""){
				$('#contact_next_date').formtip("请填写下次联系时间");
				return false;
			}
			var datas = $("#finish_contact").serialize();
			$.ajax({
				type: "POST",
				url: '?controller=contact&action=finish_insert&arg='+arg+'&id='+id,
				data: datas,
				dataType: 'json',
				success: function(response){
					if(response.status=="success"){
						//刷新联系记录列表
						load_contact_list();
						if(response.response_cust_id != "false"){
							var notice = $.dialog({
								id: 'notice',
								icon: 'warning',
								width: '200px',
								height: '80px;',
								title: '注意',
								content: '没有下次联系任务，请添加！',
								lock: true,
								close: function(){
									contact_next_add_ref();
								},
								button:[{
									name: "确定",
									callback: function(){
										contact_next_add_ref();
									}
								}]
							})
						}else{
							box.tip(response.msg, "success");
						}
					}else{
						box.tip(response.msg, "error");
						return false;
					}
				}
			})
		},
		cancel: true
	});
	$.get("?controller=contact&action=finish&arg="+arg+"&id="+id, function(html){
		contact_finish.content(html);
	});
}

// 编辑联系记录
function contact_edit(id){
	var contact_edit = $.dialog({
		id: 'contact_edit',
		width: '500px',
		title: '编辑联系记录',
		lock: true,
		ok: function(){
			if($("#contact_customer").val()==""){
				$('#contact_customer').formtip("请填写对应客户");
				return false;
			}		
			if($("#contact_date").val()==""){
				$('#contact_date').formtip("请填写联系时间！");
				return false;
			}
			var datas = $("#update_contact").serialize();
			$.ajax({
				type: "POST",
				url: '?controller=contact&action=update&arg='+arg,
				data: datas,
				dataType: 'json',
				success: function(response){
					if(response.status=="success"){
						box.tip(response.msg, "success");
						// 刷新联系记录列表
						load_contact_list();
					}else{
						box.tip(response.msg, "error");
						return false;
					}
				}
			})
		},
		cancel: true
	});
	$.get("?controller=contact&action=edit&arg="+arg+"&id="+id+'&source=viewpage', function(html){
		contact_edit.content(html);
	});
}

// 删除联系记录
function contact_delete(id){
	box.confirm("确定删除？",function(){
		$.ajax({
			type: "GET",
			url: "?controller=contact&action=delete&arg="+arg+"&id="+id,
			dataType: "json",
			success: function(response){
				if(response.status=="success"){
					// 刷新联系记录列表
					load_contact_list();
					box.tip(response.msg,"success");
				}else{
					box.tip(response.msg,"error");
				}
			}
		});
	})
}

//添加订单
function order_add(is_refresh){
	var add_order = $.dialog({
		id: 'order_info',
		width: '560px',
		padding: '10px',
		title: '添加订单',
		lock: true,
		ok: function(){
			if($("#order_title").val()==""){
				$('#order_title').formtip("请填写订单主题");
				return false;
			}	
			if($("#order_cust_name").val()==""){
				$('#order_cust_name').formtip("请填写客户名称");
				return false;
			}
			if($("#order_time").val()==""){
				$('#order_time').formtip("请填写成交时间");
				return false;
			}

			var pro_price = $('input[name="products[pro_price][]"]');
			var len = pro_price.length;
			if(len < 1){
				box.alert('请添加产品');
				return false;
			}
			for(var j=0;j<len;j++){
				if($(pro_price[j]).val()==""){
					$(pro_price[j]).formtip("请填写销售单价");
					return false;
				}
			}
			var datas = $("#order_form").serialize();
			$.ajax({
				type: "POST",
				url: '?controller=order&action=insert&arg='+arg,
				data: datas,
				dataType: 'json',
				success: function(response){
					if(response.status=="success"){
						box.tip(response.msg,'success');
						// 关闭选择产品对话框
						if(typeof add_product != 'undefined'){
							add_product.close();
						}
						// 是否刷新这个页面。如果是成交客户并添加订单的操作，需要刷新页面，客户归属到会员栏目了
						if(is_refresh){
							//页面刷新
							location.reload();
						}else {
							// 刷新订单列表
							load_order_list();
							//load_order_statistic();
						}
					}else{
						box.tip(response.msg,'error');
						return false;
					}
				}
			})
		},
		cancel: function(){
			add_order.close();
			if(typeof add_product != 'undefined'){
				add_product.close();
			}
			// 是否刷新这个页面。如果是成交客户并添加订单的操作，需要刷新页面，客户归属到会员栏目了
			if(is_refresh){
				location.reload();
			}
		}
	});
	$.get("?controller=order&action=add&arg="+arg+"&cust_id="+cust_id+'&source=viewpage', function(html){
		add_order.content(html);
	});
}

//查看订单详细信息
function order_view(id){
	var order_view = $.dialog({
		id: 'order_view',
		width: '500px',
		title: '查看订单',
		lock: true,
		cancel: true
	});
	$.get("?controller=order&action=view&arg="+arg+"&id="+id, function(html){
		order_view.content(html);
	});
}

//编辑订单
function order_edit(id){
	var order_edit = $.dialog({
		id: 'order_info',
		width: '560px',
		padding: '10px',
		title: '编辑订单',
		lock: true,
		ok: function(){
			if($("#order_title").val()==""){
				$('#order_title').formtip("请填写订单主题");
				return false;
			}	
			if($("#order_cust_name").val()==""){
				$('#order_cust_name').formtip("请填写客户名称");
				return false;
			}
			if($("#order_time").val()==""){
				$('#order_time').formtip("请填写成交时间");
				return false;
			}
			var pro_price = $('input[name="products[pro_price][]"]');
			var len = pro_price.length;
			if(len < 1){
				box.alert('请添加产品');
				return false;
			}
			var datas = $("#order_form").serialize();
			$.ajax({
				type: "POST",
				url: '?controller=order&action=update&arg='+arg,
				data: datas,
				dataType: 'json',
				success: function(response){
					if(response.status=="success"){
						box.tip(response.msg,'success');
						// 刷新订单列表
						load_order_list();
						// 订单统计信息
						//load_order_statistic();
					}else{
						box.tip(response.msg,'error');
						return false;
					}
				}
			})
		},
		cancel: true
	});
	$.get("?controller=order&action=edit&arg="+arg+"&id="+id+'&source=viewpage', function(html){
		order_edit.content(html);
	});
}

// 删除订单记录
function order_delete(id){
	box.confirm("确定删除？",function(){
		$.ajax({
			type: "GET",
			url: "?controller=order&action=delete&arg="+arg+"&id="+id,
			dataType: "json",
			success: function(response){
				if(response.status=="success"){
					// 刷新订单列表
					load_order_list();
					// 刷新订单统计
					//load_order_statistic();
					box.tip(response.msg,"success");
				}else{
					box.tip(response.msg,"error");
				}		
			}
		});
	})
}

//设置每页显示行数
function setPageListRow(row){
	if(row != $.cookie("pageListRow")){
		$.cookie("pageListRow", row);
		topage(1);
	}
}

//聊天记录翻页函数
function topage(_page){
	if(!_page){
		return false;
	}
	//当前页数
	page = _page;
	//检查搜索时间是否正确输入
	if($("#msg_start_time").val() != "" && $("#msg_end_time").val() != ""){
		var start = $("#msg_start_time").val() + " 00:00:00";
		var end = $("#msg_end_time").val() + " 23:59:59";
		var date1 = new Date(start.replace(/-/g, "\/")); 
		var date2 = new Date(end.replace(/-/g, "\/")); 
		var n = date1.getTime() - date2.getTime();
		if(!(n<=0)){
			box.alert("开始时间不得大于结束时间");
			return false;
		}
	}
	searchs = $("#msg_search").serialize();
	load_msg_list(searchs+'&page='+page);
}

function customer_transact(cust_ids){
	if(!cust_ids){
		return false;
	}else{
		box.confirm("确认升级会员",function(){
			$.ajax({
				url:"?controller=customer&action=customer_update&arg="+arg,
				type: "post",
				data:{cust_ids:cust_ids},
				dataType: "json",
				success:function(res){
					if(res.status=='success'){
						box.tip(res.msg,'success');
						var src = parent.$("#customer_view").attr('src');
						parent.$("#customer_view").attr('src',src);
					}else{
						box.tip(res.msg,'error');
					}
				}
			})
		})
	}
}

function transact_customer_1(cust_ids){
	if(!cust_ids) return false;
	$.dialog({
		id: 'transactCustomer',
		padding: '10px 10px',
		title: '升级会员',
		lock: true,
		button: [
		    {
		    	name: '确定',
		    	callback: function(){
		    		var transact = $("input[name=transact]:checked").val();
		    		$.ajax({
						type: "POST",
						url: "?controller=customer&action=update_transact_customerT&arg="+arg,
						data: {transact:transact,cust_ids:cust_ids},
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								box.tip(res.msg,'success');
								//页面刷新
								//location.reload();
								art.dialog.list['transactCustomer'].close();
								var src = parent.$("#customer_view").attr('src');
								parent.$("#customer_view").attr('src',src);
							}else {
								box.tip(res.msg,'error');
							}
						}
					});
		    		return false;
		    	},
		    	focus: true
		    },
		    {
		    	name: '取消'
		    }
		]
	});
	$.ajax({
		url: '?controller=customer&action=transact_customer&arg=' + arg,
		success: function(data) {
			$.dialog.list['transactCustomer'].content(data);
		}
	});
}
var ajax_isjson = new RegExp(/^\{(.*)\}$/);	//判断ajax返回是否为json，权限判断用到
function retrieval_transact_customer(cust_ids){
	if(!cust_ids){
		return false;
	}
	$.dialog({
		id:'retrieval_transact',
		padding:'10px 10px',
		title:'升级会员',
		lock:true,
		button:[
		        {
		        	name: '确定',
			    	callback: function(){
			    		var transact = $("input[name=transact]:checked").val();
			    		$.ajax({
							type: "POST",
							url: "?controller=customer&action=customer_transfer_membership&arg="+arg,
							data: {transact:transact,cust_ids:cust_ids},
							dataType: "json",
							success: function(res){
							//	alert(res.msg);
								if(res.status == 'success'){
									box.tip(res.msg,'success');
									//页面刷新
									//location.reload();
				    				art.dialog.list['retrieval_transact'].close();
				    				var src = parent.$("#customer_view").attr('src');
									parent.$("#customer_view").attr('src',src);
								}else {
									box.tip(res.msg,'error');
								}
							}
						});
			    		return false;
			    	},
			    	focus: true
			    },
			    {
			    	name: '取消'
			    }
			]
	});
	$.ajax({
		url: '?controller=customer&action=transact_customer&arg=' + arg,
		success: function(data) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			$.dialog.list['retrieval_transact'].content(data);
		}
	});
}

 function goup(cust_id,owner,is_delete){
	 if(!owner && !is_delete){
		 customer_transact(cust_id);
	 }
	 if(owner && !is_delete){
		 transact_customer_1(cust_id);
	 }
	 if(is_delete){
		 retrieval_transact_customer(cust_id); 
	 }
 }

 function cancel_member(cust_ids,is_set){
		if(!cust_ids){
			return false;
		}
		box.confirm("确认取消会员",function(){
			$.ajax({
				url:"?controller=member&action=cancel_member"+is_set+"&arg="+arg,
				type: "post",
				data:{cust_ids:cust_ids},
				dataType: "json",
				success:function(res){
					if(res.status=='success'){
						box.tip(res.msg,'success');
						var src = parent.$("#customer_view").attr('src');
						parent.$("#customer_view").attr('src',src);
					}else{
						box.tip(res.msg,'error');
					}
				}
			})
		})
	}
function godown(cust_id,owner,is_delete){
	if(!owner && !is_delete){
		cancel_member(cust_id,0);
	}
	if(owner && !is_delete){
		cancel_member(cust_id,1);
	}
	if(is_delete){
		cancel_member(cust_id,2);
	}
}
