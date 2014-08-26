/**
* jQuery ligerUI 1.1.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function($)
{ 
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetAccordionManager = function()
    {
        return LigerUIManagers[this[0].id + "_Accordion"];
    };
    $.fn.ligerRemoveAccordionManager = function()
    {
        return this.each(function()
        {
            LigerUIManagers[this.id + "_Accordion"] = null;
        });
    };

    $.fn.ligerAccordion = function(p)
    { 
        this.each(function()
        {
            p = $.extend({
                height: null,
                speed : "normal",
                changeHeightOnResize: false,
                heightDiff: 0 // 高度补差  
            }, p || {});
            
            //if (this.usedAccordion) return;
            var g = {
                onResize: function()
                {
                    if (!p.height || typeof (p.height) != 'string' || p.height.indexOf('%') == -1) return false;
                    //set accordion height
                    if (g.accordion.parent()[0].tagName.toLowerCase() == "body")
                    {
                        var windowHeight = $(window).height();
                        windowHeight -= parseInt(g.layout.parent().css('paddingTop'));
                        windowHeight -= parseInt(g.layout.parent().css('paddingBottom'));
                        g.height = p.heightDiff + windowHeight * parseFloat(g.height) * 0.01;
                    }
                    else
                    {
                        g.height = p.heightDiff + (g.accordion.parent().height() * parseFloat(p.height) * 0.01);
                    }
                    g.accordion.height(g.height);
                    g.setContentHeight(g.height - g.headerHoldHeight);
                },
                setHeight: function(height)
                {
                    g.accordion.height(height);
                    height -= g.headerHoldHeight;
                    $("> .l-accordion-content", g.accordion).height(height + 1);
                },
                render: function () {
                    g.accordion = $(this);
                    this.usedAccordion = false;
                    //g.accordion = $(this);
                    
                    if (!g.accordion.hasClass("l-accordion-panel")) g.accordion.addClass("l-accordion-panel");
                    var selectedIndex = 0;
                    if ($("> div[lselected=true]", g.accordion).length > 0)
                        selectedIndex = $("> div", g.accordion).index($("> div[lselected=true]", g.accordion));

                    $("> div", g.accordion).each(function (i, box) {
                        var header = $('<div class="l-accordion-header"><div class="l-accordion-toggle"></div><div class="l-accordion-header-inner"></div></div>');
                        if (i == selectedIndex)
                            $(".l-accordion-toggle", header).addClass("l-accordion-toggle-open");
                        if ($(box).attr("title")) {
                            $(".l-accordion-header-inner", header).html($(box).attr("title"));
                            $(box).attr("title", "");
                        }
                        $(box).before(header);
                        if (!$(box).hasClass("l-accordion-content")) $(box).addClass("l-accordion-content");
                        //alert(i);
                    });

                    //add Even
                    $(".l-accordion-toggle", g.accordion).each(function () {
                        if (!$(this).hasClass("l-accordion-toggle-open") && !$(this).hasClass("l-accordion-toggle-close")) {
                            $(this).addClass("l-accordion-toggle-close");
                        }
                        if ($(this).hasClass("l-accordion-toggle-close")) {
                            $(this).parent().next(".l-accordion-content:visible").hide();
                        }
                    });
                    $(".l-accordion-header", g.accordion).hover(function () {
                        $(this).addClass("l-accordion-header-over");
                    }, function () {
                        $(this).removeClass("l-accordion-header-over");
                    });
                    $(".l-accordion-toggle", g.accordion).hover(function () {
                        if ($(this).hasClass("l-accordion-toggle-open"))
                            $(this).addClass("l-accordion-toggle-open-over");
                        else if ($(this).hasClass("l-accordion-toggle-close"))
                            $(this).addClass("l-accordion-toggle-close-over");
                    }, function () {
                        if ($(this).hasClass("l-accordion-toggle-open"))
                            $(this).removeClass("l-accordion-toggle-open-over");
                        else if ($(this).hasClass("l-accordion-toggle-close"))
                            $(this).removeClass("l-accordion-toggle-close-over");
                    });
                    $(">.l-accordion-header", g.accordion).click(function () {
                        var togglebtn = $(".l-accordion-toggle:first", this);
                        if (togglebtn.hasClass("l-accordion-toggle-close")) {
                            togglebtn.removeClass("l-accordion-toggle-close")
                            .removeClass("l-accordion-toggle-close-over l-accordion-toggle-open-over")
                            togglebtn.addClass("l-accordion-toggle-open");
                            $(this).next(".l-accordion-content")
                            .show(p.speed)
                            .siblings(".l-accordion-content:visible").hide(p.speed);
                            $(this).siblings(".l-accordion-header").find(".l-accordion-toggle").removeClass("l-accordion-toggle-open").addClass("l-accordion-toggle-close");
                        }
                        //else
                        //{
                        //    togglebtn.removeClass("l-accordion-toggle-open")
                        //    .removeClass("l-accordion-toggle-close-over l-accordion-toggle-open-over")
                        //    .addClass("l-accordion-toggle-close");
                        //    $(this).next(".l-accordion-content").hide(p.speed);
                        //}
                    });
                    //init
                    g.headerHoldHeight = 0;
                    $("> .l-accordion-header", g.accordion).each(function () {
                        g.headerHoldHeight += $(this).height() + 1;
                    });
                    if (p.height && typeof (p.height) == 'string' && p.height.indexOf('%') > 0) {
                        g.onResize();
                        if (p.changeHeightOnResize) {
                            $(window).resize(function () {
                                g.onResize();
                            });
                        }
                    }
                    else {
                        if (p.height) {
                            g.height = p.heightDiff + p.height;
                            g.accordion.height(g.height);
                            g.setHeight(p.height);
                        }
                        else {
                            g.header = g.accordion.height();
                        }
                    }
                    
                    if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
                    LigerUIManagers[this.id + "_Accordion"] = g;
                    this.usedAccordion = true;
                }
            };
            
            g.render();
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Accordion"];
        var managers = [];
        this.each(function() {
            managers.push(LigerUIManagers[this.id + "_Accordion"]);
        });
        return managers;
    };

})(jQuery);