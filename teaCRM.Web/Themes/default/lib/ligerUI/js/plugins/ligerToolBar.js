/**
* jQuery ligerUI 1.1.0.1
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

    $.fn.ligerGetToolBarManager = function () {
        return $.ligerui.getManager(this);
    };
    //Spinner manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.ToolBar = function (options, po) {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.ToolBar.prototype = {
        addItem: function (item) {
            var po = this.po, g = this, p = this.options;
            if (item.type == "line") {
                g.toolBar.append('<div class="l-bar-separator"></div>');
                return;
            }
            else if (item.type == "textbox") {
                if (item.text)
                    g.toolBar.append('<div class="l-toolbar-item  l-panel-label">' + item.text + '</div>');
                g.toolBar.append('<div class="l-toolbar-item"><input type="text" id="' + item.id + '" name="' + item.id + '" style="width:' + item.width + 'px;"></div>');
                return;
            }
            var ditem = $('<div class="l-toolbar-item l-panel-btn"><span></span><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div></div>');
            g.toolBar.append(ditem);
            item.id && ditem.attr("toolbarid", item.id);
            if (item.icon) {
                ditem.append("<div class='l-icon'></div>");
                //ditem.css("background", "url(" + item.icon + ") no-repeat 3px 3px");
                $(".l-icon", ditem).css({ "background": "url(" + item.icon + ") no-repeat 1px 1px", width: "18px", height: "18px" });
                ditem.addClass("l-toolbar-item-hasicon");
            }
            item.text && $("span:first", ditem).html(item.text);
            if (!item.disable) {
                ditem.addClass("l-toolbar-item-disable");
                ditem.attr("disabled", true)
            }
            else {
                item.click && ditem.click(function () { item.click(item); });

                if (item.type == "button") {
                    ditem.hover(function () {
                        $(this).addClass("l-panel-btn-over");
                    }, function () {
                        $(this).removeClass("l-panel-btn-over");
                    });
                }

            }
            if (item.type == "serchbtn") {
                ditem.hover(function () {
                    $(this).addClass("l-panel-btn-over");
                }, function () {
                    $(this).removeClass("l-panel-btn-over");
                }).click(function () {
                    var serchpanel = $(".az");
                    serchpanel.css({ 'border-bottom': 'solid 1px #8DB2E3', 'border-top': 'solid 1px #8DB2E3' });
                    serchpanel.css('top', ditem.offset().top + ditem.height() + 4);

                    serchpanel.appendTo($(document.body));
                    if (serchpanel.css('display') == 'none') {
                        $(this).addClass("l-panel-btn-selected");
                        serchpanel.fadeIn(100)
                    }
                    else {
                        $(this).removeClass("l-panel-btn-selected");
                        serchpanel.fadeOut(100)
                    }
                    this.click;
                })
            }
        }
    };

    $.fn.ligerToolBar = function (options) {
        this.each(function () {
            if (this.applyligerui) return;
            var p = $.extend({}, options || {});
            var po = {};
            var g = new $.ligerManagers.ToolBar(p, po);
            g.toolBar = $(this);

            if (!g.toolBar.hasClass("l-toolbar")) g.toolBar.addClass("l-toolbar");
            if (p.background == false) g.toolBar.removeClass("l-toolbar");
            if (p.items) {

                $(p.items).each(function (i, item) {
                    g.addItem(item);
                });
            }
            $.ligerui.addManager(this, g);
        });
        return $.ligerui.getManager(this);
    };

})(jQuery);