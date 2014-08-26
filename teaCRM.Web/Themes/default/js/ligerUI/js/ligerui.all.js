/**
* jQuery ligerUI 1.0.2
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
            
            if (this.usedAccordion) return;
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
                    $("> .l-accordion-content", g.accordion).height(height);
                }
            };
            g.accordion = $(this);
            if (!g.accordion.hasClass("l-accordion-panel")) g.accordion.addClass("l-accordion-panel");
            var selectedIndex = 0;
            if ($("> div[lselected=true]", g.accordion).length > 0)
                selectedIndex = $("> div", g.accordion).index($("> div[lselected=true]", g.accordion));

            $("> div", g.accordion).each(function(i, box)
            {
                var header = $('<div class="l-accordion-header"><div class="l-accordion-toggle"></div><div class="l-accordion-header-inner"></div></div>');
                if (i == selectedIndex)
                    $(".l-accordion-toggle", header).addClass("l-accordion-toggle-open");
                if ($(box).attr("title"))
                {
                    $(".l-accordion-header-inner", header).html($(box).attr("title"));
                    $(box).attr("title","");
                }
                $(box).before(header);
                if (!$(box).hasClass("l-accordion-content")) $(box).addClass("l-accordion-content");
            });

            //add Even
            $(".l-accordion-toggle", g.accordion).each(function()
            {
                if (!$(this).hasClass("l-accordion-toggle-open") && !$(this).hasClass("l-accordion-toggle-close"))
                {
                    $(this).addClass("l-accordion-toggle-close");
                }
                if ($(this).hasClass("l-accordion-toggle-close"))
                {
                    $(this).parent().next(".l-accordion-content:visible").hide();
                }
            });
            $(".l-accordion-header", g.accordion).hover(function()
            {
                $(this).addClass("l-accordion-header-over");
            }, function()
            {
                $(this).removeClass("l-accordion-header-over");
            });
            $(".l-accordion-toggle", g.accordion).hover(function()
            {
                if ($(this).hasClass("l-accordion-toggle-open"))
                    $(this).addClass("l-accordion-toggle-open-over");
                else if ($(this).hasClass("l-accordion-toggle-close"))
                    $(this).addClass("l-accordion-toggle-close-over");
            }, function()
            {
                if ($(this).hasClass("l-accordion-toggle-open"))
                    $(this).removeClass("l-accordion-toggle-open-over");
                else if ($(this).hasClass("l-accordion-toggle-close"))
                    $(this).removeClass("l-accordion-toggle-close-over");
            });
            $(">.l-accordion-header", g.accordion).click(function()
            {
                var togglebtn = $(".l-accordion-toggle:first",this);
                if (togglebtn.hasClass("l-accordion-toggle-close"))
                {
                    togglebtn.removeClass("l-accordion-toggle-close")
                    .removeClass("l-accordion-toggle-close-over l-accordion-toggle-open-over") 
                    togglebtn.addClass("l-accordion-toggle-open");
                    $(this).next(".l-accordion-content")
                    .show(p.speed)
                    .siblings(".l-accordion-content:visible").hide(p.speed);
                    $(this).siblings(".l-accordion-header").find(".l-accordion-toggle").removeClass("l-accordion-toggle-open").addClass("l-accordion-toggle-close");
                }
                else
                {
                    togglebtn.removeClass("l-accordion-toggle-open")
                    .removeClass("l-accordion-toggle-close-over l-accordion-toggle-open-over") 
                    .addClass("l-accordion-toggle-close");
                    $(this).next(".l-accordion-content").hide(p.speed);
                }
            });
            //init
            g.headerHoldHeight = 0;
            $("> .l-accordion-header", g.accordion).each(function()
            {
                g.headerHoldHeight += $(this).height();
            });
            if (p.height && typeof (p.height) == 'string' && p.height.indexOf('%') > 0)
            {
                g.onResize();
                if (p.changeHeightOnResize)
                {
                    $(window).resize(function()
                    {
                        g.onResize();
                    });
                }
            }
            else
            {
                if (p.height)
                {
                    g.height = p.heightDiff + p.height;
                    g.accordion.height(g.height);
                    g.setHeight(p.height);
                }
                else
                {
                    g.header = g.accordion.height();
                }
            }

            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Accordion"] = g;
            this.usedAccordion = true; 
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Accordion"];
        var managers = [];
        this.each(function() {
            managers.push(LigerUIManagers[this.id + "_Accordion"]);
        });
        return managers;
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.1
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
if(typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function($)
{
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetButtonManager = function()
    {
        return LigerUIManagers[this[0].id + "_Button"];
    };
    $.fn.ligerRemoveButtonManager = function()
    {
        return this.each(function()
        {
            LigerUIManagers[this.id + "_Button"] = null;
        });
    };
    $.fn.ligerButton = function(p)
    { 
        return this.each(function()
        { 
            if (this.usedButton) return;
            p = p || {};
            var g ={
                setText :function(itemid){
                },
                setEnable:function(itemid){
                },
                setDisable:function(itemid){
                }
            };
            g.button = $(this);
            if(!g.button.hasClass("l-btn")) g.button.addClass("l-btn");
            p.text && g.button.append("<span>"+p.text+"</span>");
            g.button.append('<div class="l-btn-l"></div><div class="l-btn-r"></div>');  
            p.click && g.button.click(function(){ p.click()});
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Button"] = g;
            this.usedButton = true;
        });
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function ($)
{
    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerCheckBox = function (p)
    {
        p = p || {};
        return this.each(function ()
        {
            if (this.usedCheckBox) return;
            if ($(this).hasClass('l-hidden')) { return; }
            var g = {};
            g.input = $(this);
            g.link = $('<a class="l-checkbox"></a>');
            g.wrapper = g.input.addClass('l-hidden').wrap('<div class="l-checkbox-wrapper"></div>').parent();
            g.wrapper.prepend(g.link);
            if (p.css) g.wrapper.css(p.css);
            g.link.click(function ()
            {
                if (g.input.attr('disabled')) { return false; }
                if (p.onBeforeClick)
                {
                    if (!p.onBeforeClick(g.input[0]))
                        return false;
                }
                if ($(this).hasClass("l-checkbox-checked"))
                {
                    g.input[0].checked = false;
                    g.link.removeClass('l-checkbox-checked');
                }
                else
                {
                    g.input[0].checked = true;
                    g.link.addClass('l-checkbox-checked');
                }
                g.input.trigger("change");
            });
            g.wrapper.hover(function ()
            {
                $(this).addClass("l-over");
            }, function ()
            {
                $(this).removeClass("l-over");
            });
            this.checked && g.link.addClass('l-checkbox-checked');
            this.usedCheckBox = true;
        });
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function($) {
    $.fn.ligerGetComboBoxManager = function() {
        return LigerUIManagers[this[0].id + "_ComboBox"];
    };
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.ComboBox = {
        resize: true,           //是否调整大小
        isMultiSelect: false,   //是否多选
        isShowCheckBox: false,  //是否选择复选框
        columns: false,       //表格状态
        selectBoxWidth: false, //宽度
        selectBoxHeight: false, //高度
        onBeforeSelect: false, //选择前事件
        onSelected: null, //选择值事件 
        initValue: null,
        initText: null,
        valueField: 'id',
        textField: 'text',
        valueFieldID: null,
        slide: true,           //是否以动画的形式显示
        split: ";",
        data: null,
        url: null,
        tree: null,            //下拉框以树的形式显示，tree的参数跟LigerTree的参数一致 
        treeLeafOnly: true,   //是否只选择叶子
        grid: null,              //表格
        onStartResize: null,
        onEndResize: null,
        hideOnLoseFocus: true,
        onSuccess:null,
        onError:null
    };
    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerComboBox = function(options) { 
        this.each(function() {
            if (this.usedComboBox) return;
            var p = $.extend({}, options || {});
            if ($(this).attr("ligerui"))
            {
                try
                {
                    var attroptions = $(this).attr("ligerui"); 
                    if (attroptions.indexOf('{') < 0)  attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";"); 
                    if (attroptions) p = $.extend({}, attroptions, p || {}); 
                }
                catch (e) 
                { 
                }
            } 
            p = $.extend({}, $.ligerDefaults.ComboBox, p); 
            if (p.columns) {
                p.isShowCheckBox = true;
            }
            if (p.isMultiSelect) {
                p.isShowCheckBox = true;
            }
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            var g = {
                //查找Text,适用多选和单选
                findTextByValue: function(value) { 
                    if (value == undefined) return "";
                    var texts = "";
                    var contain = function(checkvalue){
                        var targetdata = value.toString().split(p.split);
                        for(var i =0;i<targetdata.length;i++)
                        {
                            if(targetdata[i] == checkvalue) return true;
                        }
                        return false;
                    };
                    $(g.data).each(function(i, item) {
                        var val = item[p.valueField];
                        var txt = item[p.textField];
                        if (contain(val)) {
                            texts += txt + p.split;
                        }
                    });
                    if (texts.length > 0) texts = texts.substr(0, texts.length - 1);
                    return texts;
                },
                //查找Value,适用多选和单选
                findValueByText: function(text) {
                    if (!text && text == "") return "";
                    var contain = function(checkvalue){
                        var targetdata = text.toString().split(p.split);
                        for(var i =0;i<targetdata.length;i++)
                        {
                            if(targetdata[i] == checkvalue) return true;
                        }
                        return false;
                    };
                    var values = "";
                    $(g.data).each(function(i, item) {
                        var val = item[p.valueField];
                        var txt = item[p.textField];
                        if (contain(txt)) {
                            values += val + p.split;
                        }
                    });
                    if (values.length > 0) values = values.substr(0, values.length - 1);
                    return values;
                },
                removeItem: function() {
                },
                insertItem: function() {
                },
                addItem: function() {

                },
                bulidContent: function() {
                    this.clearContent();
                    if (g.select) {
                        g.setSelect();
                    }
                    else if (g.data) {
                        g.setData(g.data);
                    }
                    else if (p.tree) {
                        g.setTree(p.tree);
                    }
                    else if (p.grid) {
                        g.setGrid(p.grid);
                    }
                    else if(p.url){ 
                        $.ajax({
                            type: 'post',
                            url: p.url, 
                            cache:false,
                            dataType: 'json', 
                            success: function(data)
                            {  
                                g.data = data;
                                g.setData(g.data);
                                if (p.onSuccess) p.onSuccess(g.data); 
                            },
                            error: function(XMLHttpRequest, textStatus) 
                            {    
                                if (p.onError) p.onError(XMLHttpRequest, textStatus); 
                            }
                        });
                    }
                },
                clearContent: function() {
                    $("table", g.selectBox).html("");
                    //g.inputText.val("");
                    //g.valueField.val("");
                },
                setSelect: function() {
                    this.clearContent();
                    $('option', g.select).each(function(i) {
                        var val = $(this).val();
                        var txt = $(this).html();
                        var tr = $("<tr><td index='" + i + "' value='" + val + "'>" + txt + "</td>");
                        $("table.l-table-nocheckbox", g.selectBox).append(tr);
                        $("td", tr).hover(function() {
                            $(this).addClass("l-over");
                        }, function() {
                            $(this).removeClass("l-over");
                        });
                    });
                    $('td:eq(' + g.select[0].selectedIndex + ')', g.selectBox).each(function() {
                        if ($(this).hasClass("l-selected")) {
                            g.selectBox.hide();
                            return;
                        }
                        $(".l-selected", g.selectBox).removeClass("l-selected");
                        $(this).addClass("l-selected");
                        if (g.select[0].selectedIndex != $(this).attr('index') && g.select[0].onchange) {
                            g.select[0].selectedIndex = $(this).attr('index'); g.select[0].onchange();
                        }
                        var newIndex = parseInt($(this).attr('index'));
                        g.select[0].selectedIndex = newIndex;
                        g.select.trigger("change");
                        g.selectBox.hide();
                        g.inputText.val($(this).html());
                    });
                    po.addClickEven();
                },
                setData: function(data) {
                    this.clearContent();
                    if (p.columns) {
                        g.selectBox.table.headrow = $("<tr class='l-table-headerow'><td width='18px'></td></tr>");
                        g.selectBox.table.append(g.selectBox.table.headrow);
                        g.selectBox.table.addClass("l-box-select-grid");
                        for (var j = 0; j < p.columns.length; j++) {
                            var headrow = $("<td columnindex='" + j + "' columnname='" + p.columns[j].name + "'>" + p.columns[j].header + "</td>");
                            if (p.columns[j].width) {
                                headrow.width(p.columns[j].width);
                            }
                            g.selectBox.table.headrow.append(headrow);

                        }
                    }
                    for (var i = 0; i < data.length; i++) {
                        var val = data[i][p.valueField];
                        var txt = data[i][p.textField];
                        if (!p.columns) {
                            $("table.l-table-checkbox", g.selectBox).append("<tr><td style='width:18px;'  index='" + i + "' value='" + val + "' text='" + txt + "' ><input type='checkbox' /></td><td index='" + i + "' value='" + val + "' align='left'>" + txt + "</td>");
                            $("table.l-table-nocheckbox", g.selectBox).append("<tr><td index='" + i + "' value='" + val + "' align='left'>" + txt + "</td>");
                        } else {
                            var tr = $("<tr><td style='width:18px;'  index='" + i + "' value='" + val + "' text='" + txt + "' ><input type='checkbox' /></td></tr>");
                            $("td", g.selectBox.table.headrow).each(function() {
                                var columnname = $(this).attr("columnname");
                                if (columnname) {
                                    var td = $("<td>" + data[i][columnname] + "</td>");
                                    tr.append(td);
                                }
                            });
                            g.selectBox.table.append(tr);
                        }
                    }
                    //自定义复选框支持
                    if (p.isShowCheckBox && $.fn.ligerCheckBox) {
                        $("table input:checkbox", g.selectBox).ligerCheckBox();
                    }
                    $(".l-table-checkbox input:checkbox", g.selectBox).change(function() {
                        if (this.checked && p.onBeforeSelect) {
                            var parentTD = null;
                            if ($(this).parent().get(0).tagName.toLowerCase() == "div") {
                                parentTD = $(this).parent().parent();
                            } else {
                                parentTD = $(this).parent();
                            }
                            if (parentTD != null && !p.onBeforeSelect(parentTD.attr("value"), parentTD.attr("text"))) {
                                g.selectBox.slideToggle("fast");
                                return false;
                            }
                        }
                        if (!p.isMultiSelect) {
                            if (this.checked) {
                                $("input:checked", g.selectBox).not(this).each(function() {
                                    this.checked = false;
                                    $(".l-checkbox-checked", $(this).parent()).removeClass("l-checkbox-checked");
                                });
                                g.selectBox.slideToggle("fast");
                            }
                        }
                        po.checkboxUpdateValue();
                    });
                    $("table.l-table-nocheckbox td", g.selectBox).hover(function() {
                        $(this).addClass("l-over");
                    }, function() {
                        $(this).removeClass("l-over");
                    });
                    po.addClickEven();
                    //选择项初始化
                    po.dataInit();
                },
                //树
                setTree: function(tree) {
                    this.clearContent();
                    g.selectBox.table.remove();
                    if (tree.checkbox != false) {
                        tree.onCheck = function() {
                            var nodes = g.treeManager.getChecked();
                            var value = [];
                            var text = [];
                            $(nodes).each(function(i, node) {
                                if (p.treeLeafOnly && node.data.children) return;
                                value.push(node.data[p.valueField]);
                                text.push(node.data[p.textField]);
                            });
                            po.changeValue(value.join(p.split), text.join(p.split));
                        };
                    }
                    else {
                        tree.onSelect = function(node) {
                            if (p.treeLeafOnly && node.data.children) return;
                            var value = node.data[p.valueField];
                            var text = node.data[p.textField];
                            po.changeValue(value, text);
                        };
                        tree.onCancelSelect = function(node) {
                            po.changeValue("", "");
                        };
                    }
                    g.tree = $("<ul></ul>");
                    $("div:first", g.selectBox).append(g.tree);
                    g.tree.ligerTree(tree);
                    g.treeManager = g.tree.ligerGetTreeManager();
                },
                //表格
                setGrid: function(grid) {
                    this.clearContent();
                    g.selectBox.table.remove();
                    g.grid = $("div:first", g.selectBox);
                    if (grid.checkbox != false) {
                        grid.onCheckAllRow = grid.onCheckRow = function() {
                            var rowsdata = g.gridManager.getCheckedRows();
                            var value = [];
                            var text = [];
                            $(rowsdata).each(function(i, rowdata) {
                                value.push(rowdata[p.valueField]);
                                text.push(rowdata[p.textField]);
                            });
                            po.changeValue(value.join(p.split), text.join(p.split));
                        };
                    }
                    else {
                        grid.onSelectRow = function(rowdata, rowobj, index) {
                            var value = rowdata[p.valueField];
                            var text = rowdata[p.textField];
                            po.changeValue(value, text);
                        };
                        grid.onUnSelectRow = function(rowdata, rowobj, index) {
                            po.changeValue("", "");
                        };
                    }
                    grid.width = "100%";
                    grid.height = "100%";
                    grid.heightDiff = -2;
                    grid.InWindow = false;
                    g.grid.ligerGrid(grid);
                    g.gridManager = g.grid.ligerGetGridManager();
                    p.hideOnLoseFocus = false;
                    po.onEndResize = function() {
                        g.gridManager && g.gridManager.setHeight(g.selectBox.height() - 2);
                    };
                },
                data: p.data,
                inputText: null,
                select: null,
                textFieldID: "",
                valueFieldID: "",
                valueField: null //隐藏域(保存值)
            };
            //private object
            var po = {
                dataInit: function() {  
                    var value = null;
                    //根据值来初始化
                    if (p.initValue != undefined && p.initValue != null) {
                        value = p.initValue;
                        var text = g.findTextByValue(value);
                        po.changeValue(value, text);
                    }
                    //根据文本来初始化 
                    else if (p.initText != undefined && p.initText != null) {
                        value = g.findValueByText(p.initText);
                        po.changeValue(value, p.initText);
                    }
                    else if(g.valueField.val() !="")
                    {
                        value = g.valueField.val();
                        var text = g.findTextByValue(value); 
                        po.changeValue(value, text);
                    }
                    if (!p.isShowCheckBox && value != null) {
                        $("table tr", g.selectBox).find("td:first").each(function() {
                            if (value == $(this).attr("value")) {
                                $(this).addClass("l-selected");
                            }
                        });
                    }
                    if (p.isShowCheckBox && value != null) {
                        $(":checkbox", g.selectBox).each(function() {
                            var parentTD = null;
                            var checkbox = $(this);
                            if (checkbox.parent().get(0).tagName.toLowerCase() == "div") {
                                parentTD = checkbox.parent().parent();
                            } else {
                                parentTD = checkbox.parent();
                            }
                            if (parentTD == null) return;
                            var valuearr = value.toString().split(p.split);
                            $(valuearr).each(function(i, item) {
                                if (item == parentTD.attr("value")) {
                                    $(".l-checkbox", parentTD).addClass("l-checkbox-checked");
                                    checkbox[0].checked = true;
                                }
                            });
                        });
                    }
                },
                changeValue: function(newValue, newText) {
                    g.valueField.val(newValue);
                    g.inputText.val(newText);
                    g.selectedValue = newValue;
                    g.selectedText = newText;
                    g.inputText.trigger("change").focus(); 
                    if (p.onSelected)
                        p.onSelected(newValue, newText);
                },
                //更新选中的值(复选框)
                checkboxUpdateValue: function() {
                    var valueStr = "";
                    var textStr = "";
                    $("input:checked", g.selectBox).each(function() {
                        var parentTD = null;
                        if ($(this).parent().get(0).tagName.toLowerCase() == "div") {
                            parentTD = $(this).parent().parent();
                        } else {
                            parentTD = $(this).parent();
                        }
                        if (!parentTD) return;
                        valueStr += parentTD.attr("value") + p.split;
                        textStr += parentTD.attr("text") + p.split;
                    });
                    if (valueStr.length > 0) valueStr = valueStr.substr(0, valueStr.length - 1);
                    if (textStr.length > 0) textStr = textStr.substr(0, textStr.length - 1);
                    po.changeValue(valueStr, textStr);
                },
                addClickEven: function() {
                    //选项点击
                    $(".l-table-nocheckbox td", g.selectBox).click(function() {
                        if (p.onBeforeSelect && !p.onBeforeSelect($(this).attr("value"), $(this).html())) {
                            g.selectBox.slideToggle("fast");
                            return false;
                        }
                        if ($(this).hasClass("l-selected")) {
                            g.selectBox.slideToggle("fast");
                            return;
                        }
                        $(".l-selected", g.selectBox).removeClass("l-selected");
                        $(this).addClass("l-selected");
                        if (g.select) {
                            if (g.select[0].selectedIndex != $(this).attr('index')) {
                                var newIndex = parseInt($(this).attr('index'));
                                g.select[0].selectedIndex = newIndex;
                                g.select.trigger("change");
                            }
                        }
                        g.boxToggling = true;
                        g.selectBox.hide("fast", function() {
                            g.boxToggling = false;
                        });
                        po.changeValue($(this).attr("value"), $(this).html());
                    });
                },
                toggleSelectBox: function(isHide) {
                    var textHeight = g.wrapper.height();
                    g.boxToggling = true;
                    if (isHide) {
                        if (p.slide) {
                            g.selectBox.slideToggle('fast', function() {
                                g.boxToggling = false;
                            });
                        }
                        else {
                            g.selectBox.hide();
                            g.boxToggling = false;
                        }
                    }
                    else {
                        var topheight = g.wrapper.offset().top - $(window).scrollTop();
                        var selfheight = g.selectBox.height() + textHeight + 4;
                        if (topheight + selfheight > $(window).height() && topheight > selfheight) {
                            g.selectBox.css("marginTop", -1 * (g.selectBox.height() + textHeight + 5));
                        }
                        if (p.slide) {
                            g.selectBox.slideToggle('fast', function() {
                                g.boxToggling = false;
                                if (!p.isShowCheckBox && $('td.l-selected', g.selectBox).length >0) {
                                    var offSet = ($('td.l-selected', g.selectBox).offset().top - g.selectBox.offset().top);
                                    $(".l-box-select-inner", g.selectBox).animate({ scrollTop: offSet });
                                }
                            });
                        }
                        else {
                            g.selectBox.show();
                            g.boxToggling = false;
                            if (!g.tree && !g.grid && !p.isShowCheckBox && $('td.l-selected', g.selectBox).length>0) {
                                var offSet = ($('td.l-selected', g.selectBox).offset().top - g.selectBox.offset().top);
                                $(".l-box-select-inner", g.selectBox).animate({ scrollTop: offSet });
                            }
                        }
                    }
                    g.isShowed = g.selectBox.is(":visible");
                }
            };
            //文本框初始化
            if (this.tagName.toLowerCase() == "input") {
                this.readOnly = true;
                g.inputText = $(this);
                g.textFieldID = this.id;
            }
            else if (this.tagName.toLowerCase() == "select") {
                $(this).addClass('l-hidden');
                g.select = $(this);
                p.isMultiSelect = false;
                p.isShowCheckBox = false;
                g.textFieldID = this.id + "_txt";
                g.inputText = $('<input type="text" readonly="true"/>');
                g.inputText.attr("id", g.textFieldID).insertAfter($(this));
            } else {
                //不支持其他类型
                return;
            }
            if (g.inputText[0].name == undefined) g.inputText[0].name = g.textFieldID;
            //隐藏域初始化
            g.valueField = null;
            if (p.valueFieldID) {
                g.valueField = $("#" + p.valueFieldID + ":input");
                if (g.valueField.length == 0) g.valueField = $('<input type="hidden"/>');
                g.valueField[0].id = g.valueField[0].name = p.valueFieldID;
            }
            else {
                g.valueField = $('<input type="hidden"/>');
                g.valueField[0].id = g.valueField[0].name = g.textFieldID + "_val";
            }
            if (g.valueField[0].name == undefined) g.valueField[0].name = g.valueField[0].id;
            //开关
            g.link = $('<div class="l-trigger"><div class="l-trigger-icon"></div></div>');
            //下拉框
            g.selectBox = $('<div class="l-box-select"><div class="l-box-select-inner"><table cellpadding="0" cellspacing="0" border="0" class="l-box-select-table"></table></div></div>');
            g.selectBox.table = $("table:first", g.selectBox);
            //外层
            g.wrapper = g.inputText.wrap('<div class="l-text l-text-combobox"></div>').parent();
            g.wrapper.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
            g.wrapper.append(g.link).after(g.selectBox).after(g.valueField);

            g.inputText.addClass("l-text-field");
            if (p.width) {
                g.wrapper.css({ width: p.width });
                g.inputText.css({ width: p.width - 20 });
            }
            if (p.height) {
                g.wrapper.height(p.height);
                g.inputText.height(p.height - 2);
                g.link.height(p.height - 4);
            }
            if (p.isShowCheckBox && !g.select) {
                $("table", g.selectBox).addClass("l-table-checkbox");
            } else {
                p.isShowCheckBox = false;
                $("table", g.selectBox).addClass("l-table-nocheckbox");
            }
            //调整大小支持
            if (p.resize && $.fn.ligerResizable) {
                g.selectBox.ligerResizable({ handles: 'se,s', onStartResize: function() {
                    g.resizing = true;
                    p.onStartResize && onStartResize();
                }
                , onEndResize: function() {
                    g.resizing = false;
                    po.onEndResize && po.onEndResize();
                    p.onEndResize && p.onEndResize();
                }
                });
                g.selectBox.append("<div class='l-btn-nw-drop'></div>");
            }
            //开关 事件
            g.link.hover(function() {
                this.className = "l-trigger-hover";
            }, function() {
                this.className = "l-trigger";
            }).mousedown(function() {
                this.className = "l-trigger-pressed";
            }).mouseup(function() {
                this.className = "l-trigger-hover";
            }).click(function() {
                po.toggleSelectBox(g.selectBox.is(":visible"));
            });
            g.inputText.click(function() {
                po.toggleSelectBox(g.selectBox.is(":visible"));
            }).blur(function() {
                g.wrapper.removeClass("l-text-focus");
            }).focus(function() {
                g.wrapper.addClass("l-text-focus");
            });
            g.wrapper.hover(function() {
                g.wrapper.addClass("l-text-over");
            }, function() {
                g.wrapper.removeClass("l-text-over");
            });

            g.resizing = false;
            g.selectBox.hover(null, function(e) {
                if (p.hideOnLoseFocus && g.selectBox.is(":visible") && !g.boxToggling && !g.resizing) {
                    po.toggleSelectBox(true);
                }
            });
            //下拉框宽度、高度初始化
            if (p.selectBoxWidth) {
                g.selectBox.width(p.selectBoxWidth);
            }
            else {
                g.selectBox.css('width', g.wrapper.css('width'));
            }
            var itemsleng = $("tr", g.selectBox.table).length;
            if (!p.selectBoxHeight && itemsleng < 8) p.selectBoxHeight = itemsleng * 30;
            if (p.selectBoxHeight) {
                g.selectBox.height(p.selectBoxHeight);
            }

            //下拉框内容初始化
            g.bulidContent();

            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_ComboBox"] = g;
            this.usedComboBox = true;
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_ComboBox"];
        var managers = [];
        this.each(function() {
            managers.push(LigerUIManagers[this.id + "_ComboBox"]);
        });
        return managers;
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function ($)
{
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.DateEditor = {
        format: "yyyy-MM-dd hh:mm",
        showTime: false,
        onChangeDate: false
    };
    $.ligerDefaults.DateEditorString = {
        dayMessage: ["日", "一", "二", "三", "四", "五", "六"],
        monthMessage: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        todayMessage: "今天",
        closeMessage: "关闭"
    };
    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerDateEditor = function (options)
    {
        return this.each(function ()
        {
            if (this.useDateEditor) return;
            var p = $.extend({}, options || {});
            if ($(this).attr("ligerui"))
            {
                try
                {
                    var attroptions = $(this).attr("ligerui");
                    if (attroptions.indexOf('{') < 0) attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) p = $.extend({}, attroptions, p || {});
                }
                catch (e) { }
            } 
            p = $.extend({}, $.ligerDefaults.DateEditor, $.ligerDefaults.DateEditorString, p);
            if (!p.showTime && p.format.indexOf(" hh:mm") > -1)
                p.format = p.format.replace(" hh:mm", "");
            if (this.tagName.toLowerCase() != "input" || this.type != "text") return;
            var g = {
                bulidContent: function ()
                {
                    //当前月第一天星期
                    var thismonthFirstDay = new Date(g.currentDate.year, g.currentDate.month - 1, 1).getDay();
                    //当前月天数
                    var nextMonth = g.currentDate.month;
                    var nextYear = g.currentDate.year;
                    if (++nextMonth == 13)
                    {
                        nextMonth = 1;
                        nextYear++;
                    }
                    var monthDayNum = new Date(nextYear, nextMonth - 1, 0).getDate();
                    //当前上个月天数
                    var prevMonthDayNum = new Date(g.currentDate.year, g.currentDate.month - 1, 0).getDate();

                    g.buttons.btnMonth.html(p.monthMessage[g.currentDate.month - 1]);
                    g.buttons.btnYear.html(g.currentDate.year);
                    g.toolbar.time.hour.html(g.currentDate.hour);
                    g.toolbar.time.minute.html(g.currentDate.minute);
                    if (g.toolbar.time.hour.html().length == 1)
                        g.toolbar.time.hour.html("0" + g.toolbar.time.hour.html());
                    if (g.toolbar.time.minute.html().length == 1)
                        g.toolbar.time.minute.html("0" + g.toolbar.time.minute.html());
                    $("td", this.body.tbody).each(function () { this.className = "" });
                    $("tr", this.body.tbody).each(function (i, tr)
                    {
                        $("td", tr).each(function (j, td)
                        {
                            var id = i * 7 + (j - thismonthFirstDay);
                            var showDay = id + 1;
                            if (g.selectedDate && g.currentDate.year == g.selectedDate.year &&
                            g.currentDate.month == g.selectedDate.month &&
                            id + 1 == g.selectedDate.date)
                            {
                                if (j == 0 || j == 6)
                                {
                                    $(td).addClass("l-box-dateeditor-holiday")
                                }
                                $(td).addClass("l-box-dateeditor-selected");
                                $(td).siblings().removeClass("l-box-dateeditor-selected");
                            }
                            else if (g.currentDate.year == g.now.year &&
                            g.currentDate.month == g.now.month &&
                            id + 1 == g.now.date)
                            {
                                if (j == 0 || j == 6)
                                {
                                    $(td).addClass("l-box-dateeditor-holiday")
                                }
                                $(td).addClass("l-box-dateeditor-today");
                            }
                            else if (id < 0)
                            {
                                showDay = prevMonthDayNum + showDay;
                                $(td).addClass("l-box-dateeditor-out")
                                .removeClass("l-box-dateeditor-selected");
                            }
                            else if (id > monthDayNum - 1)
                            {
                                showDay = showDay - monthDayNum;
                                $(td).addClass("l-box-dateeditor-out")
                                .removeClass("l-box-dateeditor-selected");
                            }
                            else if (j == 0 || j == 6)
                            {
                                $(td).addClass("l-box-dateeditor-holiday")
                                .removeClass("l-box-dateeditor-selected");
                            }
                            else
                            {
                                td.className = "";
                            }

                            $(td).html(showDay);
                        });
                    });
                },
                toggleDateEditor: function (isHide)
                {
                    var textHeight = g.text.height();
                    g.editorToggling = true;
                    if (isHide)
                    {
                        g.dateeditor.hide('fast', function ()
                        {
                            g.editorToggling = false;
                        });
                    }
                    else
                    {
                        if (g.text.offset().top + 4 > g.dateeditor.height() && g.text.offset().top + g.dateeditor.height() + textHeight + 4 - $(window).scrollTop() > $(window).height())
                        {
                            g.dateeditor.css("marginTop", -1 * (g.dateeditor.height() + textHeight + 5));
                            g.showOnTop = true;
                        }
                        else
                        {
                            g.showOnTop = false;
                        }
                        g.dateeditor.slideDown('fast', function ()
                        {
                            g.editorToggling = false;
                        });
                    }
                },
                showDate: function ()
                {
                    if (!this.selectedDate) return;
                    var dateStr = g.selectedDate.year + "/" + g.selectedDate.month + "/" + g.selectedDate.date;
                    this.currentDate.hour = parseInt(g.toolbar.time.hour.html());
                    this.currentDate.minute = parseInt(g.toolbar.time.minute.html());
                    if (p.showTime)
                    {
                        dateStr += " " + this.currentDate.hour + ":" + this.currentDate.minute;
                    }
                    this.inputText.val(dateStr);
                    this.inputText.trigger("change").focus();
                },
                isDateTime: function (dateStr)
                {
                    var r = dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                    if (r == null) return false;
                    var d = new Date(r[1], r[3] - 1, r[4]);
                    if (d == "NaN") return false;
                    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
                },
                isLongDateTime: function (dateStr)
                {
                    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
                    var r = dateStr.match(reg);
                    if (r == null) return false;
                    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6]);
                    if (d == "NaN") return false;
                    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6]);
                },
                getFormatDate: function (date)
                {
                    if (date == "NaN") return null;
                    var format = p.format;
                    var o = {
                        "M+": date.getMonth() + 1,
                        "d+": date.getDate(),
                        "h+": date.getHours(),
                        "m+": date.getMinutes(),
                        "s+": date.getSeconds(),
                        "q+": Math.floor((date.getMonth() + 3) / 3),
                        "S": date.getMilliseconds()
                    }
                    if (/(y+)/.test(format))
                    {
                        format = format.replace(RegExp.$1, (date.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
                    }
                    for (var k in o)
                    {
                        if (new RegExp("(" + k + ")").test(format))
                        {
                            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
                        }
                    }
                    return format;
                },
                onTextChange: function ()
                {
                    var val = g.inputText.val();
                    if (val == "")
                    {
                        g.selectedDate = null;
                        return true;
                    }
                    if (!p.showTime && !g.isDateTime(val))
                    {
                        //恢复
                        if (!g.usedDate)
                        {
                            g.inputText.val("");
                        } else
                        {
                            g.inputText.val(g.getFormatDate(g.usedDate));
                        }
                    }
                    else if (p.showTime && !g.isLongDateTime(val))
                    {
                        //恢复
                        if (!g.usedDate)
                        {
                            g.inputText.val("");
                        } else
                        {
                            g.inputText.val(g.getFormatDate(g.usedDate));
                        }
                    }
                    else
                    {
                        while (val.indexOf("-") > -1)
                            val = val.replace("-", "/"); // do it for ie
                        var formatVal = g.getFormatDate(new Date(val));
                        if (formatVal == null)
                        {
                            //恢复
                            if (!g.usedDate)
                            {
                                g.inputText.val("");
                            } else
                            {
                                g.inputText.val(g.getFormatDate(g.usedDate));
                            }
                        }
                        g.usedDate = new Date(val); //记录
                        g.selectedDate = {
                            year: g.usedDate.getFullYear(),
                            month: g.usedDate.getMonth() + 1, //注意这里
                            day: g.usedDate.getDay(),
                            date: g.usedDate.getDate(),
                            hour: g.usedDate.getHours(),
                            minute: g.usedDate.getMinutes()
                        };
                        g.currentDate = {
                            year: g.usedDate.getFullYear(),
                            month: g.usedDate.getMonth() + 1, //注意这里
                            day: g.usedDate.getDay(),
                            date: g.usedDate.getDate(),
                            hour: g.usedDate.getHours(),
                            minute: g.usedDate.getMinutes()
                        };
                        g.inputText.val(formatVal);
                        if (p.onChangeDate)
                        {
                            p.onChangeDate(formatVal);
                        }
                        if ($(g.dateeditor).is(":visible"))
                            g.bulidContent();
                    }
                }
            };

            g.inputText = $(this);
            if (!g.inputText.hasClass("l-text-field"))
                g.inputText.addClass("l-text-field");
            g.link = $('<div class="l-trigger"><div class="l-trigger-icon"></div></div>');
            g.text = g.inputText.wrap('<div class="l-text l-text-date"></div>').parent();
            g.text.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
            g.text.append(g.link);
            if (p.width)
            {
                g.text.css({ width: p.width });
                g.inputText.css({ width: p.width - 20 });
            }
            var dateeditorHTML = "";
            dateeditorHTML += "<div class='l-box-dateeditor' style='display:none'>";
            dateeditorHTML += "    <div class='l-box-dateeditor-header'>";
            dateeditorHTML += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-prevyear'><span></span></div>";
            dateeditorHTML += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-prevmonth'><span></span></div>";
            dateeditorHTML += "        <div class='l-box-dateeditor-header-text'><a class='l-box-dateeditor-header-month'></a> , <a  class='l-box-dateeditor-header-year'></a></div>";
            dateeditorHTML += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-nextmonth'><span></span></div>";
            dateeditorHTML += "        <div class='l-box-dateeditor-header-btn l-box-dateeditor-header-nextyear'><span></span></div>";
            dateeditorHTML += "    </div>";
            dateeditorHTML += "    <div class='l-box-dateeditor-body'>";
            dateeditorHTML += "        <table cellpadding='0' cellspacing='0' border='0' class='l-box-dateeditor-calendar'>";
            dateeditorHTML += "            <thead>";
            dateeditorHTML += "                <tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr>";
            dateeditorHTML += "            </thead>";
            dateeditorHTML += "            <tbody>";
            dateeditorHTML += "                <tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr><tr><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td></tr>";
            dateeditorHTML += "            </tbody>";
            dateeditorHTML += "        </table>";
            dateeditorHTML += "        <ul class='l-box-dateeditor-monthselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
            dateeditorHTML += "        <ul class='l-box-dateeditor-yearselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
            dateeditorHTML += "        <ul class='l-box-dateeditor-hourselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
            dateeditorHTML += "        <ul class='l-box-dateeditor-minuteselector'><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>";
            dateeditorHTML += "    </div>";
            dateeditorHTML += "    <div class='l-box-dateeditor-toolbar'>";
            dateeditorHTML += "        <div class='l-box-dateeditor-time'></div>";
            dateeditorHTML += "        <div class='l-button l-button-today'></div>";
            dateeditorHTML += "        <div class='l-button l-button-close'></div>";
            dateeditorHTML += "        <div class='l-clear'></div>";
            dateeditorHTML += "    </div>";
            dateeditorHTML += "</div>";
            g.dateeditor = $(dateeditorHTML);
            g.text.after(g.dateeditor);
            g.header = $(".l-box-dateeditor-header", g.dateeditor);
            g.body = $(".l-box-dateeditor-body", g.dateeditor);
            g.toolbar = $(".l-box-dateeditor-toolbar", g.dateeditor);

            g.body.thead = $("thead", g.body);
            g.body.tbody = $("tbody", g.body);
            g.body.monthselector = $(".l-box-dateeditor-monthselector", g.body);
            g.body.yearselector = $(".l-box-dateeditor-yearselector", g.body);
            g.body.hourselector = $(".l-box-dateeditor-hourselector", g.body);
            g.body.minuteselector = $(".l-box-dateeditor-minuteselector", g.body);

            g.toolbar.time = $(".l-box-dateeditor-time", g.toolbar);
            g.toolbar.time.hour = $("<a></a>");
            g.toolbar.time.minute = $("<a></a>");
            g.buttons = {
                btnPrevYear: $(".l-box-dateeditor-header-prevyear", g.header),
                btnNextYear: $(".l-box-dateeditor-header-nextyear", g.header),
                btnPrevMonth: $(".l-box-dateeditor-header-prevmonth", g.header),
                btnNextMonth: $(".l-box-dateeditor-header-nextmonth", g.header),
                btnYear: $(".l-box-dateeditor-header-year", g.header),
                btnMonth: $(".l-box-dateeditor-header-month", g.header),
                btnToday: $(".l-button-today", g.toolbar),
                btnClose: $(".l-button-close", g.toolbar)
            };
            var nowDate = new Date();
            g.now = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1, //注意这里
                day: nowDate.getDay(),
                date: nowDate.getDate(),
                hour: nowDate.getHours(),
                minute: nowDate.getMinutes()
            };
            //当前的时间
            g.currentDate = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                day: nowDate.getDay(),
                date: nowDate.getDate(),
                hour: nowDate.getHours(),
                minute: nowDate.getMinutes()
            };
            //选择的时间
            g.selectedDate = null;
            //使用的时间
            g.usedDate = null;



            //初始化数据
            //设置周日至周六
            $("td", g.body.thead).each(function (i, td)
            {
                $(td).html(p.dayMessage[i]);
            });
            //设置一月到十一二月
            $("li", g.body.monthselector).each(function (i, li)
            {
                $(li).html(p.monthMessage[i]);
            });
            //设置按钮
            g.buttons.btnToday.html(p.todayMessage);
            g.buttons.btnClose.html(p.closeMessage);
            //设置时间
            if (p.showTime)
            {
                g.toolbar.time.show();
                g.toolbar.time.append(g.toolbar.time.hour).append(":").append(g.toolbar.time.minute);
                $("li", g.body.hourselector).each(function (i, item)
                {
                    var str = i;
                    if (i < 10) str = "0" + i.toString();
                    $(this).html(str);
                });
                $("li", g.body.minuteselector).each(function (i, item)
                {
                    var str = i;
                    if (i < 10) str = "0" + i.toString();
                    $(this).html(str);
                });
            }
            //设置主体
            g.bulidContent();
            //初始化   
            if (g.inputText.val() != "")
                g.onTextChange();
            /**************
            **bulid evens**
            *************/
            g.dateeditor.hover(null, function (e)
            {
                if (g.dateeditor.is(":visible") && !g.editorToggling)
                {
                    g.toggleDateEditor(true);
                }
            });
            //toggle even
            g.link.hover(function ()
            {
                this.className = "l-trigger-hover";
            }, function ()
            {
                this.className = "l-trigger";
            }).mousedown(function ()
            {
                this.className = "l-trigger-pressed";
            }).mouseup(function ()
            {
                this.className = "l-trigger-hover";
            }).click(function ()
            {
                g.bulidContent();
                g.toggleDateEditor(g.dateeditor.is(":visible"));
            });
            g.buttons.btnClose.click(function ()
            {
                g.toggleDateEditor(true);
            });
            //日期 点击
            $("td", g.body.tbody).hover(function ()
            {
                if ($(this).hasClass("l-box-dateeditor-today")) return;
                $(this).addClass("l-box-dateeditor-over");
            }, function ()
            {
                $(this).removeClass("l-box-dateeditor-over");
            }).click(function ()
            {
                $(".l-box-dateeditor-selected", g.body.tbody).removeClass("l-box-dateeditor-selected");
                if (!$(this).hasClass("l-box-dateeditor-today"))
                    $(this).addClass("l-box-dateeditor-selected");
                g.currentDate.date = parseInt($(this).html());
                g.currentDate.day = new Date(g.currentDate.year, g.currentDate.month - 1, 1).getDay();
                if ($(this).hasClass("l-box-dateeditor-out"))
                {
                    if ($("tr", g.body.tbody).index($(this).parent()) == 0)
                    {
                        if (--g.currentDate.month == 0)
                        {
                            g.currentDate.month = 12;
                            g.currentDate.year--;
                        }
                    } else
                    {
                        if (++g.currentDate.month == 13)
                        {
                            g.currentDate.month = 1;
                            g.currentDate.year++;
                        }
                    }
                }
                g.selectedDate = {
                    year: g.currentDate.year,
                    month: g.currentDate.month,
                    date: g.currentDate.date
                };
                g.showDate();
                g.editorToggling = true;
                g.dateeditor.slideToggle('fast', function ()
                {
                    g.editorToggling = false;
                });
            });

            $(".l-box-dateeditor-header-btn", g.header).hover(function ()
            {
                $(this).addClass("l-box-dateeditor-header-btn-over");
            }, function ()
            {
                $(this).removeClass("l-box-dateeditor-header-btn-over");
            });
            //选择年份
            g.buttons.btnYear.click(function ()
            {
                //build year list
                if (!g.body.yearselector.is(":visible"))
                {
                    $("li", g.body.yearselector).each(function (i, item)
                    {
                        var currentYear = g.currentDate.year + (i - 4);
                        if (currentYear == g.currentDate.year)
                            $(this).addClass("l-selected");
                        else
                            $(this).removeClass("l-selected");
                        $(this).html(currentYear);
                    });
                }

                g.body.yearselector.slideToggle();
            });
            g.body.yearselector.hover(function () { }, function ()
            {
                $(this).slideUp();
            });
            $("li", g.body.yearselector).click(function ()
            {
                g.currentDate.year = parseInt($(this).html());
                g.body.yearselector.slideToggle();
                g.bulidContent();
            });
            //select month
            g.buttons.btnMonth.click(function ()
            {
                $("li", g.body.monthselector).each(function (i, item)
                {
                    //add selected style
                    if (g.currentDate.month == i + 1)
                        $(this).addClass("l-selected");
                    else
                        $(this).removeClass("l-selected");
                });
                g.body.monthselector.slideToggle();
            });
            g.body.monthselector.hover(function () { }, function ()
            {
                $(this).slideUp("fast");
            });
            $("li", g.body.monthselector).click(function ()
            {
                var index = $("li", g.body.monthselector).index(this);
                g.currentDate.month = index + 1;
                g.body.monthselector.slideToggle();
                g.bulidContent();
            });

            //选择小时
            g.toolbar.time.hour.click(function ()
            {
                $("li", g.body.hourselector).each(function (i, item)
                {
                    //add selected style
                    if (g.currentDate.hour == i)
                        $(this).addClass("l-selected");
                    else
                        $(this).removeClass("l-selected");
                });
                g.body.hourselector.slideToggle();
            });
            g.body.hourselector.hover(function () { }, function ()
            {
                $(this).slideUp("fast");
            });
            $("li", g.body.hourselector).click(function ()
            {
                var index = $("li", g.body.hourselector).index(this);
                g.currentDate.hour = index;
                g.body.hourselector.slideToggle();
                g.bulidContent();
            });
            //选择分钟
            g.toolbar.time.minute.click(function ()
            {
                $("li", g.body.minuteselector).each(function (i, item)
                {
                    //add selected style
                    if (g.currentDate.minute == i)
                        $(this).addClass("l-selected");
                    else
                        $(this).removeClass("l-selected");
                });
                g.body.minuteselector.slideToggle("fast", function ()
                {
                    var index = $("li", this).index($('li.l-selected', this));
                    if (index > 29)
                    {
                        var offSet = ($('li.l-selected', this).offset().top - $(this).offset().top);
                        $(this).animate({ scrollTop: offSet });
                    }
                });
            });
            g.body.minuteselector.hover(function () { }, function ()
            {
                $(this).slideUp("fast");
            });
            $("li", g.body.minuteselector).click(function ()
            {
                var index = $("li", g.body.minuteselector).index(this);
                g.currentDate.minute = index;
                g.body.minuteselector.slideToggle("fast");
                g.bulidContent();
            });

            //上个月
            g.buttons.btnPrevMonth.click(function ()
            {
                if (--g.currentDate.month == 0)
                {
                    g.currentDate.month = 12;
                    g.currentDate.year--;
                }
                g.bulidContent();
            });
            //下个月
            g.buttons.btnNextMonth.click(function ()
            {
                if (++g.currentDate.month == 13)
                {
                    g.currentDate.month = 1;
                    g.currentDate.year++;
                }
                g.bulidContent();
            });
            //上一年
            g.buttons.btnPrevYear.click(function ()
            {
                g.currentDate.year--;
                g.bulidContent();
            });
            //下一年
            g.buttons.btnNextYear.click(function ()
            {
                g.currentDate.year++;
                g.bulidContent();
            });
            //今天
            g.buttons.btnToday.click(function ()
            {
                g.currentDate = {
                    year: g.now.year,
                    month: g.now.month,
                    day: g.now.day,
                    date: g.now.date
                };
                g.selectedDate = {
                    year: g.now.year,
                    month: g.now.month,
                    day: g.now.day,
                    date: g.now.date
                };
                g.showDate();
                g.dateeditor.slideToggle("fast");
            });
            //文本框
            g.inputText.change(function ()
            {
                g.onTextChange();
            }).blur(function ()
            {
                g.text.removeClass("l-text-focus");
            }).focus(function ()
            {
                g.text.addClass("l-text-focus");
            });
            g.text.hover(function ()
            {
                g.text.addClass("l-text-over");
            }, function ()
            {
                g.text.removeClass("l-text-over");
            });
            this.useDateEditor = true;
        });
    }
})(jQuery);﻿/**
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
        timeParmName:null  //是否给URL后面加上值为new Date().getTime()的参数，如果需要指定一个参数名即可
    };
    $.ligerDefaults.DialogString = { 
        titleMessage: '提示',                     //提示文本标题
        waittingMessage:'正在等待中,请稍候...'
    };
    ///	<param name="$" type="jQuery"></param>
    $.ligerDialog = {};
    $.ligerDialog.open = function(p) {
        p = $.extend({}, $.ligerDefaults.Dialog,$.ligerDefaults.DialogString, p || {});
        var g = {
            applyWindowMask: function() {
                $(".l-window-mask").remove();
                $("<div class='l-window-mask' style='display: block;'></div>").height($(window).height()+$(window).scrollTop()).appendTo('body');
            },
            removeWindowMask: function() {
                $(".l-window-mask").remove();
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
            var iframe = $("<iframe frameborder='0'></iframe>");
            var framename = p.name ?  p.name : "ligerwindow" + new Date().getTime();
            iframe.attr("name", framename);
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
        g.dialog.doShow();
        return g.dialog;
    };
    $.ligerDialog.close = function()
    {
        $(".l-dialog,.l-window-mask").remove();
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

     
})(jQuery);﻿/**
* jQuery ligerUI 1.0.1
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function($) {
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Drag = {
        onStartDrag: false,
        onDrag: false,
        onStopDrag: false
    };

    ///	<param name="$" type="jQuery"></param>  
    $.fn.ligerDrag = function(p) {
        p = $.extend({}, $.ligerDefaults.Drag, p || {});
        return this.each(function() {
            if (this.useDrag) return;
            var g = {
                start: function(e) {
                    $('body').css('cursor', 'move');
                    g.current = {
                        target: g.target,
                        left: g.target.offset().left,
                        top: g.target.offset().top,
                        startX: e.pageX || e.screenX,
                        startY: e.pageY || e.clientY
                    };
                    $(document).bind('mouseup.drag', g.stop);
                    $(document).bind('mousemove.drag', g.drag);
                    if (p.onStartDrag) p.onStartDrag(g.current, e);
                },
                drag: function(e) {
                    if (!g.current) return;
                    var pageX = e.pageX || e.screenX;
                    var pageY = e.pageY || e.screenY;
                    g.current.diffX = pageX - g.current.startX;
                    g.current.diffY = pageY - g.current.startY;
                    if (p.onDrag) {
                        if (p.onDrag(g.current, e) != false) {
                            g.applyDrag();
                        }
                    }
                    else {
                        g.applyDrag();
                    }

                    //                    //每30毫秒触发一次
                    //                    $(document).unbind('mousemove.drag');
                    //                    setTimeout(function ()
                    //                    {
                    //                        $(document).bind('mousemove.drag', g.drag);
                    //                    }, 30);
                },
                stop: function(e) {
                    $(document).unbind('mousemove.drag');
                    $(document).unbind('mouseup.drag');
                    $("body").css("cursor", "");
                    if (p.onStopDrag) p.onStopDrag(g.current, e);
                    g.current = null;
                },
                //更新当前坐标
                applyDrag: function() {
                    if (g.current.diffX) {
                        g.target.css("left", (g.current.left + g.current.diffX));
                    }
                    if (g.current.diffY) {
                        g.target.css("top", (g.current.top + g.current.diffY));
                    }
                }
            };
            g.target = $(this);
            if (p.handler == undefined || p.handler == null)
                g.handler = $(this);
            else
                g.handler = (typeof p.handler == 'string' ? $(p.handler, this) : p.handle);
            g.handler.hover(function() {
                $('body').css('cursor', 'move');
            }, function() {
                $("body").css("cursor", "default");
            }).mousedown(function(e) { 
                g.start(e);
                return false;
            });
            this.useDrag = true;
        });
    };
})(jQuery);﻿/**
* jQuery ligerUI 1.0.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function ($)
{
    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerEasyTab = function (p)
    {
        p = p || {};
        return this.each(function ()
        {
            if (this.manager) return;
            if ($(this).hasClass('l-hidden')) { return; }
            var g = {};
            this.manager = g;
            g.tabs = $(this);
            if (!g.tabs.hasClass("l-easytab")) g.tabs.addClass("l-easytab");
            var selectedIndex = 0;
            if ($("> div[lselected=true]", g.tabs).length > 0)
                selectedIndex = $("> div", g.tabs).index($("> div[lselected=true]", g.tabs));
            g.tabs.ul = $('<ul class="l-easytab-header"></ul>');
            $("> div", g.tabs).each(function (i, box)
            {
                var li = $('<li><span></span></li>');
                if (i == selectedIndex)
                    $("span", li).addClass("l-selected");
                if ($(box).attr("title"))
                    $("span", li).html($(box).attr("title"));
                g.tabs.ul.append(li);
                if (!$(box).hasClass("l-easytab-panelbox")) $(box).addClass("l-easytab-panelbox");
            });
            g.tabs.ul.prependTo(g.tabs); 
            //init  
            $(".l-easytab-panelbox:eq(" + selectedIndex + ")",g.tabs).show().siblings(".l-easytab-panelbox").hide();

            //add even 
            $("> ul:first span", g.tabs).click(function ()
            {
                if ($(this).hasClass("l-selected")) return;
                var i = $("> ul:first span", g.tabs).index(this);
                $(this).addClass("l-selected").parent().siblings().find("span.l-selected").removeClass("l-selected");
                $(".l-easytab-panelbox:eq(" + i + ")", g.tabs).show().siblings(".l-easytab-panelbox").hide();
            }).not("l-selected").hover(function ()
            {
                $(this).addClass("l-over");
            }, function ()
            {
                $(this).removeClass("l-over");
            });
        });
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function ($)
{
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Form = { 
        width: null
    };

    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerForm = function (p)
    { 
        p = $.extend({}, $.ligerDefaults.Form, p || {});
        return this.each(function() {
            $("input[ltype=text],input[ltype=password]", this).ligerTextBox();

            $("input[ltype=select],select[ltype=select]", this).ligerComboBox();

            $("input[ltype=spinner]", this).ligerSpinner();

            $("input[ltype=date]", this).ligerDateEditor();

            $("input[ltype=radio]", this).ligerRadio();

            $('input[ltype=checkbox]', this).ligerCheckBox();
        });
    };

})(jQuery);﻿/**
* jQuery ligerUI  1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function($)
{
    $.fn.ligerGetGridManager = function()
    {
        return LigerUIManagers[this[0].id + "_Grid"];
    }; 

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Grid = { 
        title: null, 
        width: 'auto',                          //宽度值
        columnWidth: 120,                      //默认列宽度
        resizable: true,                        //table是否可伸缩
        url: false,                             //ajax url
        usePager: true,                         //是否分页
        page: 1,                                //默认当前页
        total: 1,                               //总页面数
        pageSize: 10,                           //每页默认的结果数
        pageSizeOptions: [10, 20, 30, 40, 50],  //可选择设定的每页结果数
        parms : [],                         //提交到服务器的参数
        columns: [],                          //数据源
        minColToggle: 1,                        //最小显示的列
        dataType: 'server',                     //数据源：本地(local)或(server),本地是将读取p.data
        dataAction: 'server',                    //提交数据的方式：本地(local)或(server),选择本地方式时将在客服端分页、排序
        showTableToggleBtn: false,              //是否显示'显示隐藏Grid'按钮 
        switchPageSizeApplyComboBox : true,     //切换每页记录数是否应用ligerComboBox
        allowAdjustColWidth: true,              //是否允许调整列宽     
        checkbox: false,                         //是否显示复选框
        allowHideColumn: true,                 //是否显示'切换列层'按钮
        enabledEdit: false,                      //是否允许编辑
        isScroll: true,                         //是否滚动
        onDragCol: null,                       //拖动列事件
        onToggleCol: null,                     //切换列事件
        onChangeSort: null,                    //改变排序事件
        onSuccess: null,                       //成功事件
        onDblClickRow:null,                     //双击行事件
        onSelectRow: null,                    //选择行事件
        onUnSelectRow : null,                   //取消选择行事件
        onBeforeCheckRow: null,                 //选择前事件，可以通过return false阻止操作(复选框)
        onCheckRow: null,                    //选择事件(复选框) 
        onBeforeCheckAllRow: null,              //选择前事件，可以通过return false阻止操作(复选框 全选/全不选)
        onCheckAllRow: null,                    //选择事件(复选框 全选/全不选)
        onBeforeShowData:null,                  //显示数据前事件，可以通过reutrn false阻止操作
        onAfterShowData: null,                 //显示完数据事件
        onError: null,                         //错误事件
        onSubmit: null,                         //提交前事件
        dateFormat: 'yyyy-MM-dd',              //默认时间显示格式
        InWindow : true,                        //是否以窗口的高度为准 height设置为百分比时可用
        statusName : '__status',                    //状态名
        method :'post',                         //提交方式
        fixedCellHeight:true,                       //是否固定单元格的高度
        heightDiff : 0,                         //高度补差,当设置height:100%时，可能会有高度的误差，可以通过这个属性调整
        cssClass : null,                    //类名
        root :'Rows',                       //数据源字段名
        record:'Total',                     //数据源记录数字段名
        pageParmName :'page',               //页索引参数名，(提交给服务器)
        pagesizeParmName:'pagesize',        //页记录数参数名，(提交给服务器)
        sortnameParmName:'sortname',        //页排序列名(提交给服务器)
        sortorderParmName:'sortorder',      //页排序方向(提交给服务器)
        onReload : null,                    //刷新事件，可以通过return false来阻止操作
        onToFirst:null,                     //第一页，可以通过return false来阻止操作
        onToPrev:null,                      //上一页，可以通过return false来阻止操作
        onToNext:null,                      //下一页，可以通过return false来阻止操作
        onToLast:null,                      //最后一页，可以通过return false来阻止操作
        allowUnSelectRow : false,           //是否允许反选行
        dblClickToEdit : false,            //是否双击的时候才编辑
        alternatingRow : true,
        mouseoverRowCssClass:'l-grid-row-over',
        enabledSort: true,                      //是否允许排序
        rowAttrRender : null,                  //行自定义属性渲染器(包括style，也可以定义)
        //获取时间
        renderDate: function(value)
        {
            var da;
            if (!value) return null;
            if (typeof value == 'object')
            {
                return value;
            }
            if (value.indexOf('Date') > -1)
            {
                da = eval('new ' + value.replace('/', '', 'g').replace('/', '', 'g'));
            } else
            {
                da = eval('new Date("' + value + '");');
            }
            return da;
        }
    };
    $.ligerDefaults.GridString = {
        errorMessage: '发生错误',
        pageStatMessage: '显示记录从{from}到{to}，总数 {total} 条',
        pageTextMessage: 'Page',
        loadingMessage: '加载中...',
        findTextMessage: '查找',
        noRecordMessage: '没有符合条件的记录存在', 
        isContinueByDataChanged: '数据已经改变,如果继续将丢失数据,是否继续?'
    };
    ///	<param name="$" type="jQuery"></param>
    $.ligerAddGrid = function(grid, p)
    {
        if (grid.usedGrid) return;
        $(grid).hasClass("l-panel") || $(grid).addClass("l-panel");
        var gridhtmlarr = [];
        gridhtmlarr.push("        <div class='l-panel-header'><span class='l-panel-header-text'></span></div>");
        gridhtmlarr.push("                    <div class='l-grid-loading'></div>");
        gridhtmlarr.push("                    <div class='l-grid-editor'></div>");
        gridhtmlarr.push("        <div class='l-panel-bwarp'>");
        gridhtmlarr.push("            <div class='l-panel-body'>");
        gridhtmlarr.push("                <div class='l-grid'>");
        gridhtmlarr.push("                    <div class='l-grid-dragging-line'></div>");
        gridhtmlarr.push("                    <div class='l-grid-popup'><table cellpadding='0' cellspacing='0'><tbody></tbody></table></div>");
        gridhtmlarr.push("                    <div class='l-grid-header'>");
        gridhtmlarr.push("                        <div class='l-grid-header-inner'><table class='l-grid-header-table' cellpadding='0' cellspacing='0'><tbody><tr></tr></tbody></table></div>");
        gridhtmlarr.push("                    </div>"); 
        gridhtmlarr.push("                    <div class='l-grid-body l-scroll'>");
        gridhtmlarr.push("                    </div>"); 
        gridhtmlarr.push("                 </div>");
        gridhtmlarr.push("              </div>");
        gridhtmlarr.push("         </div>");
        gridhtmlarr.push("         <div class='l-panel-bar'>");
        gridhtmlarr.push("            <div class='l-panel-bbar-inner'>");
        gridhtmlarr.push("            <div class='l-bar-group l-bar-selectpagesize'></div>");
        gridhtmlarr.push("                <div class='l-bar-separator'></div>");
        gridhtmlarr.push("                <div class='l-bar-group'>");
        gridhtmlarr.push("                    <div class='l-bar-button l-bar-btnfirst'><span></span></div>");
        gridhtmlarr.push("                    <div class='l-bar-button l-bar-btnprev'><span></span></div>");
        gridhtmlarr.push("                </div>");
        gridhtmlarr.push("                <div class='l-bar-separator'></div>");
        gridhtmlarr.push("                <div class='l-bar-group'><span class='pcontrol'> <input type='text' size='4' value='1' style='width:20px' maxlength='3' /> / <span></span></span></div>");
        gridhtmlarr.push("                <div class='l-bar-separator'></div>");
        gridhtmlarr.push("                <div class='l-bar-group'>");
        gridhtmlarr.push("                     <div class='l-bar-button l-bar-btnnext'><span></span></div>");
        gridhtmlarr.push("                    <div class='l-bar-button l-bar-btnlast'><span></span></div>");
        gridhtmlarr.push("                </div>");
        gridhtmlarr.push("                <div class='l-bar-separator'></div>");
        gridhtmlarr.push("                <div class='l-bar-group'>");
        gridhtmlarr.push("                     <div class='l-bar-button l-bar-btnload'><span></span></div>");
        gridhtmlarr.push("                </div>");
        gridhtmlarr.push("                <div class='l-bar-separator'></div>");
        gridhtmlarr.push("                <div class='l-bar-group l-bar-right'><span class='l-bar-text'></span></div>");
        gridhtmlarr.push("                <div class='l-clear'></div>");
        gridhtmlarr.push("            </div>");
        gridhtmlarr.push("         </div>");
        $(grid).html(gridhtmlarr.join(''));
        var g = {
            //刷新数据
            loadData: function(loadService)
            {
                //参数初始化
                if (!p.newPage) p.newPage = 1;
                if (p.dataAction == "server")
                {
                    if (!p.sortOrder) p.sortOrder = "asc";
                }
                var param = [];
                if(p.parms && p.parms.length)
                {
                    $(p.parms).each(function()
                    {
                        param.push({ name: this.name, value: this.value });
                    });
                } 
                if (p.dataAction == "server")
                {
                    if (p.usePager)
                    {
                        param.push({ name: p.pageParmName, value: p.newPage });
                        param.push({ name: p.pagesizeParmName, value: p.pageSize });
                    }
                    if (p.sortName)
                    {
                        param.push({ name: p.sortnameParmName, value: p.sortName });
                        param.push({ name: p.sortorderParmName, value: p.sortOrder });
                    }
                }; 
                //loading状态 
                g.gridloading.show();
                $(".l-bar-btnload span",g.toolbar).addClass("l-disabled");
                this.loading = true;
                if (p.dataType == "local")
                {
                    if (!g.data) g.data = $.extend({}, p.data); 
                    if (p.usePager)
                        g.currentData = g.getCurrentPageData(g.data);
                    else
                    {
                        g.currentData = $.extend({}, g.data);
                    }
                    g.showData(g.currentData);
                } else if (p.dataAction == "local" && g.data && g.data.Rows && g.data.Rows.length && !loadService)
                {
                    g.currentData = g.getCurrentPageData(g.data);
                    g.showData(g.currentData);
                }
                else
                {  
                    //请求服务器
                    $.ajax({
                        type: p.method,
                        url: p.url,
                        data: param,
                        async:false,
                        dataType: 'json', 
                        success: function(data)
                        {  
                            g.data = $.extend({}, data);
                            if (p.dataAction == "server")
                            {
                                g.currentData = g.data;  
                                g.showData(g.currentData);   
                            } else
                            {
                                g.currentData = g.getCurrentPageData(g.data);
                                g.showData(g.currentData);
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) 
                        {   
                            g.gridloading.hide();
                            $(".l-bar-btnload span",g.toolbar).removeClass("l-disabled");
                            try { if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { } 
                        }
                    });
                }
            },
            setOptions:function(parms)
            { 
                $.extend(p, parms);
                if(parms.data)
                {
                    g.data = $.extend({}, parms.data);
                    p.dataType = "local";
                }
            },
            showData: function(data)
            {  
                //加载中
                $('.l-bar-btnloading:first', this.toolbar).removeClass('l-bar-btnloading'); 
                g.gridloading.hide();
                if(!data || !data[p.root]) return ; 
                if (p.onBeforeShowData && p.onBeforeShowData(grid,data) == false)
                {
                    return false;
                }
                g.isDataChanged = false; 
                $(".l-bar-btnload:first span",g.toolbar).removeClass("l-disabled");
                this.loading = false;
                if (p.usePager)
                {
                    //更新分页
                    p.total = data[p.record];
                    p.page = p.newPage;
                    p.pageCount = Math.ceil(p.total / p.pageSize);
                    this.buildPager();
                }
                //清空数据
                g.gridbody.html("");
                //$(".l-grid-row,.l-grid-detailpanel,.l-grid-totalsummary", g.gridbody).remove();
                //加载数据 
                var gridhtmlarr = ['<div class="l-grid-body-inner"><table class="l-grid-body-table" cellpadding=0 cellspacing=0><tbody>']; 
                var rowlenth = data[p.root].length;  
                $(data[p.root]).each(function(i, item)
                {
                    if (!item) return;
                    if (!p.usePager && i == rowlenth - 1 && !g.isTotalSummary()) 
                        gridhtmlarr.push('<tr class="l-grid-row l-grid-row-last');
                    else
                        gridhtmlarr.push('<tr class="l-grid-row');
                    if(i%2 == 1 && p.alternatingRow)
                        gridhtmlarr.push(' l-grid-row-alt'); 
                    gridhtmlarr.push('" '); 
                    if(p.rowAttrRender) gridhtmlarr.push(p.rowAttrRender(item,i));
                    gridhtmlarr.push(' rowindex="' + i + '">');
                    $(g.headers).each(function(headerCellIndex,headerInfor)
                    {  
                        //如果是复选框(系统列)
                        if(this.ischeckbox)
                        {
                            gridhtmlarr.push('<td class="l-grid-row-cell l-grid-row-cell-checkbox" style="width:'+this.width+'px"><div class="l-grid-row-cell-inner"><span class="l-grid-row-cell-btn-checkbox"></span></div></td>'); 
                            return;
                        }
                        //如果是明细列(系统列)
                        else if (this.isdetail)
                        { 
                            gridhtmlarr.push('<td class="l-grid-row-cell l-grid-row-cell-detail" style="width:'+this.width+'px"><div class="l-grid-row-cell-inner"><span class="l-grid-row-cell-detailbtn"></span></div></td>'); 
                            return;
                        }
                        var column = p.columns[this.columnindex];
                        var colwidth = this.width;
                        if (!this.islast) 
                            gridhtmlarr.push('<td class="l-grid-row-cell" columnindex="' + this.columnindex + '" ');
                        else
                            gridhtmlarr.push('<td class="l-grid-row-cell l-grid-row-cell-last" columnindex="' + this.columnindex + '" ');
                        if(this.columnname) gridhtmlarr.push('columnname="'+this.columnname+'"'); 
                        gridhtmlarr.push(' style = "'); 
                        gridhtmlarr.push('width:'+ colwidth +'px" ');  
                        if(p.fixedCellHeight)
                            gridhtmlarr.push('><div class="l-grid-row-cell-inner l-grid-row-cell-inner-fixedheight" ');
                        else
                            gridhtmlarr.push('><div class="l-grid-row-cell-inner" '); 
                        gridhtmlarr.push(' style = "width:'+parseInt(colwidth-8)+'px; '); 
                        if(column && column.align) gridhtmlarr.push('text-align:'+column.align+';'); 
                        
                        var content = '';
                         
                        if (column && column.render)
                        {
                            content = column.render(item, i,item[this.columnname]);
                        }
                        else if (this.columnname)
                        {
                            if (column.type && column.type == "date")
                            {
                                var date = p.renderDate(item[this.columnname]);
                                item[this.columnname] = date;
                                if (date != null)
                                {
                                    if (column.format) content = g.getFormatDate(date, column.format);
                                    else content = g.getFormatDate(date, p.dateFormat);
                                }
                            }
                            else
                            {
                                content = item[this.columnname];
                            }
                        } 
                        gridhtmlarr.push('">'+content + '</div></td>');     
                    });
                    gridhtmlarr.push('</tr>'); 
                });
                gridhtmlarr.push('</tbody></table></div>');
                g.gridbody.html(gridhtmlarr.join('')); 
                //创建汇总行
                g.bulidTotalSummary(); 

                $("> div:first",g.gridbody).width(g.gridtablewidth);

                g.onResize();

                //表体 - 行经过事件
                $("tbody:first > .l-grid-row", g.gridbody).each(function(){g.setRowEven(this);});
                if (p.onAfterShowData)
                {
                    p.onAfterShowData(grid,data);
                }
            },
            setRowEven : function(rowobj)
            { 
                $(rowobj).hover(function(e)
                {  
                    if(!p.mouseoverRowCssClass)
                         $(this).addClass(p.mouseoverRowCssClass); 

                }, function(e)
                {
                    if(!p.mouseoverRowCssClass)
                         $(this).removeClass(p.mouseoverRowCssClass);
                }).click(function(e)
                { 
                    if(p.checkbox)
                    {
                        var row = $(this);
                        var index = row.attr('rowindex');
                        var uncheck = row.hasClass("l-checked");
                        if(p.onBeforeCheckRow)
                        {
                        if(p.onBeforeCheckRow(!uncheck,g.getRowByRowIndex(index),row,index) == false) return false;
                        }
                        if(uncheck)
                           row.removeClass("l-checked");
                        else
                           row.addClass("l-checked"); 
                        p.onCheckRow && p.onCheckRow(!uncheck,g.getRowByRowIndex(index),row,index);
                        return ;
                    }
                    var index = $(this).attr('rowindex'); 
                    if ($(this).hasClass("l-selected"))
                    {
                        if(!p.allowUnSelectRow)
                        {
                            $(this).addClass("l-selected-again");
                             return ;
                        }
                        $(this).removeClass("l-selected l-selected-again");
                        if(p.onUnSelectRow)
                        { 
                            p.onUnSelectRow(g.getRowByRowIndex(index),this,index);
                        }
                    }
                    else
                    {
                        $(this).siblings(".l-selected").each(function(){
                            if(p.allowUnSelectRow || $(this).hasClass("l-selected-again"))
                                g.endEdit();
                            $(this).removeClass("l-selected l-selected-again");
                        });
                        $(this).addClass("l-selected");
                        if(p.onSelectRow)
                        { 
                            p.onSelectRow(g.getRowByRowIndex(index),this,index);
                        }
                    } 
                    
                }).dblclick(function(){
			        var index = $(this).attr('rowindex');  
			        if (p.onDblClickRow){
				        p.onDblClickRow(this, index , g.getRowByRowIndex(index));
			        }
		        }); 
            },
            applyEditor: function(obj)
            { 
                if (obj.href || obj.type) return true;
                var rowcell;
                if ($(obj).hasClass("l-grid-row-cell")) rowcell = obj;
                else if ($(obj).parent().hasClass("l-grid-row-cell")) rowcell = $(obj).parent()[0];
                if (!rowcell) return;
                var row = $(rowcell).parent();
                var rowindex = $(row).attr("rowindex");
                var columnindex = $(rowcell).attr("columnindex");
                var columnname = $(rowcell).attr("columnname");
                var column = p.columns[columnindex];
                var left = $(rowcell).offset().left - g.body.offset().left;
                var top = $(rowcell).offset().top - $(grid).offset().top;
                var rowdata = g.getRowByRowIndex(rowindex);
                var currentdata = rowdata[columnname]; 
                g.grideditor.css({ left: left, top: top, width: $(rowcell).css('width'), height: $(rowcell).css('height') }).html("");
                g.grideditor.editingCell = null;
                if (column.editor && column.editor.type == 'date')
                { 
                    var $inputText = $("<input type='text'/>");
                    g.grideditor.append($inputText);
                    $inputText.val(g.getFormatDate(currentdata, p.dateFormat));
                    $inputText.ligerDateEditor(
                            {
                                width: $(rowcell).width(),
                                onChangeDate: function(newValue)
                                {
                                    g.grideditor.editingValue = newValue;
                                    $(rowcell).addClass("l-grid-row-cell-edited");
                                    $(obj).html(newValue);
                                    g.updateData(rowcell, newValue);

                                }
                            }
                             );
                    g.grideditor.editingCell = rowcell;
                    g.grideditor.show();
                }
                else if (column.editor && column.editor.type == 'select')
                {
                    var $inputText = $("<input type='text'/>");
                    g.grideditor.append($inputText);
                    $inputText.val(currentdata);
                    var options = {
                        width: $(rowcell).width(),
                        data: column.editor.data,
                        isMultiSelect: false,
                        onSelected: function(newValue, newText)
                        {
                            g.grideditor.editingValue = newValue;
                            $(rowcell).addClass("l-grid-row-cell-edited");
                            if (column.editor.valueColumnName && columnname)
                                g.currentData[p.root][rowindex][columnname] = newText;
                            g.updateData(rowcell, newValue);
                            if (column.editor.render)
                                $(obj).html(column.editor.render(g.currentData[p.root][rowindex]));
                            else
                                $(obj).html(newText);
                        }
                    };
                    if (column.editor.dataValueField) options.valueField = column.editor.dataValueField;
                    if (column.editor.dataDisplayField) options.displayField = options.textField = column.editor.dataDisplayField;
                    if (column.editor.valueColumnName)
                        options.initValue = g.currentData[p.root][rowindex][column.editor.valueColumnName];
                    else if (columnname)
                        options.initText = g.currentData[p.root][rowindex][columnname];
                    $inputText.ligerComboBox(options);
                    g.grideditor.editingCell = rowcell;
                    g.grideditor.show();
                }
                else if (column.editor && column.editor.type == 'int')
                {
                    var $inputText = $("<input type='text'/>");
                    g.grideditor.append($inputText);
                    $inputText.attr({ style: 'border:#6E90BE' }).val(currentdata);
                    $inputText.ligerSpinner(
                            {
                                width: $(rowcell).width(),
                                height: $(rowcell).height(),
                                type: 'int',
                                onChangeValue: function(newValue)
                                {
                                    g.grideditor.editingValue = newValue;
                                    $(rowcell).addClass("l-grid-row-cell-edited");
                                    $(obj).html(newValue);
                                    g.updateData(rowcell, newValue);
                                }
                            }
                             );
                    g.grideditor.editingCell = rowcell;
                    g.grideditor.show();
                }
                else if (column.editor && (column.editor.type == 'string' || column.editor.type == 'text'))
                {  
                    var $inputText = $("<input type='text' class='l-text-editing'/>");
                    g.grideditor.append($inputText);
                    $inputText.val(currentdata);
                    $inputText.ligerTextBox(
                            {
                                width: $(rowcell).width()-1,
                                 height: $(rowcell).height(),
                                onChangeValue: function(newValue)
                                {
                                    g.grideditor.editingValue = newValue;
                                    $(rowcell).addClass("l-grid-row-cell-edited"); 
                                    g.updateData(rowcell, newValue);
                                    if (column.render)
                                        $(obj).html(column.render(g.currentData[p.root][rowindex],rowindex,g.currentData[p.root][rowindex][columnname]));
                                    else
                                        $(obj).html(newValue);
                                }
                            }
                    ).bind('keydown', function (e) {
                        var key = e.which;
                        if (key == 13) {
                            $inputText.trigger("change");
                            g.endEdit();
                        }
                    }); 
                    $inputText.parent().addClass("l-text-editing");
                    g.grideditor.editingCell = rowcell;
                    g.grideditor.show();
                }
                else if (column.editor && (column.editor.type == 'chk' || column.editor.type == 'checkbox'))
                {
                    var $input = $("<input type='checkbox'/>");
                    g.grideditor.append($input); 
                    $input[0].checked = currentdata==1 ? true : false;
                    $input.ligerCheckBox();
                    $input.change(function(){
                        g.updateData(rowcell, this.checked?1:0);
                        if (column.render)
                            $(obj).html(column.render(g.currentData[p.root][rowindex],rowindex,g.currentData[p.root][rowindex][columnname]));
                        else 
                             $(obj).html(this.checked?'Y':'N');
                    });
                    g.grideditor.editingCell = rowcell;
                    g.grideditor.show();
                }
            },
            endEdit:function(){
                var cell = g.grideditor.editingCell; 
                var value = g.grideditor.editingValue; 
                g.grideditor.html("").hide();
                if (p.onAfterEdit) p.onAfterEdit(value,cell);
            },
            getFormatDate: function(date, dateformat)
            {
                if (date == "NaN") return null;
                var format = dateformat;
                var o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds()
                }
                if (/(y+)/.test(format))
                {
                    format = format.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
                }
                for (var k in o)
                {
                    if (new RegExp("(" + k + ")").test(format))
                    {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            },
            deleteSelectedRow: function()
            {
                var row = $(".l-selected", g.gridbody);
                g.deleteRow(row);
            },
            deleteRow: function(row)
            {
                g.popup.hide();
                g.endEdit();
                var rowindex = row.attr("rowindex");
                $(row).remove();
                g.deleteData(rowindex);
                g.isDataChanged = true;
            },
            deleteData: function(rowindex)
            {
                g.currentData[p.root][rowindex][p.statusName] = 'delete';
            },
            updateData: function(cell, value)
            {
                var columnindex = $(cell).attr("columnindex");
                var column = p.columns[columnindex];
                var columnname = column.name;
                var row = $(cell).parents(".l-grid-row:eq(0)");
                var rowindex = row.attr("rowindex");
                if (column.type && column.type == 'int')
                    g.currentData[p.root][rowindex][columnname] = parseInt(value);
                else if (column && column.editor && column.editor.type == 'select')
                    g.currentData[p.root][rowindex][column.editor.valueColumnName ? column.editor.valueColumnName : columnname] = value;
                else
                    g.currentData[p.root][rowindex][columnname] = value;
                if (g.currentData[p.root][rowindex][p.statusName] == undefined)
                    g.currentData[p.root][rowindex][p.statusName] = 'update';
                g.isDataChanged = true;
            },
            addRow: function()
            { 
                var rowindex = g.currentData[p.root].length;
                g.currentData[p.root][rowindex] = {};
                var rowdata = g.currentData[p.root][rowindex];
                if (!p.usePager && !g.isTotalSummary())
                    $("tbody:first > .l-grid-row:last", g.gridbody).removeClass("l-grid-row-last");
                var row = $("<tr class='l-grid-row' rowindex='" + rowindex + "'></tr>");
                if($("tbody",g.gridbody).length==0)
                {
                    g.gridbody.html('<div class="l-grid-body-inner"><table class="l-grid-body-table" cellpadding=0 cellspacing=0><tbody></tbody></table></div>');
                }
                $("tbody:first",g.gridbody).append(row); 
                if (!p.usePager && !g.isTotalSummary())
                    row.addClass("l-grid-row-last");
                var celllength = $("tr > .l-grid-hd-cell", g.gridheader).length;
                $("tr > .l-grid-hd-cell", g.gridheader).each(function(headerCellIndex, headerCell)
                { 
                    var columnname = $(headerCell).attr("columnname");
                    var columnindex = $(headerCell).attr("columnindex");
                    var column = p.columns[columnindex];
                    var rowCell = $("<td class='l-grid-row-cell' columnindex='" + columnindex + "'><div class='l-grid-row-cell-inner'></div></td>");
                    if (celllength == headerCellIndex + 1) rowCell.addClass("l-grid-row-cell-last");
                    if (columnname)
                    {
                        rowdata[columnname] = "";
                        if (column.type && column.type == 'int') rowdata[columnname] = 0;
                        rowCell.attr({ columnname: columnname });
                    }
                    $(".l-grid-row-cell-inner", rowCell).html(rowdata[columnname]);
                    row.append(rowCell);
                    rowCell.css('width', $(headerCell).css('width'));
                    if (column.align) $(".l-grid-row-cell-inner", rowCell).css({ textAlign: column.align });
                    if ($(headerCell).is(":visible") == false) rowCell.hide();
                });
                rowdata[p.statusName] = 'add';
                //添加事件
                g.setRowEven(row[0]);
                //标识状态
                g.isDataChanged = true;
            },
            getData: function()
            {
                if (g.currentData == null) return null;
                return g.currentData[p.root];
            },
            getCurrentPageData: function(jsonObj)
            {
                var data = {
                    Rows: new Array()
                };
                if(!jsonObj || !jsonObj[p.root] || !jsonObj[p.root].length) 
                {
                    data[p.record] = 0;
                    return data;
                }
                data[p.record] = jsonObj[p.root].length ? jsonObj[p.root].length : 0;
                if (!p.newPage) p.newPage = 1;
                for (i = (p.newPage - 1) * p.pageSize; i < jsonObj[p.root].length && i < p.newPage * p.pageSize; i++)
                {
                    var obj = $.extend({}, jsonObj[p.root][i]);
                    data[p.root].push(obj);
                }
                return data;
            },
            getColumn: function(columnname)
            {
                for (i = 0; i < p.columns.length; i++)
                {
                    if (p.columns[i].name == columnname)
                    {
                        return p.columns[i];
                    }
                }
                return null;
            },
            getColumnType: function(columnname)
            {
                for (i = 0; i < p.columns.length; i++)
                {
                    if (p.columns[i].name == columnname)
                    {
                        if (p.columns[i].type) return p.columns[i].type;
                        return "string";
                    }
                }
                return null;
            },
            //比较某一列两个数据
            compareData: function(data1, data2, columnName, columnType)
            {
                switch (columnType)
                {
                    case "int":
                        return parseInt(data1[columnName]) < parseInt(data2[columnName]) ? -1 : parseInt(data1[columnName]) > parseInt(data2[columnName]) ? 1 : 0;
                    case "float":
                        return parseFloat(data1[columnName]) < parseFloat(data2[columnName]) ? -1 : parseFloat(data1[columnName]) > parseFloat(data2[columnName]) ? 1 : 0;
                    case "string":
                        return data1[columnName].localeCompare(data2[columnName]);
                    case "date":
                        return data1[columnName] < data2[columnName] ? -1 : data1[columnName] > data2[columnName] ? 1 : 0;
                }
                return data1[columnName].localeCompare(data2[columnName]);
            },
            //是否包含汇总
            isTotalSummary: function()
            {
                for (var i = 0; i < p.columns.length; i++)
                {
                    if (p.columns[i].totalSummary) return true;
                }
                return false;
            },
            bulidTotalSummary: function()
            {
                if (!g.isTotalSummary()) return false;
                if (!g.currentData || g.currentData[p.root].length == 0) return false;
                if (g.gridbody.totalsummary) g.gridbody.totalsummary.remove();
                g.gridbody.totalsummary = $("<tr class='l-grid-totalsummary'></tr>");
                if (!p.usePager) g.gridbody.totalsummary.addClass("l-grid-totalsummary-nobottom");
                $("tbody:first",g.gridbody).append(g.gridbody.totalsummary);
                $(g.headers).each(function()
                {
                    var cell = $("<td class='l-grid-totalsummary-cell'><div class='l-grid-totalsummary-cell-inner'></div></td>");
                    g.gridbody.totalsummary.append(cell);
                    cell.css('width', this.width); 
                    if(this.islast) 
                       cell.addClass("l-grid-totalsummary-cell-last");
                    columnname = this.columnname;
                    columnindex = this.columnindex; 
                    if (columnname)
                    {
                        $("div:first",cell).attr({ columnname: columnname });
                    }
                    if (!columnindex) return;
                    cell.attr({ columnindex: columnindex });
                    var column = p.columns[columnindex];
                    if (column.align) 
                        $(".l-grid-totalsummary-cell-inner", cell).css({ textAlign: column.align });
                    if (column.totalSummary)
                    {
                        var isExist = function(type)
                        {
                            for (var i = 0; i < types.length; i++)
                                if (types[i].toLowerCase() == type.toLowerCase()) return true;
                            return false;
                        };
                        var sum = 0, count = 0, avg = 0;
                        var max = parseFloat(g.currentData[p.root][0][column.name]);
                        var min = parseFloat(g.currentData[p.root][0][column.name]);
                        for (var i = 0; i < g.currentData[p.root].length; i++)
                        {
                            var value = parseFloat(g.currentData[p.root][i][column.name]);
                            sum += value;
                            count += 1;
                            if (value > max) max = value;
                            if (value < min) min = value;
                        }
                        avg = sum * 1.0 / g.currentData[p.root].length;
                        if(column.totalSummary.render)
                        { 
                            var renderhtml = column.totalSummary.render({
                                sum:sum,
                                count:count,
                                avg:avg,
                                min:min,
                                max:max
                             },column,cell); 
                             $(".l-grid-totalsummary-cell-inner:first", cell).append(renderhtml);
                        }
                        else if (column.totalSummary.type)
                        {
                            var types = column.totalSummary.type.split(','); 
                            if (isExist('sum'))
                                $(".l-grid-totalsummary-cell-inner:first", cell).append("<div>Sum=" + sum.toFixed(2) + "</div>");
                            if (isExist('count'))
                                $(".l-grid-totalsummary-cell-inner:first", cell).append("<div>Count=" + count + "</div>");
                            if (isExist('max'))
                                $(".l-grid-totalsummary-cell-inner:first", cell).append("<div>Max=" + max.toFixed(2) + "</div>");
                            if (isExist('min'))
                                $(".l-grid-totalsummary-cell-inner:first", cell).append("<div>Min=" + min.toFixed(2) + "</div>");
                            if (isExist('avg'))
                                $(".l-grid-totalsummary-cell-inner:first", cell).append("<div>Avg=" + avg.toFixed(2) + "</div>");
                        }
                        if(column.totalSummary.align)
                        {
                            $(".l-grid-totalsummary-cell-inner:first", cell).css("textAlign",column.totalSummary.align);
                        }
                    }

                });
            },
            //改变排序
            changeSort: function(columnName, sortOrder)
            {
                if (this.loading) return true;
                if (p.dataAction == "local")
                {
                    var columnType = g.getColumnType(columnName);
                    if (!g.sortedData)
                        g.sortedData = $.extend({}, g.data);
                    if (p.sortName == columnName)
                    {
                        g.sortedData[p.root].reverse();
                    } else
                    {
                        g.sortedData[p.root].sort(function(data1, data2)
                        {
                            return g.compareData(data1, data2, columnName, columnType);
                        });
                    }
                    if (p.usePager)
                        g.currentData = g.getCurrentPageData(g.sortedData);
                    else
                        g.currentData = g.sortedData;
                    g.showData(g.currentData);
                }
                p.sortName = columnName;
                p.sortOrder = sortOrder;
                if (p.dataAction == "server")
                {
                    g.loadData();
                }
            },
            //改变分页
            changePage: function(ctype)
            {
                if (this.loading) return true;
                if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                    return false;
                //计算新page
                switch (ctype)
                {
                    case 'first': if (p.page == 1) return; p.newPage = 1; break;
                    case 'prev': if (p.page == 1) return; if (p.page > 1) p.newPage = parseInt(p.page) - 1; break;
                    case 'next': if (p.page >= p.pageCount) return; p.newPage = parseInt(p.page) + 1; break;
                    case 'last': if (p.page >= p.pageCount) return; p.newPage = p.pageCount; break;
                    case 'input':
                        var nv = parseInt($('.pcontrol input', this.toolbar).val());
                        if (isNaN(nv)) nv = 1;
                        if (nv < 1) nv = 1;
                        else if (nv > p.pageCount) nv = p.pageCount;
                        $('.pcontrol input', this.toolbar).val(nv);
                        p.newPage = nv;
                        break;
                }
                if (p.newPage == p.page) return false; 
                if(p.newPage==1)
                {
                     $(".l-bar-btnfirst span",g.toolbar).addClass("l-disabled");
                     $(".l-bar-btnprev span",g.toolbar).addClass("l-disabled");
                }
                else
                {
                    $(".l-bar-btnfirst span",g.toolbar).removeClass("l-disabled");
                     $(".l-bar-btnprev span",g.toolbar).removeClass("l-disabled");
                }
                if(p.newPage == p.pageCount)
                {
                    $(".l-bar-btnlast span",g.toolbar).addClass("l-disabled");
                     $(".l-bar-btnnext span",g.toolbar).addClass("l-disabled");
                }
                else
                {
                    $(".l-bar-btnlast span",g.toolbar).removeClass("l-disabled");
                     $(".l-bar-btnnext span",g.toolbar).removeClass("l-disabled");
                }
                if (p.onChangePage)
                    p.onChangePage(p.newPage);
                if (p.dataAction == "server")
                {
                    this.loadData();
                }
                else
                {
                    g.currentData = g.getCurrentPageData(g.data);
                    g.showData(g.currentData);
                }
            },
            buildPager: function()
            {
                $('.pcontrol input', this.toolbar).val(p.page);
                $('.pcontrol span', this.toolbar).html(p.pageCount);
                var r1 = parseInt((p.page - 1) * p.pageSize) + 1.0;
                var r2 = parseInt(r1) + parseInt(p.pageSize) - 1;
                if (p.total < r2) r2 = p.total;
                var stat = p.pageStatMessage;
                stat = stat.replace(/{from}/, r1);
                stat = stat.replace(/{to}/, r2);
                stat = stat.replace(/{total}/, p.total);
                $('.l-bar-text', this.toolbar).html(stat);
                if(p.page==1)
                {
                     $(".l-bar-btnfirst span",g.toolbar).addClass("l-disabled");
                     $(".l-bar-btnprev span",g.toolbar).addClass("l-disabled");
                }
                else
                {
                    $(".l-bar-btnfirst span",g.toolbar).removeClass("l-disabled");
                     $(".l-bar-btnprev span",g.toolbar).removeClass("l-disabled");
                }
                if(p.page == p.pageCount)
                {
                    $(".l-bar-btnlast span",g.toolbar).addClass("l-disabled");
                     $(".l-bar-btnnext span",g.toolbar).addClass("l-disabled");
                }
                else
                {
                    $(".l-bar-btnlast span",g.toolbar).removeClass("l-disabled");
                     $(".l-bar-btnnext span",g.toolbar).removeClass("l-disabled");
                }
            },
            getCheckedRows: function()
            {
                var rows = $("tbody:first > .l-checked", g.gridbody);
                var rowdata = [];
                $("tbody:first > .l-checked", g.gridbody).each(function(i,row){
                    var rowindex = $(row).attr("rowindex");
                    rowdata.push(g.getRowByRowIndex(parseInt(rowindex)));
                }); 
                return rowdata;
            },
            getSelectedRow: function()
            {
                var row = $("tbody:first > .l-selected", g.gridbody);
                var rowindex = row.attr("rowindex");
                return g.getRowByRowIndex(parseInt(rowindex));
            },
            getRowByRowIndex: function(rowindex)
            {
                if (g.currentData == null) return null;
                return g.currentData[p.root][rowindex];
            },
            onResize: function()
            {
                if (p.height && p.height != 'auto')
                {
                    var windowHeight = $(window).height(); 
                    //if(g.windowHeight != undefined && g.windowHeight == windowHeight) return;
                    
                    var h = 0;
                    var parentHeight = null;
                    if (typeof(p.height) == "string" && p.height.indexOf('%') > 0)
                    { 
                        var gridparent = $(grid).parent(); 
                        if (p.InWindow || gridparent[0].tagName.toLowerCase() == "body") { 
                            parentHeight = windowHeight; 
                            parentHeight -= parseInt($('body').css('paddingTop'));
                            parentHeight -= parseInt($('body').css('paddingBottom'));
                        }
                        else{ 
                            parentHeight = gridparent.height();
                        }  
                        h =  parentHeight * parseFloat(p.height) * 0.01;  
                        if(p.InWindow || gridparent[0].tagName.toLowerCase() == "body") 
                            h -= ($(grid).offset().top - parseInt($('body').css('paddingTop')));
                    } 
                    else
                    { 
                        h = parseInt(p.height);
                    }   
                   
                    h += p.heightDiff; 
                    g.windowHeight = windowHeight;
                    g.setHeight(h);
                } 
            },
            setHeight : function(h)
            {  
                if(p.title) h -= 24;
                if(p.usePager) h -= 32;
                h -= 22;   
                h>0 && g.gridbody.height(h);
            },
            dragStart: function(dragtype, e, toDragHeaderIndex)
            {
                if (dragtype == 'colresize') //列宽调整
                { 
                    var columnindex = g.headers[g.toDragHeaderIndex].columnindex;
                    var width = g.headers[g.toDragHeaderIndex].width; 
                    if (columnindex == undefined) return; 
                    g.colresize = { startX: e.pageX, width: width, columnindex: columnindex };
                    $('body').css('cursor', 'e-resize');
                    g.draggingline.css({ height: g.body.height(), left: e.pageX - $(grid).offset().left + parseInt(g.body[0].scrollLeft), top: 0 }).show();

                    $('body').bind('selectstart', function () { return false; });
                }
                $.fn.ligerNoSelect && $('body').ligerNoSelect();
            },
            dragMove: function(e)
            {
                if (g.colresize) //列 调整
                {
                    var diff = e.pageX - g.colresize.startX;
                    var newwidth = g.colresize.width + diff;
                    g.colresize.newwidth = newwidth;
                    $('body').css('cursor', 'e-resize');
                    g.draggingline.css({ left: e.pageX - $(grid).offset().left + parseInt(g.body[0].scrollLeft) });

                    $('body').unbind('selectstart');
                }
            },
            dragEnd: function(e)
            {
                if (g.colresize)
                { 
                    if(g.colresize.newwidth == undefined){
                        $('body').css('cursor', 'default');
                         return false;
                    }
                    var mincolumnwidth = 80;
                    var columnindex = g.colresize.columnindex;
                    var column = p.columns[columnindex];
                    if (column && column.minWidth) mincolumnwidth = column.minWidth;
                    var newwidth = g.colresize.newwidth;
                    newwidth = newwidth < mincolumnwidth ? mincolumnwidth : newwidth; 
                    var diff = newwidth - g.colresize.width; 
                    g.headers[g.toDragHeaderIndex].width += diff; 
                    g.gridtablewidth += diff;
                    $("div:first",g.gridheader).width(g.gridtablewidth+40);
                     $("div:first",g.gridbody).width(g.gridtablewidth); 
                    $('.l-grid-hd-cell[columnindex=' + columnindex + ']', this.gridheader).css('width', newwidth);
                    $('tbody:first > .l-grid-row > td[columnindex='+columnindex+'],tbody:first > .l-grid-totalsummary > td[columnindex='+columnindex+']', this.gridbody).each(function(){
                        $(this).css('width', newwidth);
                        $("div:first",this).css('width', newwidth-8);
                    });
                    g.onResize();
                    g.draggingline.hide();
                    g.colresize = false;
                }

                $('body').css('cursor', 'default');
                $.fn.ligerNoSelect && $('body').ligerNoSelect(false);
            },
            onClick: function(e)
            {
                var obj = (e.target || e.srcElement);
                var tagName = obj.tagName.toLowerCase();
                if (g.grideditor.editingCell)
                {
                    if (tagName == 'html' || tagName == 'body' || $(obj).hasClass("l-grid-body") || $(obj).hasClass("l-grid-row"))
                    {
                        g.endEdit();
                    }
                }
                if (p.allowHideColumn)
                {
                    if (tagName == 'html' || tagName == 'body' || $(obj).hasClass("l-grid-body") || $(obj).hasClass("l-grid-row") || $(obj).hasClass("l-grid-row-cell-inner") || $(obj).hasClass("l-grid-header"))
                    {
                        g.popup.hide();
                    }
                }
            },
            toggleCol: function(columnindex, visible)
            {
                var headercell = $(".l-grid-hd-cell[columnindex='" + columnindex + "']", this.gridheader);
                if (!headercell) return;
                if (visible)
                {
                    headercell.show();
                    $(".l-grid-row-cell[columnindex='" + columnindex + "']", this.gridbody).show();
                } else
                {
                    headercell.hide();
                    $(".l-grid-row-cell[columnindex='" + columnindex + "']", this.gridbody).hide();
                }
            }
        };
        //头部
        g.header = $(".l-panel-header:first", grid); 
        //主体
        g.body = $(".l-panel-body:first", grid);
        //底部工具条         
        g.toolbar = $(".l-panel-bar:first", grid);
        //显示/隐藏列      
        g.popup = $(".l-grid-popup:first", grid);
        //编辑层   
        g.grideditor = $(".l-grid-editor:first", grid);
        //加载中
        g.gridloading = $(".l-grid-loading:first", grid);
        //调整列宽层 
        g.draggingline = $(".l-grid-dragging-line", grid);
        //表头     
        g.gridheader = $(".l-grid-header:first", grid);
        //表主体     
        g.gridbody = $(".l-grid-body:first", grid);
        g.currentData = null;
        
        
        p.cssClass && $(grid).addClass(p.cssClass);
        /*--------------------------------
        --------------创建头部------------
        ---------------------------------*/
        if (p.title)
            $(".l-panel-header-text", g.header).html(p.title);
        else
            g.header.hide();
        /*----------------------------------
        --------------创建表头--------------
        ----------------------------------*/
        g.headers = [];
        g.gridtablewidth = 0;
        //如果有复选框列 
        if(p.checkbox)
        {
            var headerCell = $("<td class='l-grid-hd-cell l-grid-hd-cell-checkbox'><div class='l-grid-hd-cell-inner'><div class='l-grid-hd-cell-text l-grid-hd-cell-btn-checkbox'></div></td>");
            headerCell.css({ width: 27 });
            $("tr:first", g.gridheader).append(headerCell);
            g.headers.push({
                width : 27,   
                ischeckbox : true
            });
            g.gridtablewidth += 28;
        }
        //如果有明细，创建列
        if (p.detail && p.detail.onShowDetail)
        {
            var detailHeaderCell = $("<td class='l-grid-hd-cell l-grid-hd-cell-detail'><div class='l-grid-hd-cell-inner'><div class='l-grid-hd-cell-text'></div></td>");
            detailHeaderCell.css({ width: 29 });
            $("tr:first", g.gridheader).append(detailHeaderCell);
            g.headers.push({
                width : 29,   
                isdetail : true
            });
            g.gridtablewidth += 30;
        }  
        
        $(p.columns).each(function(i, item)
        {
            var $headerCell = $("<td class='l-grid-hd-cell' columnindex='" + i + "'><div class='l-grid-hd-cell-inner'><span class='l-grid-hd-cell-text'> </span></div></td>"); 
            if (i == p.columns.length - 1)
            {
                //$(".l-grid-hd-cell-drophandle", $headerCell).remove();
                $headerCell.addClass("l-grid-hd-cell-last");
            }
            if (item.name)
                $headerCell.attr({ columnname: item.name });
            if (item.isSort != undefined)
                $headerCell.attr({ isSort: item.isSort });
            if (item.isAllowHide != undefined) 
                $headerCell.attr({ isAllowHide: item.isAllowHide });
            var headerText = "";
            if (item.display && item.display != "")
                headerText = item.display;
            else if (item.headerRender)
                headerText = item.headerRender(item);
            else
                headerText = "&nbsp;";
            $(".l-grid-hd-cell-text", $headerCell).html(headerText);
            //$headerCell.prepend(headerText);
            $("tr:first", g.gridheader).append($headerCell);
            var colwidth = item.width;
            if (item.minWidth)
            { 
                if (item.width && item.width > item.minWidth)
                    colwidth = item.width;
                else 
                    colwidth = item.minWidth; 
            } else if (item.width)
            {
                colwidth = item.width;
            } else if (p.columnWidth)
            {
                colwidth = p.columnWidth;
            }
            g.gridtablewidth += colwidth+1;
            $headerCell.width(colwidth); 
            g.headers.push({
                width : colwidth,
                columnname : item.name,
                columnindex : i, 
                islast : i == p.columns.length - 1,
                isdetail : false
            }); 
        }); 
        $("div:first",g.gridheader).width(g.gridtablewidth+40);
        //创建 显示/隐藏 列 列表
        $("tr:first .l-grid-hd-cell", g.gridheader).each(function(i, td)
        {
            if ($(this).hasClass("l-grid-hd-cell-detail")) return;
            var isAllowHide = $(this).attr("isAllowHide");
            if (isAllowHide != undefined && isAllowHide.toLowerCase() == "false") return;
            var chk = 'checked="checked"';
            var columnindex = $(this).attr("columnindex");
            var columnname = $(this).attr("columnname");
            if (!columnindex || !columnname) return;
            var header = $(".l-grid-hd-cell-text", this).html();
            if (this.style.display == 'none') chk = '';
            $('tbody', g.popup).append('<tr><td class="l-column-left"><input type="checkbox" ' + chk + ' class="l-checkbox" columnindex="' + columnindex + '"/></td><td class="l-column-right">' + header + '</td></tr>');
        }); 
       $.fn.ligerCheckBox &&  $('input:checkbox', g.popup).ligerCheckBox(
                {
                    onBeforeClick: function(obj)
                    {
                        if (!obj.checked) return true;
                        if ($('input:checked', g.popup).length <= p.minColToggle)
                            return false;
                        return true;
                    }
                });
        //创建 显示/隐藏 列 
        $(".l-grid-hd-cell",g.gridheader).bind("contextmenu",function(e)
                { 
                    if (g.colresize) return true; 
                    if (!p.allowHideColumn) return true;
                    var columnindex = $(this).attr("columnindex");
                    if(columnindex == undefined) return true;
                    var left = (e.pageX - g.body.offset().left + parseInt(g.body[0].scrollLeft)); 
                    if(columnindex== p.columns.length-1) left-= 80;
                    g.popup.css({ left: left, top: g.gridheader.height() + 1 });
                    g.popup.toggle();
                    return false;
                }
        );
        /*----------------------------------
        ----------宽度高度初始化------------
        ----------------------------------*/
        if(p.isScroll == false) p.height = 'auto';
        if (p.height == 'auto')
        {
            g.gridbody.height('auto');
        }
        if (p.width)
        { 
            $(grid).width(p.width);
        } 

        g.onResize();
        /*----------------------------------
        --------------创建表体--------------
        ----------------------------------*/
        g.loadData();
        /*----------------------------------------
        --------------创建底部工具条--------------
        ----------------------------------------*/
        if (p.usePager)
        {
            //创建底部工具条 - 选择每页显示记录数
            var optStr = "";
            var selectedIndex = -1;
            $(p.pageSizeOptions).each(function(i, item)
            {
                var selectedStr = "";
                if (p.pageSize == item) selectedIndex = i;
                optStr += "<option value='" + item + "' " + selectedStr + " >" + item + "</option>";
            });

            $('.l-bar-selectpagesize', g.toolbar).append("<select name='rp'>" + optStr + "</select>");
            if (selectedIndex != -1) $('.l-bar-selectpagesize select', g.toolbar)[0].selectedIndex = selectedIndex;
            if (p.switchPageSizeApplyComboBox && $.fn.ligerComboBox)
            {
                $(".l-bar-selectpagesize select", g.toolbar).ligerComboBox(
                {
                    onBeforeSelect: function()
                    {
                        if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                            return false;
                        return true;
                    },
                    width: 45
                });
            }
            //创建底部工具条 - 各个按钮状态
            //创建底部工具条 - 当前页数
            //创建底部工具条 - 当前分页信息
        }
        else
        {
            g.toolbar.hide();
        }
        /*----------------------------------
        ------------创建Loading------------
        ----------------------------------*/
        g.gridloading.html(p.loadingMessage);
        /*----------------------------------
        --------------创建事件--------------
        ----------------------------------*/
        g.header.click(function()
        {
            g.popup.hide();
            g.endEdit();
        });
        //表头 - 经过和点击事件
        $(".l-grid-hd-cell", g.gridheader).hover(function()
        { 
        }, function()
        {
        }).mousedown(function(e)
        {
            if(g.colresize) return false; //如果正在调整列宽
        });
        $(".l-grid-hd-cell-text",g.gridheader).click(function(e)
        {
            var obj = (e.target || e.srcElement);
            var row = $(this).parent().parent();
            if (!row.attr("columnname")) return;
            if(g.colresize) return false; //如果正在调整列宽
            if(!p.enabledSort) return ;
            if (row.attr("isSort") != undefined && row.attr("isSort").toLowerCase() == "false") return;  
            if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                return false;
            var sort = $(".l-grid-hd-cell-sort", row);
            var columnName = $(row).attr("columnname");
            if (sort.length > 0)
            {
                if (sort.hasClass("l-grid-hd-cell-sort-asc"))
                {
                    sort.removeClass("l-grid-hd-cell-sort-asc").addClass("l-grid-hd-cell-sort-desc");
                    row.removeClass("l-grid-hd-cell-asc").addClass("l-grid-hd-cell-desc");
                    g.changeSort(columnName, 'desc');
                }
                else if (sort.hasClass("l-grid-hd-cell-sort-desc"))
                {
                    sort.removeClass("l-grid-hd-cell-sort-desc").addClass("l-grid-hd-cell-sort-asc");
                    row.removeClass("l-grid-hd-cell-desc").addClass("l-grid-hd-cell-asc");
                    g.changeSort(columnName, 'asc');
                }
            }
            else
            {
                row.removeClass("l-grid-hd-cell-desc").addClass("l-grid-hd-cell-asc");
                $(this).after("<span class='l-grid-hd-cell-sort l-grid-hd-cell-sort-asc'>&nbsp;&nbsp;</span>");
                g.changeSort(columnName, 'asc');
            }
            $(".l-grid-hd-cell-sort", row.siblings()).remove();
            return false;
        });
        g.gridheader.click(function()
        {
            g.endEdit();
        });
        //调整列宽
        if (p.allowAdjustColWidth)
        {
            g.gridheader.mousemove(function(e)
            {
                if(g.colresize) return; //如果正在调整列宽
                var posLeft = e.pageX - $(grid).offset().left;//当前鼠标位置
                var currentLeft = 0;  
                for(var i=0;i<g.headers.length;i++)
                { 
                    if(g.headers[i].width) currentLeft+= g.headers[i].width + 1;
                    if(g.headers[i].isdetail || g.headers[i].ischeckbox) continue; 
                    if(posLeft >= currentLeft-2-g.gridbody[0].scrollLeft && posLeft <= currentLeft+2-g.gridbody[0].scrollLeft)
                    { 
                        $('body').css({cursor:'e-resize'});
                        g.toDragHeaderIndex = i;
                        return;
                    }
                }
                $('body').css({cursor:'default'});
                g.toDragHeaderIndex = null; 
            }).mouseout(function(e)
            {
                if(g.colresize) return; //如果正在调整列宽
                $('body').css({cursor:'default'});
            }).mousedown(function(e)
            {
                if(g.colresize) return; //如果正在调整列宽
                if(g.toDragHeaderIndex == null) return ;//如果不在位置上
                g.dragStart('colresize', e, g.toDragHeaderIndex);
            });
        }

        //表头 - 显示/隐藏'列控制'按钮事件
        if (p.allowHideColumn)
        {

            $('tr', g.popup).hover(function() { $(this).addClass('l-popup-row-over'); },
            function() { $(this).removeClass('l-popup-row-over'); });
            var onPopupCheckboxChange = function()
            {
                if ($('input:checked', g.popup).length + 1 <= p.minColToggle)
                {
                    return false;
                }
                g.toggleCol($(this).attr("columnindex"), this.checked);
            };
            if ($.fn.ligerCheckBox)
                $(':checkbox', g.popup).change(onPopupCheckboxChange);
            else
                $(':checkbox', g.popup).click(onPopupCheckboxChange);
        }
        //表头 - 调整列宽层事件
        //表体 - 滚动联动事件
        g.gridbody.scroll(function(){  
           
            var scrollLeft = g.gridbody.scrollLeft();
            if(scrollLeft == undefined) return ; 
            g.gridheader[0].scrollLeft = scrollLeft;
        }); 
        //表体 - 数据 单元格事件
        $(grid).click(function(e){ 
            var obj = (e.target || e.srcElement); 
            if(obj.tagName.toLowerCase()=="span" && $(obj).hasClass("l-grid-row-cell-detailbtn"))
            {    
                var row = $(obj).parent().parent().parent();
                //确保不是在内嵌表格点击的 
                if(row.parent().parent()[0] != $("table:first",g.gridbody)[0]) return ; 
                var rowindex = parseInt($(row).attr("rowindex"));
                var item = g.currentData[p.root][rowindex];
                if ($(obj).hasClass("l-open"))
                { 
                    row.next(".l-grid-detailpanel").remove();
                    $(obj).removeClass("l-open"); 
                }
                else
                { 
                    var detailRow = $("<tr class='l-grid-detailpanel'><td><div class='l-grid-detailpanel-inner' style='display:none'></div></td></tr>"); 
                    var detailRowInner = $("div:first",detailRow);
                    detailRowInner.width(g.gridtablewidth-1);
                    detailRowInner.parent().attr("colSpan",g.headers.length).width(g.gridtablewidth-1);
                    row.after(detailRow);
                    if(p.detail.onShowDetail)
                    {
                        p.detail.onShowDetail(item, detailRowInner[0]);
                        detailRowInner.show();
                    }
                    else if(p.detail.render)
                    {
                        detailRowInner.append(p.detail.render());
                        detailRowInner.show();
                    }
                    $(obj).addClass("l-open");
                } 
                return ;
            }   
            if(obj.tagName.toLowerCase()=="div" && $(obj).hasClass("l-grid-hd-cell-btn-checkbox"))
            {
                var row = $(obj).parent().parent().parent();
                var uncheck = row.hasClass("l-checked");
                if(p.onBeforeCheckAllRow)
                 {
                    if(p.onBeforeCheckAllRow(!uncheck,grid)==false) return false;
                 }
                if(uncheck)
                {
                    row.removeClass("l-checked");
                    $("tbody:first > tr",g.gridbody).removeClass("l-checked");
                }
                else
                {
                    row.addClass("l-checked");
                    $("tbody:first > tr",g.gridbody).addClass("l-checked");
                }
                p.onCheckAllRow && p.onCheckAllRow(!uncheck,grid);
            }
            if(obj.tagName.toLowerCase()=="div" || $(obj).hasClass("l-grid-row-cell-inner") || $(obj).hasClass("l-grid-row-cell"))
            {    
                if (p.enabledEdit && !p.dblClickToEdit)
                { 
                    var row = null;
                    if ($(obj).hasClass("l-grid-row-cell")) row = $(obj).parent();
                    else row = $(obj).parent().parent();
                    //第一次选择的时候不允许编辑，第二次才允许
                    if(p.allowUnSelectRow || row.hasClass("l-selected-again"))
                        g.applyEditor(obj);
                } 
            }
        });
        //工具条 - 切换每页记录数事件
        $('select', g.toolbar).change(function()
        {
            if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                return false;
            p.newPage = 1;
            p.pageSize = this.value;
            g.loadData();
        });
        //工具条 - 切换当前页事件
        $('.pcontrol input', g.toolbar).keydown(function(e) { if (e.keyCode == 13) g.changePage('input') });
        //工具条 - 按钮事件
        $(".l-bar-button", g.toolbar).hover(function()
        {
            $(this).addClass("l-bar-button-over");
        }, function()
        {
            $(this).removeClass("l-bar-button-over");
        }).click(function()
        {
            if ($(this).hasClass("l-bar-btnfirst"))
            { 
                if(p.onToFirst && p.onToFirst(grid) == false) return false;
                g.changePage('first');
            }
            else if ($(this).hasClass("l-bar-btnprev"))
            {
                if(p.onToPrev && p.onToPrev(grid) == false) return false;
                g.changePage('prev');
            }
            else if ($(this).hasClass("l-bar-btnnext"))
            {
                if(p.onToNext && p.onToNext(grid) == false) return false;
                g.changePage('next');
            }
            else if ($(this).hasClass("l-bar-btnlast"))
            {
                 if(p.onToLast && p.onToLast(grid) == false) return false; 
                g.changePage('last');
            }
            else if ($(this).hasClass("l-bar-btnload"))
            {
                if($("span",this).hasClass("l-disabled")) return false;
                if(p.onReload && p.onReload(grid) == false) return false;
                if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                    return false;
                g.loadData();
            }
        });
        g.toolbar.click(function()
        {
            g.popup.hide();
            g.endEdit();
        });
        //全局事件
        $(document).mousemove(function(e) { g.dragMove(e) }).mouseup(function(e) { g.dragEnd() }).hover(function() { }, function() { g.dragEnd() }).click(function(e) { g.onClick(e) });
        //$(grid).click(function (e) { g.onClick(e) });
        
        if (grid.id == undefined) grid.id = "LigerUI_" + new Date().getTime();
        LigerUIManagers[grid.id + "_Grid"] = g;
        grid.usedGrid = true;
        
        $(window).resize(function()
        {
            g.onResize();
        });
    };
    $.ligerGridSetParms = function(p, fixedP)
    {
        p = $.extend({}, $.ligerDefaults.Grid,$.ligerDefaults.GridString, p || {});
        if (p.url && p.data)
        {
            p.dataType = "local";
        }
        else if (p.url && !p.data)
        {
            p.dataType = "server";
        }
        else if (!p.url && p.data)
        {
            p.dataType = "local";
        }
        else if (!p.url && !p.data)
        {
            p.dataType = "local";
            p.data = [];
        }
        if (p.dataType == "local")
            p.dataAction = "local";
        if (fixedP)
        {
            p = $.extend(p, fixedP);
        }
        return p;
    };

    $.fn.ligerGrid = function(p)
    {
        var fixedP = {};
        p = p || {};
        p = $.ligerGridSetParms(p, fixedP);
        this.each(function()
        {
            $.ligerAddGrid(this, p);
        });
        if (this.length == 0) return null;
        if (this.length == 1) return $(this[0]).ligerGetGridManager();
        var managers = [];
        this.each(function() {
            managers.push($(this).ligerGetGridManager());
        });
        return managers;
    };
 
   
})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($) {
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetLayoutManager = function () {
        return LigerUIManagers[this[0].id + "_Layout"];
    };
    $.fn.ligerRemoveLayoutManager = function () {
        return this.each(function () {
            LigerUIManagers[this.id + "_Layout"] = null;
        });
    };
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Layout = {
        topHeight: 50,
        bottomHeight: 50,
        leftWidth: 110,
        centerWidth: 300,
        rightWidth: 170,
        InWindow : true,     //是否以窗口的高度为准 height设置为百分比时可用
        heightDiff : 0,     //高度补差
        height:'100%',      //高度
        onHeightChanged: null,
        isLeftCollapse: false,      //初始化时 左边是否隐藏
        isRightCollapse: false,     //初始化时 右边是否隐藏
        allowLeftCollapse: true,      //是否允许 左边可以隐藏
        allowRightCollapse: true,     //是否允许 右边可以隐藏
        allowLeftResize: true,      //是否允许 左边可以调整大小
        allowRightResize: true,     //是否允许 右边可以调整大小
        allowTopResize: true,      //是否允许 头部可以调整大小
        allowBottomResize: true,     //是否允许 底部可以调整大小
        space: 3 //间隔
    };
    $.fn.ligerLayout = function (p) {
        this.each(function () {
            p = $.extend({ }, $.ligerDefaults.Layout, p || {});
            if (this.usedLayout) return;
            var g = {
                init: function () {
                    $("> .l-layout-left .l-layout-header,> .l-layout-right .l-layout-header", g.layout).hover(function () {
                        $(this).addClass("l-layout-header-over");
                    }, function () {
                        $(this).removeClass("l-layout-header-over");

                    });
                    $(".l-layout-header-toggle", g.layout).hover(function () {
                        $(this).addClass("l-layout-header-toggle-over");
                    }, function () {
                        $(this).removeClass("l-layout-header-toggle-over");

                    });
                    $(".l-layout-header-toggle", g.left).click(function () {
                        g.setLeftCollapse(true);
                    });
                    $(".l-layout-header-toggle", g.right).click(function () {
                        g.setRightCollapse(true);
                    });
                    //set top
                    g.middleTop = 0;
                    if (g.top) {
                        g.middleTop += g.top.height();
                        g.middleTop += parseInt(g.top.css('borderTopWidth'));
                        g.middleTop += parseInt(g.top.css('borderBottomWidth'));
                        g.middleTop += p.space;
                    }
                    if (g.left) {
                        g.left.css({ top: g.middleTop });
                        g.leftCollapse.css({ top: g.middleTop });
                    }
                    if (g.center) g.center.css({ top: g.middleTop });
                    if (g.right) {
                        g.right.css({ top: g.middleTop });
                        g.rightCollapse.css({ top: g.middleTop });
                    }
                    //set left
                    if (g.left) g.left.css({ left: 0 });
                    g.onResize();
                    g.onResize();
                },
                setCollapse: function () {

                    g.leftCollapse.hover(function () {
                        $(this).addClass("l-layout-collapse-left-over");
                    }, function () {
                        $(this).removeClass("l-layout-collapse-left-over");
                    });
                    g.leftCollapse.toggle.hover(function () {
                        $(this).addClass("l-layout-collapse-left-toggle-over");
                    }, function () {
                        $(this).removeClass("l-layout-collapse-left-toggle-over");
                    });
                    g.rightCollapse.hover(function () {
                        $(this).addClass("l-layout-collapse-right-over");
                    }, function () {
                        $(this).removeClass("l-layout-collapse-right-over");
                    });
                    g.rightCollapse.toggle.hover(function () {
                        $(this).addClass("l-layout-collapse-right-toggle-over");
                    }, function () {
                        $(this).removeClass("l-layout-collapse-right-toggle-over");
                    });
                    g.leftCollapse.toggle.click(function () {
                        g.setLeftCollapse(false);
                    });
                    g.rightCollapse.toggle.click(function () {
                        g.setRightCollapse(false);
                    });
                    if (g.left && g.isLeftCollapse) {
                        g.leftCollapse.show();
                        g.leftDropHandle && g.leftDropHandle.hide();
                        g.left.hide();
                    }
                    if (g.right && g.isRightCollapse) {
                        g.rightCollapse.show();
                        g.rightDropHandle && g.rightDropHandle.hide();
                        g.right.hide();
                    }
                },
                setLeftCollapse: function (isCollapse) {
                    if (!g.left) return false;
                    g.isLeftCollapse = isCollapse;
                    if (g.isLeftCollapse) {
                        g.leftCollapse.show();
                        g.leftDropHandle && g.leftDropHandle.hide();
                        g.left.hide();
                    }
                    else {
                        g.leftCollapse.hide();
                        g.leftDropHandle && g.leftDropHandle.show();
                        g.left.show();
                    }
                    g.onResize();
                },
                setRightCollapse: function (isCollapse) {
                    if (!g.right) return false;
                    g.isRightCollapse = isCollapse;
                    g.onResize();
                    if (g.isRightCollapse) {
                        g.rightCollapse.show();
                        g.rightDropHandle && g.rightDropHandle.hide();
                        g.right.hide();
                    }
                    else {
                        g.rightCollapse.hide();
                        g.rightDropHandle && g.rightDropHandle.show();
                        g.right.show();
                    }
                    g.onResize();
                },
                addDropHandle: function () {
                    if (g.left && p.allowLeftResize) {
                        g.leftDropHandle = $("<div class='l-layout-drophandle-left'></div>");
                        g.layout.append(g.leftDropHandle);
                        g.leftDropHandle && g.leftDropHandle.show();
                        g.leftDropHandle.mousedown(function (e) {
                            g.start('leftresize', e);
                        });
                    }
                    if (g.right && p.allowRightResize) {
                        g.rightDropHandle = $("<div class='l-layout-drophandle-right'></div>");
                        g.layout.append(g.rightDropHandle);
                        g.rightDropHandle && g.rightDropHandle.show();
                        g.rightDropHandle.mousedown(function (e) {
                            g.start('rightresize', e);
                        });
                    }
                    if (g.top && p.allowTopResize) {
                        g.topDropHandle = $("<div class='l-layout-drophandle-top'></div>");
                        g.layout.append(g.topDropHandle);
                        g.topDropHandle.show();
                        g.topDropHandle.mousedown(function (e) {
                            g.start('topresize', e);
                        });
                    }
                    if (g.bottom  && p.allowBottomResize) {
                        g.bottomDropHandle = $("<div class='l-layout-drophandle-bottom'></div>");
                        g.layout.append(g.bottomDropHandle);
                        g.bottomDropHandle.show();
                        g.bottomDropHandle.mousedown(function (e) {
                            g.start('bottomresize', e);
                        });
                    }
                    g.draggingxline = $("<div class='l-layout-dragging-xline'></div>");
                    g.draggingyline = $("<div class='l-layout-dragging-yline'></div>");
                    g.layout.append(g.draggingxline).append(g.draggingyline);
                },
                setDropHandlePosition: function () {
                    if (g.leftDropHandle) {
                        g.leftDropHandle.css({ left: g.left.width() + parseInt(g.left.css('left')), height: g.middleHeight, top: g.middleTop });
                    }
                    if (g.rightDropHandle) {
                        g.rightDropHandle.css({ left: parseInt(g.right.css('left')) - p.space, height: g.middleHeight, top: g.middleTop });
                    }
                    if (g.topDropHandle) {
                        g.topDropHandle.css({ top: g.top.height() + parseInt(g.top.css('top')), width: g.top.width() });
                    }
                    if (g.bottomDropHandle) {
                        g.bottomDropHandle.css({ top: parseInt(g.bottom.css('top')) - p.space, width: g.bottom.width() });
                    }
                },
                onResize: function () {
                    var oldheight = g.layout.height();
                    //set layout height 
                    var h = 0;
                    var windowHeight = $(window).height(); 
                    var parentHeight = null;
                    if (typeof(p.height) == "string" && p.height.indexOf('%') > 0)
                    { 
                        var layoutparent = g.layout.parent(); 
                        if (p.InWindow || layoutparent[0].tagName.toLowerCase() == "body") { 
                            parentHeight = windowHeight; 
                            parentHeight -= parseInt($('body').css('paddingTop'));
                            parentHeight -= parseInt($('body').css('paddingBottom'));
                        }
                        else{ 
                            parentHeight = layoutparent.height();
                        }  
                        h =  parentHeight * parseFloat(p.height) * 0.01;   
                        if(p.InWindow || layoutparent[0].tagName.toLowerCase() == "body") 
                            h -= (g.layout.offset().top - parseInt($('body').css('paddingTop')));
                    } 
                    else
                    { 
                        h = parseInt(p.height);
                    }    
                    h += p.heightDiff;  
                    g.layout.height(h);
                    g.layoutHeight = g.layout.height();
                    g.middleWidth = g.layout.width();
                    g.middleHeight = g.layout.height();
                    if (g.top) {
                        g.middleHeight -= g.top.height();
                        g.middleHeight -= parseInt(g.top.css('borderTopWidth'));
                        g.middleHeight -= parseInt(g.top.css('borderBottomWidth'));
                        g.middleHeight -= p.space;
                    }
                    if (g.bottom) {
                        g.middleHeight -= g.bottom.height();
                        g.middleHeight -= parseInt(g.bottom.css('borderTopWidth'));
                        g.middleHeight -= parseInt(g.bottom.css('borderBottomWidth'));
                        g.middleHeight -= p.space;
                    }
                    //specific
                    g.middleHeight -= 2;

                    if (p.onHeightChanged && g.layoutHeight != oldheight) {
                        p.onHeightChanged({ layoutHeight: g.layoutHeight, diff: g.layoutHeight - oldheight, middleHeight: g.middleHeight });
                    }

                    if (g.center) {
                        g.centerWidth = g.middleWidth;
                        if (g.left) {
                            if (g.isLeftCollapse) {
                                g.centerWidth -= g.leftCollapse.width();
                                g.centerWidth -= parseInt(g.leftCollapse.css('borderLeftWidth'));
                                g.centerWidth -= parseInt(g.leftCollapse.css('borderRightWidth'));
                                g.centerWidth -= parseInt(g.leftCollapse.css('left'));
                                g.centerWidth -= p.space;
                            }
                            else {
                                g.centerWidth -= g.leftWidth;
                                g.centerWidth -= parseInt(g.left.css('borderLeftWidth'));
                                g.centerWidth -= parseInt(g.left.css('borderRightWidth'));
                                g.centerWidth -= parseInt(g.left.css('left'));
                                g.centerWidth -= p.space;
                            }
                        }
                        if (g.right) {
                            if (g.isRightCollapse) {
                                g.centerWidth -= g.rightCollapse.width();
                                g.centerWidth -= parseInt(g.rightCollapse.css('borderLeftWidth'));
                                g.centerWidth -= parseInt(g.rightCollapse.css('borderRightWidth'));
                                g.centerWidth -= parseInt(g.rightCollapse.css('right'));
                                g.centerWidth -= p.space;
                            }
                            else {
                                g.centerWidth -= g.rightWidth;
                                g.centerWidth -= parseInt(g.right.css('borderLeftWidth'));
                                g.centerWidth -= parseInt(g.right.css('borderRightWidth'));
                                g.centerWidth -= p.space;
                            }
                        }
                        g.centerLeft = 0;
                        if (g.left) {
                            if (g.isLeftCollapse) {
                                g.centerLeft += g.leftCollapse.width();
                                g.centerLeft += parseInt(g.leftCollapse.css('borderLeftWidth'));
                                g.centerLeft += parseInt(g.leftCollapse.css('borderRightWidth'));
                                g.centerLeft += parseInt(g.leftCollapse.css('left'));
                                g.centerLeft += p.space;
                            }
                            else {
                                g.centerLeft += g.left.width();
                                g.centerLeft += parseInt(g.left.css('borderLeftWidth'));
                                g.centerLeft += parseInt(g.left.css('borderRightWidth'));
                                g.centerLeft += p.space;
                            }
                        }
                        g.center.css({ left: g.centerLeft });
                        g.center.width(g.centerWidth);
                        g.center.height(g.middleHeight);
                        var contentHeight = g.middleHeight;
                        if(g.center.header) contentHeight-= g.center.header.height();
                        g.center.content.height(contentHeight);
                    }
                    if (g.left) {
                        g.leftCollapse.height(g.middleHeight);
                        g.left.height(g.middleHeight);
                    }
                    if (g.right) {
                        g.rightCollapse.height(g.middleHeight);
                        g.right.height(g.middleHeight);
                        //set left
                        g.rightLeft = 0;

                        if (g.left) {
                            if (g.isLeftCollapse) {
                                g.rightLeft += g.leftCollapse.width();
                                g.rightLeft += parseInt(g.leftCollapse.css('borderLeftWidth'));
                                g.rightLeft += parseInt(g.leftCollapse.css('borderRightWidth'));
                                g.rightLeft += p.space;
                            }
                            else {
                                g.rightLeft += g.left.width();
                                g.rightLeft += parseInt(g.left.css('borderLeftWidth'));
                                g.rightLeft += parseInt(g.left.css('borderRightWidth'));
                                g.rightLeft += parseInt(g.left.css('left'));
                                g.rightLeft += p.space;
                            }
                        }
                        if (g.center) {
                            g.rightLeft += g.center.width();
                            g.rightLeft += parseInt(g.center.css('borderLeftWidth'));
                            g.rightLeft += parseInt(g.center.css('borderRightWidth'));
                            g.rightLeft += p.space;
                        }
                        g.right.css({ left: g.rightLeft });
                    }
                    if (g.bottom) {
                        g.bottomTop = g.layoutHeight - g.bottom.height() - 2;
                        g.bottom.css({ top: g.bottomTop });
                    }
                    g.setDropHandlePosition();

                },
                start: function (dragtype, e) {
                    g.dragtype = dragtype;
                    if (dragtype == 'leftresize' || dragtype == 'rightresize') {
                        g.xresize = { startX: e.pageX };
                        g.draggingyline.css({ left: e.pageX - g.layout.offset().left, height: g.middleHeight, top: g.middleTop }).show();
                        $('body').css('cursor', 'col-resize');
                    }
                    else if (dragtype == 'topresize' || dragtype == 'bottomresize') {
                        g.yresize = { startY: e.pageY };
                        g.draggingxline.css({ top: e.pageY - g.layout.offset().top, width: g.layout.width() }).show();
                        $('body').css('cursor', 'row-resize');
                    }
                    else {
                        return;
                    }

                    g.layout.lock.width(g.layout.width());
                    g.layout.lock.height(g.layout.height());
                    g.layout.lock.show();
                    if ($.browser.msie || $.browser.safari)  $('body').bind('selectstart', function () { return false; }); // 不能选择

                    $(document).bind('mouseup', g.stop);
                    $(document).bind('mousemove', g.drag);
                },
                drag: function (e) {
                    if (g.xresize) {
                        g.xresize.diff = e.pageX - g.xresize.startX;
                        g.draggingyline.css({ left: e.pageX - g.layout.offset().left });
                        $('body').css('cursor', 'col-resize');
                    }
                    else if (g.yresize) {
                        g.yresize.diff = e.pageY - g.yresize.startY;
                        g.draggingxline.css({ top: e.pageY - g.layout.offset().top });
                        $('body').css('cursor', 'row-resize');
                    } 
                },
                stop: function (e) {

                    if (g.xresize && g.xresize.diff != undefined) {
                        if (g.dragtype == 'leftresize') {
                            g.leftWidth += g.xresize.diff;
                            g.left.width(g.leftWidth);
                            if (g.center)
                                g.center.width(g.center.width() - g.xresize.diff).css({ left: parseInt(g.center.css('left')) + g.xresize.diff });
                            else if (g.right)
                                g.right.width(g.left.width() - g.xresize.diff).css({ left: parseInt(g.right.css('left')) + g.xresize.diff });
                        }
                        else if (g.dragtype == 'rightresize') {
                            g.rightWidth -= g.xresize.diff;
                            g.right.width(g.rightWidth).css({ left: parseInt(g.right.css('left')) + g.xresize.diff });
                            if (g.center)
                                g.center.width(g.center.width() + g.xresize.diff);
                            else if (g.left)
                                g.left.width(g.left.width() + g.xresize.diff);
                        }
                    }
                    else if (g.yresize && g.yresize.diff != undefined) {
                        if (g.dragtype == 'topresize') {
                            g.top.height(g.top.height() + g.yresize.diff);
                            g.middleTop += g.yresize.diff;
                            g.middleHeight -= g.yresize.diff;
                            if (g.left) {
                                g.left.css({ top: g.middleTop }).height(g.middleHeight);
                                g.leftCollapse.css({ top: g.middleTop }).height(g.middleHeight);
                            }
                            if (g.center) g.center.css({ top: g.middleTop }).height(g.middleHeight);
                            if (g.right) {
                                g.right.css({ top: g.middleTop }).height(g.middleHeight);
                                g.rightCollapse.css({ top: g.middleTop }).height(g.middleHeight);
                            }
                        }
                        else if (g.dragtype == 'bottomresize') {
                            g.bottom.height(g.bottom.height() - g.yresize.diff);
                            g.middleHeight += g.yresize.diff;
                            g.bottomTop += g.yresize.diff;
                            g.bottom.css({ top: g.bottomTop });
                            if (g.left) {
                                g.left.height(g.middleHeight);
                                g.leftCollapse.height(g.middleHeight);
                            }
                            if (g.center) g.center.height(g.middleHeight);
                            if (g.right) {
                                g.right.height(g.middleHeight);
                                g.rightCollapse.height(g.middleHeight);
                            }
                        }
                    }
                    g.setDropHandlePosition();
                    g.draggingxline.hide();
                    g.draggingyline.hide();
                    g.xresize = g.yresize = g.dragtype = false;
                    g.layout.lock.hide();
                    if ($.browser.msie || $.browser.safari)
                        $('body').unbind('selectstart');
                    $(document).unbind('mousemove', g.drag);
                    $(document).unbind('mouseup', g.stop);
                    $('body').css('cursor', '');
                }
            };
            g.layout = $(this);
            if (!g.layout.hasClass("l-layout"))
                g.layout.addClass("l-layout");
            g.width = g.layout.width();
            //top
            if ($("> div[position=top]", g.layout).length > 0) {
                g.top = $("> div[position=top]", g.layout).wrap('<div class="l-layout-top" style="top:0px;"></div>').parent();
                g.top.content = $("> div[position=top]", g.top);
                if (!g.top.content.hasClass("l-layout-content"))
                    g.top.content.addClass("l-layout-content");
                g.topHeight = p.topHeight;
                if (g.topHeight) {
                    g.top.height(g.topHeight);
                }
            }

            //bottom
            if ($("> div[position=bottom]", g.layout).length > 0) {
                g.bottom = $("> div[position=bottom]", g.layout).wrap('<div class="l-layout-bottom"></div>').parent();
                g.bottom.content = $("> div[position=bottom]", g.top);
                if (!g.bottom.content.hasClass("l-layout-content"))
                    g.bottom.content.addClass("l-layout-content");

                g.bottomHeight = p.bottomHeight;
                if (g.bottomHeight) {
                    g.bottom.height(g.bottomHeight);
                }

            }
            //left
            if ($("> div[position=left]", g.layout).length > 0) {
                g.left = $("> div[position=left]", g.layout).wrap('<div class="l-layout-left" style="left:0px;"></div>').parent();
                g.left.header = $('<div class="l-layout-header"><div class="l-layout-header-toggle"></div><div class="l-layout-header-inner"></div></div>');
                g.left.prepend(g.left.header);
                g.left.header.toggle = $(".l-layout-header-toggle", g.left.header);
                g.left.content = $("> div[position=left]", g.left);
                if (!g.left.content.hasClass("l-layout-content"))
                    g.left.content.addClass("l-layout-content");
                if(!p.allowLeftCollapse) $(".l-layout-header-toggle", g.left.header).remove();
                //set title
                var lefttitle = g.left.content.attr("title");
                if (lefttitle) {
                    g.left.content.attr("title", "");
                    $(".l-layout-header-inner", g.left.header).html(lefttitle);
                }
                //set width
                g.leftWidth = p.leftWidth;
                if (g.leftWidth)
                    g.left.width(g.leftWidth);
            }
            //center
            if ($("> div[position=center]", g.layout).length > 0) {
                g.center = $("> div[position=center]", g.layout).wrap('<div class="l-layout-center" ></div>').parent();
                g.center.content = $("> div[position=center]", g.center);
                g.center.content.addClass("l-layout-content");
                //set title
                var centertitle = g.center.content.attr("title");
                if (centertitle) {
                    g.center.content.attr("title", "");
                    g.center.header = $('<div class="l-layout-header"></div>');
                    g.center.prepend(g.center.header);
                    g.center.header.html(centertitle);
                }
                //set width
                g.centerWidth = p.centerWidth;
                if (g.centerWidth)
                    g.center.width(g.centerWidth);
            }
            //right
            if ($("> div[position=right]", g.layout).length > 0) {
                g.right = $("> div[position=right]", g.layout).wrap('<div class="l-layout-right"></div>').parent();

                g.right.header = $('<div class="l-layout-header"><div class="l-layout-header-toggle"></div><div class="l-layout-header-inner"></div></div>');
                g.right.prepend(g.right.header);
                g.right.header.toggle = $(".l-layout-header-toggle", g.right.header);
                if(!p.allowRightCollapse) $(".l-layout-header-toggle", g.right.header).remove();
                g.right.content = $("> div[position=right]", g.right);
                if (!g.right.content.hasClass("l-layout-content"))
                    g.right.content.addClass("l-layout-content");

                //set title
                var righttitle = g.right.content.attr("title");
                if (righttitle) {
                    g.right.content.attr("title", "");
                    $(".l-layout-header-inner", g.right.header).html(righttitle);
                }
                //set width
                g.rightWidth = p.rightWidth;
                if (g.rightWidth)
                    g.right.width(g.rightWidth);
            }
            //lock
            g.layout.lock = $("<div class='l-layout-lock'></div>");
            g.layout.append(g.layout.lock);
            //DropHandle
            g.addDropHandle();

            //Collapse
            g.isLeftCollapse = p.isLeftCollapse;
            g.isRightCollapse = p.isRightCollapse;
            g.leftCollapse = $('<div class="l-layout-collapse-left" style="display: none; "><div class="l-layout-collapse-left-toggle"></div></div>');
            g.rightCollapse = $('<div class="l-layout-collapse-right" style="display: none; "><div class="l-layout-collapse-right-toggle"></div></div>');
            g.layout.append(g.leftCollapse).append(g.rightCollapse);
            g.leftCollapse.toggle = $("> .l-layout-collapse-left-toggle", g.leftCollapse);
            g.rightCollapse.toggle = $("> .l-layout-collapse-right-toggle", g.rightCollapse);
            g.setCollapse();

            //init
            g.init();
            $(window).resize(function () {
                g.onResize();
            });
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Layout"] = g;
            this.usedLayout = true;
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Layout"];
        var managers = [];
        this.each(function() {
            managers.push(LigerUIManagers[this.id + "_Layout"]);
        });
        return managers;
    };
})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/ 
if (typeof (LigerUIMenu) == "undefined") LigerUIMenu = {}; 
(function ($)
{
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Menu = {
        width: 120,
        top: 0,
        left: 0,
        items:null,
        shadow: true
    };
    ///	<param name="$" type="jQuery"></param> 
    $.ligerMenu = function (p)
    {
        p = $.extend({ }, $.ligerDefaults.Menu, p || {});
        var g = {
            show: function (options,menu)
            {
                if(menu==undefined) menu = g.menu;
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
                if(menu==undefined) menu = g.menu;
                g.hideAllSubMenu(menu);
                menu.hide();
                g.updateShadow(menu);
            },
            toggle: function ()
            {
                g.menu.toggle();
                g.updateShadow(g.menu);
            },
            removeItem: function (itemid)
            {
                $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).remove();
                g.itemCount--;
            },
            setEnable: function (itemid)
            {
                $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).removeClass("l-menu-item-disable");
            },
            setDisable: function (itemid)
            {
                $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).addClass("l-menu-item-disable");
            },
            isEnable: function (itemid)
            {
                return !$("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).hasClass("l-menu-item-disable");
            },
            getItemCount: function ()
            {
                return $("> .l-menu-item", g.menu.items).length;
            },
            addItem: function (item, menu)
            {
                if(!item) return ;
                if(menu== undefined) menu = g.menu;
                
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
                item.disable && ditem.addClass("l-menu-item-disable");
                if (item.children)
                {
                    if (ditem.attr("menuitemid") == undefined) ditem.attr("menuitemid", new Date().getTime());
                    ditem.append('<div class="l-menu-item-arrow"></div>');
                    var newmenu = g.createMenu(ditem.attr("menuitemid"));
                    LigerUIMenu[ditem.attr("menuitemid")] = newmenu;
                    newmenu.width(p.width);
                    newmenu.hover(null,function(){
                        if(!newmenu.showedSubMenu)
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
                        if(LigerUIMenu[meniitemid])
                        {
                            g.show({top:itemtop,left:$(this).offset().left+$(this).width()-5},LigerUIMenu[meniitemid]);
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
            hideAllSubMenu:function(menu)
            {
                if(menu==undefined) menu = g.menu;
                $("> .l-menu-item",menu.items).each(function(){
                    if($("> .l-menu-item-arrow",this).length>0)
                    {
                        var meniitemid = $(this).attr("menuitemid");
                        if (!meniitemid) return;
                        LigerUIMenu[meniitemid] && g.hide(LigerUIMenu[meniitemid]);
                    }
                });
                menu.showedSubMenu = false;
            },
            createMenu: function (parentMenuItemID)
            {
                var menu = $('<div class="l-menu" style="display:none"><div class="l-menu-yline"></div><div class="l-menu-over"><div class="l-menu-over-l"></div> <div class="l-menu-over-r"></div></div><div class="l-menu-inner"></div></div>');
                parentMenuItemID && menu.attr("parentmenuitemid", parentMenuItemID);
                menu.items = $("> .l-menu-inner:first", menu);
                menu.appendTo('body');
                if (p.shadow)
                {
                    menu.shadow = $('<div class="l-menu-shadow"></div>').insertAfter(menu);
                    g.updateShadow(menu);
                }
                menu.hover(null,function(){
                    if(!menu.showedSubMenu)
                        $("> .l-menu-over:first", menu).css({ top: -24 });
                });
                return menu;
            }
        };
        g.menu = g.createMenu();
        g.menu.css({ top: p.top, left: p.left, width: p.width });  
        p.items && $(p.items).each(function (i, item)
        { 
            g.addItem(item);
        });
        return g;
    };
    $(document).click(function ()
    {
        $(".l-menu,.l-menu-shadow").hide();
    });
})(jQuery);﻿/**
* jQuery ligerUI 1.0.1
* 
* Author leoxie [ gd_star@163.com ] 
* 
* Depend on:
* 1,LigerMenu
*/
if(typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function($)
{
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetMenuBarManager = function()
    {
        return LigerUIManagers[this[0].id + "_MenuBar"];
    }; 
    $.fn.ligerMenuBar = function(p)
    { 
        return this.each(function()
        {
            if (this.usedMenuBar) return;
            var g ={
                addItem :function(item){
                    var ditem = $('<div class="l-menubar-item l-panel-btn"><span></span><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div><div class="l-menubar-item-down"></div></div>');
                    g.menubar.append(ditem);
                    item.id && ditem.attr("menubarid",item.id);
                    item.text && $("span:first",ditem).html(item.text);
                    item.disable && ditem.addClass("l-menubar-item-disable");
                    item.click && ditem.click(function(){ item.click(item);});
                    if(item.menu)
                    {
                        var menu = $.ligerMenu(item.menu);
                        ditem.hover(function ()
                        {
                            g.actionMenu && g.actionMenu.hide();
                            var left = $(this).offset().left;
                            var top = $(this).offset().top + $(this).height();
                            menu.show({ top: top, left: left }); 
                            g.actionMenu = menu;
                            $(this).addClass("l-panel-btn-over l-panel-btn-selected").siblings(".l-menubar-item").removeClass("l-panel-btn-selected");
                        }, function ()
                        { 
                            $(this).removeClass("l-panel-btn-over");
                        }); 
                    }
                    else
                    {
                        ditem.hover(function ()
                        {
                            $(this).addClass("l-panel-btn-over");
                        }, function ()
                        {
                            $(this).removeClass("l-panel-btn-over");
                        });
                        $(".l-menubar-item-down",ditem).remove();
                    }
                    
                }
            };
            g.menubar = $(this);
            if(!g.menubar.hasClass("l-menubar")) g.menubar.addClass("l-menubar");
            if(p && p.items)
            {
                $(p.items).each(function(i,item){
                    g.addItem(item); 
                });
            }
            $(document).click(function ()
            {
                $(".l-panel-btn-selected",g.menubar).removeClass("l-panel-btn-selected");
            });
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_MenuBar"] = g;
            this.usedMenuBar = true;
        });
    };

})(jQuery);﻿/**
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
})(jQuery);/**
* jQuery ligerUI 1.0.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function ($)
{
    $.fn.ligerNoSelect = function (p)
    {
        if (p == null)
            prevent = true;
        else
            prevent = p;
        if (prevent)
        {
            return this.each(function ()
            {
                if ($.browser.msie || $.browser.safari) $(this).bind('selectstart', function () { return false; });
                else if ($.browser.mozilla)
                {
                    $(this).css('MozUserSelect', 'none');
                    $('body').trigger('focus');
                }
                else if ($.browser.opera) $(this).bind('mousedown', function () { return false; });
                else $(this).attr('unselectable', 'on');
            });
        } else
        {
            return this.each(function ()
            {
                if ($.browser.msie || $.browser.safari) $(this).unbind('selectstart');
                else if ($.browser.mozilla) $(this).css('MozUserSelect', 'inherit');
                else if ($.browser.opera) $(this).unbind('mousedown');
                else $(this).removeAttr('unselectable', 'on');
            });
        }
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function ($)
{
    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerRadio = function ()
    {
        return this.each(function ()
        {
            if (this.usedRadio) return;
            if ($(this).hasClass('l-hidden')) { return; }
            var g = {};
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
                if (g.input.attr('disabled')) { return false; }
                g.input.trigger('click').trigger('change');
                var formEle;
                if (g.input[0].form) formEle = g.input[0].form;
                else formEle = document;
                $("input:radio[name=" + g.input[0].name + "]", formEle).not(g.input).trigger("change");
                return false;
            });
            g.wrapper.hover(function ()
            {
                $(this).addClass("l-over");
            }, function ()
            {
                $(this).removeClass("l-over");
            });
            this.checked && g.link.addClass('l-radio-checked');

            this.usedRadio = true;
        });
    };

})(jQuery);/**
* jQuery ligerUI 1.0.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function ($)
{
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Resizable = {
        handles: 'n, e, s, w, ne, se, sw, nw',
        maxWidth: 2000,
        maxHeight: 2000,
        minWidth: 20,
        minHeight: 20,
        onStartResize: function (e) { },
        onResize: function (e) { },
        onStopResize: function (e) { },
        onEndResize: null
    };

    $.fn.ligerResizable = function (p)
    {
        return this.each(function ()
        {
            p = $.extend({}, $.ligerDefaults.Resizable, p || {});
            var g = {
                init: function ()
                {
                    g.target.append('<div class="l-resizable"></div>');
                    //add handler dom elements 
                    var handles = p.handles.split(',');
                    for (var i = 0; i < handles.length; i++)
                    {
                        switch (handles[i].replace(/(^\s*)|(\s*$)/g, "")) //trim
                        {
                            case "nw":
                                g.target.append('<div class="l-resizable-h-l" direction="nw"></div>');
                                break;
                            case "ne":
                                g.target.append('<div class="l-resizable-h-r" direction="ne"></div>');
                                break;
                            case "n":
                                g.target.append('<div class="l-resizable-h-c" direction="n"></div>');
                                break;
                            case "w":
                                g.target.append('<div class="l-resizable-c-l" direction="w"></div>');
                                break;
                            case "e":
                                g.target.append('<div class="l-resizable-c-r" direction="e"></div>');
                                break;
                            case "sw":
                                g.target.append('<div class="l-resizable-f-l" direction="sw"></div>');
                                break;
                            case "se":
                                g.target.append('<div class="l-resizable-f-r" direction="se"></div>');
                                break;
                            case "s":
                                g.target.append('<div class="l-resizable-f-c" direction="s"></div>');
                                break;
                        }
                    }
                    $("> .l-resizable-h-c , > .l-resizable-f-c", g.target).width(g.target.width());
                    $("> .l-resizable-c-l , > .l-resizable-c-r", g.target).height(g.target.height());
                    g.target.resizable = $("> .l-resizable", g.target);
                },
                start: function (e, dir)
                {

                    if ($.browser.msie || $.browser.safari) 
                        $('body').bind('selectstart', function () { return false; }); // ����ѡ��
                    $(".l-window-mask-nobackground").remove();
                    $("<div class='l-window-mask-nobackground' style='display: block;'></div>").appendTo($("body"));
                    g.target.resizable.css({
                        width: g.target.width(),
                        height: g.target.height(),
                        left: 0,
                        top: 0
                    });
                    g.current = {
                        dir: dir,
                        left: g.target.offset().left,
                        top: g.target.offset().top,
                        width: g.target.width(),
                        height: g.target.height()
                    };
                    $(document).bind('mouseup', g.stop);
                    $(document).bind('mousemove', g.drag);
                    g.target.resizable.show();
                    if (p.onStartResize) p.onStartResize(g.current, e);
                },
                drag: function (e)
                {
                    var dir = g.current.dir;
                    var resizableObj = g.target.resizable[0];
                    var width = g.current.width;
                    var height = g.current.height;
                    var moveWidth = (e.pageX || e.screenX) - g.current.left;
                    var moveHeight = (e.pageY || e.clientY) - g.current.top;
                    if (dir.indexOf("e") >= 0) moveWidth -= width;
                    if (dir.indexOf("s") >= 0) moveHeight -= height;
                    if (dir != "n" && dir != "s")
                    {
                        width += (dir.indexOf("w") >= 0) ? -moveWidth : moveWidth;
                    }
                    if (width >= p.minWidth)
                    {
                        if (dir.indexOf("w") >= 0)
                        {
                            resizableObj.style.left = moveWidth + 'px';
                        }
                        if (dir != "n" && dir != "s")
                        {
                            resizableObj.style.width = width + 'px';
                        }
                    }
                    if (dir != "w" && dir != "e")
                    {
                        height += (dir.indexOf("n") >= 0) ? -moveHeight : moveHeight;
                    }
                    if (height >= p.minHeight)
                    {
                        if (dir.indexOf("n") >= 0)
                        {
                            resizableObj.style.top = moveHeight + 'px';
                        }
                        if (dir != "w" && dir != "e")
                        {
                            resizableObj.style.height = height + 'px';
                        }
                    }
                    g.current.newWidth = width;
                    g.current.newHeight = height;
                    g.current.diffTop = parseInt(resizableObj.style.top);
                    if (isNaN(g.current.diffTop)) g.current.diffTop = 0;
                    g.current.diffLeft = parseInt(resizableObj.style.left);
                    if (isNaN(g.current.diffLeft)) g.current.diffLeft = 0;
                    $("body").css("cursor", dir + '-resize');
                    if (p.onResize) p.onResize(g.current, e);
                },
                stop: function (e)
                {
                    if ($.browser.msie || $.browser.safari)
                        $('body').unbind('selectstart');
                    $(".l-window-mask-nobackground").remove();
                    if (!p.onStopResize) g.applyResize();
                    else if (p.onStopResize(g.current, e) != false) g.applyResize();
                    p.onEndResize && p.onEndResize(g.current, e);
                    $("body").css("cursor", "");
                    g.target.resizable.hide();
                    $(document).unbind('mousemove', g.drag);
                    $(document).unbind('mouseup', g.stop);
                },
                applyResize: function ()
                {
                    var top = 0;
                    var left = 0;
                    if (!isNaN(parseInt(g.target.css('top'))))
                        top = parseInt(g.target.css('top'));
                    if (!isNaN(parseInt(g.target.css('left'))))
                        left = parseInt(g.target.css('left'));
                    if (g.current.diffTop != undefined)
                    {
                        if (g.current.diffTop != 0)
                            g.target.css({ top: top + g.current.diffTop });
                        if (g.current.diffLeft != 0)
                            g.target.css({ left: left + g.current.diffLeft });
                        g.target.css({
                            width: g.current.newWidth,
                            height: g.current.newHeight
                        });
                    }
                }
            };
            g.target = $(this);
            g.init();
            $(">div", g.target).mousedown(function (e)
            {
                if (!$(this).attr("direction")) return;
                g.start(e, $(this).attr("direction"));
                return false;
            });
        });
    };
})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function($) {
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Spinner = {
        type: 'float',     //类型 float:浮点数 int:整数 time:时间
        isNegative: true, //是否负数
        decimalplace: 2,   //小数位 type=float时起作用
        step: 0.1,         //每次增加的值
        interval: 50,      //间隔，毫秒
        onChangeValue: false    //改变值事件
    };
    ///	<param name="$" type="jQuery"></param>;
    $.fn.ligerSpinner = function(p) { 
        return this.each(function() {
            if (this.useSpinner) return;
            if ($(this).attr("ligerui"))
            {
                try
                {
                    var attroptions = $(this).attr("ligerui");
                    if (attroptions.indexOf('{') < 0)  attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) p = $.extend({}, attroptions, p || {});
                }
                catch (e) { }
            } 
            p = $.extend({}, $.ligerDefaults.Spinner, p || {});
            if (p.type == 'float')
            {
                p.step = 0.1;
                p.interval = 50;
            } else if (p.type == 'int')
            {
                p.step = 1;
                p.interval = 100;
            } else if (p.type == 'time')
            {
                p.step = 1;
                p.interval = 100;
            }
            var g = {
                round: function(v, e) {
                    var t = 1;
                    for (; e > 0; t *= 10, e--);
                    for (; e < 0; t /= 10, e++);
                    return Math.round(v * t) / t;
                },
                isInt: function(str) {
                    var strP = p.isNegative ? /^-?\d+$/ : /^\d+$/;
                    if (!strP.test(str)) return false;
                    if (parseFloat(str) != str) return false;
                    return true;
                },
                isFloat: function(str) {
                    var strP = p.isNegative ? /^-?\d+(\.\d+)?$/ : /^\d+(\.\d+)?$/;
                    if (!strP.test(str)) return false;
                    if (parseFloat(str) != str) return false;
                    return true;
                },
                isTime: function(str) {
                    var a = str.match(/^(\d{1,2}):(\d{1,2})$/);
                    if (a == null) return false;
                    if (a[1] > 24 || a[2] > 60) return false;
                    return true;

                },
                isVerify: function(str) {
                    if (p.type == 'float') {
                        return g.isFloat(str);
                    } else if (p.type == 'int') {
                        return g.isInt(str);
                    } else if (p.type == 'time') {
                        return g.isTime(str);
                    }
                    return false;
                },
                getVerifyValue: function(value) {
                    var newvalue = null;
                    if (p.type == 'float') {
                        newvalue = g.round(value, p.decimalplace);
                    } else if (p.type == 'int') {
                        newvalue = parseInt(value);
                    } else if (p.type == 'time') {
                        newvalue = value;
                    }
                    if (!g.isVerify(newvalue)) {
                        return g.value;
                    } else {
                        return newvalue;
                    }
                },
                getDefaultValue: function() {
                    if (p.type == 'float' || p.type == 'int') { return 0; }
                    else if (p.type == 'time') { return "00:00"; }
                },
                addValue: function(num) {
                    var value = g.inputText.val();
                    value = parseFloat(value) + num;
                    g.inputText.val(value);
                    g.inputText.trigger("change");
                },
                addTime: function(minute) {
                    var value = g.inputText.val();
                    var a = value.match(/^(\d{1,2}):(\d{1,2})$/);
                    newminute = parseInt(a[2]) + minute;
                    if (newminute < 10) newminute = "0" + newminute;
                    value = a[1] + ":" + newminute;
                    g.inputText.val(value);
                    g.inputText.trigger("change");
                },
                uping: function() {
                    if (p.type == 'float' || p.type == 'int') {
                        g.addValue(p.step);
                    } else if (p.type == 'time') {
                        g.addTime(p.step);
                    }
                },
                downing: function() {
                    if (p.type == 'float' || p.type == 'int') {
                        g.addValue(-1 * p.step);
                    } else if (p.type == 'time') {
                        g.addTime(-1 * p.step);
                    }
                },
                isDateTime: function(dateStr) {
                    var r = dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                    if (r == null) return false;
                    var d = new Date(r[1], r[3] - 1, r[4]);
                    if (d == "NaN") return false;
                    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
                },
                isLongDateTime: function(dateStr) {
                    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
                    var r = dateStr.match(reg);
                    if (r == null) return false;
                    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6]);
                    if (d == "NaN") return false;
                    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6]);
                },
                interval: null,
                inputText: null,
                value: null,
                textFieldID: ""
            };

            if (this.tagName.toLowerCase() == "input" && this.type && this.type == "text") {
                g.inputText = $(this);
                if (this.id)
                    g.textFieldID = this.id;
            }
            else {
                g.inputText = $('<input type="text"/>');
                g.inputText.appendTo($(this));
            }
            if (g.textFieldID == "" && p.textFieldID)
                g.textFieldID = p.textFieldID;

            g.link = $('<div class="l-trigger"><div class="l-spinner-up"><div class="l-spinner-icon"></div></div><div class="l-spinner-split"></div><div class="l-spinner-down"><div class="l-spinner-icon"></div></div></div>');
            g.wrapper = g.inputText.wrap('<div class="l-text"></div>').parent();
            g.wrapper.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
            g.wrapper.append(g.link).after(g.selectBox).after(g.valueField);
            g.link.up = $(".l-spinner-up", g.link);
            g.link.down = $(".l-spinner-down", g.link);
            if (!g.inputText.hasClass("l-text-field")) g.inputText.addClass("l-text-field");

            //数据初始化
            if (p.width) {
                g.wrapper.css({ width: p.width });
                g.inputText.css({ width: p.width - 20 });
            }
            if (p.height) {
                g.wrapper.height(p.height);
                g.inputText.height(p.height - 2);
                g.link.height(p.height - 4);
            }
            //初始化
            if (!g.isVerify(g.inputText.val())) {
                g.value = g.getDefaultValue();
                g.inputText.val(g.value);
            }
            //事件
            g.link.up.hover(function() {
                $(this).addClass("l-spinner-up-over");
            }, function() {
                clearInterval(g.interval);
                $.fn.ligerNoSelect && $('body').ligerNoSelect(false);
                $(this).removeClass("l-spinner-up-over");
            }).mousedown(function() {
                g.uping();
                g.interval = setInterval(g.uping, p.interval);
                $.fn.ligerNoSelect && $('body').ligerNoSelect();
            }).mouseup(function() {
                clearInterval(g.interval);
                g.inputText.trigger("change").focus();
                $.fn.ligerNoSelect && $('body').ligerNoSelect(false);
            });
            g.link.down.hover(function() {
                $(this).addClass("l-spinner-down-over");
            }, function() {
                clearInterval(g.interval);
                $.fn.ligerNoSelect && $('body').ligerNoSelect(false);
                $(this).removeClass("l-spinner-down-over");
            }).mousedown(function() {
                g.interval = setInterval(g.downing, p.interval);
                $.fn.ligerNoSelect && $('body').ligerNoSelect();
            }).mouseup(function() {
                clearInterval(g.interval);
                g.inputText.trigger("change").focus();
                $.fn.ligerNoSelect && $('body').ligerNoSelect(false);
            });

            g.inputText.change(function() {
                var value = g.inputText.val();
                g.value = g.getVerifyValue(value);
                if (p.onChangeValue) {
                    p.onChangeValue(g.value);
                }
                g.inputText.val(g.value);
            }).blur(function() {
                g.wrapper.removeClass("l-text-focus");
            }).focus(function() {
                g.wrapper.addClass("l-text-focus");
            });
            g.wrapper.hover(function() {
                g.wrapper.addClass("l-text-over");
            }, function() {
                g.wrapper.removeClass("l-text-over");
            });
            this.useSpinner = true;
        });
    };
})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
if(typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function($)
{
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetTabManager = function()
    {
        return LigerUIManagers[this[0].id + "_Tab"];
    }; 

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Tab = {
            height: null,
            heightDiff: 0, // 高度补差 
            changeHeightOnResize: false,
            contextmenu : true,
            closeMessage : "关闭当前页",
            closeOtherMessage : "关闭其他",
            closeAllMessage : "关闭所有",
            reloadMessage : "刷新",
            onBeforeOverrideTabItem:null,
            onAfterOverrideTabItem:null,
            onBeforeRemoveTabItem:null,
            onAfterRemoveTabItem:null,
            onBeforeAddTabItem :null,
            onAfterAddTabItem:null,
            onBeforeSelectTabItem :null,
            onAfterSelectTabItem:null
    };

    $.fn.ligerTab = function(p)
    { 
        p = $.extend({},$.ligerDefaults.Tab, p || {});
        this.each(function()
        {
            if (this.usedTab) return;
            if ($(this).hasClass('l-hidden')) { return; }
            var g = {
                //设置tab按钮(左和右),显示返回true,隐藏返回false
                setTabButton: function()
                {
                    var sumwidth = 0;
                    $("li", g.tab.links.ul).each(function()
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
                setTabButtonEven: function()
                {
                    $(".l-tab-links-left", g.tab.links).hover(function()
                    {
                        $(this).addClass("l-tab-links-left-over");
                    }, function()
                    {
                        $(this).removeClass("l-tab-links-left-over");
                    }).click(function()
                    {
                        g.moveToPrevTabItem();
                    });
                    $(".l-tab-links-right", g.tab.links).hover(function()
                    {
                        $(this).addClass("l-tab-links-right-over");
                    }, function()
                    {
                        $(this).removeClass("l-tab-links-right-over");
                    }).click(function()
                    {
                        g.moveToNextTabItem();
                    });
                },
                //切换到上一个tab
                moveToPrevTabItem: function()
                {
                    var btnWitdth = $(".l-tab-links-left", g.tab.links).width();
                    var leftList = new Array(); //记录每个tab的left,由左到右
                    $("li", g.tab.links).each(function(i, item)
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
                moveToNextTabItem: function()
                {
                    var btnWitdth = $(".l-tab-links-right", g.tab).width();
                    var sumwidth = 0;
                    var tabItems = $("li", g.tab.links.ul);
                    tabItems.each(function()
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
                getTabItemCount : function()
                {
                    return $("li", g.tab.links.ul).length;
                },
                getSelectedTabItemID:function()
                {
                    return $("li.l-selected", g.tab.links.ul).attr("tabid");
                }, 
                removeSelectedTabItem:function()
                {
                    g.removeTabItem(g.getSelectedTabItemID());
                },
                //覆盖选择的tabitem
                overrideSelectedTabItem : function(options){ 
                    g.overrideTabItem(g.getSelectedTabItemID(),options); 
                },
                //覆盖
                overrideTabItem : function(targettabid,options){
                    if(p.onBeforeOverrideTabItem && p.onBeforeOverrideTabItem(targettabid)==false) return false;

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
                    var tabitem = $("li[tabid="+targettabid+"]", g.tab.links.ul); 
                    var contentitem = $(".l-tab-content-item[tabid="+targettabid+"]",g.tab.content);
                    if(!tabitem || !contentitem) return ;  
                    tabitem.attr("tabid", tabid);
                    contentitem.attr("tabid", tabid);
                    if($("iframe", contentitem).length==0 && url)
                    {
                        contentitem.html("<iframe frameborder='0'></iframe>");
                    }
                    else if(content)
                    {
                        contentitem.html(content);
                    }
                    $("iframe", contentitem).attr("name", tabid);
                    if (showClose == undefined)  showClose = true; 
                    if (showClose == false) $(".l-tab-links-item-close", tabitem).remove();
                    else{
                        if($(".l-tab-links-item-close", tabitem).length==0)
                           tabitem.append("<div class='l-tab-links-item-close'></div>");
                    }
                    if (text == undefined) text = tabid;
                    if (height) contentitem.height(height);
                    $("a", tabitem).text(text); 
                    $("iframe", contentitem).attr("src", url);


                    p.onAfterOverrideTabItem && p.onAfterOverrideTabItem(targettabid);
                },
                //选中tab项
                selectTabItem: function(tabid)
                {
                    if(p.onBeforeSelectTabItem && p.onBeforeSelectTabItem(tabid)==false) return false;
                    g.selectedTabId = tabid;
                    $("> .l-tab-content-item[tabid=" + tabid + "]", g.tab.content).show().siblings().hide();
                    $("li[tabid=" + tabid + "]", g.tab.links.ul).addClass("l-selected").siblings().removeClass("l-selected");
                    p.onAfterSelectTabItem && p.onAfterSelectTabItem(tabid);
                },
                //移动到最后一个tab
                moveToLastTabItem: function()
                {
                    var sumwidth = 0;
                    $("li", g.tab.links.ul).each(function()
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
                isTabItemExist: function(tabid)
                {
                    return $("li[tabid=" + tabid + "]", g.tab.links.ul).length > 0;
                },
                //增加一个tab
                addTabItem: function(options)
                {
                    if(p.onBeforeAddTabItem && p.onBeforeAddTabItem(tabid)==false) return false; 
                     
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
                addTabItemEvent: function(tabitem)
                {
                    tabitem.click(function()
                    {
                        var tabid = $(this).attr("tabid");
                        g.selectTabItem(tabid);
                    });
                    //右键事件支持
                    g.tab.menu && po.addTabItemContextMenuEven(tabitem);
                    $(".l-tab-links-item-close", tabitem).hover(function()
                    {
                        $(this).addClass("l-tab-links-item-close-over");
                    }, function()
                    {
                        $(this).removeClass("l-tab-links-item-close-over");
                    }).click(function()
                    {
                        var tabid = $(this).parent().attr("tabid");
                        g.removeTabItem(tabid);
                    });

                },
                //移除tab项
                removeTabItem: function(tabid)
                {
                    if(p.onBeforeRemoveTabItem && p.onBeforeRemoveTabItem(tabid)==false) return false; 
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
                addHeight: function(heightDiff)
                {
                    var newHeight = g.tab.height() + heightDiff;
                    g.setHeight(newHeight);
                },
                setHeight: function(height)
                {
                    g.tab.height(height);
                    g.setContentHeight();
                },
                setContentHeight: function()
                {
                    var newheight = g.tab.height() - g.tab.links.height();
                    g.tab.content.height(newheight);
                    $("> .l-tab-content-item", g.tab.content).height(newheight);
                },
                getNewTabid: function()
                {
                    var now = new Date();
                    return now.getTime();
                },
                //notabid 过滤掉tabid的
                //noclose 过滤掉没有关闭按钮的
                getTabidList : function(notabid,noclose)
                {
                    var tabidlist = [];
                    $("> li", g.tab.links.ul).each(function(){
                        if($(this).attr("tabid") 
                        && $(this).attr("tabid") != notabid
                        && (!noclose || $(".l-tab-links-item-close",this).length > 0)) 
                        { 
                             tabidlist.push($(this).attr("tabid")); 
                        }
                    });
                    return tabidlist;
                },
                removeOther :function(tabid,compel)
                {
                    var tabidlist = g.getTabidList(tabid,true); 
                    $(tabidlist).each(function(){
                        g.removeTabItem(this);
                    });
                },
                reload :function(tabid)
                {
                      $(".l-tab-content-item[tabid=" + tabid + "] iframe", g.tab.content).each(function(i,iframe){
                            $(iframe).attr("src",$(iframe).attr("src")); 
                      });
                },
                removeAll : function(compel)
                {
                    var tabidlist = g.getTabidList(null,true);
                    $(tabidlist).each(function(){
                        g.removeTabItem(this);
                    }); 
                },
                onResize: function()
                {
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
            var po = {
                menuItemClick:function(item)
                { 
                    if(!item.id || !g.actionTabid) return; 
                    switch(item.id)
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
                addTabItemContextMenuEven:function(tabitem)
                {
                    tabitem.bind("contextmenu",function(e){
                        if(!g.tab.menu) return;
                        g.actionTabid = tabitem.attr("tabid");
                        g.tab.menu.show({ top: e.pageY, left: e.pageX }); 
                        if($(".l-tab-links-item-close",this).length == 0)
                        {
                            g.tab.menu.setDisable('close');
                        }
                        else
                        {
                            g.tab.menu.setEnable('close');
                        }
                        return false;
                    });
                }
            };
            if (p.height) g.makeFullHeight = true;
            g.tab = $(this);
            if (!g.tab.hasClass("l-tab")) g.tab.addClass("l-tab");

            if(p.contextmenu && $.ligerMenu)
            {
                g.tab.menu = $.ligerMenu({width:100,items:[
                    {text:p.closeMessage,id:'close',click:po.menuItemClick},
                    {text:p.closeOtherMessage,id:'closeother',click:po.menuItemClick},
                    {text:p.closeAllMessage,id:'closeall',click:po.menuItemClick},
                    {text:p.reloadMessage,id:'reload',click:po.menuItemClick}
                ]});
            }

            g.tab.content = $('<div class="l-tab-content"></div>');
            $("> div", g.tab).appendTo(g.tab.content);
            g.tab.content.appendTo(g.tab);
            g.tab.links = $('<div class="l-tab-links"><ul style="left: 0px; "></ul></div>');
            g.tab.links.prependTo(g.tab);
            g.tab.links.ul = $("ul", g.tab.links);
            var haslselected = $("> div[lselected=true]", g.tab.content).length > 0;
            g.selectedTabId = $("> div[lselected=true]", g.tab.content).attr("tabid");
            $("> div", g.tab.content).each(function(i, box)
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
                        $(window).resize(function()
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
            $("li", g.tab.links).each(function()
            {
                g.addTabItemEvent($(this));
            });
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Tab"] = g;
            this.usedTab = true;
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Tab"];
        var managers = [];
        this.each(function() {
            managers.push(LigerUIManagers[this.id + "_Tab"]);
        });
        return managers;
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.0
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function ($)
{
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.TextBox = {
        onBeforeInput: null,
        onInputed: null,
        onChangeValue: null,
        width: null
    };
    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerTextBox = function (options)
    {
        return this.each(function ()
        {
            if (this.usedTextBox) return;
            var p = $.extend({}, options || {});
            if ($(this).attr("ligerui"))
            {
                try
                {
                    var attroptions = $(this).attr("ligerui");
                    if (attroptions.indexOf('{') < 0) attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) p = $.extend({}, attroptions, p || {});
                }
                catch (e) { }
            }
            p = $.extend({}, $.ligerDefaults.TextBox, p || {}); 
            var g = {};
            g.inputText = $(this);
            //外层
            g.wrapper = g.inputText.wrap('<div class="l-text"></div>').parent();
            g.wrapper.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
            if (!g.inputText.hasClass("l-text-field"))
                g.inputText.addClass("l-text-field");
            if (!p.width)
            {
                p.width = 120;
            }
            g.wrapper.css({ width: p.width });
            g.inputText.css({ width: p.width - 4 });
            if (p.height)
            {
                g.wrapper.height(p.height);
                g.inputText.height(p.height - 2);
            }
            g.inputText
            .bind('blur.ligerTextBox', function ()
            {
                g.wrapper.removeClass("l-text-focus");
            }).bind('focus.ligerTextBox', function ()
            {
                g.wrapper.addClass("l-text-focus");
            })
            .change(function ()
            {
                if (p.onChangeValue)
                {
                    p.onChangeValue(this.value);
                }
            });
            g.wrapper.hover(function ()
            {
                g.wrapper.addClass("l-text-over");
            }, function ()
            {
                g.wrapper.removeClass("l-text-over");
            });

            this.usedTextBox = true;
        });
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function($) {

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Tip = {
        content: null,
        callback: null,
        width: 150,
        height: null,
        distanceX: 1,
        distanceY: -3,
        appendIdTo: null       //保存ID到那一个对象(jQuery)
    };

    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerTip = function(p) {
        p = $.extend({}, $.ligerDefaults.Tip, p || {});
        this.each(function() { 
            var tip = null;
            var tipid = $(this).attr("ligerTipId");
            if (tipid) {
                tip = $("#" + tipid);
                if (p.content == "") tip.remove();
                else $(".l-verify-tip-content", tip).html(p.content);
            }
            else if (p.content) {
                tip = $('<div class="l-verify-tip"><div class="l-verify-tip-corner"></div><div class="l-verify-tip-content">' + p.content + '</div></div>');
                tip.attr("id", "ligerUI" + new Date().getTime());
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
        this.each(function() {
            tips.push(this.ligerTip);
        });
        return tips;
    };
    $.fn.ligerHideTip = function(p) {
        return this.each(function() {
            var tipid = $(this).attr("ligerTipId");
            if (tipid) {
                $("#" + tipid).remove();
                $("[ligerTipId=" + tipid + "]").removeAttr("ligerTipId");
            }
        });
    };
})(jQuery);

﻿/**
* jQuery ligerUI 1.0.1.1
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
if(typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function($)
{
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetToolBarManager = function()
    {
        return LigerUIManagers[this[0].id + "_ToolBar"];
    }; 
    $.fn.ligerToolBar = function(p)
    { 
        this.each(function()
        {
            if (this.usedToolBar) return;
            var g ={
                addItem :function(item){
                    var ditem = $('<div class="l-toolbar-item l-panel-btn"><span></span><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div></div>');
                    g.toolBar.append(ditem);
                    item.id && ditem.attr("toolbarid",item.id);
                    if(item.icon)
                    {
                         ditem.append("<div class='l-icon l-icon-"+item.icon+"'></div>");
                         ditem.addClass("l-toolbar-item-hasicon");
                    }
                    item.text && $("span:first",ditem).html(item.text);
                    item.disable && ditem.addClass("l-toolbar-item-disable");
                    item.click && ditem.click(function(){ item.click(item);}); 
                    ditem.hover(function ()
                    {
                        $(this).addClass("l-panel-btn-over");
                    }, function ()
                    {
                        $(this).removeClass("l-panel-btn-over");
                    });
                }
            };
            g.toolBar = $(this);
            if(!g.toolBar.hasClass("l-toolbar")) g.toolBar.addClass("l-toolbar"); 
            if(p.items)
            {
                
                $(p.items).each(function(i,item){
                    g.addItem(item); 
                });
            } 
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_ToolBar"] = g;
            this.usedToolBar = true;
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_ToolBar"];
        var managers = [];
        this.each(function() {
            managers.push(LigerUIManagers[this.id + "_ToolBar"]);
        });
        return managers;
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
if(typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($)
{
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetTreeManager = function ()
    {
        return LigerUIManagers[this[0].id + "_Tree"];
    }; 
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Tree = {
            url: null,
            data: null,
            checkbox: true,
            autoCheckboxEven : true,
            parentIcon: 'folder',
            childIcon: 'leaf',
            textFieldName: 'text',
            attribute : ['id','url'],
            treeLine : true,        //是否显示line
            nodeWidth: 90,
            statusName : '__status',
            isLeaf : null, //是否子节点的判断函数
            onBeforeExpand : null,
            onContextmenu : null,
            onExpand : null,
            onBeforeCollapse: null,
            onCollapse : null,
            onBeforeSelect :null,
            onSelect :null,
            onBeforeCancelSelect :null,
            onCancelselect :null,
            onCheck :null,
            onSuccess:null,
            onError:null,
            onClick:null,
            idFieldName : null,
            parentIDFieldName:null,
            topParentIDValue : 0
    };

    $.fn.ligerTree = function (p)
    {
        this.each(function ()
        {
            p = $.extend({},$.ligerDefaults.Tree, p || {});
            if (this.usedTree) return;
            if ($(this).hasClass('l-hidden')) { return; }
            //public Object
            var g = {
                getData :function()
                {
                    return g.data;
                },
                //是否包含子节点
                hasChildren: function (treenodedata)
                {
                    if(p.isLeaf) return p.isLeaf(treenodedata);
                    return treenodedata.children ? true: false;
                },
                //获取父节点
                getParentTreeItem: function (treenode, level)
                {
                    var treeitem = $(treenode);
                    if (treeitem.parent().hasClass("l-tree"))
                        return null;
                    if (level == undefined)
                    {
                        if (treeitem.parent().parent("li").length == 0)
                            return null;
                        return treeitem.parent().parent("li")[0];
                    }
                    var currentLevel = parseInt(treeitem.attr("outlinelevel"));
                    var currenttreeitem = treeitem;
                    for (var i = currentLevel - 1; i >= level; i--)
                    {
                        currenttreeitem = currenttreeitem.parent().parent("li");
                    }
                    return currenttreeitem[0];
                },
                getChecked: function ()
                {
                    if (!p.checkbox) return null;
                    var nodes = [];
                    $(".l-checkbox-checked", g.tree).parent().parent("li").each(function ()
                    {
                        var treedataindex = parseInt($(this).attr("treedataindex"));
                        nodes.push({ target: this,data:po.getDataNodeByTreeDataIndex(g.data,treedataindex) });
                    });
                    return nodes;
                },
                getSelected: function ()
                {
                    var node = {}; 
                    node.target = $(".l-selected", g.tree).parent("li")[0];
                    if (node.target)
                    {
                        var treedataindex = parseInt($(node.target).attr("treedataindex"));
                        node.data = po.getDataNodeByTreeDataIndex(g.data,treedataindex);
                        return node;
                    }
                    return null;
                },
                //升级为父节点级别
                upgrade: function (treeNode)
                {
                    $(".l-note", treeNode).each(function ()
                    {
                        $(this).removeClass("l-note").addClass("l-expandable-open");
                    });
                    $(".l-note-last", treeNode).each(function ()
                    {
                        $(this).removeClass("l-note-last").addClass("l-expandable-open");
                    });
                    $("." + po.getChildNodeClassName(), treeNode).each(function ()
                    {
                        $(this)
                        .removeClass(po.getChildNodeClassName())
                        .addClass(po.getParentNodeClassName(true));
                    });
                },
                //降级为叶节点级别
                demotion: function (treeNode)
                {
                    if (!treeNode && treeNode[0].tagName.toLowerCase() != 'li') return;
                    var islast = $(treeNode).hasClass("l-last");
                    $(".l-expandable-open", treeNode).each(function ()
                    {
                        $(this).removeClass("l-expandable-open")
                        .addClass(islast ? "l-note-last" : "l-note");
                    });
                    $(".l-expandable-close", treeNode).each(function ()
                    {
                        $(this).removeClass("l-expandable-close")
                        .addClass(islast ? "l-note-last" : "l-note");
                    });
                    $("." + po.getParentNodeClassName(true), treeNode).each(function ()
                    {
                        $(this)
                        .removeClass(po.getParentNodeClassName(true))
                        .addClass(po.getChildNodeClassName());
                    });
                },
                collapseAll: function ()
                {
                    $(".l-expandable-open", g.tree).click();
                },
                expandAll: function ()
                {
                    $(".l-expandable-close", g.tree).click();
                },
                loadData: function (node, url,param)
                {
                    g.loading.show(); 
                    param = param || {}; 
                    //请求服务器
                    $.ajax({
                        type: 'post',
                        url: url, 
                        data: param, 
                        dataType: 'json',
                        success: function (data)
                        {  
                            g.loading.hide();
                            g.append(node, data); 
                            if (p.onSuccess) p.onSuccess(data);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown)
                        { 
                            try
                            {
                                g.loading.hide();
                                if (p.onError)
                                    p.onError(XMLHttpRequest, textStatus, errorThrown);
                            }
                            catch (e)
                            {

                            }
                        }
                    });
                },
                //清空
                clear: function ()
                {
                    //g.tree.html("");
                    $("> li",g.tree).each(function(){ g.remove(this);});
                },
                remove: function (treeNode)
                {
                    var treedataindex = parseInt($(treeNode).attr("treedataindex"));
                    var treenodedata = po.getDataNodeByTreeDataIndex(g.data,treedataindex); 
                    if(treenodedata) po.setTreeDataStatus([treenodedata],'delete');
                    var parentNode = g.getParentTreeItem(treeNode);
                    //复选框处理
                    if (p.checkbox)
                    {
                        $(".l-checkbox", treeNode).remove();
                        po.setParentCheckboxStatus($(treeNode));
                    }
                    $(treeNode).remove();
                    if (parentNode == null) //代表顶级节点
                    {
                        parentNode = g.tree.parent();
                    }
                    //set parent
                    var treeitemlength = $("> ul > li", parentNode).length;
                    if (treeitemlength > 0)
                    {
                        //遍历设置子节点
                        $("> ul > li", parentNode).each(function (i, item)
                        {
                            if (i == 0 && !$(this).hasClass("l-first"))
                                $(this).addClass("l-first");
                            if (i == treeitemlength - 1 && !$(this).hasClass("l-last"))
                                $(this).addClass("l-last");
                            if (i == 0 && i == treeitemlength - 1 && !$(this).hasClass("l-onlychild"))
                                $(this).addClass("l-onlychild");
                            $("> div .l-note,> div .l-note-last", this)
                           .removeClass("l-note l-note-last")
                           .addClass(i == treeitemlength - 1 ? "l-note-last" : "l-note");
                            po.setTreeItem(this, { isLast: i == treeitemlength - 1 });
                        });
                    }  

                },
                //增加节点集合
                append: function (parentNode, newdata)
                {
                    if (!newdata || !newdata.length) return false;
                    if(p.idFieldName && p.parentIDFieldName)
                        newdata = po.convertData(newdata); 
                    po.addTreeDataIndexToData(newdata);
                    po.setTreeDataStatus(newdata,'add'); 
                    po.appendData(parentNode,newdata);   
                    if (!parentNode)//增加到根节点
                    { 
                        //remove last node class
                        if ($("> li:last", g.tree).length > 0)
                            po.setTreeItem($("> li:last", g.tree)[0], { isLast: false }); 

                        var gridhtmlarr = po.getTreeHTMLByData(newdata,1,[],true); 
                        gridhtmlarr[gridhtmlarr.length-1] = gridhtmlarr[0] = "";  
                        g.tree.append(gridhtmlarr.join(''));

                        $(".l-body", g.tree).hover(function ()
                        {
                            $(this).addClass("l-over");
                        }, function ()
                        {
                            $(this).removeClass("l-over");
                        }); 

                        po.upadteTreeWidth(); 
                        return;
                    }
                    var treeitem = $(parentNode);
                    var outlineLevel = parseInt(treeitem.attr("outlinelevel"));

                    var hasChildren = $("> ul", treeitem).length > 0;
                    if (!hasChildren)
                    {
                        treeitem.append("<ul class='l-children'></ul>");
                        //设置为父节点
                        g.upgrade(parentNode);
                    }
                    //remove last node class  
                    if ($("> .l-children > li:last", treeitem).length > 0)
                        po.setTreeItem($("> .l-children > li:last", treeitem)[0], { isLast: false });

                    var isLast = [];
                    for (var i = 1; i <= outlineLevel - 1; i++)
                    {
                        var currentParentTreeItem = $(g.getParentTreeItem(parentNode, i));
                        isLast.push(currentParentTreeItem.hasClass("l-last"));
                    }
                    isLast.push(treeitem.hasClass("l-last"));
                    var gridhtmlarr = po.getTreeHTMLByData(newdata,outlineLevel+1,isLast,true); 
                    gridhtmlarr[gridhtmlarr.length-1] = gridhtmlarr[0] = "";  
                    $(">.l-children",parentNode).append(gridhtmlarr.join(''));

                    po.upadteTreeWidth(); 

                    $(">.l-children .l-body", parentNode).hover(function ()
                    {
                        $(this).addClass("l-over");
                    }, function ()
                    {
                        $(this).removeClass("l-over");
                    }); 
                }
            };
            //private Object
            var po = { 
                //根据数据索引获取数据
                getDataNodeByTreeDataIndex:function(data,treedataindex)
                { 
                    for(var i =0;i<data.length;i++)
                    {
                        if(data[i].treedataindex == treedataindex)
                            return data[i];
                        if(data[i].children)
                        {
                            var targetData= po.getDataNodeByTreeDataIndex(data[i].children,treedataindex);
                            if(targetData) return targetData;
                        }
                    }
                    return null;
                },
                //设置数据状态
                setTreeDataStatus : function(data,status)
                {
                    $(data).each(function ()
                    { 
                        this[p.statusName] = status;
                        if(this.children)
                        {
                            po.setTreeDataStatus(this.children,status);
                        }
                    });
                }, 
                //设置data 索引
                addTreeDataIndexToData : function(data)
                {
                    $(data).each(function ()
                    {
                        if(this.treedataindex != undefined) return;
                        this.treedataindex = g.treedataindex++;
                        if(this.children)
                        {
                            po.addTreeDataIndexToData(this.children);
                        }
                    });
                },
                //添加项到g.data
                appendData: function (treeNode,data)
                {
                    var treedataindex = parseInt($(treeNode).attr("treedataindex"));
                    var treenodedata = po.getDataNodeByTreeDataIndex(g.data,treedataindex); 
                    if(g.treedataindex == undefined) g.treedataindex = 0; 
                    if(treenodedata && treenodedata.children == undefined) treenodedata.children =[];
                    $(data).each(function (i,item)
                    {
                        if(treenodedata)
                            treenodedata.children[treenodedata.children.length] = $.extend({},item); 
                        else
                            g.data[g.data.length] =  $.extend({},item); 
                    });
                },
                setTreeItem: function (treeNode, options)
                {
                    if (!options) return;
                    var treeItem = $(treeNode);
                    var outlineLevel = parseInt(treeItem.attr("outlinelevel"));
                    if (options.isLast != undefined)
                    {
                        if (options.isLast == true)
                        {
                            treeItem.removeClass("l-last").addClass("l-last");
                            $("> div .l-note", treeItem).removeClass("l-note").addClass("l-note-last");
                            $(".l-children li", treeItem)
                            .find(".l-box:eq(" + (outlineLevel - 1) + ")")
                            .removeClass("l-line");
                        }
                        else if (options.isLast == false)
                        {
                            treeItem.removeClass("l-last");
                            $("> div .l-note-last", treeItem).removeClass("l-note-last").addClass("l-note");

                            $(".l-children li", treeItem)
                            .find(".l-box:eq(" + (outlineLevel - 1) + ")")
                            .removeClass("l-line")
                            .addClass("l-line");
                        }
                    }
                }, 
                upadteTreeWidth: function ()
                {
                    var treeWidth = g.maxOutlineLevel * 22;
                    if (p.checkbox) treeWidth += 22;
                    if (p.parentIcon || p.childIcon) treeWidth += 22;
                    treeWidth += p.nodeWidth;  
                    g.tree.width(treeWidth);  
                },
                getChildNodeClassName: function ()
                {
                    return 'l-tree-icon-' + p.childIcon;
                },
                getParentNodeClassName: function (isOpen)
                {
                    var nodeclassname = 'l-tree-icon-' + p.parentIcon;
                    if (isOpen) nodeclassname += '-open';
                    return nodeclassname;
                },
                //根据data生成最终完整的tree html
                getTreeHTMLByData:function(data,outlineLevel ,isLast,isExpand)
                {  
                    if (g.maxOutlineLevel < outlineLevel)
                        g.maxOutlineLevel = outlineLevel; 
                    isLast = isLast || [];
                    outlineLevel = outlineLevel || 1;
                    var treehtmlarr = [];
                    if(!isExpand) treehtmlarr.push('<ul class="l-children" style="display:none">');
                    else treehtmlarr.push("<ul class='l-children'>");
                    for (var i = 0; i < data.length; i++)
                    {
                        var isFirst = i==0;
                        var isLastCurrent = i==data.length-1; 
                        var isExpandCurrent = true;
                        if(data[i].isexpand==false || data[i].isexpand == "false") isExpandCurrent = false;
                            
                        treehtmlarr.push('<li ');
                        if(data[i].treedataindex!=undefined)
                            treehtmlarr.push('treedataindex="'+data[i].treedataindex+'" ');
                        if(isExpandCurrent)
                            treehtmlarr.push('isexpand='+data[i].isexpand +' ');
                        treehtmlarr.push('outlinelevel='+outlineLevel +' '); 
                        //增加属性支持
                        for(var j=0;j<g.sysAttribute.length;j++)
                        { 
                            if($(this).attr(g.sysAttribute[j]))
                                data[dataindex][g.sysAttribute[j]] = $(this).attr(g.sysAttribute[j]);
                        }
                        for(var j=0;j<p.attribute.length;j++)
                        {
                            if(data[i][p.attribute[j]])
                                treehtmlarr.push(p.attribute[j] + '="'+data[i][p.attribute[j]]+'" '); 
                        }
                       
                        //css class
                        treehtmlarr.push('class="');
                        isFirst && treehtmlarr.push('l-first ');
                        isLastCurrent && treehtmlarr.push('l-last ');
                        isFirst && isLastCurrent && treehtmlarr.push('l-onlychild ');
                        treehtmlarr.push('"');  
                        treehtmlarr.push('>');
                        treehtmlarr.push('<div class="l-body">'); 
                        for (var k = 0; k <= outlineLevel - 2; k++)
                        {
                            if(isLast[k]) treehtmlarr.push('<div class="l-box"></div>');
                            else treehtmlarr.push('<div class="l-box l-line"></div>'); 
                        } 
                        if (g.hasChildren(data[i]))
                        {
                            if(isExpandCurrent) treehtmlarr.push('<div class="l-box l-expandable-open"></div>');  
                            else treehtmlarr.push('<div class="l-box l-expandable-close"></div>');  
                            if(p.checkbox)
                            {
                                if(data[i].ischecked)
                                    treehtmlarr.push('<div class="l-box l-checkbox l-checkbox-checked"></div>');
                                else
                                    treehtmlarr.push('<div class="l-box l-checkbox l-checkbox-unchecked"></div>');
                            }

                            p.parentIcon && !isExpandCurrent &&  treehtmlarr.push('<div class="l-box ' + po.getParentNodeClassName() + '"></div>');
                            p.parentIcon && isExpandCurrent &&  treehtmlarr.push('<div class="l-box ' + po.getParentNodeClassName(true) + '"></div>');
                        } 
                        else
                        {
                            if(isLastCurrent) treehtmlarr.push('<div class="l-box l-note-last"></div>');
                            else treehtmlarr.push('<div class="l-box l-note"></div>');
                            if(p.checkbox)
                            {
                                if(data[i].ischecked)
                                    treehtmlarr.push('<div class="l-box l-checkbox l-checkbox-checked"></div>');
                                else
                                    treehtmlarr.push('<div class="l-box l-checkbox l-checkbox-unchecked"></div>');
                            }
                            p.childIcon && treehtmlarr.push('<div class="l-box ' + po.getChildNodeClassName() + '"></div>'); 
                        } 

                        treehtmlarr.push('<span>' + data[i][p.textFieldName] + '</span></div>');
                        if (g.hasChildren(data[i]))
                        {  
                            var isLastNew = [];
                            for(var k=0;k<isLast.length;k++)
                            {
                                isLastNew.push(isLast[k]);
                            }
                            isLastNew.push(isLastCurrent);
                            treehtmlarr.push(po.getTreeHTMLByData(data[i].children,outlineLevel+1,isLastNew,isExpandCurrent).join(''));
                        }
                        treehtmlarr.push('</li>');
                    }
                    treehtmlarr.push("</ul>"); 
                    return treehtmlarr;
                    
                },
                //根据简洁的html获取data
                getDataByTreeHTML : function(treeDom)
                {
                    var data = [];
                    $("> li", treeDom).each(function (i, item)
                    {
                        var dataindex = data.length;
                        data[dataindex] = 
                        { 
                            treedataindex:g.treedataindex++
                        }; 
                        data[dataindex][p.textFieldName] = $("> span,> a",this).html();
                        for(var j=0;j<g.sysAttribute.length;j++)
                        { 
                            if($(this).attr(g.sysAttribute[j]))
                                data[dataindex][g.sysAttribute[j]] = $(this).attr(g.sysAttribute[j]);
                        }
                        for(var j=0;j<p.attribute.length;j++)
                        { 
                            if($(this).attr(p.attribute[j]))
                                data[dataindex][p.attribute[j]] = $(this).attr(p.attribute[j]);
                        }
                        if($("> ul",this).length>0)
                        { 
                            data[dataindex].children = po.getDataByTreeHTML($("> ul",this));
                        }
                    });
                    return data;
                },
                applyTree: function ()
                {  
                    g.data = po.getDataByTreeHTML(g.tree);   
                    var gridhtmlarr = po.getTreeHTMLByData(g.data,1,[],true); 
                    gridhtmlarr[gridhtmlarr.length-1] = gridhtmlarr[0] = "";  
                    g.tree.html(gridhtmlarr.join('')); 
                    po.upadteTreeWidth();
                    $(".l-body", g.tree).hover(function ()
                    {
                        $(this).addClass("l-over");
                    }, function ()
                    {
                        $(this).removeClass("l-over");
                    }); 
                },
                applyTreeEven: function (treeNode)
                { 
                    $("> .l-body", treeNode).hover(function ()
                    {
                        $(this).addClass("l-over");
                    }, function ()
                    {
                        $(this).removeClass("l-over");
                    }); 
                },
                setTreeEven : function()
                {
                    p.onContextmenu && g.tree.bind("contextmenu",function(e){ 
                        var obj = (e.target || e.srcElement);
                        var treeitem = null;
                        if(obj.tagName.toLowerCase() == "a" || obj.tagName.toLowerCase()=="span" || $(obj).hasClass("l-box"))
                            treeitem = $(obj).parent().parent();  
                        else if($(obj).hasClass("l-body"))
                            treeitem = $(obj).parent();
                        else if(obj.tagName.toLowerCase() == "li")
                            treeitem = $(obj);
                        if(!treeitem) return;
                        var treedataindex = parseInt(treeitem.attr("treedataindex"));
                        var treenodedata = po.getDataNodeByTreeDataIndex(g.data,treedataindex); 
                        return p.onContextmenu({data:treenodedata,target:treeitem[0]},e);
                    });
                    g.tree.click(function (e)
                    { 
                        var obj = (e.target || e.srcElement);
                        var treeitem = null;
                        if(obj.tagName.toLowerCase() == "a" || obj.tagName.toLowerCase()=="span" || $(obj).hasClass("l-box"))
                            treeitem = $(obj).parent().parent();  
                        else if($(obj).hasClass("l-body"))
                            treeitem = $(obj).parent();
                        else
                            treeitem = $(obj);
                        if(!treeitem) return;
                        var treedataindex = parseInt(treeitem.attr("treedataindex"));
                        var treenodedata = po.getDataNodeByTreeDataIndex(g.data,treedataindex);                                var treeitembtn = $(".l-body:first .l-expandable-open:first,.l-body:first .l-expandable-close:first",treeitem); 
                       if(!$(obj).hasClass("l-checkbox"))
                       {
                           if ($(">div:first",treeitem).hasClass("l-selected"))
                            {
                                if(p.onBeforeCancelSelect 
                                && p.onBeforeCancelSelect({data:treenodedata,target:treeitem[0]}) == false)
                                    return false;
                                $(">div:first",treeitem).removeClass("l-selected");
                                p.onCancelSelect && p.onCancelSelect({data:treenodedata,target:treeitem[0]});
                            }
                            else
                            { 
                                if(p.onBeforeSelect 
                                && p.onBeforeSelect({data:treenodedata,target:treeitem[0]}) == false)
                                    return false;
                                $(".l-body", g.tree).removeClass("l-selected");
                                $(">div:first",treeitem).addClass("l-selected");
                                    p.onSelect && p.onSelect({data:treenodedata,target:treeitem[0]});
                            } 
                       }
                        //chekcbox even
                        if ($(obj).hasClass("l-checkbox"))
                        {
                            if(p.autoCheckboxEven)
                            {
                                //状态：未选中
                                if ($(obj).hasClass("l-checkbox-unchecked"))
                                {
                                    $(obj).removeClass("l-checkbox-unchecked").addClass("l-checkbox-checked");
                                    $(".l-children .l-checkbox", treeitem)
                                    .removeClass("l-checkbox-incomplete l-checkbox-unchecked")
                                    .addClass("l-checkbox-checked");
                                    p.onCheck && p.onCheck({data:treenodedata,target:treeitem[0]},true);
                                }
                                //状态：选中
                                else if ($(obj).hasClass("l-checkbox-checked"))
                                {
                                    $(obj).removeClass("l-checkbox-checked").addClass("l-checkbox-unchecked");
                                    $(".l-children .l-checkbox", treeitem)
                                    .removeClass("l-checkbox-incomplete l-checkbox-checked")
                                    .addClass("l-checkbox-unchecked");
                                    p.onCheck && p.onCheck({data:treenodedata,target:treeitem[0]},false);
                                }
                                //状态：未完全选中
                                else if ($(obj).hasClass("l-checkbox-incomplete"))
                                {
                                    $(obj).removeClass("l-checkbox-incomplete").addClass("l-checkbox-checked");
                                    $(".l-children .l-checkbox", treeitem)
                                    .removeClass("l-checkbox-incomplete l-checkbox-unchecked")
                                    .addClass("l-checkbox-checked");
                                    p.onCheck && p.onCheck({data:treenodedata,target:treeitem[0]},true);
                                }
                                po.setParentCheckboxStatus(treeitem);
                            }
                        } 
                        //状态：已经张开
                        else if (treeitembtn.hasClass("l-expandable-open"))
                        {
                            if(p.onBeforeCollapse 
                            && p.onBeforeCollapse({data:treenodedata,target:treeitem[0]}) == false)
                                return false;
                            treeitembtn
                            .removeClass("l-expandable-open")
                            .addClass("l-expandable-close");
                            $("> .l-children", treeitem).slideToggle('fast');
                            $("> div ." + po.getParentNodeClassName(true), treeitem)
                            .removeClass(po.getParentNodeClassName(true))
                            .addClass(po.getParentNodeClassName());
                            p.onCollapse && p.onCollapse({data:treenodedata,target:treeitem[0]});
                        }
                        //状态：没有张开
                        else if (treeitembtn.hasClass("l-expandable-close"))
                        { 
                            if(p.onBeforeExpand 
                            && p.onBeforeExpand({data:treenodedata,target:treeitem[0]}) == false)
                                return false;
                            treeitembtn
                            .removeClass("l-expandable-close")
                            .addClass("l-expandable-open");
                            $("> .l-children", treeitem).slideToggle('fast',function(){
                                p.onExpand && p.onExpand({data:treenodedata,target:treeitem[0]});
                            });
                            $("> div ." + po.getParentNodeClassName(), treeitem)
                            .removeClass(po.getParentNodeClassName())
                            .addClass(po.getParentNodeClassName(true)); 
                        }
                        p.onClick && p.onClick({data:treenodedata,target:treeitem[0]});
                    });   
                },
                //递归设置父节点的状态
                setParentCheckboxStatus: function (treeitem)
                {
                    //当前同级别或低级别的节点是否都选中了
                    var isCheckedComplete = $(".l-checkbox-unchecked", treeitem.parent()).length == 0;
                    //当前同级别或低级别的节点是否都没有选中
                    var isCheckedNull = $(".l-checkbox-checked", treeitem.parent()).length == 0;
                    if (isCheckedComplete)
                    {
                        treeitem.parent().prev().find(".l-checkbox")
                                    .removeClass("l-checkbox-unchecked l-checkbox-incomplete")
                                    .addClass("l-checkbox-checked");
                    }
                    else if (isCheckedNull)
                    {
                        treeitem.parent().prev().find("> .l-checkbox")
                                    .removeClass("l-checkbox-checked l-checkbox-incomplete")
                                    .addClass("l-checkbox-unchecked");
                    }
                    else
                    {
                        treeitem.parent().prev().find("> .l-checkbox")
                                    .removeClass("l-checkbox-unchecked l-checkbox-checked")
                                    .addClass("l-checkbox-incomplete");
                    }
                    if (treeitem.parent().parent("li").length > 0)
                        po.setParentCheckboxStatus(treeitem.parent().parent("li"));
                },
                convertData:function(data)      //将ID、ParentID这种数据格式转换为树格式
                {
                    if(!data || !data.length) return []; 
                    var isolate = function(pid)//根据ParentID判断是否孤立
                    {
                        if(pid == p.topParentIDValue) return false;
                        for(var i=0;i<data.length;i++)
                        {
                            if(data[i][p.idFieldName] == pid) return false;
                        }
                        return true;
                    };
                    //计算孤立节点的个数
                    var isolateLength =0;
                    for(var i=0;i<data.length;i++)
                    {
                        if(isolate(data[i][p.parentIDFieldName])) isolateLength++;
                    } 
                    var targetData = [];                    //存储数据的容器(返回)
                    var itemLength = data.length;           //数据集合的个数
                    var insertedLength = 0;                 //已插入的数据个数
                    var currentIndex = 0;                   //当前数据索引
                    var getItem = function(container,id)    //获取数据项(为空时表示没有插入)
                    {
                        if(!container.length) return null; 
                        for(var i=0;i<container.length;i++)
                        {
                            if(container[i][p.idFieldName] == id) return container[i];
                            if(container[i].children)
                            {
                                var finditem = getItem(container[i].children,id);
                                if(finditem) return finditem;
                            }
                        }
                        return null;
                    }; 
                    var addItem = function(container,item)  //插入数据项
                    {
                        container.push($.extend({},item));
                        insertedLength++;
                    };
                    //判断已经插入的节点和孤立节点 的个数总和是否已经满足条件
                    while(insertedLength + isolateLength <itemLength)
                    { 
                        var item = data[currentIndex];
                        var id = item[p.idFieldName];
                        var pid = item[p.parentIDFieldName];
                        if(pid == p.topParentIDValue)//根节点
                        {
                            getItem(targetData,id) == null && addItem(targetData,item);
                        }
                        else
                        {
                            var pitem = getItem(targetData,pid); 
                            if(pitem && getItem(targetData,id) == null)//找到父节点数据并且还没插入
                            {  
                                pitem.children =  pitem.children || [];
                                addItem(pitem.children,item);
                            }
                        }
                        currentIndex = (currentIndex+1)%itemLength;
                    }  
                    return targetData; 
                }
            };
            if (!$(this).hasClass('l-tree')) $(this).addClass('l-tree');
            g.tree = $(this);
            if(!p.treeLine) g.tree.addClass("l-tree-noline");
            g.sysAttribute = ['isexpand','ischecked','href','style'];
            g.loading = $("<div class='l-tree-loading'></div>");
            g.tree.after(g.loading);
            g.data = [];
            g.maxOutlineLevel = 1;
            g.treedataindex = 0;
            po.applyTree();
            po.setTreeEven();
            if (p.data)
            { 
                g.append(null, p.data);
            }
            if (p.url)
            {
                g.loadData(null, p.url);
            }
            if (this.id == undefined || this.id == "") this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_Tree"] = g;
            this.usedTree = true;
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_Tree"];
        var managers = [];
        this.each(function() {
            managers.push(LigerUIManagers[this.id + "_Tree"]);
        });
        return managers;
    };

})(jQuery);﻿/**
* jQuery ligerUI 1.0.0
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