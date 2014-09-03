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


    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Radio = { disabled: false };

    //CheckBox manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.Radio = function (options, po)
    {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.Radio.prototype = {
        setValue: function (value)
        {
            var g = this;
            if (!value)
            {
                g.input[0].checked = false;
                g.link.removeClass('l-radio-checked');
            }
            else
            {
                g.input[0].checked = true;
                g.link.addClass('l-radio-checked');
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

    $.fn.ligerRadio = function (options)
    {
        this.each(function ()
        {
            if (this.applyligerui) return;
            var p = $.extend({}, $.ligerDefaults.CheckBox, options || {});
            var po = {
                doclick: function ()
                {
                    if (g.input.attr('disabled')) { return false; }
                    g.input.trigger('click').trigger('change');
                    var formEle;
                    if (g.input[0].form) formEle = g.input[0].form;
                    else formEle = document;
                    $("input:radio[name=" + g.input[0].name + "]", formEle).not(g.input).trigger("change");
                    return false;
                }
            };
            var g = new $.ligerManagers.Radio(p, po);

            g.input = $(this);
            g.link = $('<a href="javascript:void(0)" class="l-radio"></a>');
            g.wrapper = g.input.addClass('l-hidden').wrap('<div class="l-radio-wrapper"></div>').parent();
            g.wrapper.prepend(g.link);
            g.input.change(function ()
            {
                if (this.checked)
                {
                    g.link.addClass('l-radio-checked');
                }
                else
                {
                    g.link.removeClass('l-radio-checked');
                }
                return true;
            });
            g.link.click(function ()
            {
                po.doclick();
            });
            g.wrapper.hover(function ()
            {
                if (!p.disabled)
                    $(this).addClass("l-over");
            }, function ()
            {
                $(this).removeClass("l-over");
            });
            this.checked && g.link.addClass('l-radio-checked');

            if (this.id)
            {
                $("label[for=" + this.id + "]").click(function ()
                {
                    po.doclick();
                });
            }
            $.ligerui.addManager(this, g);
        });
        return $.ligerui.getManager(this);
    };

})(jQuery);