/**
* jQuery ligerUI 1.0.1.1
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
//dialog 图片文件夹的路径 针对于IE6设置
var ligerDialogImagePath = "../../lib/ligerUI/skins/Aqua/images/dialog/";
(function($) {

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Dialog = {
        cls:null,       //给dialog附加css class
        id:null,        //给dialog附加id
        buttons: null, //按钮集合 
        isDrag: true,   //是否拖动
        width: 280,     //宽度
        height: null,   //高度，默认自适应 
        content: '',    //内容
        target: null,   //目标对象，指定它将以appendTo()的方式载入
        url: null,      //目标页url，默认以iframe的方式载入
        load: false,     //是否以load()的方式加载目标页的内容
        type: 'warn',   //类型 warn、success、error、question
        left: null,     //位置left
        top: null,      //位置top
        modal: true,    //是否模态对话框
        name: null,     //创建iframe时 作为iframe的name和id 
        isResize:false, // 是否调整大小
        allowClose:true, //允许关闭
        opener:null,
        timeParmName: null,  //是否给URL后面加上值为new Date().getTime()的参数，如果需要指定一个参数名即可
        zindex:9000
    };
    $.ligerDefaults.DialogString = { 
        titleMessage: '提示',                     //提示文本标题
        waittingMessage:'正在等待中,请稍候...'
    };
    ///	<param name="$" type="jQuery"></param>
    $.ligerDialog = {};
    $.ligerDialog.open = function(p) {
        p = $.extend({}, $.ligerDefaults.Dialog, $.ligerDefaults.DialogString, p || {});
        var zindex = p.zindex;
        var g = {            
            applyWindowMask: function() {
                //$(".l-window-mask").remove();
                if(g.dialog.WindowMask)
                    g.dialog.WindowMask.remove();
                g.dialog.WindowMask = $("<div class='l-window-mask' style='display: block;'></div>");
                g.dialog.WindowMask.height($(window).height() + $(window).scrollTop()).appendTo('body');
                g.dialog.WindowMask.css({ zIndex: zindex });
            },
            removeWindowMask: function() {
                //$(".l-window-mask").remove();
                g.dialog.WindowMask.remove();
            },
            applyDrag: function() {
                if ($.fn.ligerDrag)
                    g.dialog.ligerDrag({ handler: '.l-dialog-title' });
            },
            applyResize:function(){
                if($.fn.ligerResizable)
                {
                    g.dialog.ligerResizable({
                    onStopResize: function (current, e)
                    {
                        var top = 0;
                        var left = 0;
                        if (!isNaN(parseInt(g.dialog.css('top'))))
                            top = parseInt(g.dialog.css('top'));
                        if (!isNaN(parseInt(g.dialog.css('left'))))
                            left = parseInt(g.dialog.css('left'));
                        if (current.diffTop != undefined)
                        {
                            g.dialog.css({
                                top: top + current.diffTop,
                                left: left + current.diffLeft
                            });
                            g.dialog.body.css({
                                width : current.newWidth - 26
                            }); 
                            $(".l-dialog-content",g.dialog.body).height(current.newHeight - 46 -  $(".l-dialog-buttons",  g.dialog).height());
                        }
                        return false;
                    }
                    });
                }
            },
            setImage: function() {
                if (p.type) {
                    if (p.type == 'success' || p.type == 'donne' || p.type == 'ok') {
                        $(".l-dialog-image", g.dialog).addClass("l-dialog-image-donne").show();
                        $(".l-dialog-content", g.dialog).css({ paddingLeft: 64, paddingBottom: 30 });
                    }
                    else if (p.type == 'error') {
                        $(".l-dialog-image", g.dialog).addClass("l-dialog-image-error").show();
                        $(".l-dialog-content", g.dialog).css({ paddingLeft: 64, paddingBottom: 30 });
                    }
                    else if (p.type == 'warn') {
                        $(".l-dialog-image", g.dialog).addClass("l-dialog-image-warn").show();
                        $(".l-dialog-content", g.dialog).css({ paddingLeft: 64, paddingBottom: 30 });
                    }
                    else if (p.type == 'question') {
                        $(".l-dialog-image", g.dialog).addClass("l-dialog-image-question").show();
                        $(".l-dialog-content", g.dialog).css({ paddingLeft: 64, paddingBottom: 40 });
                    }
                }
            }
        };
        g.dialog = $('<div class="l-dialog"><table class="l-dialog-table" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td class="l-dialog-tl"></td><td class="l-dialog-tc"><div class="l-dialog-tc-inner"><div class="l-dialog-icon"></div><div class="l-dialog-title"></div><div class="l-dialog-close"></div></div></td><td class="l-dialog-tr"></td></tr><tr><td class="l-dialog-cl"></td><td class="l-dialog-cc"><div class="l-dialog-body"><div class="l-dialog-image"></div> <div class="l-dialog-content"></div><div class="l-dialog-buttons"><div class="l-dialog-buttons-inner"></div></td><td class="l-dialog-cr"></td></tr><tr><td class="l-dialog-bl"></td><td class="l-dialog-bc"></td><td class="l-dialog-br"></td></tr></tbody></table></div>');
        //g.dialog = $('<div class="l-dialog"><table class="l-dialog-table" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td class="l-dialog-tc"><div class="l-dialog-tc-inner"><div class="l-dialog-icon"></div><div class="l-dialog-title"></div><div class="l-dialog-close"></div></div></td></tr><tr><td class="l-dialog-cc"><div class="l-dialog-body"><div class="l-dialog-image"></div> <div class="l-dialog-content"></div><div class="l-dialog-buttons"><div class="l-dialog-buttons-inner"></div></td></tr><tr><td class="l-dialog-bc"></td></tr></tbody></table></div>');

        $('body').append(g.dialog);
        g.dialog.body = $(".l-dialog-body:first", g.dialog);
        g.dialog.close = function() {
            if(g.dialog.frame)
            {
                $(g.dialog.frame.document).ready(function(){
                    g.removeWindowMask(); 
                    g.dialog.remove();
                });
            }
            else
            {
                g.removeWindowMask();
                g.dialog.remove();
            }
        };
        g.dialog.doShow = function() {
            g.dialog.show();
        };
        if(p.allowClose == false) $(".l-dialog-close", g.dialog).remove();
        if (p.target || p.url || p.type == "none") p.type = null;
        if(p.cls) g.dialog.addClass(p.cls);
        if(p.id) g.dialog.attr("id",p.id);

        //设置锁定屏幕、拖动支持 和设置图片
        if (p.modal)
            g.applyWindowMask();
        if (p.isDrag)
            g.applyDrag();
        if(p.isResize)
            g.applyResize();
        if (p.type)
            g.setImage();
        else {
            $(".l-dialog-image", g.dialog).remove();
            $(".l-dialog-content", g.dialog.body).addClass("l-dialog-content-noimage"); 
        } 
        //设置主体内容
        if (p.target) {
            $(".l-dialog-content", g.dialog.body).prepend(p.target);
        }
        else if (p.url) {
            if(p.timeParmName) 
            { 
                p.url += p.url.indexOf('?')==-1 ? "?" : "&" ; 
                p.url += p.timeParmName +"="+new Date().getTime();
            }
            //var iframe = $("<iframe frameborder='0'></iframe>");
            var framename = p.name ?  p.name : "ligerwindow" + new Date().getTime();
            var iframe = $("<iframe frameborder='0' name='" + framename + "'></iframe>");//modify
            //iframe.attr("name", framename);
            $(".l-dialog-content", g.dialog.body).prepend(iframe); 
            $(".l-dialog-content",g.dialog.body).addClass("l-dialog-content-nopadding"); 
            setTimeout(function(){
                iframe.attr("src",p.url); 
                
                g.dialog.frame  = window.frames[iframe.attr("name")];
            },0);  
        }
        else if (p.content) {
            $(".l-dialog-content", g.dialog.body).html(p.content);
        }
        if(p.opener) g.dialog.opener = p.opener;
        //设置按钮
        if (p.buttons) {
                $(p.buttons).each(function(i,item){ 
                                var btn = $('<div class="l-dialog-btn"><div class="l-dialog-btn-l"></div><div class="l-dialog-btn-r"></div><div class="l-dialog-btn-inner"></div></div>');
                                $(".l-dialog-btn-inner", btn).html(item.text);
                                $(".l-dialog-buttons-inner", g.dialog.body).prepend(btn);
                                item.width && btn.width(item.width);   
                                item.onclick && btn.click(function() { item.onclick(item , g.dialog,i) });
                });
        }else{
            $(".l-dialog-buttons",  g.dialog).remove();
        }
        $(".l-dialog-buttons-inner", g.dialog).append("<div class='l-clear'></div>");

        //设置参数属性
        p.width && g.dialog.body.width(p.width - 26);
        if(p.height)
        { 
            $(".l-dialog-content",g.dialog.body).height(p.height - 46 -  $(".l-dialog-buttons",  g.dialog).height());
        }
        p.title = p.title || p.titleMessage;
        p.title && $(".l-dialog-title", g.dialog).html(p.title);
        $(".l-dialog-title", g.dialog).bind("selectstart", function() { return false; });


        //设置事件
        $(".l-dialog-btn", g.dialog.body).hover(function() {
            $(this).addClass("l-dialog-btn-over");
        }, function() {
            $(this).removeClass("l-dialog-btn-over");
        });
        $(".l-dialog-tc .l-dialog-close", g.dialog).hover(function() {
            $(this).addClass("l-dialog-close-over");
        }, function() {
            $(this).removeClass("l-dialog-close-over");
        }).click(function() {
            g.dialog.close();
        });

        //IE6 PNG Fix
        var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
        var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
        if ($.browser.msie && (ie55 || ie6)) {
            $(".l-dialog-tl:first", g.dialog).css({
                "background": "none",
                "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ligerDialogImagePath + "dialog-tl.png',sizingMethod='crop');"
            });
            $(".l-dialog-tc:first", g.dialog).css({
                "background": "none",
                "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ligerDialogImagePath + "ie6/dialog-tc.png',sizingMethod='crop');"
            });
            $(".l-dialog-tr:first", g.dialog).css({
                "background": "none",
                "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ligerDialogImagePath + "dialog-tr.png',sizingMethod='crop');"
            });
            $(".l-dialog-cl:first", g.dialog).css({
                "background": "none",
                "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ligerDialogImagePath + "ie6/dialog-cl.png',sizingMethod='crop');"
            });
            $(".l-dialog-cr:first", g.dialog).css({
                "background": "none",
                "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ligerDialogImagePath + "ie6/dialog-cr.png',sizingMethod='crop');"
            });
            $(".l-dialog-bl:first", g.dialog).css({
                "background": "none",
                "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ligerDialogImagePath + "dialog-bl.png',sizingMethod='crop');"
            });
            $(".l-dialog-bc:first", g.dialog).css({
                "background": "none",
                "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ligerDialogImagePath + "ie6/dialog-bc.png',sizingMethod='crop');"
            });
            $(".l-dialog-br:first", g.dialog).css({
                "background": "none",
                "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + ligerDialogImagePath + "dialog-br.png',sizingMethod='crop');"
            });
        } 
        //位置初始化
        var left = 0;
        var top = 0; 
        var width = p.width || g.dialog.width();
        if (p.left != null) left = p.left;
        else left = 0.5 * ($(window).width() - width);
        if (p.top != null) top = p.top;
        else top = 0.5 * ($(window).height()  -  g.dialog.height()) + $(window).scrollTop() - 10;
        
        g.dialog.css({ left: left, top: top });
        g.dialog.css({ zIndex: Math.abs(zindex)+1 });
        g.dialog.doShow();
        return g.dialog;
    };
    $.ligerDialog.close = function()
    {
        //$(".l-dialog,.l-window-mask").remove();
        g.dialog.remove();
    };
    $.ligerDialog.alert = function(content, title, type, callback) {
        content = content || "";
        if (typeof (title) == "function") {
            callback = title;
            type = null;
        }
        else if (typeof (type) == "function") {
            callback = type;
        }
        var btnclick = function(item, Dialog,index) {
            Dialog.close();
            if (callback)
                callback(item, Dialog,index);
        };
        p = {
            content: content,
            buttons: [{ text: '确定', onclick: btnclick}]
        };
        if (typeof (title) == "string" && title != "") p.title = title;
        if (typeof (type) == "string" && type != "") p.type = type;
        $.ligerDialog.open(p);
    };

    $.ligerDialog.confirm = function(content,title, callback) {
        if (typeof (title) == "function") {
            callback = title;
            type = null;
        }
        var btnclick = function(item, Dialog) {
            Dialog.close();    
            if (callback) {
                callback(item.type=='ok');
            }
        };
        p = {
            type: 'question', 
            content: content,
            buttons: [{ text: '是', onclick: btnclick,type:'ok' }, { text: '否', onclick: btnclick,type:'no'}]
        };
        if (typeof (title) == "string" && title != "") p.title = title;
        $.ligerDialog.open(p);
    };
    $.ligerDialog.warning = function(content, title, callback) {
        if (typeof (title) == "function") {
            callback = title;
            type = null;
        }
       var btnclick= function(item, Dialog) {
            Dialog.close();
            if (callback) {
                callback(item.type);
            }
        };
        p = {
            type: 'question', 
            content: content,
            buttons: [{ text: '是', onclick: btnclick, type: 'yes' }, { text: '否', onclick: btnclick, type: 'no' }, { text: '取消', onclick: btnclick, type: 'cancel'}]
        };
        if (typeof (title) == "string" && title != "") p.title = title;
        $.ligerDialog.open(p);
    };
    $.ligerDialog.waitting = function(title)
    {
        title = title || $.ligerDefaults.Dialog.waittingMessage;
        $.ligerDialog.open({cls:'l-dialog-waittingdialog',type:'none',content:'<div style="padding:4px">'+title+'</div>',allowClose:false});
    };
    $.ligerDialog.closeWaitting = function()
    {
        $(".l-dialog-waittingdialog,.l-window-mask").remove(); 
    };
    $.ligerDialog.success = function(content, title, onBtnClick) {
        $.ligerDialog.alert(content, title, 'success', onBtnClick);
    };
    $.ligerDialog.error = function(content, title, onBtnClick) {
        $.ligerDialog.alert(content, title, 'error', onBtnClick);
    };
    $.ligerDialog.warn = function(content, title, onBtnClick) {
        $.ligerDialog.alert(content, title, 'warn', onBtnClick);
    };
    $.ligerDialog.question = function(content, title) {
        $.ligerDialog.alert(content, title, 'question');
    };


    $.ligerDialog.prompt = function(title,value,multi, callback) {
        var target = $('<input type="text" class="l-dialog-inputtext"/>');
        if(typeof(multi) == "function"){
            callback = multi;
        }
        if (typeof (value) == "function") {
            callback = value; 
        }
        else if (typeof (value) == "boolean") {
            multi = value;  
        }  
        if(typeof(multi) == "boolean" && multi)
        {
            target = $('<textarea class="l-dialog-textarea"></textarea>');
        }
        if(typeof (value) == "string" || typeof (value) == "int")
        { 
            target.val(value);
        }
        var btnclick = function(item, Dialog , index) {
            Dialog.close();
            if (callback) {
                callback(item.type == 'yes', target.val());
            }
        }
        p = {
            title: title,
            target: target,
            width:320,
            buttons: [{ text: '确定', onclick: btnclick, type: 'yes' }, { text: '取消', onclick: btnclick, type: 'cancel'}]
        };
        $.ligerDialog.open(p);
    };

     
})(jQuery);