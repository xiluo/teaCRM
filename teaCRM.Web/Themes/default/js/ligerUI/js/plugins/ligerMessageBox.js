/**
* jQuery ligerUI 1.0.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function ($)
{
    ///	<param name="$" type="jQuery"></param>
    $.ligerMessageBox = {};
    $.ligerMessageBox.show = function (p)
    {
        p = p || {};
        p.isDrag == undefined && (p.isDrag = true);
        var messageBoxHTML = "";
        messageBoxHTML += '<div class="l-messagebox">';
        messageBoxHTML += '        <div class="l-messagebox-lt"></div><div class="l-messagebox-rt"></div>';
        messageBoxHTML += '        <div class="l-messagebox-l"></div><div class="l-messagebox-r"></div> ';
        messageBoxHTML += '        <div class="l-messagebox-image"></div>';
        messageBoxHTML += '        <div class="l-messagebox-title">';
        messageBoxHTML += '            <div class="l-messagebox-title-inner"></div>';
        messageBoxHTML += '            <div class="l-messagebox-close"></div>';
        messageBoxHTML += '        </div>';
        messageBoxHTML += '        <div class="l-messagebox-content">';
        messageBoxHTML += '        </div>';
        messageBoxHTML += '        <div class="l-messagebox-buttons"><div class="l-messagebox-buttons-inner">';
        messageBoxHTML += '        </div></div>';
        messageBoxHTML += '    </div>';
        var g = {
            applyWindowMask: function ()
            {
                $(".l-window-mask").remove();
                $("<div class='l-window-mask' style='display: block;'></div>").appendTo($("body"));
            },
            removeWindowMask: function ()
            {
                $(".l-window-mask").remove();
            },
            applyDrag: function ()
            {
                if (p.isDrag && $.fn.ligerDrag)
                    messageBox.ligerDrag({ handler: '.l-messagebox-title' });
            },
            setImage: function ()
            {
                if (p.type)
                {
                    if (p.type == 'success' || p.type == 'donne')
                    {
                        $(".l-messagebox-image", messageBox).addClass("l-messagebox-image-donne").show();
                        $(".l-messagebox-content", messageBox).css({ paddingLeft: 64, paddingBottom: 30 });
                    }
                    else if (p.type == 'error')
                    {
                        $(".l-messagebox-image", messageBox).addClass("l-messagebox-image-error").show();
                        $(".l-messagebox-content", messageBox).css({ paddingLeft: 64, paddingBottom: 30 });
                    }
                    else if (p.type == 'warn')
                    {
                        $(".l-messagebox-image", messageBox).addClass("l-messagebox-image-warn").show();
                        $(".l-messagebox-content", messageBox).css({ paddingLeft: 64, paddingBottom: 30 });
                    }
                    else if (p.type == 'question')
                    {
                        $(".l-messagebox-image", messageBox).addClass("l-messagebox-image-question").show();
                        $(".l-messagebox-content", messageBox).css({ paddingLeft: 64, paddingBottom: 40 });
                    }
                }
            }
        };
        var messageBox = $(messageBoxHTML);
        $('body').append(messageBox);
        messageBox.close = function ()
        {
            g.removeWindowMask();
            messageBox.remove();
        };
        //设置参数属性
        p.width && messageBox.width(p.width);
        p.title && $(".l-messagebox-title-inner", messageBox).html(p.title);
        p.content && $(".l-messagebox-content", messageBox).html(p.content);
        if (p.buttons)
        {
            $(p.buttons).each(function (i, item)
            {
                var btn = $('<div class="l-messagebox-btn"><div class="l-messagebox-btn-l"></div><div class="l-messagebox-btn-r"></div><div class="l-messagebox-btn-inner"></div></div>');
                $(".l-messagebox-btn-inner", btn).html(item.text);
                $(".l-messagebox-buttons-inner", messageBox).append(btn);
                item.width && btn.width(item.width);
                item.onclick && btn.click(function () { item.onclick(item, i, messageBox) });
            });
            $(".l-messagebox-buttons-inner", messageBox).append("<div class='l-clear'></div>");
        }
        var boxWidth = messageBox.width();
        var sumBtnWidth = 0;
        $(".l-messagebox-buttons-inner .l-messagebox-btn", messageBox).each(function ()
        {
            sumBtnWidth += $(this).width();
        });
        $(".l-messagebox-buttons-inner", messageBox).css({ marginLeft: parseInt((boxWidth - sumBtnWidth) * 0.5) });
        //设置背景、拖动支持 和设置图片
        g.applyWindowMask();
        g.applyDrag();
        g.setImage();
        //设置事件
        $(".l-messagebox-btn", messageBox).hover(function ()
        {
            $(this).addClass("l-messagebox-btn-over");
            $(".l-messagebox-btn-l", this).addClass("l-messagebox-btn-l-over");
            $(".l-messagebox-btn-r", this).addClass("l-messagebox-btn-r-over");
        }, function ()
        {
            $(this).removeClass("l-messagebox-btn-over");
            $(".l-messagebox-btn-l", this).removeClass("l-messagebox-btn-l-over");
            $(".l-messagebox-btn-r", this).removeClass("l-messagebox-btn-r-over");
        });
        $(".l-messagebox-close", messageBox).hover(function ()
        {
            $(this).addClass("l-messagebox-close-over");
        }, function ()
        {
            $(this).removeClass("l-messagebox-close-over");
        }).click(function ()
        {
            messageBox.close();
        });
    };
    $.ligerMessageBox.alert = function (title, content, type, onBtnClick)
    {
        title = title || "";
        content = content || title;
        var g = {
            onclick: function (item, index, messageBox)
            {
                messageBox.close();
                if (onBtnClick)
                    onBtnClick(item, index, messageBox);
            }
        };
        p = {
            title: title,
            content: content,
            buttons: [{ text: '确定', onclick: g.onclick}]
        };
        if (type) p.type = type;
        $.ligerMessageBox.show(p);
    };
    $.ligerMessageBox.confirm = function (title, content, callback)
    {
        var g = {
            onclick: function (item, index, messageBox)
            {
                messageBox.close();
                if (callback)
                {
                    callback(index == 0);
                }
            }
        };
        p = {
            type: 'question',
            title: title,
            content: content,
            buttons: [{ text: '是', onclick: g.onclick }, { text: '否', onclick: g.onclick}]
        };
        $.ligerMessageBox.show(p);
    };
    $.ligerMessageBox.success = function (title, content, onBtnClick)
    {
        $.ligerMessageBox.alert(title, content, 'success', onBtnClick);
    };
    $.ligerMessageBox.error = function (title, content, onBtnClick)
    {
        $.ligerMessageBox.alert(title, content, 'error', onBtnClick);
    };
    $.ligerMessageBox.warn = function (title, content, onBtnClick)
    {
        $.ligerMessageBox.alert(title, content, 'warn', onBtnClick);
    };
    $.ligerMessageBox.question = function (title, content)
    {
        $.ligerMessageBox.alert(title, content, 'question');
    };



    function preLoadImage()
    {
        var imagePath = '../lib/ligerUI/skins/Aqua/images/';
        var imageArr = ['box/box-btn-done.gif', 'box/box-btn-error.gif', 'box/box-btn-l.gif', 'box/box-btn-l-over.gif',
             'box/box-btn-question.gif', 'box/box-btn-over.gif', 'box/box-righttop.gif', 'box/box-lefttop.gif', 'box/box-top.gif', 'box/box-btn-r.gif', 'box/box-btn-r-over.gif', 'box/box-btn-warn.gif', 'box/box-close.gif', 'box/box-close-over.gif', 'box/tabs-item-left-bg.gif'];
        for (i = 0; i < imageArr.length; i++)
        {
            new Image().src = imagePath + imageArr[i];
        }
    }
    //preLoadImage();
})(jQuery);