//
// 显示查询时已选标签与未选标签的ID
var unselected_tag = 'unselected_tag';
var selected_tag = 'selected_tag';
// 页面里表格的ID
var customerGridId = 'customer_grid';
// 判断当前页面是'潜在客户'还是'会员管理'，因为一些相同操作的提示语言不同
var customerType = '';
var ajax_isjson = new RegExp(/^\{(.*)\}$/);	//判断ajax返回是否为json，权限判断用到
// 全选功能获取的客户ID
var all_cust_ids = '';
$(function(){//标签的列
	// 点击客户标签查询列表
	$("#"+unselected_tag).find('.tag').live('click', function(event){
		var event = event || window.event,
		target = event.target || event.srcElement;
		if (target.nodeName == 'I') {
			return;
		}
		var $this = $(this),
		tag_id = $(this).attr('tag_id');
		$("#"+selected_tag).parent().show();
		$("#"+selected_tag+" .max-w").append($this);
		grid_search('first',1);
	});
	
	// 减少一个标签查询条件
	$("#"+selected_tag).find('.tag').live('click', function(){
		var $this = $(this),
		level = $(this).attr('level');
		if(level == 'ct-level-1'){
			// 第一级的标签放回来在'展开'和'管理'按钮前面
			$("#"+unselected_tag).find('.' + level + ' .max-w').append($this);
		}else {
			$("#"+unselected_tag).find('.' + level).append($this);
		}
		// 不用标签查询的时候，将上面的部分隐藏
		if($("#"+selected_tag).find('.tag').length == 0){
			$("#"+selected_tag).parent().hide();
		}
		grid_search('first',1);
	});
	
	// 列表全选和取消全选功能
	$(".select_all_row .unselect_row").live('click',function(){
		//获取上次查询时的条件
		var gridManager = $("#"+customerGridId).ligerGetGridManager();
		// var a = '';
		// for (var i in gridManager) {
		// 	a += 'i: ' + i + ', val: ' + gridManager[i] + '\n';
		// }
		// alert(a)
		var param = gridManager.getLoadParam();
		// 1:客户池或者会员池;2:待联系客户或者待联系会员;3:废弃客户或者流失会员
		var status = $(this).attr('status');
		// 点击全选按钮，异步查询所有客户ID
		$.ajax({
			url: "?controller="+controller+"&action=get_all_cust_id&arg="+arg+"&status="+status,
			type: "POST",
			data: param,
			dataType: "json",
			success: function(res){
				if(res.status == 'success'){
					all_cust_ids = res.cust_ids;
				}else {
					box.tip(res.msg);
				}
			}
		});
		$(".select_all_row .unselect_row").parent().hide();
		$(".select_all_row .select_row").parent().show();
		$('.l-grid-hd-row').addClass('l-checked');
		$('.l-grid-row').addClass('l-selected');
	});
	
	$(".select_all_row .select_row").live('click',function(){
		// 点击取消，清空
		all_cust_ids = '';
		$(".select_all_row .unselect_row").parent().show();
		$(".select_all_row .select_row").parent().hide();
		$('.l-panel').find('.l-checked').removeClass('l-checked').end().find('.l-selected').removeClass('l-selected');
	});
	
	var dialogTag = document.createElement('div');
	dialogTag.oBody = document.createElement('div');
	dialogTag.oHead = document.createElement('div');
	dialogTag.className = 'customerTagDialog';
	dialogTag.oHead.className = 'head';
	dialogTag.oBody.className = 'body c-tag-list';
	dialogTag.appendChild(dialogTag.oHead);
	dialogTag.appendChild(dialogTag.oBody);
	dialogTag.style.display = 'none';
	document.body.appendChild(dialogTag);
	var tags = '';
	var tagsTimer = null;
	// 鼠标移动到列表中标签列触发事件
	$(".customer_tags_id").live('mouseover',function(){
		clearTimeout(tagsTimer);
		var $this = $(this),
			cust_id = $this.find('input[name=cust_id]').val(),
			offset = $this.offset(),
			width = $this.width(),
			val = $this.find('textarea').val();
		if (val == '') return;
		
		val = (new Function('return ' + val)) ();
		var ts = createTags(val);
		
		// 查找客户的表格里标签不能进行编辑
		var edit_tag_html = '';
		if(!is_search_customer){
			edit_tag_html = '<a class="edit" href="javascript:void(0);" onclick="change_customer_tag(\''+cust_id+'\')"><img src="http://'+static_host+'/img/icon-edit.gif"></a>'
		}
		dialogTag.oHead.innerHTML = '标签' + edit_tag_html;
		dialogTag.oBody.innerHTML = ts;
		dialogTag.style.top = offset.top + 'px';
		dialogTag.style.left = (offset.left + width) + 'px';
		dialogTag.style.zIndex = '10000'; // '查找客户'调用客户表格的时候，不设此值会被artdialog挡住
		dialogTag.style.display = '';
	}).live('mouseout', function() {
		tagsTimer = setTimeout(function() {
			dialogTag.style.display = 'none';
		}, 300);
	});
	$(dialogTag).mouseover(function() {
		clearTimeout(tagsTimer);
		$(this).show();
	}).mouseout(function() {
		var $this = $(this);
		tagsTimer = setTimeout(function() {
			$this.hide();
		}, 300);
	});
});

function createTags(j) {
	var tag = '';
	for (var i = 0, len = j.length; i < len; i ++) {
		var ji = j[i];
		tag += '<span class="tag" style="background-color: #' + ji.tag_color + ';" title="' + ji.tag_name + '" tag_id="' + ji.tag_id + '">' + ji.tag_name+ '</span>';
	}
	return tag;
}

// 获取ligerUI表格选中的客户ID
function getGridCheckedData(){
	// 选择了全选功能，返回所有客户ID
	if(all_cust_ids != ''){
		return all_cust_ids;
	}
	var rows = customer_grid.getCheckedRows();
    var str = "";
    $(rows).each(function (){
        str += this.cust_id + ",";
    });
    // 去除最后一个逗号
    str = str.substring(0, str.lastIndexOf(','));
    if(str == ''){
    	box.alert('请选择客户');
    	return false;
    }else {
    	return str;
    }
}
/************************表格插件工具条功能*************************/
// 表格工具条--客户池中的删除客户功能
function toolbar_delete_customer0(){
	cust_ids = getGridCheckedData();
	delete_customer0(cust_ids,0);
}
//表格工具条__客户池废弃/流失客户功能
function toolbar_abandon_customer0(){
	cust_ids = getGridCheckedData();
	abandon_customer(cust_ids,0);
}
//表格工具条__待联系废弃/流失客户功能
function toolbar_abandon_customer(){
	cust_ids = getGridCheckedData();
	abandon_customer(cust_ids,1);
}

//表格工具条--客户池中的升级会员客户功能
function toobar_customer_transact(){
	cust_ids = getGridCheckedData();
	customer_transact(cust_ids);
}
// 表格工具条--删除客户功能
function toolbar_delete_customer(){
	cust_ids = getGridCheckedData();
	delete_customer(cust_ids,0);
}
//表格工具条--合并客户
function toolbar_merger(types, m_value){
	cust_ids = getGridCheckedData();
	$.post('?controller=customer&action=checkowner&arg='+arg, {cust_ids: cust_ids}, function(data){
		if(data.num>0){
			var arr = cust_ids.split(',');
			box.confirm('警告！当前您选中的 <font color="blue">'+ arr.length +'</font> 个客户，存在属于其他 <font color="red">'+data.num+'</font> 个所有人的客户，确定继续？', function(){
				merger_customer(cust_ids,types, m_value);
			})
		}else{
			merger_customer(cust_ids,types, m_value);
		}
	}, 'json');
}
//表格工具条--待联系客户中升级会员客户功能
function toolbar_transact_customer(){
	cust_ids = getGridCheckedData();
	transact_customer_1(cust_ids);
}
// 表格工具条--彻底删除客户功能
function toolbar_thoroughly_delete(){
	cust_ids = getGridCheckedData();
	delete_customer(cust_ids,1);
}

// 表格工具条--客户中待联系转移客户功能
function toolbar_transfer_customer(){
	cust_ids = getGridCheckedData();
	transfer_customer(cust_ids);
}
//表格工具条--客户中废弃客户转移功能
function toolbar_transfer_customer0(){
	cust_ids = getGridCheckedData();
	transfer_customer0(cust_ids);
}
// 表格工具条--发送短信功能
function toolbar_send_sms(){
	cust_ids = getGridCheckedData();
	send_sms(cust_ids);
}

// 表格工具条--发送邮件功能
function toolbar_send_mail(){
	cust_ids = getGridCheckedData();
	send_mail(cust_ids);
}
// 表格工具条--流失会员中的发送短信功能
function toolbar_send_sms2(){
	cust_ids = getGridCheckedData();
	send_sms2(cust_ids);
}

// 表格工具条--流失会员中的发送邮件功能
function toolbar_send_mail2(){
	cust_ids = getGridCheckedData();
	send_mail2(cust_ids);
}
//表格工具条--废弃客户升级会员功能
function toolbar_retrieval_transact_customer(){
	cust_ids = getGridCheckedData();
	retrieval_transact_customer(cust_ids);
	
}
// 表格工具条--待联系中回收功能
function toolbar_retrieval0(){
	cust_ids = getGridCheckedData();
	retrieval_customer(cust_ids,0);
}
//表格工具条--废弃/流失中回收功能
function toolbar_retrieval1(){
	cust_ids = getGridCheckedData();
	retrieval_customer(cust_ids,1);
}
//表格工具条--还原功能
function toolbar_restore(){
	cust_ids = getGridCheckedData();
	restore_customer(cust_ids);
}

// 表格工具条--分配客户功能
function toolbar_assign_customer(new_assign){
	cust_ids = getGridCheckedData();
	if(new_assign == 1){
		assign_customer_new(cust_ids);
	}else{
	assign_customer(cust_ids);
	}
}
//表格工具条--会员取消会员功能
function toolbar_cancel_member0(){
	cust_ids = getGridCheckedData();
	cancel_member(cust_ids,0);
}
//表格工具条--会员待联系取消会员功能
function toolbar_cancel_member1(){
	cust_ids = getGridCheckedData();
	cancel_member(cust_ids,1);
}
//表格工具条--流失会员取消会员功能
function toolbar_cancel_member2(){
	cust_ids = getGridCheckedData();
	cancel_member(cust_ids,2);
}
// 表格工具条--添加联系记录功能
function toolbar_add_contact_record(){
	cust_ids = getGridCheckedData();
	add_contact_record(cust_ids); 
	showCalendar('EntTime', 'y-mm-dd');//显示待联系客户的类似于时间的控件
}

// 表格工具条--添加标签功能
function toolbar_add_tag(){
	cust_ids = getGridCheckedData();
	add_customer_tag(cust_ids);
}

