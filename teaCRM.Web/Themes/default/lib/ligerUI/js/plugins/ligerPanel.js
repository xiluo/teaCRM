/**
* jQuery ligerUI 1.2.3
* 
* http://ligerui.com
*  
* Author daomi 2014 [ gd_star@163.com ] 
* 
*/
(function ($)
{
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

    $.fn.ligerGetPanelManager = function () {
        return $.ligerui.getManager(this);
    };

    $.ligerDefaults = $.ligerDefaults || {};

    $.ligerDefaults.Panel = {
        width: 400,
        height : 300,
        title: 'Panel',
        content: null,      //内容
        content_id:null,
        url: null,          //远程内容Url
        frameName: null,     //创建iframe时 作为iframe的name和id 
        data: null,          //可用于传递到iframe的数据
        showClose: false,    //是否显示关闭按钮
        showToggle: true,    //是否显示收缩按钮 
        icon: null,          //左侧按钮
        onClose:null,       //关闭前事件
        onClosed:null,      //关闭事件
        onLoaded:null           //url模式 加载完事件
    };
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.Panel = function (options, po) {
        this.options = options;
        this.po = po;
    };
    
    $.ligerManagers.Panel.prototype = {
        getType: function ()
        {
            return 'Panel';
        },
        idPrev: function ()
        {
            return 'Panel';
        },
        extendMethods: function ()
        {
            return $.ligerMethos.Panel;
        },
        init: function ()
        {
            var g = this, p = this.options;
            $.ligerui.controls.Panel.base._init.call(this);
            p.content = p.content || $(g.element).html(); 
        },
        render: function ()
        {
            var g = this, p = this.options;
            g.panel = $(this);
            //g.panel = $(g.element).addClass("l-panel").html("");
            g.panel.append('<div class="l-panel-header"><span></span><div class="icons"></div></div><div class="l-panel-content"></div>');
             
           // g.set(p);
 
            g.panel.bind("click.panel", function (e)
            { 
                var obj = (e.target || e.srcElement), jobj = $(obj);
                if (jobj.hasClass("l-panel-header-toggle"))
                {
                    g.toggle();
                } else if (jobj.hasClass("l-panel-header-close"))
                {
                    g.close();
                }
            });
            alert(g.panel.length);
        },
        collapse: function ()
        {
            var g = this, p = this.options;
            var toggle = g.panel.find(".l-panel-header .l-panel-header-toggle:first");
            if (toggle.hasClass("l-panel-header-toggle-hide")) return;
            g.toggle();
        },
        expand: function ()
        {
            var g = this, p = this.options;
            var toggle = g.panel.find(".l-panel-header .l-panel-header-toggle:first");
            if (!toggle.hasClass("l-panel-header-toggle-hide")) return;
            g.toggle();
        },
        toggle : function()
        {
            var g = this, p = this.options;
            var toggle = g.panel.find(".l-panel-header .l-panel-header-toggle:first");
            if (toggle.hasClass("l-panel-header-toggle-hide"))
            {
                toggle.removeClass("l-panel-header-toggle-hide");
            } else
            {
                toggle.addClass("l-panel-header-toggle-hide");
            }
            g.panel.find(".l-panel-content:first").slideToggle("normal");
        },
        setShowToggle:function(v)
        {
            var g = this, p = this.options;
            var header = g.panel.find(".l-panel-header:first");
            if (v)
            {
                var toggle = $("<div class='l-panel-header-toggle'></div>"); 
                toggle.appendTo(header.find(".icons")); 
            } else
            {
                header.find(".l-panel-header-toggle").remove();
            }
        },
        setContent: function (v)
        {
            var g = this, p = this.options;
            var content = g.panel.find(".l-panel-content:first");
            if (v)
            {
                content.html(v);
            }
        },
        setUrl: function (url)
        {
            var g = this, p = this.options;
            var content = g.panel.find(".l-panel-content:first");
            if (url)
            {
                g.jiframe = $("<iframe frameborder='0'></iframe>");
                var framename = p.frameName ? p.frameName : "ligerpanel" + new Date().getTime();
                g.jiframe.attr("name", framename);
                g.jiframe.attr("id", framename);
                content.prepend(g.jiframe); 

                setTimeout(function ()
                {
                    if (content.find(".l-panel-loading:first").length == 0)
                        content.append("<div class='l-panel-loading' style='display:block;'></div>");
                    var iframeloading = $(".l-panel-loading:first", content);
                    g.jiframe[0].panel = g;//增加窗口对panel对象的引用
                    /*
                    可以在子窗口这样使用：
                    var panel = frameElement.panel;
                    var panelData = dialog.get('data');//获取data参数
                    panel.set('title','新标题'); //设置标题
                    panel.close();//关闭dialog 
                    */
                    g.jiframe.attr("src", p.url);
                    g.frame = window.frames[g.jiframe.attr("name")];
                }, 0); 
            }
        },
        setShowClose: function (v)
        {
            var g = this, p = this.options;
            var header = g.panel.find(".l-panel-header:first");
            if (v)
            {
                var btn = $("<div class='l-panel-header-close'></div>"); 
                btn.appendTo(header.find(".icons"));
            } else
            {
                header.find(".l-panel-header-close").remove();
            }
        },
        close:function()
        {
            var g = this, p = this.options;
            if (g.trigger('close') == false) return;
            g.panel.remove();
            g.trigger('closed');
        }, 
        show: function ()
        {
            this.panel.show();
        },
        setIcon : function(url)
        {
            var g = this;
            if (!url)
            {
                g.panel.removeClass("l-panel-hasicon");
                g.panel.find('img').remove();
            } else
            {
                g.panel.addClass("l-panel-hasicon");
                g.panel.append('<img src="' + url + '" />');
            }
        }, 
        setWidth: function (value)
        { 
            value && this.panel.width(value);
        },
        setHeight: function (value)
        { 
            var g = this, p = this.options;
            var header = g.panel.find(".l-panel-header:first");
            this.panel.find(".l-panel-content:first").height(value - header.height());
        },
        setTitle: function (value)
        {
            this.panel.find(".l-panel-header span:first").text(value);
        } 
    };

    $.fn.ligerPanel = function (p) {
        this.each(function () {
            p = $.extend({}, $.ligerDefaults.Panel, p || {});
            var po = {};
            var g = new $.ligerManagers.Panel(p, po);

            g.panel = $(this);
            var text = $(this).text()||p.content;
            $(this).text("");
            //g.panel = $(g.element).addClass("l-panel").html("");
            g.panel.append('<div class="l-panel-header"><table style="width:100%;"><tr><td><div class="l-panel-header-drag"><span></span></div></td><td style="width:22px;"><div class="icons"></div></td></tr></table></div><div class="l-panel-content"></div>');

            g.setContent(text);
            g.panel.width(p.width);
            $(".l-panel-content", g.panel).height(p.height);
            p.content_id && $(".l-panel-content", g.panel).attr("id",p.content_id);
            g.setTitle(p.title);
            g.setShowToggle(true);

            p.url && g.setUrl(p.url);

            g.panel.bind("click.panel", function (e) {
                var obj = (e.target || e.srcElement), jobj = $(obj);
                if (jobj.hasClass("l-panel-header-toggle")) {
                    g.toggle();
                } else if (jobj.hasClass("l-panel-header-close")) {
                    g.close();
                }
            });

            $.ligerui.addManager(this, g);
        })
        return $.ligerui.getManager(this);
    }


})(jQuery);