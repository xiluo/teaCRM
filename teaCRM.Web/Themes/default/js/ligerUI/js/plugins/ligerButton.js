/**
* jQuery ligerUI 1.1.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
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


    $.fn.ligerGetButtonManager = function () {
        return $.ligerui.getManager(this);
    };

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Button = { width: 70, text: 'Button', disabled: false };

    //Button manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.Button = function (options, po) {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.Button.prototype = {
        setValue: function (text) {
            this.options.text = text;
            $("span", this.button).html(text);
        },
        getValue: function () {
            return this.options.text;
        },
        setEnabled: function () {
            this.button.removeClass("l-btn-disabled");
            this.options.disabled = false;
        },
        setDisabled: function () {
            this.button.addClass("l-btn-disabled");
            this.options.disabled = true;
        }
    };
    $.fn.ligerButton = function (options) {
        this.each(function () {
            if (this.applyligerui) return;
            var p = $.extend({}, $.ligerDefaults.Button, options || {});
            var po = {};
            var g = new $.ligerManagers.Button(p, po);
            g.button = $(this);
            if (!g.button.hasClass("l-btn")) g.button.addClass("l-btn");
            if (p.width) g.button.width(p.width);
            if (p.disabled) g.setDisabled();
            p.text && g.button.append('<span class="l-btn-label">' + p.text + '</span>');

            if (p.icon) {
                $(".l-btn-label", g.button).append("<div class='l-btn-icon'></div>");
                $(".l-btn-icon", g.button).css({ "background": "url(" + p.icon + ") no-repeat 1px 1px", width: "18px", height: "18px" });
                $(".l-btn-label", g.button).addClass("l-btn-hasicon");
            }

            g.button.append('<div class="l-btn-l"></div><div class="l-btn-r"></div>');

            //设置事件
            $(".l-btn").hover(function () {
                $(this).addClass("l-btn-over");
            }, function () {
                $(this).removeClass("l-btn-over");
            });

            p.click && g.button.click(function () {
                if (!p.disabled)
                    p.click();
            });
            $.ligerui.addManager(this, g);
        });
        return $.ligerui.getManager(this);
    };

})(jQuery);