// 表格工具条--删除标签功能
function toolbar_delete_tag(){
	cust_ids = getGridCheckedData();
	delete_customer_tag(cust_ids);
}


/************************针对客户操作的一些功能*************************/
// 客户池中的删除客户或者会员
function delete_customer0(cust_ids, is_thorough){
	if(!cust_ids){
    	return false;
    }else {
    	var tip = "确定操作？";
    	if(controller == 'customer' && (action == 'assigned' || action == 'pool')){
    		tip = "确定废弃？";
    	}
    	if(controller == 'member' && (action == 'assigned' || action == 'pool')){
    		tip = "确定流失？";
    	}
    	if(is_thorough == 1){
    		tip = "确定删除？";
    	}
    	box.confirm(tip,function(){
    		$.ajax({
    			url: "?controller="+controller+"&action=delete&arg="+arg,
    			type: "post",
    			data: {cust_ids:cust_ids,is_thorough:is_thorough},
    			dataType: "json",
    			success: function(res){
    				if(res.status == 'success'){
    					box.tip(res.msg,'success');
    					refresh_gird_list();
    				}else {
    					box.tip(res.msg,'error');
    				}
    			}
    		});
    	});
    }
}
//废弃或者流失客户操作
function abandon_customer(cust_ids, is_set){
	if(!cust_ids){
    	return false;
    }else {
    	var title="";
    	var type="";
    	if(controller == 'customer' && (action == 'assigned' || action == 'pool')){
    		title="废弃原因";
    		type=1;
    	}
    	if(controller == 'member' && (action == 'assigned' || action == 'pool')){
    		title="流失原因";
    		type=2;
    	}
    	$.dialog({
    		id:'reason',
    		padding:'10px 10px',
    		title:title,
    		lock:true,
    		button:[
    		        {name: '确定',
    			    	callback: function(){
    			    		var reason = $("input[name=reason]:checked").val();
    			    		if(!reason) return true;
    			    		var other = $("#other_reason").val();
    			    		if(reason == 'other_reason'){
    			    			if(other.length > 20){
    			    				$("#other_reason").formtip("字数不得超过20个");
    			    				return false;
    			    			}
    			    			if(other.length == 0){
    			    				$("#other_reason").formtip("请填写");
    			    				return false;
    			    			}
    			    		}
    			    		$.ajax({
    							type: "POST",
    							url: "?controller="+controller+"&action=abandon"+is_set+"&arg="+arg,
    							data: {reason:reason,other:other,cust_ids:cust_ids},
    							dataType: "json",
    							success: function(res){
    							//	alert(res);
    								if(res.status == 'success'){
    									box.tip(res.msg,'success');
    									//页面刷新
    									//location.reload();
    									refresh_gird_list();
    									art.dialog.list['reason'].close();
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
    		type: "post",
    		data: {type:type},
    		url: '?controller='+controller+'&action=abandon_reason'+is_set+'&arg=' + arg,
    		success: function(data){
    			if(ajax_isjson.test(data)){
    				var result = (new Function('return ' + data)) ();
    				if(result['status'] == 'error'){
    					data = result['msg'];
    				}
    			}
    			$.dialog.list['reason'].content(data);
    		}
    	});
    }
}	
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
 }
// 删除客户或者会员
function delete_customer(cust_ids, is_thorough){
	if(!cust_ids){
    	return false;
    }else {
    	var tip = "确定操作？";
    	if(controller == 'customer' && (action == 'assigned' || action == 'pool')){
    		tip = "确定废弃？";
    	}
    	if(controller == 'member' && (action == 'assigned' || action == 'pool')){
    		tip = "确定流失？";
    	}
    	if(is_thorough == 1){
    		tip = "确定删除？";
    	}
    	box.confirm(tip,function(){
    		$.ajax({
    			url: "?controller="+controller+"&action=delete"+ is_thorough +"&arg="+arg,
    			type: "post",
    			data: {cust_ids:cust_ids,is_thorough:is_thorough},
    			dataType: "json",
    			success: function(res){
    				if(res.status == 'success'){
    					box.tip(res.msg,'success');
    					refresh_gird_list();
    				}else {
    					box.tip(res.msg,'error');
    				}
    			}
    		});
    	});
    }
}
//客户池中的升级会员功能
function customer_transact(cust_ids){
		if(!cust_ids){
			return false;
		}else{
			box.confirm("确认升级会员",function(){
				$.ajax({
					url:"?controller="+controller+"&action=customer_update&arg="+arg,
					type: "post",
					data:{cust_ids:cust_ids},
					dataType: "json",
					success:function(res){
						if(res.status=='success'){
							box.tip(res.msg,'success');
							refresh_gird_list();
						}else{
							box.tip(res.msg,'error');
						}
					}
				})
			})
		}
}

function merger_customer(cust_ids,types, m_value){
	if(!cust_ids || !types || !m_value){
		return false;
	}else{
		$.ajax({
			url: "?controller="+controller+"&action=merger&arg="+arg,
			type: "post",
			data: {cust_ids:cust_ids,types:types,m_value:m_value},
			dataType: "json",
			success: function(res){
				if(res.status == 'success'){
					box.tip(res.msg,'success');
					setTimeout("location.reload()",1000);
				}else {
					box.tip(res.msg,'error');
				}
			}
		});
	}
}
// 回收客户
function retrieval_customer(cust_ids,is_set){
	if(!cust_ids){
    	return false;
    }
	box.confirm("确定收回？",function(){
		$.ajax({
			url: "?controller="+controller+"&action=retrieval"+is_set+"&arg="+arg,
			type: "post",
			data: {cust_ids:cust_ids},
			dataType: "json",
			success: function(res){
				if(res.status == 'success'){
					box.tip(res.msg,'success');
					refresh_gird_list();
				}else {
					box.tip(res.msg,'error');
				}
			}
		});
	});
}
//还原客户/会员
function restore_customer(cust_id){
	if(!cust_ids){
		return false;
	}
	box.confirm("确认还原？",function(){
		$.ajax({
			url: "?controller=customer&action=restore&arg="+arg,
			type: "post",
			data: {cust_ids:cust_ids},
			dataType: "json",
			success: function(res){
				if(res.status == 'success'){
					box.tip(res.msg,'success');
					refresh_gird_list();
				}else {
					box.tip(res.msg,'error');
				}
			}
		});
	});
}
//废弃中升级会员功能
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
									refresh_gird_list();
			    				art.dialog.list['retrieval_transact'].close();
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
		url: '?controller='+controller+'&action=transact_customer&arg=' + arg,
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

//取消会员处理
function cancel_member(cust_ids,is_set){
	if(!cust_ids){
		return false;
	}
	box.confirm("确认取消会员",function(){
		$.ajax({
			url:"?controller="+controller+"&action=cancel_member"+is_set+"&arg="+arg,
			type: "post",
			data:{cust_ids:cust_ids},
			dataType: "json",
			success:function(res){
				if(res.status=='success'){
					box.tip(res.msg,'success');
					refresh_gird_list();
				}else{
					box.tip(res.msg,'error');
				}
			}
		})
	})
}
// 客户池待联系转移客户
function transfer_customer(cust_ids){
	if(!cust_ids){
    	return false;
    }else{
	$.dialog({
		id: 'transferCustomer',
		padding: '10px 10px',
		title: '转移客户',
		lock: true,
		button: [
		    {
		    	name: '确定',
		    	callback: function(){
		    	//	var transfer = $("input[name=transfer]:checked").val();
		    	//	if(!transfer) return true;
		    		var id6d = $("#transfer_id6d").val();
		    	//	if(transfer == 'worker'){
		    			if(id6d == 0){
		    				$("#transfer_id6d").formtip("请选择一个工号");
		    				return false;
		    			}
		    	//	}
		    			if(!id6d) return true;
		    		$.ajax({
						type: "POST",
						url: "?controller="+controller+"&action=update_transfer_customer&arg="+arg,
						data: {cust_ids:cust_ids,id6d:id6d},
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								box.tip(res.msg,'success');
								refresh_gird_list();
		    					art.dialog.list['transferCustomer'].close();
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
		url: '?controller='+controller+'&action=transfer_customer&arg=' + arg,
		success: function(data) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			$.dialog.list['transferCustomer'].content(data);
		}
	});
   }
}
//客户池废弃转移客户
function transfer_customer0(cust_ids){
	if(!cust_ids){
    	return false;
    }else {
	$.dialog({
		id: 'transferCustomer',
		padding: '10px 10px',
		title: '转移客户',
		lock: true,
		button: [
		    {
		    	name: '确定',
		    	callback: function(){
		    	//	var transfer = $("input[name=transfer]:checked").val();
		    	//	if(!transfer) return true;
		    		var id6d = $("#transfer_id6d").val();
		    		
		    	//	if(transfer == 'worker'){
		    			if(id6d == 0){
		    				$("#transfer_id6d").formtip("请选择一个工号");
		    				return false;
		    			}
		    	//	}
		    		if(!id6d) return true;
		    		$.ajax({
						type: "POST",
						url: "?controller="+controller+"&action=update_transfer_customer0&arg="+arg,
						data: {cust_ids:cust_ids,id6d:id6d},
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								box.tip(res.msg,'success');
								refresh_gird_list();
		    					art.dialog.list['transferCustomer'].close();
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
		url: '?controller='+controller+'&action=transfer_customer0&arg=' + arg,
		success: function(data) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			$.dialog.list['transferCustomer'].content(data);
		}
	});
   }
}
// 表格属性设置
function field_show_set(){
	$.dialog({
		id: 'field_set',
		padding: '10px 10px',
		title: '属性设置',
		lock: true,
		button: [
		    {
		    	name: '保存',
		    	callback: function(){
		    		var field_ids = '';
		    		$("#field_selected_list").find('option').each(function(){
		    			field_ids += $(this).val() + ',';
		    		});
		    		field_ids = field_ids.substring(0, field_ids.lastIndexOf(','));
		    		$.ajax({
						type: "POST",
						url: "?controller="+controller+"&action=update_field_set&arg="+arg,
						data: {field_ids:field_ids},
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								box.tip(res.msg,'success');
								art.dialog.list['field_set'].close();
								setTimeout("location.reload()",1000);
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
		url: '?controller='+controller+'&action=field_set&arg=' + arg,
		success: function(data) {
			$.dialog.list['field_set'].content(data);
		}
	});
}
//分配客户
function assign_customer(cust_ids){
	if(!cust_ids){
    	return false;
    }
	$.dialog({
		id: 'assignCustomer',
		padding: '10px 10px',
		title: '分配客户',
		lock: true,
		button: [
		    {
		    	name: '确定',
		    	callback: function(){
		    		var id6d = $("#assign_id6d").val();
		    		var contact_time = $("#contact_date").val();
		    		if(id6d == 0){
	    				$("#assign_id6d").formtip("请选择一个工号");
	    				return false;
	    			}
		    		if(!$("#assign_cust").html())return true;
		    		$.ajax({
						type: "POST",
						url: "?controller="+controller+"&action=update_assign_customer&arg="+arg,
						data: {cust_ids:cust_ids,id6d:id6d,contact_time:contact_time},
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								box.tip(res.msg,'success');
								refresh_gird_list();
		    					art.dialog.list['assignCustomer'].close();
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
		url: '?controller='+controller+'&action=assign_customer&arg=' + arg,
		success: function(data) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			$.dialog.list['assignCustomer'].content(data);
		}
	});
}

//分配客户-新
function assign_customer_new(cust_ids){
	if(!cust_ids){
    	return false;
    }else{
	$.dialog({
		id: 'assignCustomerNew',
		padding: '10px 10px',
		title: '分配客户-新',
		lock: true,
		button: [
		    {
		    	name: '确定',
		    	callback: function(){
		    		var contact_time = $("#contact_date").val();
		    		var cust = $("#customer_li").serialize();
					var temp1 = /^-[0-9]*[1-9][0-9]*$/;
	  				var temp2 = /^-?[0-9]\d*$/;
					var falgs = false;
		    		$(".customer-all-list .abled").each(function(){
		    			 if($(this).val().replace(/[ ]/g,"")==''){
							$(this).formtip("不能为空")
							falgs = true;
							return false;
						}else if(temp1.test($(this).val())== true){
							$(this).formtip("不能填写负数");
							falgs = true;
							return false;
						}else if(temp2.test($(this).val())== false){
					        $(this).formtip("只能填写整数");
							falgs = true;
							return false;
						}
		    		})
					if(falgs){
						return false;
					}
		    		if($("#cust_con").html() && !cust){
		    			box.alert("未分配客户");
    					return false;
		    		}else if(!$("#cust_con").html()){
		    			return true;
		    		}
		    		var data = cust+"&contact_time="+contact_time+"&cust_ids="+cust_ids;
		    		$.ajax({
						type: "POST",
						url: "?controller="+controller+"&action=update_assign_customer_new&arg="+arg,
						data: data,
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								box.tip(res.msg,'success');
								refresh_gird_list();
		    					art.dialog.list['assignCustomerNew'].close();
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
		type:'post',
		url: '?controller='+controller+'&action=assign_customer_new&arg=' + arg,
		data:{cust_ids:cust_ids},
		success: function(data) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			$.dialog.list['assignCustomerNew'].content(data);
		}
	});
   }
}

// 添加联系记录
function add_contact_record(cust_ids){
	if(!cust_ids){
    	return false;
    }
	$.dialog({
		id: 'contact_add',
		width: '500px',
		title: '添加联系记录',
		lock: true,
		ok: function(){
			if($("#contact_customer").val() == ""){
				$('#contact_customer').formtip("请填写对应客户");
				return false;
			}		
			if($("#contact_date").val() == ""){
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
						refresh_gird_list();
						if(response.response_cust_id != "false"){
							var notice = $.dialog({
								id: 'notice',
								width: '200px',
								height: '80px;',
								title: '注意',
								content: '没有下次联系任务，请添加！',
								lock: true,
								close: function(){
									contact_next_add_ref(response.response_cust_id);
								},
								button:[{
									name: "确定",
									callback: function(){
										contact_next_add_ref(response.response_cust_id);
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
		data: {cust_ids:cust_ids},
		success: function(data){
			$.dialog.list['contact_add'].content(data);
		}
	});
}
//添加下次联系记录
function contact_next_add_ref(cust_ids){
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
									refresh_gird_list();
									if(response.response_cust_id != "false"){
										var notice = $.dialog({
											id: 'notice',
											width: '200px',
											height: '80px;',
											title: '注意',
											content: '没有下次联系任务，请添加！',
											lock: true,
											close: function(){
												contact_next_add_ref(response.response_cust_id);
											},
											button:[{
												name: "确定",
												callback: function(){
													contact_next_add_ref(response.response_cust_id);
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
			data: {cust_ids:cust_ids},
			success: function(data){
				next_contact.content(data);
			}
		});
}
// 发送短信
function send_sms(cust_ids){
	if(!cust_ids){
    	return false;
    }
	var myDialog = $.dialog({
		title: '发送短信',
	/*	fixed: true,*/
		padding: '5px 10px',
		id: 'sendSmsDialog',
		lock:true
	});
	$.ajax({
		type: 'POST',
		data: {cust_ids:cust_ids},
		url: '?controller='+controller+'&action=send_sms&arg='+arg,
		success: function( data ) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			art.dialog.list['sendSmsDialog'].content(data);
		}
	});
}

// 发送邮件
function send_mail(cust_ids){
	if(!cust_ids){
    	return false;
    }
	var myDialog = $.dialog({
		title: '发送邮件',
		/*fixed: true,*/
		padding: '5px 10px',
		id: 'sendEmailDialog',
		lock:true
	});
	$.ajax({
		type: 'POST',
		data: {cust_ids:cust_ids},
		url: '?controller='+controller+'&action=send_mail&arg='+arg,
		success: function( data ) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			art.dialog.list['sendEmailDialog'].content(data);
		}
	});
}

// 流失会员中的发送短信
function send_sms2(cust_ids){
	if(!cust_ids){
    	return false;
    }
	var myDialog = $.dialog({
		title: '发送短信',
		/*fixed: true,*/
		padding: '5px 10px',
		id: 'sendSmsDialog',
		lock:true
	});
	$.ajax({
		type: 'POST',
		data: {cust_ids:cust_ids},
		url: '?controller='+controller+'&action=send_sms2&arg='+arg,
		success: function( data ) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			art.dialog.list['sendSmsDialog'].content(data);
		}
	});
}

// 流失会员中的发送邮件
function send_mail2(cust_ids){
	if(!cust_ids){
    	return false;
    }
	var myDialog = $.dialog({
		title: '发送邮件',
		/*fixed: true,*/
		padding: '5px 10px',
		id: 'sendEmailDialog',
		lock:true
	});
	$.ajax({
		type: 'POST',
		data: {cust_ids:cust_ids},
		url: '?controller='+controller+'&action=send_mail2&arg='+arg,
		success: function( data ) {
			if(ajax_isjson.test(data)){
				var result = (new Function('return ' + data)) ();
				if(result['status'] == 'error'){
					data = result['msg'];
				}
			}
			art.dialog.list['sendEmailDialog'].content(data);
		}
	});
}

//把所有人分类写入cookie
function cookie_search_owner(that){
	$.cookie('search_owner', $(that).val());
}

/**********高级搜索**********/
//添加搜索条件（在各自模版中）
//删除搜索条件
function remove_search(that){
	$(that).parent().fadeOut(500,function(){
		$(that).parent().remove();
	});
	$(".filter-bar-bd .btn-hidden").hide();
	$(".filter-bar-bd .btn-hidden").show();	
}

//限制搜索条件上限
function max_search(){
	if($("#add_search_form .row_s span").length > 8){
		box.tip('搜索条件已达上限！', 'error', 2);
		return 1;
	}
}
/**********高级搜索结束**********/
function getTags(){
	var tag_ids = '';
	$("#"+selected_tag).find('.tag').each(function(){
		tag_ids += $(this).attr('tag_id') + ',';
	});
	// 去除最后一个逗号
	tag_ids = tag_ids.substring(0, tag_ids.lastIndexOf(','));
	return tag_ids;
}

// 调用表格搜索
function grid_search(ctype,ok,orders){

	var tag_ids = getTags();
	var gridManager = $("#"+customerGridId).ligerGetGridManager();
	if(ok == 1){
		var ck = function(){return false;}
		var show = false;
		var orders = '';
		
		//以下4个为合并专用字段
		var filters = 'no';//默认搜索不过滤重复数据
		var merge_field = '';
		var merge_type = ''; //属性类型
		var merge_value = '';
	}else{
		var ck = function(){return true;}
		var show = true;
		
		//以下4个为合并专用字段
		var filters = 'yes';//合并操作需要过滤重复数据
		var merge_field = $("#search_f").val();
		var merge_type = $("#search_f option:selected").attr('type'); //属性类型
		var merge_value = $("#search_mvalue").val();
	}
	var search_field = $("#search_field").val();
   	var search_text = $("#search_text").val();
   	var field_type = $("#search_field option:selected").attr('type'); //属性类型
   	var filter = FH.sql || null; //筛选器
   	var search_owner = $("#search_owner").val();//所有人分类
   	
   	//获取所有查询条件，转为json
   	var search_type = '';  //类型
   	var search_field = ''; //字段
   	var search_text = '';  //内容
   	var search_arr_temp = [];
   	var search_arr = [];
   	$("#add_search_form span").each(function(){
   		search_type  = $(this).find("select option:selected").attr("type");
   		search_field = $(this).find("select option:selected").attr("value");
   		search_text  = $(this).find("input").val().trim();
   		search_arr_temp = [];//清空临时数组
   		search_arr_temp.push(search_type);
   		search_arr_temp.push(search_field);
   		search_arr_temp.push(search_text);
   		search_arr.push(search_arr_temp);
   	});
   	var searchs = JSON.stringify(search_arr);
   	
    var customer_type = $("#customer_type option:selected").val(); //查找客户页面独有的选项，选择客户来源，如：待联系客户，待联系会员，流失会员
   	// 是否是点击查询按钮来查询的，列表的页数要从第一页开始
    if(ctype == 'first'){
    	gridManager.changePage(ctype);
   	}
    gridManager.setOptions({
   		parms: [{name: 'tag_ids', value: tag_ids}, // 根据标签ID
   		        {name: 'search_field', value: search_field},
   				{name: 'search_text', value: search_text},
   				{name: 'field_type', value: field_type},
   				{name: 'customer_type', value: customer_type},
   				{name: 'filters', value: filters},
				{name: 'filter', value: filter},
				{name: 'merge_field', value: merge_field},
				{name: 'merge_type', value: merge_type},
				{name: 'merge_value', value: merge_value},
				{name: 'search_owner', value: search_owner},	//所有人分类
				{name: 'searchs', value: searchs}
   				],
   		sortName: orders,
   	    isChecked: ck,
   	    onAfterShowData: function(data){
   	    	if(ok==2){
   	    		display_all_select(show);
   	    		ok = 1;//给ok重新赋值否默认搜索也会显示一下全选
   	    	}
		}
   	});
    $(".l-grid-body2").addClass("l-grid-body");
    $("#no_data_div").remove();
   	gridManager.loadData(true);
}

// 更改客户标签(单个客户)
function change_customer_tag(cust_id){
	$('.customerTagDialog').hide();
	$.dialog({
		id: 'change_tag',
		padding: '10px 10px',
		title: '更改标签',
		lock: true,
		ok: function(){
			var tag_ids = '';
			$("#tag_used").find('.tag').each(function(){
				tag_ids += $(this).attr('tag_id') + ',';
			});
			// 去除最后一个逗号
			tag_ids = tag_ids.substring(0, tag_ids.lastIndexOf(','));
			$.ajax({
				url: '?controller='+controller+'&action=update_change_tag&arg='+arg,
				type: 'POST',
				data: {cust_id:cust_id,tag_ids:tag_ids},
				dataType: "json",
				success: function(res) {
					if(res.status == 'success'){
						box.tip(res.msg,'success');
						refresh_gird_list();
    					art.dialog.list['change_tag'].close();
					}else {
						box.tip(res.msg,'error');
					}
				}
			});
			return false;
		},
		okVal: '确定',
		cancel: true,
		cancelVal: '取消'
	});
	$.ajax({
		url: '?controller='+controller+'&action=change_tag&arg='+arg,
		type: 'POST',
		data: {cust_id:cust_id},
		success: function(data) {
			$.dialog.list['change_tag'].content(data);
		}
	});
}

// 成交客户，转为会员
function transact_customer(cust_ids){
	if(!cust_ids){
    	return false;
    }
	$.dialog({
		id: 'transactCustomer',
		padding: '10px 10px',
		title: '转移客户',
		lock: true,
		button: [
		    {
		    	name: '确定',
		    	callback: function(){
		    		var transfer = $("input[name=transfer]:checked").val();
		    		var id6d = $("#transfer_id6d").val();
		    		if(transfer == 'worker'){
		    			if(id6d == 0){
		    				$("#transfer_id6d").formtip("请选择一个工号");
		    				return false;
		    			}
		    		}
		    		$.ajax({
						type: "POST",
						url: "?controller="+controller+"&action=update_transfer_customer&arg="+arg,
						data: {transfer:transfer,cust_ids:cust_ids,id6d:id6d},
						dataType: "json",
						success: function(res){
							if(res.status == 'success'){
								box.tip(res.msg,'success');
								refresh_gird_list();
		    					art.dialog.list['transferCustomer'].close();
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
		url: '?controller='+controller+'&action=transact_customer&arg=' + arg,
		success: function(data) {
			$.dialog.list['transactCustomer'].content(data);
		}
	});
}

//待联系客户中升级会员功能
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
								refresh_gird_list();
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


// 批量添加标签
function add_customer_tag(){
	if(!cust_ids){
    	return false;
    }
	$.dialog({
		id: 'add_tag',
		padding: '10px 10px',
		title: '添加标签',
		lock: true,
		ok: function(){
			var tag_ids = '';
			$("#grid_tag_selected").find('.tag').each(function(){
				tag_ids += $(this).attr('tag_id') + ',';
			});
			// 去除最后一个逗号
			tag_ids = tag_ids.substring(0, tag_ids.lastIndexOf(','));
			if(tag_ids == ''){
				art.dialog.list['add_tag'].close();
				return false;
			}
			$.ajax({
				url: '?controller='+controller+'&action=update_add_tag&arg='+arg,
				type: 'POST',
				data: {cust_ids:cust_ids,tag_ids:tag_ids},
				dataType: "json",
				success: function(res) {
					if(res.status == 'success'){
						box.tip(res.msg,'success');
						refresh_gird_list();
    					art.dialog.list['add_tag'].close();
					}else {
						box.tip(res.msg,'error');
					}
				}
			});
			return false;
		},
		okVal: '确定',
		cancel: true,
		cancelVal: '取消'
	});
	$.ajax({
		url: '?controller='+controller+'&action=add_tag&arg='+arg,
		type: 'POST',
		data: {cust_ids:cust_ids},
		success: function(data) {
			$.dialog.list['add_tag'].content(data);
		}
	});
}

// 批量删除标签
function delete_customer_tag(){
	if(!cust_ids){
    	return false;
    }
	$.dialog({
		id: 'delete_tag',
		padding: '10px 10px',
		title: '删除标签',
		lock: true,
		ok: function(){
			var tag_ids = '';
			$("#grid_tag_selected").find('.tag').each(function(){
				tag_ids += $(this).attr('tag_id') + ',';
			});
			// 去除最后一个逗号
			tag_ids = tag_ids.substring(0, tag_ids.lastIndexOf(','));
			if(tag_ids == ''){
				art.dialog.list['delete_tag'].close();
				return false;
			}
			$.ajax({
				url: '?controller='+controller+'&action=update_delete_tag&arg='+arg,
				type: 'POST',
				data: {cust_ids:cust_ids,tag_ids:tag_ids},
				dataType: "json",
				success: function(res) {
					if(res.status == 'success'){
						box.tip(res.msg,'success');
						refresh_gird_list();
    					art.dialog.list['delete_tag'].close();
					}else {
						box.tip(res.msg,'error');
					}
				}
			});
			return false;
		},
		okVal: '确定',
		cancel: true,
		cancelVal: '取消'
	});
	$.ajax({
		url: '?controller='+controller+'&action=delete_tag&arg='+arg,
		type: 'POST',
		data: {cust_ids:cust_ids},
		success: function(data) {
			$.dialog.list['delete_tag'].content(data);
		}
	});
}

// 如果存在$("#"+customerGridId)，即有表格列表，则刷新表格列表；否则不刷新列表
function refresh_gird_list(){
	if($("#"+customerGridId).length != 0){
		// 异步刷新列表
		var gridManager = $("#"+customerGridId).ligerGetGridManager();
		gridManager.loadData(true);
	}
}

// 导出客户
// status类型：1，客户池或者会员池里；2，待联系的；3，废弃或者流失的
function export_customer(status){
	//获取上次查询时的条件
	var gridManager = $("#"+customerGridId).ligerGetGridManager();
	var param = gridManager.getLoadParam();
	var where = '';
	for(var i in param){
		where += '&' + param[i].name + '=' + param[i].value;
	}
	$.ajax({
		url: '?controller='+controller+'&action=export_customer'+ status +'&arg='+arg+'&status='+status,
		type: 'POST',
		data: where,
		dataType: 'json',
		success: function(res) {
			if(res.status == 'success'){
				location.href = "?controller=download&action=download&arg="+arg+"&id="+res.id;
			}else {
				box.tip(res.msg,'error');
			}
		}
	});
}


//表格对象的全局变量
var grid_obj = null;
var is_search_customer = false;
// 查找客户表格生成后，传递表格对象过来
function init_search(obj){
	grid_obj = obj;
	is_search_customer = true;
}
// 查找客户选择一个客户后调用的回调函数
var search_callback = null;
function select_customer(cust_id,cust_name){
	var json = {"id":cust_id,"name":cust_name};
	// 清掉表格
	if(grid_obj){
		grid_obj.destroy();
	}
	// 关闭对话框
	$.dialog.list['searchCustomer'].close();
	search_callback(json);

	$('#CN-INPUT .reset')[0] && ($('#CN-INPUT .reset')[0].style.display = 'block');
}

// 其他地方查找客户并选择
function crm_search_customer(callback){
	search_callback = callback;
	$.dialog({
		id: 'searchCustomer',
		padding: '10px 10px',
		title: '查找客户',
		lock: true,
		//暂时不做选多个客户
//		ok: function(){
//			var cust_info = getGridChecked(grid_obj);
//			if(!cust_info){
//				return false;
//			}else {
//				// 调用回调函数
//				callback(cust_info);
//				// 销毁表格对象
//				if(grid_obj){
//					grid_obj.destroy();
//				}
//			}
//		},
		cancel: function(){
			if(grid_obj){
				grid_obj.destroy();
			}
		}
//		okVal: '确定'
	});
	
	$.ajax({
		url: '?controller=global&action=search_customer&arg='+arg,
		success: function(data) {
			$.dialog.list['searchCustomer'].content(data);
		}
	});
}

// 获取ligerUI表格选中的客户ID和名称
// grid_obj：表格对象
function getGridChecked(grid_obj){
	//选中的客户信息
	var rows = grid_obj.getCheckedRows();
	var res = new Array();
	var json = null;
	
    $(rows).each(function (){
    	//客户ID和客户名
    	json = {"id":this.cust_id,"name":this.cust_name};
		res.push(json);
    });
    if(res == ''){
    	box.alert('请选择客户');
    	return false;
    }else {
    	return res;
    }
}

/***************************列表所有客户全选功能*****************************/
// 打开每页列表时候初始化全选功能
// total记录总条数
// status 1:客户池或者会员池;2:待联系客户或者待联系会员;3:废弃客户或者流失会员
function init_all_select(total,status){
	// 列表为空，不显示全选工具条，并删除以前存在的
	if(total == 0){
		$(".select_all_row").remove();
		if($("#no_data_div").length == 0){
			var html = '<div id="no_data_div" style="text-align:center;line-height:30px">没有符合查询条件的记录！</div>';
			$(".l-grid-body2").removeClass("l-grid-body");
			$("#customer_gridgrid").css("height","30px");
			$(".l-panel-body").append(html);
		}
		
		return false;
	}
	$(".select_all_row").remove();
	$(".l-panel-bwarp").before('<div class="select_all_row" style="display:none;"><span><a class="unselect_row" status="'+status+'" href="javascript:void(0);">同时勾选全部分页共  '+total+' 个客户</a></span><span style="display:none;">已勾选'+total+'个客户，<a class="select_row" href="javascript:void(0);">取消勾选</a></span></div>');
}

// ‘全选’工具条
// is_show 是否显示
function display_all_select(is_show){
	if(is_show){
		$(".select_all_row .unselect_row").parent().show();
		$(".select_all_row .select_row").parent().hide();
		$(".select_all_row").fadeIn();
	}else {
		// 隐藏全选工具条同时全部ID清空
		all_cust_ids = '';
		$(".select_all_row").fadeOut();
		$(".select_all_row .unselect_row").parent().show();
		$(".select_all_row .select_row").parent().hide();
	}
}


//查看客户
function view_show(cust_id, cust_name) {
    $.dialog({
		id: 'view_cust',
		width: '737px',
		title: '客户信息查看',
		lock: true,
		/*okVal: '呼叫',
		ok: function(){
			show_phone(cust_id,cust_name);
			return false;
		},*/
		button:[
				/*{
					name:'呼叫'
				},*/
				{name:'上一条',
					callback:function(){
						cust_id = c.getPrevCustomer(cust_id);
						if(!cust_id){
							return false;
						}
						this.content('<iframe id="customer_view" src="http://?controller=view&action=custinfo&argcust_id= frameborder="0" width="735" height="426"></iframe>');
						return false;
						}
				},
				{name:"下一条",
				     callback:function(){
						cust_id =  c.getNextCustomer(cust_id);
						if(!cust_id){
							return false;
						}
				    	this.content('<iframe id="customer_view" src="http://?controller=view&action=custinfo&arg=&cust_id='+cust_id+'" frameborder="0" width="735" height="426"></iframe>');
				    	return false;
					}
				}],
		content: '<iframe id="customer_view" src="/'+cust_id+'" frameborder="0" width="735" height="426"></iframe>'
	});
}

var quanjutemp = [];
//链接随意拨
function show_phone(cust_id, cust_name){
	//同步后台控制器获取属性和属性值
	$.ajax({
		type: "post",
		data: {cust_id:cust_id},
		dataType: "json",
		url: '?controller='+controller+'&action=getFields&arg='+arg,
		success: function(data) {
			quanjutemp = data;
			var have_mobile = 0;
			var html = [];
			//将从控制器获取到的属性英文名存进option中的value，中文名显示
			for(var i in data['fields']){
				if(i == 'mobile'){
					html.push('<option value='+i+' selected="selected">'+data['fields'][i]+'</option>');
					have_mobile = 1;
				}else{
					html.push('<option value='+i+'>'+data['fields'][i]+'</option>');
				}
			}
			//如果基本属性mobile手机被放进了垃圾箱中就获取收个属性名，否则就获取‘mobile’
			var moddle_temp = '';
			if(have_mobile == 0){
				for(var i in data['fields']){
					moddle_temp = i;
					break;
				}
			}else{
				moddle_temp = 'mobile';
			}
			//组合成一个弹出框页面
			var dhtml = '<div style="padding-top:6px">呼叫号码：<select id="search_phone" style="width:50px" onchange="get_value(this.value)">'+html.join(' ')+'</select>  <input id="mvalue" class="comm-tbox-1" type="text" value="'+data['customer'][moddle_temp]+'"></div>';
			dhtml += '<div style="padding-top:5px;padding-bottom:3px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提示：属性修改后自动保存！</div><div style="padding-top:1px;padding-bottom:1px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:red">不可同时使用工作平台随意拨和软外拨！</b></div>'
			$.dialog({
				title: '客户呼叫',
				fixed: true,
				id: 'showphone',
				padding: '5px 10px',
				lock:true,
				content:dhtml,
				ok: function () {
					var temp = $("#search_phone").val();
					//判断input框中的号码是否为空
					if($("#mvalue").val() == ''){
						$('#mvalue').formtip("请先设置号码");
						return false;
					}else if(!(/^[0-9]{3,21}$/.test($("#mvalue").val()))){  //判断input框中的号码格式是否符合
							$('#mvalue').formtip("号码格式不正确");
							return false;
						}else{
							//判断原有的数据和input框中的数据是否一样
							if(data['customer'][temp] != $("#mvalue").val()){
								var number = $("#mvalue").val();
								//判断原先号码是否为空，如果为空的话，修改号码就不弹出下面的box框
//								if(data['customer'][temp]){
									//不一样就弹出一个界面判断是否要修改客户资料
//									box.confirm('是否修改客户资料',function(){
										//将新的客户资料信息存进数据库中
										$.ajax({
											type: "post",
											data: {custid:cust_id,number:number,phone:temp},
											dataType: "json",
											url: '?controller='+controller+'&action=setCustmoer&arg='+arg,
											success: function(response) {
												try{
													var line = 0;
													var list = customer_grid.getData();
													for(k in list){
														if(list[k].cust_id == cust_id){
															break;
														}
														line++;
													}
													customer_grid.updateCell('mobile',number,line);
													
												}catch(e){}
												out_call(cust_id,cust_name,number);
											}
										});
//									});
//								}
//								else{
//									//将新的客户资料信息存进数据库中
//									$.ajax({
//										type: "post",
//										data: {custid:cust_id,number:number,phone:temp},
//										dataType: "json",
//										url: '?controller='+controller+'&action=setCustmoer&arg='+arg,
//										success: function(response) {
//											//修改成功后让其跳转页面
//											var callUrl = 'http://'+call_host+'/?module=implant&action=call&mobile='+number+'&cust_id='+cust_id;
//											var callUrlSrc = '?controller=index&action=open&arg='+ arg +'&sys=call&url='+URLEncode(callUrl);
//											window.open(callUrlSrc, "newwindow", "height=435, width=600, top=100,left=400, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"); 
//										}
//									});
//								}
							}else{
								out_call(cust_id,cust_name);
							}
						}
			    },
			    okVal: '呼叫'
//			    cancelVal: '取消',
//			    cancel: true //为true等价于function(){}
			});
		}
	});
}

//软外拨弹出层
var hash = '';
var callUrlSrc = '';
var outcall = null;
function out_call(cust_id,cust_name,mobile){
	if(!mobile){ mobile=$("#mvalue").val(); }
	hash = "#{'mobile':'"+mobile+"','cust_id':'"+cust_id+"','cust_name':'"+cust_name+"','operate':'outcall'}";
	if(!outcall){
		outcall = $.dialog({
			title: '客户呼叫',
			fixed: true,
			id: 'outcall',
			lock: true,
			esc: false,
			content: '',
			show: false,
			close: function(){
				this.hide();
				hash = "#{'mobile':'"+mobile+"','cust_id':'"+cust_id+"','cust_name':'"+cust_name+"','operate':'close'}";
				//outcall.content('<iframe id="outcall_iframe" name="outcall_iframe" width="600px" height="435px" src="'+callUrlSrc + hash+'"></iframe>');
				$("#outcall_iframe").attr("src",callUrlSrc+hash);
				return false;
			}
		});
		outcall.hide();
		$.ajax({
			url: '?controller=index&action=outCallUrl&arg='+ arg,
			type: "POST",
			data: {mobile: mobile, cust_id:cust_id, cust_name:cust_name},
			dataType: "json",
			success: function(res){
				if(res.status == 'success'){
					callUrlSrc = res.callUrlSrc;
					outcall.content('<iframe id="outcall_iframe" name="outcall_iframe" frameborder="0" width="600px" height="435px" src="'+callUrlSrc+hash+'"></iframe>');
					//$("#outcall_iframe").attr("src",callUrlSrc+hash);
					outcall.show().position('50%','50%');
				}
			}
		});
	}else{
		$("#outcall_iframe").attr("src",callUrlSrc+hash);
		outcall.show().position('50%','50%');
	}
}

//嵌入链接随意拨中弹出框的input标签中的值
function get_value(value){
	$("#mvalue").val(quanjutemp['customer'][value]);
}

var self = null;
//根据跳转地址打开新窗口
function jump_url(cust_id,mobile){
	if(!mobile){ mobile=$("#mvalue").val(); }
	if(self == null||self == undefined){
		var callUrl = 'http://'+call_host+'/?module=implant&action=call&mobile='+mobile+'&cust_id='+cust_id;
		var callUrlSrc = '?controller=index&action=open&arg='+ arg +'&sys=call&url='+URLEncode(callUrl);
//		self = window.showModelessDialog(callUrlSrc,cust_id,"height:435px;width:600px;center:yes;help:no;resizable:no;status:no;scroll:no;");
		self = window.open(callUrlSrc, "newwindow", "height=435px, width=600px, top=100px,left=400px, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"); 
	}else if(self.closed == false){
		self.focus();
		return true;
	}else{
		var callUrl = 'http://'+call_host+'/?module=implant&action=call&mobile='+mobile+'&cust_id='+cust_id;
		var callUrlSrc = '?controller=index&action=open&arg='+ arg +'&sys=call&url='+URLEncode(callUrl);
		self = window.open(callUrlSrc, "newwindow", "height=435px, width=600px, top=100px,left=400px, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");
	}
}
//转换内容为urlencode编码
function URLEncode(clearString){
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9-_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
        output += match[1];
      x += match[1].length;
    } else {
      if (clearString.substr(x, 1) == ' ') {
        //原文在此用 clearString[x] == ' ' 做判断, 但ie不支持把字符串当作数组来访问, 
        //修改后两种浏览器都可兼容 
        output += '+';
      }
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}

//点击筛选器
function makeselect_show(){
	$.dialog({
		id: 'filter_cust',
		width: '730px',
		top: '20px',
		title: '筛选器',
		lock: true
	});
	$.ajax({
		url: '?controller=global&action=filter&arg='+arg,
		success: function(data) {
			$.dialog.list['filter_cust'].content(data);
			FH.show();
		}
	});
}

//点击添加客户(2014-07-24 修改 By 唐有炜)
function customer_add() {
    $.dialog({
        id: 'filter_cust',
        width: '630px',
        top: '0px',
        title: '添加客户',
        lock: true
    });
    $.ajax({
        url: '/Plugins/Customer/Customer/Add',
        success: function (data) {
            $.dialog.list['filter_cust'].content(data);
            FH.show();
        }
    });
}




/***************************筛选器*****************************/
var FH = {
	TabList:["筛选","下次联系重点客户","紧急联系客户"],
	TabState:{"default":0,"isEdit":0,"limit":6,"start":0},
	showLimit:{"size":3,"isLimit":true},	//限制显示条数，防止数据过多显示页面太长
	province:['安徽','北京','重庆','福建','甘肃','广东','广西','贵州','海南','河北','黑龙江','河南','湖北','湖南','江苏','江西','吉林','辽宁','宁夏','内蒙古','青海','上海','山西','山东','四川','陕西','天津','西藏','新疆','云南','浙江','台湾','香港','澳门','国外','其它地区'],
	pcode: [34,11,50,35,62,44,45,52,46,13,23,41,42,43,32,36,22,21,64,15,63,31,14,37,51,61,12,54,65,53,33,71,81,82,109,110],
	regexp:{"integer":"\/^[+-]?\\d{0,}$\/","decimal1":"\/^[+-]?\\d{0,}\\.?\\d?$\/","decimal2":"\/^[+-]?\\d{0,}\\.?\\d{0,2}$\/"},
	option:[
		{"name":"客户省份", "type":"province","regular":"","unit":"", "field":"province", "isEdit":0, "list":['安徽','北京','重庆','福建','甘肃','广东','广西','贵州','海南','河北','黑龙江','河南','湖北','湖南','江苏','江西','吉林','辽宁','宁夏','内蒙古','青海','上海','山西','山东','四川','陕西','天津','西藏','新疆','云南','浙江','台湾','香港','澳门','国外','其它地区'], "isSelected":[], "selectedKey":[]},
		//{"name":"上次访问时间", "type":"number","regular":"decimal1","unit":"天", "field":"last_visit_time", "isEdit":0, "list":["0-1","1-7","7-15","15-30","30-"], "isSelected":[], "selectedKey":[]},
		//{"name":"上次访问时长", "type":"number","regular":"decimal1","unit":"分钟", "field":"last_visit_duration", "isEdit":0, "list":["0-5","5-30","30-60","60-"], "isSelected":[], "selectedKey":[]},
		//{"name":"当天访问次数", "type":"number","regular":"integer","unit":"次", "field":"day_visit_times", "isEdit":0, "list":["0-0","1-3","3-5","5-"], "isSelected":[], "selectedKey":[]},
		//{"name":"当天访问页面数", "type":"number","regular":"integer","unit":"页", "field":"day_visit_page_num", "isEdit":0, "list":["0-0","1-3","3-10","10-50","50-"], "isSelected":[], "selectedKey":[]},
		
		//{"name":"访问总次数", "type":"number","regular":"integer","unit":"次", "field":"total_visit_times", "isEdit":0, "list":["0-0","1-3","3-10","10-50","50-"], "isSelected":[], "selectedKey":[]},
		//{"name":"访问总页面数", "type":"number","regular":"integer","unit":"页", "field":"total_visit_page_num", "isEdit":0, "list":["0-0","1-10","10-50","50-100","100-"], "isSelected":[], "selectedKey":[]},
		//{"name":"上次咨询时间", "type":"number","regular":"decimal1","unit":"天", "field":"last_ask_time", "isEdit":0, "list":["0-1","1-7","7-15","15-30","30-"], "isSelected":[], "selectedKey":[]},
		//{"name":"上次对话条数", "type":"number","regular":"integer","unit":"条", "field":"last_ask_num", "isEdit":0, "list":["0-0","1-3","3-10","10-50","50-"], "isSelected":[], "selectedKey":[]},
		//{"name":"上次对话时长", "type":"number","regular":"decimal1","unit":"分钟", "field":"last_ask_duration", "isEdit":0, "list":["0-5","5-30","30-60","60-"], "isSelected":[], "selectedKey":[]},
		
		//{"name":"当天咨询次数", "type":"number","regular":"integer","unit":"次", "field":"day_ask_times", "isEdit":0, "list":["0-0","1-3","3-5","5-"], "isSelected":[], "selectedKey":[]},
		//{"name":"咨询总次数", "type":"number","regular":"integer", "unit":"次","field":"total_ask_times", "isEdit":0, "list":["0-0","1-3","3-10","10-50","50-"], "isSelected":[], "selectedKey":[]},
		{"name":"下次联系时间", "type":"number","regular":"decimal1","unit":"天", "field":"cust_next_contact_time", "isEdit":0, "list":["0|1","1|7","7|15","15|30","30|"], "isSelected":[false,true,true], "selectedKey":[null,1,1]},
		{"name":"上次联系时间", "type":"number","regular":"decimal1", "unit":"天","field":"cust_last_contact_time", "isEdit":0, "list":["0|1","1|7","7|15","15|30","30|"], "isSelected":[false,false,true], "selectedKey":[null,null,1]},
		{"name":"本周联系次数", "type":"number","regular":"integer","unit":"次", "field":"cust_tswk_contact_times", "isEdit":0, "list":["0|0","1|3","3|10","10|"], "isSelected":[], "selectedKey":[]},

		{"name":"联系总次数", "type":"number","regular":"integer","unit":"次", "field":"cust_total_contact_times", "isEdit":0, "list":["0|0","1|3","3|10","10|50","50|"], "isSelected":[], "selectedKey":[]},
		{"name":"上次成交时间", "type":"number","regular":"decimal1","unit":"天", "field":"last_deal_time", "isEdit":0, "list":["0|1","1|7","7|15","15|30","30|"], "isSelected":[], "selectedKey":[]},
		{"name":"上次成交金额", "type":"number","regular":"decimal2", "unit":"元","field":"last_deal_money", "isEdit":0, "list":["0|0","0|500","500|1000","1000|"], "isSelected":[], "selectedKey":[]},
		{"name":"初次成交时间", "type":"number","regular":"decimal1","unit":"天", "field":"first_deal_time", "isEdit":0, "list":["0|1","1|7","7|15","15|30","30|"], "isSelected":[], "selectedKey":[]},
		{"name":"订单总数", "type":"number","regular":"integer","unit":"", "field":"total_order_num", "isEdit":0, "list":["0|0","1|3","3|10","10|"], "isSelected":[], "selectedKey":[]},
				
		{"name":"客单价", "type":"number","regular":"decimal2","unit":"元", "field":"average_money", "isEdit":0, "list":["0|0","0|500","500|1000","1000|"], "isSelected":[false,true], "selectedKey":[null,3]},
		{"name":"总销售额", "type":"number","regular":"decimal2", "unit":"元","field":"total_sales_money", "isEdit":0, "list":["0|0","0|1000","1000|5000","5000|"], "isSelected":[], "selectedKey":[]},
		//{"name":"余额", "type":"number","regular":"decimal2", "unit":"元","field":"remaining_sum", "isEdit":0, "list":["0|0","0|1000","1000|5000","5000|"], "isSelected":[], "selectedKey":[]},
		{"name":"客户创建时间", "type":"number","regular":"decimal1","unit":"天", "field":"cust_create_time", "isEdit":0, "list":["0|1","1|7","7|15","15|30","30|"], "isSelected":[], "selectedKey":[]},
		{"name":"客户废弃时间", "type":"number","regular":"decimal1", "unit":"天","field":"cust_scrap_time", "isEdit":0, "list":["0|1","1|7","7|15","15|30","30|"], "isSelected":[], "selectedKey":[]},
		{"name":"客户流失时间", "type":"number","regular":"decimal1","unit":"天", "field":"cust_drain_time", "isEdit":0, "list":["0|1","1|7","7|15","15|30","30|"], "isSelected":[], "selectedKey":[]}
	],
	sql:null,	//生成查询条件
	//生成标签HTML
	makeTabHtml:function(){
		var defaultTab = this.TabState['default'];
		var isEdit = this.TabState['isEdit'];
		var arr = this.TabList;
		var result = [];
		var startPlace = this.TabState['start'];
		//var showLimitLength = this.TabState['limit']; 
		var selected = null;
	    var ar= '' ;
		if(0 == defaultTab) {
			 selected = 'style="background:#ffffff"';
			 ar = '<div class="arrow-tit"></div>';
	    }
		if(isEdit){
			result.push('<li '+selected+'><input class="ch-selected" type="text" key="0" value="'+arr[0]+'" readonly /><em class="ch-close" onclick="FH.delTab(0)">×</em>'+ar+'</li>');
		}else{
		  	result.push('<li '+selected+'><a href="javascript:;" onclick="FH.setTab(0)">'+arr[0]+'</a>'+ar+'</li>');
		}
		
		for(var i=arr.length-1; i>=1; i--){
			//if(i<startPlace || i>startPlace+showLimitLength-1) continue;
			//if(arr.length>11){box.tip("保存的筛选器数量不能超过10个，请删除后再保存");
			selected = null;
	    	ar= '' ;
			if(i == defaultTab) {
			  selected = 'style="background:#ffffff"';
			  ar = '<div class="arrow-tit"></div>';
			}
			if(isEdit){	//编辑状态
				var html = '<li '+selected+'><input class="ch-selected" type="text" key="'+i+'" value="'+arr[i]+'" /><em class="ch-close" onclick="FH.delTab('+i+')">×</em>'+ar+'</li>';
			}else{
				var html = '<li '+selected+'><a href="javascript:;" onclick="FH.setTab('+i+')">'+arr[i]+'</a>'+ar+'</li>';
				
			}
			
			result.push(html);
		}
		
		if(isEdit){
			$('#filterTabSpan').html('<a href="javascript:;" onClick="FH.saveTab();" class="ch-tit-save" title="保存"></a>');
		}else{
			$('#filterTabSpan').html('<span  onClick="FH.editTab();" class="btns-save" title="编辑"></span>');
		}
		return result.join('');
	},
	//生成已选择HTML
	makeSelectedHtml:function(){
		var defaultTab = this.TabState['default'];
		var arr = this.option;
		var result = [];
		var sql = [];
		
		for(var i=0; i<arr.length; i++){
			var isSelected = arr[i].isSelected[defaultTab];
			if(isSelected){
				var name = arr[i].name;
				var selectedKey = arr[i]['selectedKey'][defaultTab];
				var list = arr[i].list;
				var type = arr[i].type;
				var field = arr[i].field;
				var unit = arr[i].unit;
				var value=this.format(type,list[selectedKey],unit);
				
				var html = '<li><label class="select-tit">'+name+'：'+'</label>'+value+'<em class="em-close" onClick="FH.remove('+i+')">×</em></li>';
				
				result.push(html);
				sql.push(this.makeSql(type, list[selectedKey], field));
			}
		}
		//alert(sql.join(' and '));	//调试生成sql语句
		this.sql = sql.join(' || ');
		this.selectdiv(result.length);//点击筛选器标签，判断有内容点击时显示
	    if(result.length > 0)//判断已选择中是否有内容没有内容的时候保存按钮不出现
		{
			     return '<ul id="ch-selected">'+result.join('')+'</ul>'+'<a href="javascript:;" onClick="FH.addTab()" class="ch-detail-save" title="保存"></a>';
		}else{
			   return '<ul id="ch-selected">'+result.join('')+'</ul>';	
		}
	},
	//生成未选择HTML
	makeUnselectedHtml:function(){
		var defaultTab = this.TabState['default'];
		var arr = this.option;
		var result = [];
		//var showLimitSize = this.showLimit['size'];
		//var isShowLimit = this.showLimit['isLimit'];
		
		for(var i=0; i<arr.length; i++){
			var isSelected = arr[i].isSelected[defaultTab];
			var isEdit = arr[i]['isEdit'];
			if(!isSelected){
				var name = arr[i].name;
				var list = arr[i].list;
				var type = arr[i].type;
				var unit = arr[i].unit;
				
				var html = '<div class="ch-tj" onmouseover="FH.mouseover(this)" onmouseout="FH.mouseout(this)"><span class="ch-li">'+name+'：</span><ul id="unSelected_'+i+'">';
				//选项条件不为空时
				if(list.length >0 ){
					for(var j=0; j<list.length; j++){
						if(isEdit){
							var value=this.format(type,list[j],unit,true);
							if(type == 'number'){
								html +=	'<li><input type="text" key="'+i+'" listKey="'+j+'" value="'+value[0]+'" class="comm-tboxs">-<input type="text" key="'+i+'" listKey="'+j+'" value="'+value[1]+'" class="comm-tboxs">'+unit+'<em class="em-close" onclick="FH.delOpt('+i+','+j+')">×</em></li>';
							}else if(type == 'province'){
								var selected=this.selectProvince(value[0]);
								html += '<li><select type="text" key="'+i+'" listKey="'+j+'" class="comm-tboxs">'+selected+'</select><em class="em-close" onclick="FH.delOpt('+i+','+j+')">×</em></li>';
							}else{
								html +=	'<li><input type="text" key="'+i+'" listKey="'+j+'" value="'+value[0]+'" class="comm-tboxs">'+unit+'<em class="em-close" onclick="FH.delOpt('+i+','+j+')">×</em></li>';
							}
							var button = '<a href="javascript:;" onclick="FH.addOpt('+i+')" class="ch-add" title="添加"></a> <a href="javascript:;" onclick="FH.saveOpt('+i+')" class="ch-save" title="保存"></a>';
						}else{
							var value=this.format(type,list[j],unit);
							html +=	'<li><span onclick="FH.append('+i+','+j+')">'+value+'</span></li>';
							var button = '<a href="javascript:;" onclick="FH.editOpt('+i+','+j+')" class="aa ch-edit" title="编辑" style="display:none;"></a>';
						}
					}
				//选项条件为空
				}else{
					if(isEdit){
						var button = '<a href="javascript:;" onclick="FH.addOpt('+i+')" class="ch-add" title="添加"></a> <a href="javascript:;" onclick="FH.saveOpt('+i+')" class="ch-save" title="保存"></a>';
					}else{
						var button = '<a href="javascript:;" onclick="FH.editOpt('+i+','+j+')" class="aa ch-edit" title="编辑" style="display:none;"></a>';
					}
				}
				//html += '</ul><div style="clear:both;"></div>'+button+'</div><div style="clear:both;"></div>';
				html += '</ul>'+button+'<div style="clear:right;"></div><div style="clear:both;"></div></div><div style="clear:both;"></div>';
				result.push(html);
			}
		}
		//判断是否限制显示条数
		//if(isShowLimit && result.length>showLimitSize){
//			result.splice(showLimitSize, result.length-showLimitSize);
//		}
		return result.join('');
	},
	//显示生成内容（相当于刷新功能）
	show:function(area, unsearch){
		if(!area || typeof(area)!='string') area = 'all';
		switch(area){
			case 'tab':
				$('#filterTabUl').html(this.makeTabHtml());
				break;
			case 'select':
				$('#ch-ul-select').html(this.makeSelectedHtml());
				break;
			case 'unselect':
				$('#ch-cons').html(this.makeUnselectedHtml());
				break;
			default:
				$('#filterTabUl').html(this.makeTabHtml());
				$('#ch-ul-select').html(this.makeSelectedHtml());
				$('#ch-cons').html(this.makeUnselectedHtml());
		}
		if(!unsearch){
			//防止js报错
			try{
				grid_search('first', 1, '');
			}catch(err){}
		}
	},
	//切换筛选器标签
	setTab:function(key){
		var defaultTab = this.TabState['default'];
		var option = this.option;
		var tmpOption = this.tmpOption;
		var that = this;
		if(this.checkEdit()) return false;
		if(this.checkChange()){
			box.confirm('筛选条件已发生变化，是否保存！',function(){
				that.addTab();
			},function(){
				for(var i=0; i<option.length; i++){
					option[i]['isSelected'][defaultTab] = tmpOption[i]['isSelected'][defaultTab];
					option[i]['selectedKey'][defaultTab] = tmpOption[i]['selectedKey'][defaultTab];
				}
				that.TabState['default'] = key;
				that.show();
			});
			return false;
		}
		this.TabState['default'] = key;
		$('#ch_selects').css('display','');//点击对应的筛选器名称的时候显示下面对应的选项
		
		this.show();
	},
	//保存筛选器标签
	saveTab:function(){
		var that = this;
		var success = true;
		$('#filterTabUl li').each(function(){
			var key = $(this).children('input').attr('key');
			var value = $(this).children('input').val();
			if(value == ''){
				box.tip('筛选器名称不能为空');
				$(this).children('input').focus();
				success = false;
				return false;
			}else if(value.indexOf("'") > -1){
				box.tip('含有非法字符');
				$(this).children('input').focus();
				success = false;
				return false;
			}
			//过滤系统默认
			if(key != 0) that.TabList[key] = value;
		});
		if(!success) return false;
		this.TabState['isEdit'] = false;
		this.doSave();
		this.show('tab');
	},
	//编辑筛选器标签
	editTab:function(){
		var defaultTab = this.TabState['default'];
		var option = this.option;
		var tmpOption = this.tmpOption;
		var that = this;
		if(this.checkEdit()) return false;
		if(this.checkChange()){
			box.confirm('筛选条件已发生变化，是否保存！',function(){
				that.addTab();
			},function(){
				for(var i=0; i<option.length; i++){
					option[i]['isSelected'][defaultTab] = tmpOption[i]['isSelected'][defaultTab];
					option[i]['selectedKey'][defaultTab] = tmpOption[i]['selectedKey'][defaultTab];
				}
				that.TabState['isEdit'] = true;
				that.show();
			});
			return false;
		}
		this.TabState['isEdit'] = true;
		this.show();
	},
	//删除筛选器标签及相关属性
	delTab:function(key){
		var that = this;
		box.confirm('确认删除「 '+that.TabList[key]+' 」筛选器吗',function(){
			if(key == 0){
				box.tip('不能删除系统默认筛选器！');
				return true;
			}
			var defaultTab = that.TabState['default'];
			var arr = that.option;
			
			if(key == defaultTab) that.TabState['default'] = 0;
			that.TabList.splice(key,1);	//删除筛选器标签
			//删除选项中与当前筛选器有关的属性
			for(var i=0; i<arr.length; i++){
				that.option[i]['isSelected'].splice(key,1);
				that.option[i]['selectedKey'].splice(key,1);
				
				//同步临时数据
				that.tmpOption[i]['isSelected'].splice(key,1);
				that.tmpOption[i]['selectedKey'].splice(key,1);
			}
			that.show();
		});
	},
	//添加筛选器
	addTab:function(){
		if(this.checkEdit()) return false;
		var that = this;
		var defaultTab = that.TabState['default'];
		if(defaultTab == 0){
			var content = '<div id="savetipContent" style="width:260px;padding:10px;"><label>筛选器名称：</label><input type="text" name="name" class="comm-tbox-1"></div>';
		}else{
			var content = '<div id="savetipContent" style="width:220px;height:60px;margin-left:40px;padding:15px 0 10px;"><label style="line-height:25px;"><input type="radio" name="type" value="1" checked onclick="document.getElementById(\'input\').style.display=\'none\'">保存至当前筛选器</label><br><label><input type="radio" name="type" value="0" onclick="document.getElementById(\'input\').style.display=\'\'">保存为新筛选器</label><br><p id="input" style="display:none"><label>筛选器名称：</label><input name="name" type="text" class="comm-tbox-1"></p></div>';
		}
		$.dialog({
			id: "savetip",
			title: '保存筛选器',
			icon: 'question',
			lock: true,
			content: content,
			ok: function(){
				var isEdit = parseInt($('#savetipContent input:checked').val()) || 0;	//true为编辑，false为新增
				var option = that.option;
				var arr = that.TabList;
				var success = true;
				if(!isEdit){
					 if(arr.length>5){
						 box.tip("保存的筛选器数量不能超过5个，请删除后再保存",'',1.5);//保存筛选器时判断数量是否超过5个
					     success = false;
						 return false;
					}
					//添加新的筛选器
					var TabName = $('#savetipContent input[name="name"]').val();	//筛选器名称
					for(var i=0; i<arr.length; i++){ 
							if(arr[i] == TabName)//保存筛选器的时候判断是否有重名的
							{
								box.tip('筛选器名称已存在');
								$(that).focus();
								success = false;
								return false; 
							}
						}
					if(TabName == ''){
						box.tip('筛选器名称不能为空');
						$('#savetipContent input[name="name"]').focus();
						return false;
					}else if(TabName.indexOf("'") > -1){
						box.tip('含有非法字符');
						$('#savetipContent input[name="name"]').focus();
						return false;
					}else if(TabName.length > 10){
						box.tip('筛选器名称不能超过10个字符');
						$('#savetipContent input[name="name"]').focus();
						return false;
						}
					
					//执行添加新的筛选器
					that.TabList.push(TabName);
					//that.TabList.splice(1,0,TabName);
					var newTabKey = that.TabList.length - 1;	//新筛选器键值
					//var newTabKey = 1;
					for(var i=0; i<option.length; i++){
						option[i]['isSelected'][newTabKey] = option[i]['isSelected'][defaultTab];
						option[i]['selectedKey'][newTabKey] = option[i]['selectedKey'][defaultTab];
						
						//同步临时数据
						option[i]['isSelected'][defaultTab] = that.tmpOption[i]['isSelected'][defaultTab];
						option[i]['selectedKey'][defaultTab] = that.tmpOption[i]['selectedKey'][defaultTab];
						that.tmpOption[i]['isSelected'][newTabKey] = option[i]['isSelected'][newTabKey];
						that.tmpOption[i]['selectedKey'][newTabKey] = option[i]['selectedKey'][newTabKey];
				
						//将系统默认筛选器清空
						if(defaultTab == 0){
							option[i]['isSelected'][defaultTab] = false;
							option[i]['selectedKey'][defaultTab] = null;
						}
					}
					that.TabState['default'] = newTabKey;	//选中新建筛选器标签
					
				}else{
					//同步临时数据
					for(var i=0; i<option.length; i++){
						that.tmpOption[i]['isSelected'][defaultTab] = option[i]['isSelected'][defaultTab];
						that.tmpOption[i]['selectedKey'][defaultTab] = option[i]['selectedKey'][defaultTab];
					}
				}
				
				that.doSave()
				that.show();
			}
		});
	},
	//移除选中
	remove:function(key){
		if(this.checkEdit()) return false;
		var defaultTab = this.TabState['default'];
		this.option[key]['isSelected'][defaultTab] = false;
		this.option[key]['selectedKey'][defaultTab] = null;
		this.show();
	},
	//添加选中
	append:function(key,listKey){
		if(this.checkEdit()) return false;
		var defaultTab = this.TabState['default'];
		this.option[key]['isSelected'][defaultTab] = true;
		this.option[key]['selectedKey'][defaultTab] = listKey;
		this.show();
	},
	//添加选项条件
	addOpt:function(key){
		if(this.saveOpt(key, true) === false) return false;
		var option = this.option[key];
		option['list'].push('|');	
		this.show('', true);
	},
	//保存选项条件
	saveOpt:function(key, notsave){
		var option = this.option[key];
		var type = option.type;
		var success = true;
		var regular = option.regular;
		var reg = this.regexp[option['regular']];
		if(reg) reg = eval(reg);
		var emptykey = [];	//选项为空的键值
		$('#unSelected_'+key).children('li').each(function(){
		    if(type == 'province'){
				var listKey = $(this).children('select').attr('listKey');
				var value = $(this).children('select').val();
				if ($.browser.msie && $.browser.version<9){
					value = value[0];	//判断是否是ie 只有ie9以下浏览器才会出现数组与字符串的问题
				}
			}else{
				var listKey = $(this).children('input').attr('listKey');
				var arr = [];
				$(this).children('input').each(function(){
					if(reg && !reg.test($(this).val())){
						if(regular == 'decimal1')
						{
							box.tip("格式不正确,请填写数字可精确到小数点后一位",'',1.5);
						}else if(regular == 'decimal2')
						{
							box.tip("格式不正,请填写数字可精确到小数点后两位",'',1.5);
						}else 
						{
							box.tip("格式不正确,请填写整数");
						}
						//box.tip("格式不正确");
						$(this).focus();
						success = false;
						return false; 
					}
					arr.push($(this).val());									 
				});
				var isnull = true;
				for(var i=0; i<arr.length; i++){
					if(arr[i]) isnull = false;
				}
				if(arr[1] && arr[0] && parseFloat(arr[1]) < parseFloat(arr[0]) ){//判断前后数值的大小
					var errtip = true;
				}
				if(!isnull){
					if(errtip){
						box.tip("格式不正确,前者不能大于后者");
						success = false;
						return false;
					}
				}else{
					emptykey.push(listKey);
				}
				var value = arr.join('|');
			}
		    option['list'][listKey] = value.replace(/'/g,'');
		});
		for(var i=emptykey.length-1; i>=0; i--){
			option['list'].splice(emptykey[i], 1);
			option['isSelected'].splice(emptykey[i], 1);
			option['selectedKey'].splice(emptykey[i], 1);
		}
		
		if(!success) return false;	//如果添加内容不符合要求则终止保存
		if(!notsave){
			option['isEdit'] = false;
			this.doSave();
			this.show('', true);
		}
	},
	//编辑选项条件
	editOpt:function(key,listKey){
		var defaultTab = this.TabState['default'];
		var option = this.option;
		var tmpOption = this.tmpOption;
		var that = this;
		if(this.checkEdit()) return false;
		//验证筛选条件是否有变化
		if(this.checkChange()){
			box.confirm('筛选条件已发生变化，是否保存！',function(){
				that.addTab();
			},function(){
				for(var i=0; i<option.length; i++){
					option[i]['isSelected'][defaultTab] = tmpOption[i]['isSelected'][defaultTab];
					option[i]['selectedKey'][defaultTab] = tmpOption[i]['selectedKey'][defaultTab];
				}
				that.option[key]['isEdit'] = true;
				that.show();
			});
			return false;
		}
		this.option[key]['isEdit'] = true;
		this.show();
	},
	//删除选项条件
	delOpt:function(key,listKey){
		var that = this;
		var option = that.option[key];
		box.confirm('确删除条件吗?',function(){
			var selectedKey = option['selectedKey'];
			//删除前先判断是否有其他筛选器正在使用，否则禁止删除
			var isUsed = false;
			for(var i=0; i<selectedKey.length; i++){
				if(listKey == selectedKey[i]){
					isUsed = true;
				}else if(listKey < selectedKey[i]){
					selectedKey[i] -= 1;	//改变已选择的键值
				}
			}
			if(isUsed){
				box.tip('该条件已被其他筛选器使用，禁止删除！');
				return true;
			}
			option['list'].splice(listKey,1);
			that.show();
		});
	},
	//检测是否有未保存内容,true表示没有未保存内容
	checkEdit:function(){
		var isEdit = false;
		var option = this.option;
		if(this.TabState['isEdit']) isEdit = true;
		if(!isEdit){
			for(var i=0; i<option.length; i++){
				if(option[i]['isEdit']){
					isEdit = true;
					break;
				}
			}
		}
		if(isEdit) box.alert('有内容正在编辑，请保存后再试！');
		return isEdit;
	},
	//检测筛选器条件是否发生变化，并弹出保存提示
	checkChange:function(){
		var defaultTab = this.TabState['default'];
		var option = this.option;
		var tmpOption = this.tmpOption;
		var isChange = false;
		var that = this;
		for(var i=0; i<option.length; i++){
			if(option[i]['isSelected'][defaultTab] != tmpOption[i]['isSelected'][defaultTab] || option[i]['selectedKey'][defaultTab] != tmpOption[i]['selectedKey'][defaultTab]){
				isChange = true;
				break;
			}
		}
		return isChange;
	},
	//收缩显示
	barToggle:function(that){
		//限制显示条数
		if($(that).hasClass('tog-arr-visible')){
			this.showLimit['isLimit'] = true;
			$(that).attr('class','tog-arr-hide');
			$(that).attr('title','显示隐藏的筛选条件');
		}else{
			this.showLimit['isLimit'] = false;
			$(that).attr('class','tog-arr-visible');
			$(that).attr('title','隐藏部分筛选条件');
		}
		this.show();
	},
	//未选择筛选条件鼠标样式
	mouseover:function(that){
		$('.ch-tj').hover(function(){
			$(this).addClass('div_ch_tj');
		}, function(){
			$(this).removeClass('div_ch_tj');
		});
		$(that).find('.aa').css('display', 'block');
	},
	//未选择筛选条件鼠标样式
	mouseout:function(that){
		$(that).find('.aa').css('display', 'none');
	},
	//存放临时数据
	setTmpOption:function(str){
		//保存筛选器时使用，如果增加了条件但保存为新筛选器，则会将当前筛选器数据还原
		this.tmpOption = $.parseJSON(str);
	},
	//初始化
	init:function(){
		this.setTmpOption(JSON.stringify2(this.option));
		this.show();
	},
	//初始化赋值
	setDefault:function(str){//return false;
		if(typeof(str) != 'string') return false;
		var json = $.parseJSON(str);
		if(typeof(json['TabList']) == 'object' && typeof(json['option']) == 'object'){
			this.TabList = json['TabList'];
			this.option = json['option'];
		}
	},
	//将选项按照指定样式显示
	format:function(type,string, units,isedit){
		if(typeof(string) != 'string') return null;
		if(typeof(units) != 'string') units= null;
		if(!isedit){
			if(type != 'number') return string+units;
			var arr=string.split("|");
			
			if(arr[0] == arr[1]) return  arr[0]+units;
			else if(!arr[0] ) return '<'+arr[1]+units;
			else if(!arr[1] ) return '>'+arr[0]+units;
			else return arr.join('~')+units;
		}else{
		  return string.split("|");
		}
	},
	//生成省份下拉框
	selectProvince:function(value){
		var province = this.province;
		var arr=[];
		for(var i=0; i<province.length; i++){
			if(value && value == province[i]){
				var selected = 'selected';
			}else{
				var selected = '';
			}
		  	arr.push('<option value="'+province[i]+'" '+selected+'>'+province[i]+'</option>');
		}	
		return arr.join('');
	},
	//标签右滚动
    scrollRight:function(){	
		var arr = this.TabList;  
		var len = arr.length;  //获得筛选器的个数
		var showLimitLength = this.TabState['limit'];  //获得限制显示的筛选器的个数 5个
		var startPlace = this.TabState['start'];  
		
		if(len - showLimitLength > startPlace){   //判断当前总共的筛选器个数是否大于限制的个数
			this.TabState['start'] += 1;
			this.show();
		}
	},
	//标签左滚动
	scrollLeft:function(){	
		var startPlace = this.TabState['start'];  
		if(startPlace > 0){   //判断当前总共的筛选器个数是否大于限制的个数
			this.TabState['start'] -= 1;
			this.show();
		}  
	},
	//根据不同类型生成相应SQL语句(已选中条件中使用)
	makeSql:function(type, val, field){
		var sql = null;
		switch(type){
			case 'province':	//省份类型
				var pcode = this.getPCode(val);
				if(pcode !== false){
					sql = field + " = '"+ pcode + "'";
				}
				break;
			case 'number':		//数值类型
				var arr = val.split("|");
				if(arr[0] == arr[1]) sql = field + " = "+ arr[0];
				else if(!arr[0] ) sql = field + " < "+ arr[1];
				else if(!arr[1] ) sql = field + " > "+ arr[0];
				else sql = field + " between "+ arr[0] + " and "+ arr[1];
				break;
		}
		return sql;
	},
	//获取省份对应编号
	getPCode: function(val){
		pcode = this.pcode;			//省份编码
		province = this.province;	//省份数组
		for(var i=0; i<province.length; i++){
			if(val == province[i]) return pcode[i];
		}
		return false;
	},
	//将最终的结果保存到数据库（点击3个保存按钮时都会执行）
	doSave: function(){ 
		var that = this;
		//不保存系统默认筛选器条件
		for(var i=0; i<this.option.length; i++){
			this.option[i]['isSelected'][0] = false;
			this.option[i]['selectedKey'][0] = null;
		}
		var json = {
			TabList:this.TabList,
			option:this.option
		}
		//alert(JSON.stringify2(json));
		$.post('?controller='+controller+'&action=save_filter&arg='+arg, {data: JSON.stringify2(json)}, function(result){
			if(result.status == 'success'){
				box.tip('保存成功');
				that.setTmpOption(JSON.stringify2(that.option));
				return true;
			}else{
				//box.tip('保存失败');
				return false;
			}
		}, 'json');
	},
	selectdiv:function(type){//点击筛选器的按钮时候才选择会有内容出现，前提是必须判断选项中是否有内容，没内容不显示
		if(type){
		    $('#ch_selects').css('display',''); 
			if ($.browser.msie && $.browser.version<7){
			$('#ch-cons').css('marginTop','0px');
		   }
		}else{
		      $('#ch_selects').css('display','none'); 
			  if ($.browser.msie && $.browser.version<7){
			  $('#ch-cons').css('marginTop','-25px');
		    }
		}
	}
}


function customers(){
	
	this.customers = new Array();
	this.current = 0;
	//客户信息存入数组
	this.addCustomer = function(cust_id){
		this.customers[this.customers.length] = cust_id;
	}
	//得到上一个客户信息
	this.getPrevCustomer = function(cust_id){
		for(var i in this.customers){
			if(this.customers[i] == cust_id){
				this.current = parseInt(i);
			}
		}
		var index =this.current;
		if(index <= 0){
			if(index == 0){
				return false;
			}else{
				index = 0;
			}
		}else{
			index = this.current - 1;
		}
		
		return this.customers[index];
	}
	//得到下一个客户信息
	this.getNextCustomer = function(cust_id){
		for(var i in this.customers){
			if(this.customers[i] == cust_id){
				this.current = parseInt(i);
			}
		}
		var index = this.current;
		
		if(index <= this.customers.length -1){
			if(index == this.customers.length - 1){				
				return false;
			}else{
				index = this.current + 1;
			}		
		}else{
			index = this.customers.length -1;
		}
		return this.customers[index];
	}
}


//扩展currency类型的格式化函数
$.ligerDefaults.Grid.formatters['cus_name_type'] = function (num, column) {
    //var row = customer_grid.getRow(1);
    //alert(row.cus_no);
    alert(column.columnindex);
    return "<a href='javascript:(0);'onclick=\"showTimeline('dasd')\" title='时间轴'><img src='@rootPath/Themes/default/img/time_line.png' style='padding-right:10px;padding-left:10px;'/></a>" + "<a href='javascript:void(0);' onclick=\"view_show('c993ef92-12f5-11e4-85fb-001e6797c409','阿斯顿ghgf发生');\">" + "<span title=''>" + num + "</span>" + "</a>";
};