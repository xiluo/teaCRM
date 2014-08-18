

(function() {
	var timer1 = null;
	var timer2 = null;
	mmoreShowList = function(that) {
		var e = /(^|\s)m-more-focus(\s|$)/;
		window.clearTimeout(timer1);
		if (!e.test(that.className)) {
			var n = that.className;
			that.className = n + ' m-more-focus';
			that.onmouseout === null && (that.onmouseout = function() {
				timer1 = window.setTimeout(function() {
					that.className = n;
				}, 200);
			});
		}
	}
	navMoreShowList = function(that) {
		var e = /(^|\s)focus(\s|$)/;
		window.clearTimeout(timer2);
		if (!e.test(that.className)) {
			var n = that.className;
			that.className = n + ' focus';
			that.onmouseout === null && (that.onmouseout = function() {
				timer2 = window.setTimeout(function() {
					that.className = n;
				}, 200);
			});
		}
	}
}) ();
function navMoreShowList(that) {
	var e = /(^|\s)focus(\s|$)/, t = null;
	window.clearTimeout(t);
	if (!e.test(that.className)) {
		var n = that.className;
		that.className = n + ' focus';
		that.onmouseout === null && (that.onmouseout = function() {
			t = window.setTimeout(function() {
				that.className = n;
			}, 200);
		});
	}
}

function filterToggle(that, hidden_class) {
	//避免同一个页面隐藏功能时冲突，加个可以自定义的参数
	if(hidden_class == undefined){
		var hi = $('.filter-bar');
	}else {
		var hi = $('.'+hidden_class);
	}
	
	if ($(that).hasClass('btn-visible')) {
		hi.removeClass('filter-bar-hidden');
		$(that).attr('class', 'btn-hidden');
		Cookie('filterBar', '1');
	}
	else {
		hi.addClass('filter-bar-hidden');
		$(that).attr('class', 'btn-visible');
		Cookie('filterBar', '0');
	}
}





(function() {
	/**
	 * 侧边栏展开收缩
	 */
	var items = $('#nav-side').find('.ns-item');
	items.each(function() {
		var that = $(this),
			title = that.find('.title');
		title.click(function() {
			that.hasClass('ns-item-close') ? that.removeClass('ns-item-close') : that.addClass('ns-item-close');
		});
	});

}) ();


/**
 * 列表双行变色
 */
function tbList1() {
	var tables = $('.tb-list-1');
	tables.each(function() {
		var trs = $(this).find('tbody tr:odd');
		trs.addClass('odd');
	});
}


function menuAddFocus(id) {
	$('#' + id).addClass('focus');
}
function navAddFocus(id) {
	$('#' + id).addClass('focus');
}

function toggleTag(that, id) {
	var tags = $('#' + id);
	if (tags.hasClass('c-tag-toggle')) {
		tags.removeClass('c-tag-toggle');
		$(that).attr('class', 'btn-up-1');
		$(that).html('收起');
	}
	else {
		tags.addClass('c-tag-toggle');
		$(that).attr('class', 'btn-down-1');
		$(that).html('展开');
	}
}

function blueboxToggle() {
	$('.blue-box-toggle').each(function() {
		var $this = $(this),
			tt = $this.find('.tt');
		tt.click(function(event) {
			var event = event || window.event,
				target = event.target || event.srcElement;
			if (target.nodeName == 'INPUT') return;
			if (tt.hasClass('up')) {
				$this.find('.body').hide();
				tt.removeClass('up').addClass('down');
			}
			else if (tt.hasClass('down')) {
				$this.find('.body').show();
				tt.removeClass('down').addClass('up');
			}
		});
	});
}

function showCIHidden(that) {
	that = $(that);
	if (that.hasClass('btn-down-1')) {
		that.attr('class', 'btn-up-1');
		$('.ci-hidden').show();
	}
	else {
		that.attr('class', 'btn-down-1');
		$('.ci-hidden').hide();
	}
}


//___<box>___//

