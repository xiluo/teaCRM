/**
* jQuery ligerUI 1.1.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function ($)
{
    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerApplyWindow = function (p)
    {
        return this.each(function ()
        {
            p = $.extend({
                showClose: true,
                showMax: true,
                showToggle: true
            }, p || {});
            var g = {};
            g.window = $('<div class="l-window"><div class="l-window-header"><div class="l-window-header-buttons"><div class="l-window-toggle"></div><div class="l-window-max"></div><div class="l-window-close"></div><div class="l-clear"></div></div><div class="l-window-header-inner"></div></div><div class="l-window-content"></div></div>');
            g.window.content = $(".l-window-content", g.window);
            g.window.header = $(".l-window-header", g.window);
            $(this).appendTo(g.window.content);
            $.ligerWindow.switchWindow(g.window[0]);
            $('body').append(g.window);
            //设置参数属性
            p.left && g.window.css('left', p.left);
            p.right && g.window.css('right', p.right);
            p.top && g.window.css('top', p.top);
            p.bottom && g.window.css('bottom', p.bottom);
            p.width && g.window.width(p.width);
            p.height && g.window.content.height(p.height - 28);
            p.title && $(".l-window-header-inner", g.window.header).html(p.title);
            p.framename && $(">iframe", g.window.content).attr('name', p.framename);
            if (!p.showToggle) $(".l-window-toggle", g.window).remove();
            if (!p.showMax) $(".l-window-max", g.window).remove();
            if (!p.showClose) $(".l-window-close", g.window).remove();
            //拖动支持
            if ($.fn.ligerDrag)
            {
                g.window.ligerDrag({ handler: '.l-window-header', onStartDrag: function ()
                {
                    $.ligerWindow.switchWindow(g.window[0]);
                    g.window.addClass("l-window-dragging");
                    g.window.content.children().hide();
                }, onStopDrag: function ()
                {
                    g.window.removeClass("l-window-dragging");
                    g.window.content.children().show();
                }
                });
            }
            //改变大小支持
            if ($.fn.ligerResizable)
            {

                g.window.ligerResizable({
                    onStartResize: function ()
                    {
                        $.ligerWindow.switchWindow(g.window[0]);
                        if ($(".l-window-max", g.window).hasClass("l-window-regain"))
                        {
                            $(".l-window-max", g.window).removeClass("l-window-regain");
                        }
                    },
                    onStopResize: function (current, e)
                    {
                        var top = 0;
                        var left = 0;
                        if (!isNaN(parseInt(g.window.css('top'))))
                            top = parseInt(g.window.css('top'));
                        if (!isNaN(parseInt(g.window.css('left'))))
                            left = parseInt(g.window.css('left'));
                        if (current.diffTop != undefined)
                        {
                            g.window.css({
                                top: top + current.diffTop,
                                left: left + current.diffLeft,
                                width: current.newWidth
                            });
                            g.window.content.height(current.newHeight - 28);
                        }
                        return false;
                    }
                });
                g.window.append("<div class='l-btn-nw-drop'></div>");
            }
            //设置事件 
            $(".l-window-toggle", g.window).click(function ()
            {
                if ($(this).hasClass("l-window-toggle-close"))
                {
                    $(this).removeClass("l-window-toggle-close");
                } else
                {
                    $(this).addClass("l-window-toggle-close");
                }
                g.window.content.slideToggle();
            });
            $(".l-window-close", g.window).click(function ()
            {
                if (p.onClose && p.onClose() == false) return false;
                g.window.hide();
            });
            $(".l-window-max", g.window).click(function ()
            {
                if ($(this).hasClass("l-window-regain"))
                {
                    if (p.onRegain && p.onRegain() == false) return false;
                    g.window.width(g.lastWindowWidth).css({ left: g.lastWindowLeft, top: g.lastWindowTop });
                    g.window.content.height(g.lastWindowHeight - 28);
                    $(this).removeClass("l-window-regain");
                }
                else
                {
                    if (p.onMax && p.onMax() == false) return false;
                    g.lastWindowWidth = g.window.width();
                    g.lastWindowHeight = g.window.height();
                    g.lastWindowLeft = g.window.css('left');
                    g.lastWindowTop = g.window.css('top');
                    g.window.width($(window).width() - 2).css({ left: 0, top: 0 });
                    g.window.content.height($(window).height() - 28);
                    $(this).addClass("l-window-regain");
                }
            });
        });
    }

    $.ligerWindow = {};
    $.ligerWindow.switchWindow = function (window)
    {
        $(window).css("z-index", "101").siblings(".l-window").css("z-index", "100");
    };
    $.ligerWindow.show = function (p)
    {
        p = p || {};
        if (p.url)
        {
            var iframe = $("<iframe frameborder='0' src='" + p.url + "'></iframe>");
            var framename = "window" + new Date().getTime();
            if (p.name) framename = p.name;
            iframe.attr("name", framename);
            p.framename = framename;
            iframe.ligerApplyWindow($.extend({}, p));
        }
        else if (p.content)
        {
            var content = $("<div>" + p.content + "</div>");
            content.ligerApplyWindow($.extend({}, p));
        }
        else if (p.target)
        {
            p.target.ligerApplyWindow($.extend({}, p));
        }
    };
})(jQuery);