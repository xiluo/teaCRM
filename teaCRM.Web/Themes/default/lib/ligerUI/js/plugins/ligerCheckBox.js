/**
* jQuery ligerUI 1.1.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function ($)
{
    //manager base
    $.ligerui = $.ligerui || {};
    $.ligerui.addManager = function (dom, manager)
    {
        if (dom.id == undefined || dom.id == "")
            dom.id = "ligerui" + (1000 + $.ligerui.ManagerCount);
        $.ligerui.ManagerCount++;
        $.ligerui.Managers[dom.id] = manager;
        dom.applyligerui = true;
    };
    $.ligerui.getManager = function (domArr)
    {
        if (domArr.length == 0) return null;
        return $.ligerui.Managers[domArr[0].id];
    };
    $.ligerui.Managers = $.ligerui.Managers || {};
    $.ligerui.ManagerCount = $.ligerui.ManagerCount || 0;

    $.fn.ligerGetCheckBoxManager = function ()
    {
        return $.ligerui.getManager(this);
    };

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.CheckBox = { disabled: false };

    //CheckBox manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.CheckBox = function (options, po)
    {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.CheckBox.prototype = {
        setValue: function (value)
        {
            var g = this;
            if (!value)
            {
                g.input[0].checked = false;
                g.link.removeClass('l-checkbox-checked');
            }
            else
            {
                g.input[0].checked = true;
                g.link.addClass('l-checkbox-checked');
            }
        },
        getValue: function ()
        {
            return this.input[0].checked;
        },
        setEnabled: function ()
        {
            this.input.attr('disabled', false);
            this.wrapper.removeClass("l-disabled");
            this.options.disabled = false;
        },
        setDisabled: function ()
        {
            this.input.attr('disabled', true);
            this.wrapper.addClass("l-disabled");
            this.options.disabled = true;
        },
        updateStyle: function ()
        { 
            if (this.input.attr('disabled'))
            {
                this.wrapper.addClass("l-disabled");
                this.options.disabled = true;
            }
            if (this.input[0].checked)
            {
                this.link.addClass('l-checkbox-checked');
            }
            else
            {
                this.link.removeClass('l-checkbox-checked');
            }
        }
    };

    $.fn.ligerCheckBox = function (options)
    {
        this.each(function ()
        {
            if (this.applyligerui) return;
            var p = $.extend({}, $.ligerDefaults.CheckBox, options || {});
            var po = {};
            var g = new $.ligerManagers.CheckBox(p, po);
            g.input = $(this);
            g.link = $('<a class="l-checkbox"></a>');
            g.wrapper = g.input.addClass('l-hidden').wrap('<div class="l-checkbox-wrapper"></div>').parent();
            g.wrapper.prepend(g.link);
            if (p.css) g.wrapper.css(p.css);
            g.link.click(function ()
            {
                if (g.input.attr('disabled')) { return false; }
                if (p.disabled) return false;
                if (p.onBeforeClick)
                {
                    if (!p.onBeforeClick(g.input[0]))
                        return false;
                }
                if ($(this).hasClass("l-checkbox-checked"))
                {
                    g.setValue(false);
                }
                else
                {
                    g.setValue(true);
                }
                g.input.trigger("change");
            });
            g.wrapper.hover(function ()
            {
                if (!p.disabled)
                    $(this).addClass("l-over");
            }, function ()
            {
                $(this).removeClass("l-over");
            });
            this.checked && g.link.addClass('l-checkbox-checked');
            $.ligerui.addManager(this, g);
        });
        return $.ligerui.getManager(this);
    };

})(jQuery);