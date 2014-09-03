/**
* jQuery ligerUI 1.0.1
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function ($) {
    //manager base
    $.ligerui = $.ligerui || {};
    $.ligerui.addManager = function (dom, manager) {
        if (dom.id == undefined || dom.id == "")
            dom.id = "ligerui" + (1000 + $.ligerui.ManagerCount);
        $.ligerui.ManagerCount++;
        $.ligerui.Managers[dom.id] = manager;
        dom.applyligerui = true;
    };
    $.ligerui.getManager = function (domArr) {
        if (domArr.length == 0) return null;
        return $.ligerui.Managers[domArr[0].id];
    };
    $.ligerui.Managers = $.ligerui.Managers || {};
    $.ligerui.ManagerCount = $.ligerui.ManagerCount || 0;

    $.ligerDefaults = $.ligerDefaults || {};

    //CheckBox manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.Drag = function (options, po) {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.Drag.prototype = {};
    $.ligerDefaults.Drag = {
        onStartDrag: false,
        onDrag: false,
        onStopDrag: false,
        handler: null,
        //代理 拖动时的主体,可以是'clone'或者是函数,放回jQuery 对象
        proxy: true,
        revert: false,
        breakout: false,
        animate: true,
        onRevert: null,
        onEndRevert: null,
        //接收区域 jQuery对象或者jQuery选择字符
        receive: null,
        //进入区域
        onDragEnter: null,
        //在区域移动
        onDragOver: null,
        //离开区域
        onDragLeave: null,
        //在区域释放
        onDrop: null,
        disabled: false,
        proxyX: null,     //代理相对鼠标指针的位置,如果不设置则对应target的left
        proxyY: null
    };

    ///	<param name="$" type="jQuery"></param>  
    $.fn.ligerDrag = function (p) {
        p = $.extend({}, $.ligerDefaults.Drag, p || {});
        this.each(function () {
            if (this.useDrag) return;
            var g = {
                start: function (e) {
                    $('body').css('cursor', 'move');
                    g.current = {
                        target: g.target,
                        left: g.target.offset().left,
                        top: g.target.offset().top,
                        startX: e.pageX || e.screenX,
                        startY: e.pageY || e.clientY
                    };

                    g.cursor = "move";
                    g._createProxy(p.proxy, e);
                    //代理没有创建成功
                    if (p.proxy && !g.proxy) return false;
                    (g.proxy || g.handler).css('cursor', g.cursor);
                    $(document).bind("selectstart.drag", function () { return false; });
                    $(document).bind('mousemove.drag', function () {
                        g.drag.apply(g, arguments);
                    });

                    $(document).bind('mouseup.drag', function () {
                        g.stop.apply(g, arguments);
                    });
                    p.onStartDrag && p.onStartDrag();
                },
                drag: function (e) {
                    if (!g.current) return;
                    var pageX = e.pageX || e.screenX;
                    var pageY = e.pageY || e.screenY;
                    g.current.diffX = pageX - g.current.startX;
                    g.current.diffY = pageY - g.current.startY;
                    (g.proxy || g.handler).css('cursor', g.cursor);

                    var diffxx = pageX - g.current.left;

                    g._applyDrag();
                    //g._removeProxy();
                    p.onDrag && p.onDrag(g.current, e);
                },
                stop: function (e) {
                    $(document).unbind('mousemove.drag');
                    $(document).unbind('mouseup.drag');
                    $(document).unbind("selectstart.drag");

                    if (g.proxy) {
                        g._applyDrag(g.current.target);
                        g._removeProxy();
                    }
                    g.cursor = 'move';
                    g.current = null;
                    g.handler.css('cursor', g.cursor);
                    //alert(JSON.stringify($( g.target)));
                    p.onDrop && p.onDrop(g.target, p.receive, e);
                    p.onStopDrag && p.onStopDrag(g.target, e);
                },
                _revert: function (e) {
                    g.reverting = true;
                    g.proxy.animate({
                        left: g.current.left,
                        top: g.current.top
                    }, function () {
                        g.reverting = false;
                        g._removeProxy();
                        g.trigger('endRevert', [g.current, e]);
                        g.current = null;
                    });
                },
                _applyDrag: function (applyResultBody) {
                    applyResultBody = applyResultBody || g.proxy || g.target;
                    var cur = {}, changed = false;
                    var noproxy = applyResultBody == g.target;
                    if (g.current.diffX) {
                        if (noproxy || p.proxyX == null)
                            cur.left = g.current.left + g.current.diffX;
                        else
                            cur.left = g.current.startX + p.proxyX + g.current.diffX;
                        changed = true;
                    }
                    if (g.current.diffY) {
                        if (noproxy || p.proxyY == null)
                            cur.top = g.current.top + g.current.diffY;
                        else
                            cur.top = g.current.startY + p.proxyY + g.current.diffY;
                        changed = true;
                    }
                    if (p.breakout) {
                        if (cur.left < 0)
                            cur.left = 0;
                        if (cur.left + g.target.width() > $(document.body).width())
                            cur.left = $(document.body).width() - g.target.width();


                        if (cur.top < 0)
                            cur.top = 0;
                        if (cur.top + g.target.height() > $(document.body).height() && $(document.body).height() != 0)
                            cur.top = $(document.body).height() - g.target.height();
                    }
                    if (applyResultBody == g.target && g.proxy && p.animate) {
                        g.reverting = true;
                        applyResultBody.animate(cur, function () {
                            g.reverting = false;
                        });
                    }
                    else {
                        applyResultBody.css(cur);
                    }
                },
                _setReceive: function (receive) {
                    this.receiveEntered = {};
                    if (!receive) return;
                    if (typeof receive == 'string')
                        this.receive = $(receive);
                    else
                        this.receive = receive;
                },

                _createProxy: function (proxy, e) {
                    if (!proxy) return;
                    if (typeof proxy == 'function') {
                        g.proxy = proxy.call(this.options.target, g, e);
                    }
                    else if (proxy == 'clone') {
                        g.proxy = g.target.clone().css('position', 'absolute');
                        g.proxy.appendTo('body');
                    }
                    else {
                        g.proxy = $("<div style='position:absolute;border:1px solid #aaa;z-index:10001; background:#f2f1f1;opacity:0.5; filter:alpha(opacity=50);'></div>");
                        g.proxy.width(g.target.width()).height(g.target.height());
                        g.proxy.appendTo('body');
                    }
                    g.proxy.css({
                        left: p.proxyX == null ? g.current.left : g.current.startX + p.proxyX,
                        top: p.proxyY == null ? g.current.top : g.current.startY + p.proxyY
                    });
                },
                _removeProxy: function () {
                    if (g.proxy) {
                        g.proxy.remove();
                        g.proxy = null;
                    }
                }
            };
            g.target = $(this);
            if (p.handler == undefined || p.handler == null)
                g.handler = $(this);
            else
                g.handler = (typeof p.handler == 'string' ? $(p.handler, this) : p.handle);
            g.handler.hover(function () {
                $('body').css('cursor', 'move');
            }, function () {
                $("body").css("cursor", "default");
            }).mousedown(function (e) {
                g.start(e);
                return false;
            });
            this.useDrag = true;
            $.ligerui.addManager(this, g);
        });
        return $.ligerui.getManager(this);
    };
})(jQuery);