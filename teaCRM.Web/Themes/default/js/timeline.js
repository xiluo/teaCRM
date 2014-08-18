(function() {

	Function.prototype.bind = function() {
		var method = this, args = Array.prototype.slice.apply(arguments), object = args.shift();
		return function() {
			return method.apply(object, args);
		};
	};
	ClassTL = function() {

		this.conf = {
			width: 900,
			height: 450
		};

		this.container = document.getElementById('timeline');
		if (this.container === null) return;

		// this.leftBtn = document.getElementById('timeline-left');
		// this.rightBtn = document.getElementById('timeline-right');
		// this.overflow = document.getElementById('timeline-overflow');
		this.list = document.getElementById('timeline-list');

		// this.container.onmouseover = this.mOverContainer;
		// this.container.onmouseout = this.mOutContainer;

		// this.leftBtn.onmousedown = this.mouseLeft.bind(this);
		// this.rightBtn.onmousedown = this.mouseRight.bind(this);

		// this.leftBtn.onmouseup = this.clearTimer.bind(this);
		// this.rightBtn.onmouseup = this.clearTimer.bind(this);
		// this.leftBtn.onmouseout = this.clearTimer.bind(this);
		// this.rightBtn.onmouseout = this.clearTimer.bind(this);

		this.initialize();

		this.select = document.getElementById('timeline-select');
		var labels = this.select.getElementsByTagName('label');
		for (var i = 0, len = labels.length; i < len; i++) {
			labels[i].onclick = this.selectItem.bind(this, labels[i]);
		}
	};
	ClassTL.prototype = {
		initialize: function() {
			// this.list.style.left = 0;
			// this.list.oWidth = this.list.offsetWidth;
			// this.list.oHeight = this.list.offsetHeight;
			// this.conf.max = this.list.oWidth - this.conf.width;
			// this.conf.max = -this.conf.max > 0 ? 0 : this.conf.max;
			this.sortOdd();
		},
		sortOdd: function() {
			var lis = this.list.getElementsByTagName('li');
			var c = /(^|\s)tl-odd(\s|$)/,
				cg = /(^|\s)tl-odd(\s|$)/g, cn;
			for (var i = 0, n = 1, len = lis.length; i < len; i++) {
				if (lis[i].style.display == 'none') continue;
				cn = lis[i].className;

				if (n % 2 == 0) {
					!c.test(cn) && (lis[i].className += cn ? ' tl-odd' : 'tl-odd');
				}
				else {
					cn = cn.replace(cg, '');
					lis[i].className = cn.replace(/(^\s*)|(\s*$)/g, '');
				}
				n ++;
			}
		},
		selectItem: function(that) {
			var f = that.getAttribute('foritem');
			var e = new RegExp('(^|\\s)' + f + '(\\s|$)');
			var display = that.getElementsByTagName('input')[0].checked ? '' : 'none';
			
			var nodes = this.list.getElementsByTagName('div'),
				items = [];
			for (var i = 0, len = nodes.length; i < len; i++) {
				e.test(nodes[i].className) && items.push(nodes[i]);
			}
			for (var i = 0, len = items.length; i < len; i ++) {
				items[i].parentNode.style.display = display;
			}
			this.initialize();
		}
		// mOverContainer: function() {
		// 	this.className = 'timeline-over';
		// },
		// mOutContainer: function() {
		// 	this.className = '';
		// },
		// clickLeft: function() {
		// 	var Class = this, left = parseInt(this.list.style.left) + 250;
		// 	(left > 0) && (left = 0);
		// 	this.list.style.left = left + 'px';
		// },
		// clickRight: function() {
		// 	var left = parseInt(this.list.style.left) - 250;
		// 	(left < -this.conf.max) && (left = -this.conf.max);
		// 	this.list.style.left = left + 'px';
		// },
		// mouseLeft: function() {
		// 	var Class = this;
		// 	// Class.conf.mouseTimer = window.setTimeout(function() {
		// 		// Class.conf.mouseTimer = null;
		// 		var left = parseInt(Class.list.style.left);
		// 		Class.conf.timer = window.setInterval(function() {
		// 			left = left + 2;
		// 			if (left > 0) {
		// 				Class.list.style.left = 0;
		// 				Class.clearTimer();
		// 				return;
		// 			}
		// 			Class.list.style.left = left + 'px';
		// 		}, 30);
		// 	// }, 100);
		// },
		// mouseRight: function() {
		// 	var Class = this;
		// 	// Class.conf.mouseTimer = window.setTimeout(function() {
		// 	// 	Class.conf.mouseTimer = null;
		// 		var left = parseInt(Class.list.style.left);
		// 		Class.conf.timer = window.setInterval(function() {
		// 			left = left - 2;
		// 			if (left < -Class.conf.max) {
		// 				Class.list.style.left = -Class.conf.max + 'px';
		// 				Class.clearTimer();
		// 				return;
		// 			}
		// 			Class.list.style.left = left + 'px';
		// 		}, 30);
		// 	// }, 100);
		// },
		// muLeft: function() {
		// 	if (this.conf.mouseTimer) {
		// 		window.clearTimeout(this.conf.mouseTimer);
		// 		this.clickLeft();
		// 	}
		// 	this.conf.timer && window.clearInterval(this.conf.timer);
		// },
		// muRight: function() {
		// 	if (this.conf.mouseTimer) {
		// 		window.clearTimeout(this.conf.mouseTimer);
		// 		this.clickRight();
		// 	}
		// 	this.conf.timer && window.clearInterval(this.conf.timer);
		// },
		// clearTimer: function() {
		// 	this.conf.timer && window.clearInterval(this.conf.timer);
		// }
	};

}) ();

function showTimeline(cust_id) {
    $.dialog({
        id: 'timeline',
        title: '时间轴'
    });

    $.ajax({
        url: '?controller=timeline&arg=' + arg,
        type: 'POST',
        data: { cust_id: cust_id },
        success: function(data) {
            $.dialog.list['timeline'].content(data);
            var TL = new ClassTL();
        }
    });
}