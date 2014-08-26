/**
* jQuery ligerUI 1.1.0
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

    $.fn.ligerGetTextBoxManager = function () {
        return $.ligerui.getManager(this);
    };

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.TextBox = {
        onChangeValue: null,
        width: null,
        disabled: false,
        value: null,     //初始化值 
        nullText: null,   //不能为空时的提示
        digits: false,     //是否限定为数字输入框
        number: false    //是否限定为浮点数格式输入框
    };

    //TextBox manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.TextBox = function (options, po) {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.TextBox.prototype = {
        checkValue: function () {
            var g = this, p = this.options;
            var v = g.inputText.val();
            if (p.number && !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(v) || p.digits && !/^\d+$/.test(v)) {
                g.inputText.val(g.value || 0);
                return;
            }
            g.value = v;
        },
        setValue: function (value) {
            this.inputText.val(value);
        },
        getValue: function () {
            return this.inputText.val();
        },
        setEnabled: function () {
            this.inputText.removeAttr("readonly");
            this.wrapper.removeClass('l-text-disabled');
            this.options.disabled = false;
        },
        setDisabled: function () {
            this.inputText.attr("readOnly", "true");
            this.wrapper.addClass('l-text-disabled');
            this.options.disabled = true;
        }
    };

    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerTextBox = function (options) {
        this.each(function () {
            if (typeof (this.applyligerui) == Boolean && this.applyligerui) return;
            var p = $.extend({}, options || {});
            if ($(this).attr("ligerui")) {
                try {
                    var attroptions = $(this).attr("ligerui");
                    if (attroptions.indexOf('{') != 0) attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) p = $.extend({}, attroptions, p || {});
                }
                catch (e) { }
            }
            p = $.extend({}, $.ligerDefaults.TextBox, p || {});
            var po = {};
            var g = new $.ligerManagers.TextBox(p, po);

            g.inputText = $(this);

            //nulltext
            if (p.nullText && !p.disabled) {
                if (!g.inputText.val()) {
                    g.inputText.addClass("l-text-field-null").val(p.nullText);
                }
            }
            g.inputText.bind('blur.textBox', function () {
                if (p.nullText && !p.disabled) {
                    if (!g.inputText.val()) {
                        g.inputText.addClass("l-text-field-null").val(p.nullText);
                    }
                }
            }).bind('focus.textBox', function () {
                if (p.nullText) {
                    if ($(this).hasClass("l-text-field-null")) {
                        $(this).removeClass("l-text-field-null").val("");
                    }
                }
            });


            //外层
            g.wrapper = g.inputText.wrap('<div class="l-text"></div>').parent();
            g.wrapper.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
            if (!g.inputText.hasClass("l-text-field"))
                g.inputText.addClass("l-text-field");
            if (!p.width) {
                p.width = g.inputText.width();
                //p.width = 140;
            }
            if (p.disabled) {
                g.inputText.attr("readonly", "readonly");
                g.wrapper.addClass("l-text-disabled");
            }
            g.wrapper.css({ width: p.width });
            g.inputText.css({ width: p.width - 4 });
            if (p.height) {
                g.wrapper.height(p.height);
                g.inputText.height(p.height - 2);
            }
            g.inputText
            .bind('blur.ligerTextBox', function () {
                g.checkValue();
                g.wrapper.removeClass("l-text-focus");
            }).bind('focus.ligerTextBox', function () {
                g.wrapper.addClass("l-text-focus");
            })
            .change(function () {
                if (p.onChangeValue) {
                    p.onChangeValue(this.value);
                }
            });
            g.wrapper.hover(function () {
                g.wrapper.addClass("l-text-over");
            }, function () {
                g.wrapper.removeClass("l-text-over");
            });

            if (p.initValue) {
                g.inputText.val(p.initValue);
            }
            if (p.disabled) {
                g.inputText.attr("readonly", "readonly");
                g.wrapper.addClass('l-text-disabled');
            }

            if (p.label) {
                g.labelwrapper = g.wrapper.wrap('<div class="l-labeltext"></div>').parent();
                g.labelwrapper.prepend('<div class="l-text-label" style="float:left;">' + p.label + '：&nbsp</div>');
                g.wrapper.css('float', 'left');
                if (!p.labelWidth) {
                    p.labelWidth = $('.l-text-label', g.labelwrapper).width();
                } else {
                    $('.l-text-label', g.labelwrapper).width(p.labelWidth);
                }
                $('.l-text-label', g.labelwrapper).height(g.wrapper.height());
                if (p.labelAlign) {
                    $('.l-text-label', g.labelwrapper).css('text-align', p.labelAlign);
                }
                g.labelwrapper.append('<br style="clear:both;" />');
                g.labelwrapper.width(p.labelWidth + p.width + 2);
            }

            $.ligerui.addManager(this, g);
        });
        return $.ligerui.getManager(this);
    };

})(jQuery);