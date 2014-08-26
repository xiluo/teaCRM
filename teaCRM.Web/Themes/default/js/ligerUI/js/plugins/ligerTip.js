/**
* jQuery ligerUI 1.1.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function ($)
{

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Tip = {
        content: null,
        callback: null,
        width: 90,
        height: null,
        distanceX: 1,
        distanceY: -3,
        appendIdTo: null       //保存ID到那一个对象(jQuery)
    };

    var tipnumber = 0; 
    $.fn.ligerTip = function (options)
    { 
        this.each(function ()
        {
            var p = $.extend({}, $.ligerDefaults.Tip, options || {});
            var tip = null;
            p.content = p.content || this.title;
            var tipid = $(this).attr("ligerTipId");
            if (tipid)
            {
                tip = $("#" + tipid);
                if (p.content == "") tip.remove();
                else $(".l-verify-tip-content", tip).html(p.content);
            }
            else if (p.content)
            {
                tip = $('<div class="l-verify-tip"><div class="l-verify-tip-corner"></div><div class="l-verify-tip-content">' + p.content + '</div></div>');
                tip.attr("id", "ligeruitip" + tipnumber++);
                tip.appendTo('body');
            }
            if (!tip) return;
            tip.css({ left: $(this).offset().left + $(this).width() + p.distanceX, top: $(this).offset().top + p.distanceY }).show();
            $(this).attr("ligerTipId", tip.attr("id"));
            p.width && $("> .l-verify-tip-content", tip).width(p.width - 8);
            p.height && $("> .l-verify-tip-content", tip).width(p.height);
            p.appendIdTo && p.appendIdTo.attr("ligerTipId", tip.attr("id"));
            p.callback && p.callback(tip);
        });
        if (this.length == 0) return null;
        if (this.length == 1) return this[0].ligerTip;
        var tips = [];
        this.each(function ()
        {
            tips.push(this.ligerTip);
        });
        return tips;
    };
    $.fn.ligerHideTip = function (p)
    {
        return this.each(function ()
        {
            var tipid = $(this).attr("ligerTipId");
            if (tipid)
            {
                $("#" + tipid).remove();
                $("[ligerTipId=" + tipid + "]").removeAttr("ligerTipId");
            }
        });
    };
})(jQuery);