//页面弹出信息和确认信息
var box = new Object();
//确认、取消
box.alert = function(message,result){
	switch(result){
		case "success":
			icons = "face-smile";
		break;
		case "error":
			icons = "face-sad";
		break;
		default:
			icons = "warning";
	}
	$.dialog({
		id: "pagealert",
		title: "提示",
		icon: icons,
		content: "<div style='width:200px;padding:25px;'>"+message+"</div>",
		button: [{"name": "确定",focus: true}]
	});
}
box.confirm = function(message,callback1,callback2){
	$.dialog({
		id: "pageconfirm",
		title: "提示",
		icon: "question",
		lock: true,
		content: "<div style='width:200px;padding:25px;'>"+message+"</div>",
		button: [
			{
				"name": "确定",
				callback: callback1,
				focus: true
			},
			{
				"name": "取消",
				callback: callback2
			}
		]
	});
}
box.tip = function(message,result){
	switch(result){
		case "success":
			icons = "face-smile";
		break;
		case "error":
			icons = "face-sad";
		break;
		default:
			icons = "warning";
	}
	$.dialog({
		id: "pagetip",
		title: "提示",
		icon: icons,
		time: 1,
		content: "<div style='width:200px;padding:25px;'>"+message+"</div>"
	});
}

//___</box>___//


//___<request>___//

//ajax请求
var request = new Object();

//显示正在请求中
request.start = function(message){
	if(message==undefined)
		message = "请求发送中...";
	$("body").append("<div class=\"ajax_request\">"+message+"</div>");
	$(".ajax_request").css("left",parseInt((parseInt($("body").width())-parseInt($(".ajax_request").width())-32)/2)).show();
}

//请求结束
request.end = function(){
	$(".ajax_request").fadeOut(600,function(){
		$(this).remove();
	});
}

//请求错误
request.error = function(message){
	//关闭正在请求提示
	//显示请求失败提示
	if(message==undefined)
		message = "系统错误,请求失败...";
	$("body").append("<div class=\"ajax_error\">"+message+"</div>");
	$(".ajax_error").css("left",parseInt((parseInt($("body").width())-parseInt($(".ajax_error").width())-32)/2)).show();
	setTimeout('$(".ajax_error").fadeOut(600,function(){$(this).remove()})',4000);
}

//___</request>___//



function filterBarFloat() {
	var filterBar = $('.filter-bar'),
		offset = filterBar.offset();
	var holder = document.createElement('div');
	holder.className = 'filter-bar-holder';
	filterBar.oHeight = filterBar.height();
	filterBar.oWidth = filterBar.width();
	holder.style.height = filterBar.oHeight + 'px';
	$(window).scroll(function() {
		var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
		if (scrollTop > offset.top) {
			if ($('.filter-bar-holder').size() === 0) {
				filterBar.after(holder);
			}
			$('.filter-bar').css({'position': 'fixed', 'top': 0, 'left': 170});
		}
		else {
			if ($('.filter-bar-holder').size()) {
				holder.parentNode.removeChild(holder);
			}
			$('.filter-bar').css({'position': 'relative', 'top': 0, 'left': 0});
		}
	});
}

function inputCode(that) {
	that.value = that.value.replace(/[\~\!\@\#\$\%\^\&\*\(\)\{\}\'\'\"\"\<\/\>]/g, '').substring(0, 9);
}

Cookie = function(name, value) {
	this.conf = $.cookie('crmConfig') || '{}';
	var c = $.parseJSON(this.conf);
	if (name !== undefined && value === undefined) {
		return c[name] || null;
	}
	else if (name !== undefined && value === null) {
		delete c[name];
	}
	else if (name !== undefined && value !== undefined ) {
		c[name] = value;
	}
	$.cookie('crmConfig', $.toJSON(c), {expires: 100})
};



(function() {

	var s = Cookie('filterBar');
	if (s == '0') {
		if ($('.btn-hidden').size()) {
			$('.filter-bar').addClass('filter-bar-hidden');
			$('.btn-hidden').attr('class', 'btn-visible');
		}
	}

}) ();

 