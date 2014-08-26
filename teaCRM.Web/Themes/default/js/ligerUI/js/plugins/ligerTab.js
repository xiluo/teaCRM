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

    $.fn.ligerGetTabManager = function ()
    {
        return $.ligerui.getManager(this);
    };

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Tab = {
        height: null,
        heightDiff: 0, // 高度补差 
        changeHeightOnResize: false,
        contextmenu: true,
        closeMessage: "关闭当前页",
        closeOtherMessage: "关闭其他",
        closeAllMessage: "关闭所有",
        reloadMessage: "刷新",
        onBeforeOverrideTabItem: null,
        onAfterOverrideTabItem: null,
        onBeforeRemoveTabItem: null,
        onAfterRemoveTabItem: null,
        onBeforeAddTabItem: null,
        onAfterAddTabItem: null,
        onBeforeSelectTabItem: null,
        onAfterSelectTabItem: null
    };
    //Tab manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.Tab = function (options, po)
    {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.Tab.prototype = {
        //设置tab按钮(左和右),显示返回true,隐藏返回false
        setTabButton: function ()
        {
            var po = this.po, g = this, p = this.options;
            var sumwidth = 0;
            $("li", g.tab.links.ul).each(function ()
            {
                sumwidth += $(this).width() + 2;
            });
            var mainwidth = g.tab.width();
            if (sumwidth > mainwidth)
            {
                g.tab.links.append('<div class="l-tab-links-left"></div><div class="l-tab-links-right"></div>');
                g.setTabButtonEven();
                return true;
            } else
            {
                g.tab.links.ul.animate({ left: 0 });
                $(".l-tab-links-left,.l-tab-links-right", g.tab.links).remove();
                return false;
            }
        },
        //设置左右按钮的事件 标签超出最大宽度时，可左右拖动
        setTabButtonEven: function ()
        {
            var po = this.po, g = this, p = this.options;
            $(".l-tab-links-left", g.tab.links).hover(function ()
            {
                $(this).addClass("l-tab-links-left-over");
            }, function ()
            {
                $(this).removeClass("l-tab-links-left-over");
            }).click(function ()
            {
                g.moveToPrevTabItem();
            });
            $(".l-tab-links-right", g.tab.links).hover(function ()
            {
                $(this).addClass("l-tab-links-right-over");
            }, function ()
            {
                $(this).removeClass("l-tab-links-right-over");
            }).click(function ()
            {
                g.moveToNextTabItem();
            });
        },
        //切换到上一个tab
        moveToPrevTabItem: function ()
        {
            var po = this.po, g = this, p = this.options;
            var btnWitdth = $(".l-tab-links-left", g.tab.links).width();
            var leftList = new Array(); //记录每个tab的left,由左到右
            $("li", g.tab.links).each(function (i, item)
            {
                var currentItemLeft = -1 * btnWitdth;
                if (i > 0)
                {
                    currentItemLeft = parseInt(leftList[i - 1]) + $(this).prev().width() + 2;
                }
                leftList.push(currentItemLeft);
            });
            var currentLeft = -1 * parseInt(g.tab.links.ul.css("left"));
            for (var i = 0; i < leftList.length - 1; i++)
            {
                if (leftList[i] < currentLeft && leftList[i + 1] >= currentLeft)
                {
                    g.tab.links.ul.animate({ left: -1 * parseInt(leftList[i]) });
                    return;
                }
            }
        },
        //切换到下一个tab
        moveToNextTabItem: function ()
        {
            var po = this.po, g = this, p = this.options;
            var btnWitdth = $(".l-tab-links-right", g.tab).width();
            var sumwidth = 0;
            var tabItems = $("li", g.tab.links.ul);
            tabItems.each(function ()
            {
                sumwidth += $(this).width() + 2;
            });
            var mainwidth = g.tab.width();
            var leftList = new Array(); //记录每个tab的left,由右到左 
            for (var i = tabItems.length - 1; i >= 0; i--)
            {
                var currentItemLeft = sumwidth - mainwidth + btnWitdth + 2;
                if (i != tabItems.length - 1)
                {
                    currentItemLeft = parseInt(leftList[tabItems.length - 2 - i]) - $(tabItems[i + 1]).width() - 2;
                }
                leftList.push(currentItemLeft);
            }
            var currentLeft = -1 * parseInt(g.tab.links.ul.css("left"));
            for (var i = 1; i < leftList.length; i++)
            {
                if (leftList[i] <= currentLeft && leftList[i - 1] > currentLeft)
                {
                    g.tab.links.ul.animate({ left: -1 * parseInt(leftList[i - 1]) });
                    return;
                }
            }
        },
        getTabItemCount: function ()
        {
            var po = this.po, g = this, p = this.options;
            return $("li", g.tab.links.ul).length;
        },
        getSelectedTabItemID: function ()
        {
            var po = this.po, g = this, p = this.options;
            return $("li.l-selected", g.tab.links.ul).attr("tabid");
        },
        removeSelectedTabItem: function ()
        {
            var po = this.po, g = this, p = this.options;
            g.removeTabItem(g.getSelectedTabItemID());
        },
        //覆盖选择的tabitem
        overrideSelectedTabItem: function (options)
        {
            var po = this.po, g = this, p = this.options;
            g.overrideTabItem(g.getSelectedTabItemID(), options);
        },
        //覆盖
        overrideTabItem: function (targettabid, options)
        {
            var po = this.po, g = this, p = this.options;
            if (p.onBeforeOverrideTabItem && p.onBeforeOverrideTabItem(targettabid) == false) return false;

            var tabid = options.tabid;
            if (tabid == undefined) tabid = g.getNewTabid();
            var url = options.url;
            var content = options.content;
            var target = options.target;
            var text = options.text;
            var showClose = options.showClose;
            var height = options.height;
            //如果已经存在
            if (g.isTabItemExist(tabid))
            {
                return;
            }
            var tabitem = $("li[tabid=" + targettabid + "]", g.tab.links.ul);
            var contentitem = $(".l-tab-content-item[tabid=" + targettabid + "]", g.tab.content);
            if (!tabitem || !contentitem) return;
            tabitem.attr("tabid", tabid);
            contentitem.attr("tabid", tabid);
            if ($("iframe", contentitem).length == 0 && url)
            {
                contentitem.html("<iframe frameborder='0'></iframe>");
            }
            else if (content)
            {
                contentitem.html(content);
            }
            $("iframe", contentitem).attr("name", tabid);
            if (showClose == undefined) showClose = true;
            if (showClose == false) $(".l-tab-links-item-close", tabitem).remove();
            else
            {
                if ($(".l-tab-links-item-close", tabitem).length == 0)
                    tabitem.append("<div class='l-tab-links-item-close'></div>");
            }
            if (text == undefined) text = tabid;
            if (height) contentitem.height(height);
            $("a", tabitem).text(text);
            $("iframe", contentitem).attr("src", url);


            p.onAfterOverrideTabItem && p.onAfterOverrideTabItem(targettabid);
        },
        //选中tab项
        selectTabItem: function (tabid)
        {
            var po = this.po, g = this, p = this.options;
            if (p.onBeforeSelectTabItem && p.onBeforeSelectTabItem(tabid) == false) return false;
            g.selectedTabId = tabid;
            $("> .l-tab-content-item[tabid=" + tabid + "]", g.tab.content).show().siblings().hide();
            $("li[tabid=" + tabid + "]", g.tab.links.ul).addClass("l-selected").siblings().removeClass("l-selected");
            p.onAfterSelectTabItem && p.onAfterSelectTabItem(tabid);
        },
        //移动到最后一个tab
        moveToLastTabItem: function ()
        {
            var po = this.po, g = this, p = this.options;
            var sumwidth = 0;
            $("li", g.tab.links.ul).each(function ()
            {
                sumwidth += $(this).width() + 2;
            });
            var mainwidth = g.tab.width();
            if (sumwidth > mainwidth)
            {
                var btnWitdth = $(".l-tab-links-right", g.tab.links).width();
                g.tab.links.ul.animate({ left: -1 * (sumwidth - mainwidth + btnWitdth + 2) });
            }
        },
        //判断tab是否存在
        isTabItemExist: function (tabid)
        {
            var po = this.po, g = this, p = this.options;
            return $("li[tabid=" + tabid + "]", g.tab.links.ul).length > 0;
        },
        //增加一个tab
        addTabItem: function (options)
        {
            var po = this.po, g = this, p = this.options;
            if (p.onBeforeAddTabItem && p.onBeforeAddTabItem(tabid) == false) return false;

            var tabid = options.tabid;
            if (tabid == undefined) tabid = g.getNewTabid();
            var url = options.url;
            var content = options.content;
            var text = options.text;
            var showClose = options.showClose;
            var height = options.height;
            //如果已经存在
            if (g.isTabItemExist(tabid))
            {
                g.selectTabItem(tabid);
                return;
            }
            var tabitem = $("<li><a></a><div class='l-tab-links-item-left'></div><div class='l-tab-links-item-right'></div><div class='l-tab-links-item-close'></div></li>");
            var contentitem = $("<div class='l-tab-content-item'><iframe frameborder='0'></iframe></div>");
            if (g.makeFullHeight)
            {
                var newheight = g.tab.height() - g.tab.links.height();
                contentitem.height(newheight);
            }
            tabitem.attr("tabid", tabid);
            contentitem.attr("tabid", tabid);
            $("iframe", contentitem).attr("name", tabid);
            if (showClose == undefined) showClose = true;
            if (showClose == false) $(".l-tab-links-item-close", tabitem).remove();
            if (text == undefined) text = tabid;
            if (height) contentitem.height(height);
            $("a", tabitem).text(text);
            $("iframe", contentitem).attr("src", url);
            g.tab.links.ul.append(tabitem);
            g.tab.content.append(contentitem);
            g.selectTabItem(tabid);
            if (g.setTabButton())
            {
                g.moveToLastTabItem();
            }
            //增加事件
            g.addTabItemEvent(tabitem);
            p.onAfterAddTabItem && p.onAfterAddTabItem(tabid);
        },
        //增加一个div tab
        addDivTabItem: function (options) {
            var po = this.po, g = this, p = this.options;
            if (p.onBeforeAddTabItem && p.onBeforeAddTabItem(tabid) == false) return false;

            var tabid = options.tabid;
            if (tabid == undefined) tabid = g.getNewTabid();

            var content = options.content;
            var text = options.text;
            var showClose = options.showClose;
            var height = options.height;
            //如果已经存在
            if (g.isTabItemExist(tabid)) {
                g.selectTabItem(tabid);
                return;
            }
            var tabitem = $("<li><a></a><div class='l-tab-links-item-left'></div><div class='l-tab-links-item-right'></div><div class='l-tab-links-item-close'></div></li>");
            var contentitem = $("<div class='l-tab-content-item'><div class='new-content-div'></div></div>");
            if (g.makeFullHeight) {
                var newheight = g.tab.height() - g.tab.links.height();
                contentitem.height(newheight);
            }
            tabitem.attr("tabid", tabid);
            contentitem.attr("tabid", tabid);
            $(".new-content-div", contentitem).attr("id", "contentdiv-"+ tabid);
            if (showClose == undefined) showClose = true;
            if (showClose == false) $(".l-tab-links-item-close", tabitem).remove();
            if (text == undefined) text = tabid;
            if (height) contentitem.height(height);
            $("a", tabitem).text(text);
   
            g.tab.links.ul.append(tabitem);
            g.tab.content.append(contentitem);
            g.selectTabItem(tabid);
            if (g.setTabButton()) {
                g.moveToLastTabItem();
            }
            //增加事件
            g.addTabItemEvent(tabitem);
            p.onAfterAddTabItem && p.onAfterAddTabItem(tabid);
        },
        addTabItemEvent: function (tabitem)
        {
            var po = this.po, g = this, p = this.options;
            tabitem.click(function ()
            {
                var tabid = $(this).attr("tabid");
                g.selectTabItem(tabid);
            });
            //右键事件支持
            g.tab.menu && po.addTabItemContextMenuEven(tabitem);
            $(".l-tab-links-item-close", tabitem).hover(function ()
            {
                $(this).addClass("l-tab-links-item-close-over");
            }, function ()
            {
                $(this).removeClass("l-tab-links-item-close-over");
            }).click(function ()
            {
                var tabid = $(this).parent().attr("tabid");
                g.removeTabItem(tabid);
            });

        },
        //移除tab项
        removeTabItem: function (tabid)
        {
            var po = this.po, g = this, p = this.options;
            if (p.onBeforeRemoveTabItem && p.onBeforeRemoveTabItem(tabid) == false) return false;
            var currentIsSelected = $("li[tabid=" + tabid + "]", g.tab.links.ul).hasClass("l-selected");
            if (currentIsSelected)
            {
                $(".l-tab-content-item[tabid=" + tabid + "]", g.tab.content).prev().show();
                $("li[tabid=" + tabid + "]", g.tab.links.ul).prev().addClass("l-selected").siblings().removeClass("l-selected");
            }
            $(".l-tab-content-item[tabid=" + tabid + "]", g.tab.content).remove();
            $("li[tabid=" + tabid + "]", g.tab.links.ul).remove();
            g.setTabButton();
            p.onAfterRemoveTabItem && p.onAfterRemoveTabItem(tabid);
        },
        addHeight: function (heightDiff)
        {
            var po = this.po, g = this, p = this.options;
            var newHeight = g.tab.height() + heightDiff;
            g.setHeight(newHeight);
        },
        setHeight: function (height)
        {
            var po = this.po, g = this, p = this.options;
            g.tab.height(height);
            g.setContentHeight();
        },
        setContentHeight: function ()
        {
            var po = this.po, g = this, p = this.options;
            var newheight = g.tab.height() - g.tab.links.height();
            g.tab.content.height(newheight);
            $("> .l-tab-content-item", g.tab.content).height(newheight);
        },
        getNewTabid: function ()
        {
            var po = this.po, g = this, p = this.options;
            g.getnewidcount = g.getnewidcount || 0;
            return 'tabitem' + (++g.getnewidcount);
        },
        //notabid 过滤掉tabid的
        //noclose 过滤掉没有关闭按钮的
        getTabidList: function (notabid, noclose)
        {
            var po = this.po, g = this, p = this.options;
            var tabidlist = [];
            $("> li", g.tab.links.ul).each(function ()
            {
                if ($(this).attr("tabid")
                        && $(this).attr("tabid") != notabid
                        && (!noclose || $(".l-tab-links-item-close", this).length > 0))
                {
                    tabidlist.push($(this).attr("tabid"));
                }
            });
            return tabidlist;
        },
        removeOther: function (tabid, compel)
        {
            var po = this.po, g = this, p = this.options;
            var tabidlist = g.getTabidList(tabid, true);
            $(tabidlist).each(function ()
            {
                g.removeTabItem(this);
            });
        },
        reload: function (tabid)
        {
            var po = this.po, g = this, p = this.options;
            $(".l-tab-content-item[tabid=" + tabid + "] iframe", g.tab.content).each(function (i, iframe)
            {
                $(iframe).attr("src", $(iframe).attr("src"));
            });
        },
        //add function
        flushiframegrid: function (tabid) {
            var po = this.po, g = this, p = this.options;
            $(".l-tab-content-item[tabid=" + tabid + "] iframe", g.tab.content).each(function (i, iframe) {
                if (g.isTabItemExist(tabid))
                {
                    //alert($(iframe));
                    window.frames[tabid].f_reload();
                } 
            });
        },
        removeAll: function (compel)
        {
            var po = this.po, g = this, p = this.options;
            var tabidlist = g.getTabidList(null, true);
            $(tabidlist).each(function ()
            {
                g.removeTabItem(this);
            });
        },
        onResize: function ()
        {
            var po = this.po, g = this, p = this.options;
            if (!p.height || typeof (p.height) != 'string' || p.height.indexOf('%') == -1) return false;
            //set tab height
            if (g.tab.parent()[0].tagName.toLowerCase() == "body")
            {
                var windowHeight = $(window).height();
                windowHeight -= parseInt(g.tab.parent().css('paddingTop'));
                windowHeight -= parseInt(g.tab.parent().css('paddingBottom'));
                g.height = p.heightDiff + windowHeight * parseFloat(g.height) * 0.01;
            }
            else
            {
                g.height = p.heightDiff + (g.tab.parent().height() * parseFloat(p.height) * 0.01);
            }
            g.tab.height(g.height);
            g.setContentHeight();
        }
    };

    $.fn.ligerTab = function (options)
    {

        this.each(function ()
        {
            if (this.applyligerui) return;
            var p = $.extend({}, $.ligerDefaults.Tab, options || {});
            var po = {
                menuItemClick: function (item)
                {
                    if (!item.id || !g.actionTabid) return;
                    switch (item.id)
                    {
                        case "close":
                            g.removeTabItem(g.actionTabid);
                            g.actionTabid = null;
                            break;
                        case "closeother":
                            g.removeOther(g.actionTabid);
                            break;
                        case "closeall":
                            g.removeAll();
                            g.actionTabid = null;
                            break;
                        case "reload":
                            g.selectTabItem(g.actionTabid);
                            g.reload(g.actionTabid);
                            break;
                    }
                },
                addTabItemContextMenuEven: function (tabitem)
                {
                    tabitem.bind("contextmenu", function (e)
                    {
                        if (!g.tab.menu) return;
                        g.actionTabid = tabitem.attr("tabid");
                        g.tab.menu.show({ top: e.pageY, left: e.pageX });
                        if ($(".l-tab-links-item-close", this).length == 0)
                        {
                            g.tab.menu.setDisabled('close');
                        }
                        else
                        {
                            g.tab.menu.setEnabled('close');
                        }
                        return false;
                    });
                }
            };
            var g = new $.ligerManagers.Tab(p, po);
            if (p.height) g.makeFullHeight = true;
            g.tab = $(this);
            if (!g.tab.hasClass("l-tab")) g.tab.addClass("l-tab");

            if (p.contextmenu && $.ligerMenu)
            {
                g.tab.menu = $.ligerMenu({ width: 100, items: [
                    { text: p.closeMessage, id: 'close', click: po.menuItemClick },
                    { text: p.closeOtherMessage, id: 'closeother', click: po.menuItemClick },
                    { text: p.closeAllMessage, id: 'closeall', click: po.menuItemClick },
                    { text: p.reloadMessage, id: 'reload', click: po.menuItemClick }
                ]
                });
            }

            g.tab.content = $('<div class="l-tab-content"></div>');
            $("> div", g.tab).appendTo(g.tab.content);
            g.tab.content.appendTo(g.tab);
            g.tab.links = $('<div class="l-tab-links"><ul style="left: 0px; "></ul></div>');
            g.tab.links.prependTo(g.tab);
            g.tab.links.ul = $("ul", g.tab.links);
            var haslselected = $("> div[lselected=true]", g.tab.content).length > 0;
            g.selectedTabId = $("> div[lselected=true]", g.tab.content).attr("tabid");
            $("> div", g.tab.content).each(function (i, box)
            {
                var li = $('<li class=""><a></a><div class="l-tab-links-item-left"></div><div class="l-tab-links-item-right"></div></li>');
                if ($(box).attr("title"))
                {
                    $("> a", li).html($(box).attr("title"));
                }
                var tabid = $(box).attr("tabid");
                if (tabid == undefined)
                {
                    tabid = g.getNewTabid();
                    $(box).attr("tabid", tabid);
                    if ($(box).attr("lselected"))
                    {
                        g.selectedTabId = tabid;
                    }
                }
                li.attr("tabid", tabid);
                if (!haslselected && i == 0) g.selectedTabId = tabid;
                var showClose = $(box).attr("showClose");
                if (showClose)
                {
                    li.append("<div class='l-tab-links-item-close'></div>");
                }
                $("> ul", g.tab.links).append(li);
                if (!$(box).hasClass("l-tab-content-item")) $(box).addClass("l-tab-content-item");
            });
            //init 
            g.selectTabItem(g.selectedTabId);

            //set content height
            if (p.height)
            {
                if (typeof (p.height) == 'string' && p.height.indexOf('%') > 0)
                {
                    g.onResize();
                    if (p.changeHeightOnResize)
                    {
                        $(window).resize(function ()
                        {
                            g.onResize();
                        });
                    }
                } else
                {
                    g.setHeight(p.height);
                }
            }
            if (g.makeFullHeight)
                g.setContentHeight();


            //add even 
            $("li", g.tab.links).each(function ()
            {
                g.addTabItemEvent($(this));
            });
            $.ligerui.addManager(this, g);
        });
        return $.ligerui.getManager(this);
    };

})(jQuery);