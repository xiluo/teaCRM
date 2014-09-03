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
    $.ligerDefaults.Menu = {
        width: 120,
        top: 0,
        left: 0,
        items: null,
        shadow: true
    };

    //menu manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.Menu = function (options, po)
    {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.Menu.prototype = {
        show: function (options, menu)
        {
            var g = this, po = this.po, p = this.options;
            if (menu == undefined) menu = g.menu;
            if (options && options.left != undefined)
            {
                menu.css({ left: options.left });
            }
            if (options && options.top != undefined)
            {
                menu.css({ top: options.top });
            }
            menu.show();
            g.updateShadow(menu);
        },
        updateShadow: function (menu)
        {
            var g = this, po = this.po, p = this.options;
            if (!p.shadow) return;
            menu.shadow.css({
                left: menu.css('left'),
                top: menu.css('top'),
                width: menu.outerWidth(),
                height: menu.outerHeight()
            });
            if (menu.is(":visible"))
                menu.shadow.show();
            else
                menu.shadow.hide();
        },
        hide: function (menu)
        {
            var g = this, po = this.po, p = this.options;
            if (menu == undefined) menu = g.menu;
            g.hideAllSubMenu(menu);
            menu.hide();
            g.updateShadow(menu);
        },
        toggle: function ()
        {
            var g = this, po = this.po, p = this.options;
            g.menu.toggle();
            g.updateShadow(g.menu);
        },
        removeItem: function (itemid)
        {
            var g = this, po = this.po, p = this.options;
            $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).remove();
            g.itemCount--;
        },
        setEnabled: function (itemid)
        {
            var g = this, po = this.po, p = this.options;
            $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).removeClass("l-menu-item-disable");
        },
        setDisabled: function (itemid)
        {
            var g = this, po = this.po, p = this.options;
            $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).addClass("l-menu-item-disable");
        },
        isEnable: function (itemid)
        {
            var g = this, po = this.po, p = this.options;
            return !$("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).hasClass("l-menu-item-disable");
        },
        getItemCount: function ()
        {
            var g = this, po = this.po, p = this.options;
            return $("> .l-menu-item", g.menu.items).length;
        },
        addItem: function (item, menu)
        {
            var g = this, po = this.po, p = this.options;
            if (!item) return;
            if (menu == undefined) menu = g.menu;

            if (item.line)
            {
                menu.items.append('<div class="l-menu-item-line"></div>');
                return;
            }
            var ditem = $('<div class="l-menu-item"><div class="l-menu-item-text"></div> </div>');
            var itemcount = $("> .l-menu-item", menu.items).length;
            menu.items.append(ditem);
            item.id && ditem.attr("menuitemid", item.id);
            item.text && $(">.l-menu-item-text:first", ditem).html(item.text);
            item.icon && ditem.prepend('<div class="l-menu-item-icon l-icon-' + item.icon + '"></div>');
            if (item.disable || item.disabled)
                ditem.addClass("l-menu-item-disable");
            if (item.children)
            {
                if (ditem.attr("menuitemid") == undefined) ditem.attr("menuitemid", new Date().getTime());
                ditem.append('<div class="l-menu-item-arrow"></div>');
                var newmenu = g.createMenu(ditem.attr("menuitemid"));
                g.menus[ditem.attr("menuitemid")] = newmenu;
                newmenu.width(p.width);
                newmenu.hover(null, function ()
                {
                    if (!newmenu.showedSubMenu)
                        g.hide(newmenu);
                });
                $(item.children).each(function ()
                {
                    g.addItem(this, newmenu);
                });
            }
            item.click && ditem.click(function ()
            {
                if ($(this).hasClass("l-menu-item-disable")) return;
                item.click(item, itemcount);
            });
            item.dblclick && ditem.dblclick(function ()
            {
                if ($(this).hasClass("l-menu-item-disable")) return;
                item.dblclick(item, itemcount);
            });

            var menuover = $("> .l-menu-over:first", menu);
            ditem.hover(function ()
            {
                if ($(this).hasClass("l-menu-item-disable")) return;
                var itemtop = $(this).offset().top;
                var top = itemtop - menu.offset().top;
                menuover.css({ top: top });
                g.hideAllSubMenu(menu);
                if (item.children)
                {
                    var meniitemid = $(this).attr("menuitemid");
                    if (!meniitemid) return;
                    if (g.menus[meniitemid])
                    {
                        g.show({ top: itemtop, left: $(this).offset().left + $(this).width() - 5 }, g.menus[meniitemid]);
                        menu.showedSubMenu = true;
                    }
                }
            }, function ()
            {
                if ($(this).hasClass("l-menu-item-disable")) return;
                var meniitemid = $(this).attr("menuitemid");
                if (item.children)
                {
                    var meniitemid = $(this).attr("menuitemid");
                    if (!meniitemid) return;
                };
            });
        },
        hideAllSubMenu: function (menu)
        {
            var g = this, po = this.po, p = this.options;
            if (menu == undefined) menu = g.menu;
            $("> .l-menu-item", menu.items).each(function ()
            {
                if ($("> .l-menu-item-arrow", this).length > 0)
                {
                    var meniitemid = $(this).attr("menuitemid");
                    if (!meniitemid) return;
                    g.menus[meniitemid] && g.hide(g.menus[meniitemid]);
                }
            });
            menu.showedSubMenu = false;
        },
        createMenu: function (parentMenuItemID)
        {
            var g = this, po = this.po, p = this.options;
            g.menus = g.menus || {};
            var menu = $('<div class="l-menu" style="display:none"><div class="l-menu-yline"></div><div class="l-menu-over"><div class="l-menu-over-l"></div> <div class="l-menu-over-r"></div></div><div class="l-menu-inner"></div></div>');
            parentMenuItemID && menu.attr("parentmenuitemid", parentMenuItemID);
            menu.items = $("> .l-menu-inner:first", menu);
            menu.appendTo('body');
            if (p.shadow)
            {
                menu.shadow = $('<div class="l-menu-shadow"></div>').insertAfter(menu);
                g.updateShadow(menu);
            }
            menu.hover(null, function ()
            {
                if (!menu.showedSubMenu)
                    $("> .l-menu-over:first", menu).css({ top: -24 });
            });
            return menu;
        }
    };
    //旧写法保留
    $.ligerManagers.Menu.prototype.setEnable = $.ligerManagers.Menu.prototype.setEnabled;
    $.ligerManagers.Menu.prototype.setDisable = $.ligerManagers.Menu.prototype.setDisabled;
    $.ligerMenu = function (p)
    {
        p = $.extend({}, $.ligerDefaults.Menu, p || {});
        var po = {};
        var g = new $.ligerManagers.Menu(p, po);
        g.menu = g.createMenu();
        g.menu.css({ top: p.top, left: p.left, width: p.width });
        p.items && $(p.items).each(function (i, item)
        {
            g.addItem(item);
        });

        $.ligerui.addManager(g.menu[0], g);
        return g;
    };
    $(document).click(function ()
    {
        $(".l-menu,.l-menu-shadow").hide();
    });
})(jQuery);