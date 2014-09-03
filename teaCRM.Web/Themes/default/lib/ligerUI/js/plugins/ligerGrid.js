/**
* jQuery ligerUI  1.1.1
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

    $.fn.ligerGetGridManager = function () {
        return $.ligerui.getManager(this);
    };

    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Grid = {
        title: null,
        width: 'auto',                          //宽度值
        columnWidth: null,                      //默认列宽度
        resizable: true,                        //table是否可伸缩
        url: false,                             //ajax url
        usePager: true,                         //是否分页
        page: 1,                                //默认当前页 
        pageSize: 10,                           //每页默认的结果数
        pageSizeOptions: [10, 20, 30, 40, 50],  //可选择设定的每页结果数
        parms: [],                         //提交到服务器的参数
        columns: [],                          //数据源
        minColToggle: 1,                        //最小显示的列
        dataType: 'server',                     //数据源：本地(local)或(server),本地是将读取p.data
        dataAction: 'server',                    //提交数据的方式：本地(local)或(server),选择本地方式时将在客服端分页、排序
        showTableToggleBtn: false,              //是否显示'显示隐藏Grid'按钮 
        switchPageSizeApplyComboBox: false,     //切换每页记录数是否应用ligerComboBox
        allowAdjustColWidth: true,              //是否允许调整列宽     
        checkbox: false,                         //是否显示复选框
        allowHideColumn: true,                 //是否显示'切换列层'按钮
        enabledEdit: false,                      //是否允许编辑
        isScroll: true,                         //是否滚动
        onDragCol: null,                       //拖动列事件
        onToggleCol: null,                     //切换列事件
        onChangeSort: null,                    //改变排序事件
        onSuccess: null,                       //成功获取服务器数据的事件
        onDblClickRow: null,                     //双击行事件
        onSelectRow: null,                    //选择行事件
        onUnSelectRow: null,                   //取消选择行事件
        onBeforeCheckRow: null,                 //选择前事件，可以通过return false阻止操作(复选框)
        onCheckRow: null,                    //选择事件(复选框) 
        onBeforeCheckAllRow: null,              //选择前事件，可以通过return false阻止操作(复选框 全选/全不选)
        onCheckAllRow: null,                    //选择事件(复选框 全选/全不选)
        onBeforeShowData: null,                  //显示数据前事件，可以通过reutrn false阻止操作
        onAfterShowData: null,                 //显示完数据事件
        onError: null,                         //错误事件
        onSubmit: null,                         //提交前事件
        dateFormat: 'yyyy-MM-dd',              //默认时间显示格式
        InWindow: true,                        //是否以窗口的高度为准 height设置为百分比时可用
        statusName: '__status',                    //状态名
        method: 'post',                         //提交方式
        fixedCellHeight: true,                       //是否固定单元格的高度
        heightDiff: 0,                         //高度补差,当设置height:100%时，可能会有高度的误差，可以通过这个属性调整
        cssClass: null,                    //类名
        root: 'Rows',                       //数据源字段名
        record: 'Total',                     //数据源记录数字段名
        pageParmName: 'page',               //页索引参数名，(提交给服务器)
        pagesizeParmName: 'pagesize',        //页记录数参数名，(提交给服务器)
        sortnameParmName: 'sortname',        //页排序列名(提交给服务器)
        sortorderParmName: 'sortorder',      //页排序方向(提交给服务器)
        onReload: null,                    //刷新事件，可以通过return false来阻止操作
        onToFirst: null,                     //第一页，可以通过return false来阻止操作
        onToPrev: null,                      //上一页，可以通过return false来阻止操作
        onToNext: null,                      //下一页，可以通过return false来阻止操作
        onToLast: null,                      //最后一页，可以通过return false来阻止操作
        allowUnSelectRow: false,           //是否允许反选行
        dblClickToEdit: false,            //是否双击的时候才编辑
        alternatingRow: true,           //间隔行效果
        mouseoverRowCssClass: 'l-grid-row-over',
        enabledSort: true,                      //是否允许排序
        rowAttrRender: null,                  //行自定义属性渲染器(包括style，也可以定义)
        groupColumnName: null,                 //分组 - 列名
        groupColumnDisplay: '分组',             //分组 - 列显示名字
        groupRender: null,                     //分组 - 渲染器
        totalRender: null,                       //统计行(全部数据)
        delayLoad: false,                        //初始化时是否不加载
        where: null,                           //数据过滤查询函数,(参数一 data item，参数二 data item index)
        selectRowButtonOnly: false,            //复选框模式时，是否只允许点击复选框才能选择行
        onAfterAddRow: null,                     //增加行后事件
        onBeforeEdit: null,                      //编辑前事件
        onBeforeSubmitEdit: null,               //验证编辑器结果是否通过
        onAfterEdit: null,                       //结束编辑后事件
        onLoading: null,                        //加载时函数
        onLoaded: null,                          //加载完函数
        onContextmenu: null,                   //右击事件
        onRClickToSelect: false,                //右击行时是否选中
        contentType: null,                     //Ajax contentType参数
        checkboxColWidth: 27,                  //复选框列宽度
        detailColWidth: 29,                     //明细列宽度

        rowid: null,
        rowtype: null,
        /*
        treeGrid模式
        例子:tree:{
        columnName :'name', //如果不指定。将不会出现 可折叠的+/-。例子给出的是默认参数
        childrenName : 'children', //children的字段名。例子给出的是默认参数
        isParent : function(rowData){    //判断是否为父节点的（即显示-)判断函数。例子给出的是默认参数
        var exist = 'children' in rowData;
        return exist;
        },
        isExtend : function(rowData){     //判断是否张开。例子给出的是默认参数
        if('isextend' in rowData && rowData['isextend'] == false) 
        return false;
        return true;
        }
        }
        json格式：
        Rows:[{tite:'11.11',chidren:[...] }]
        */
        tree: null,                            //treeGrid模式
        isChecked: null,                       //复选框 初始化函数
        //获取时间
        renderDate: function (value) {
            var da;
            if (!value) return null;
            if (typeof value == 'object') {
                return value;
            }
            if (value.indexOf('Date') > -1) {
                da = eval('new ' + value.replace('/', '', 'g').replace('/', '', 'g'));
            } else {
                da = eval('new Date("' + value + '");');
            }
            return da;
        }
    };
    $.ligerDefaults.GridString = {
        errorMessage: '发生错误',
        pageStatMessage: '显示从{from}到{to}，总 {total} 条 。每页显示：{pagesize}',
        pageTextMessage: 'Page',
        loadingMessage: '加载中...',
        findTextMessage: '查找',
        noRecordMessage: '没有符合条件的记录存在',
        isContinueByDataChanged: '数据已经改变,如果继续将丢失数据,是否继续?'
    };

    //Grid manager design
    $.ligerManagers = $.ligerManagers || {};
    $.ligerManagers.Grid = function (options, po) {
        this.options = options;
        this.po = po;
    };
    $.ligerManagers.Grid.prototype = {
        //刷新数据
        loadData: function (loadDataParm) {
            var po = this.po, g = this, p = this.options;
            g.loading = true;
            var clause = null;
            var loadServer = true;
            if (typeof (loadDataParm) == "function") {
                clause = loadDataParm;
                loadServer = false;
            }
            else if (typeof (loadDataParm) == "boolean") {
                loadServer = loadDataParm;
            }
            else if (typeof (loadDataParm) == "object" && loadDataParm) {
                loadServer = false;
                p.dataType = "local";
                p.data = loadDataParm;
            }
            //参数初始化
            if (!p.newPage) p.newPage = 1;
            if (p.dataAction == "server") {
                if (!p.sortOrder) p.sortOrder = "asc";
            }
            var param = [];
            if (p.parms && p.parms.length) {
                $(p.parms).each(function () {
                    param.push({ name: this.name, value: this.value });
                });
            }
            if (p.dataAction == "server") {
                if (p.usePager) {
                    param.push({ name: p.pageParmName, value: p.newPage });
                    param.push({ name: p.pagesizeParmName, value: p.pageSize });
                }
                if (p.sortName) {
                    param.push({ name: p.sortnameParmName, value: p.sortName });
                    param.push({ name: p.sortorderParmName, value: p.sortOrder });
                }
            };
            $(".l-bar-btnload span", g.toolbar).addClass("l-disabled");
            if (p.dataType == "local") {
                g.data = $.extend({}, p.data);
                g.filteredData = $.extend({}, g.data);
                if (clause)
                    g.filteredData[p.root] = po.searchData(g.filteredData[p.root], clause);
                if (p.usePager)
                    g.currentData = po.getCurrentPageData(g.filteredData);
                else {
                    g.currentData = $.extend({}, g.filteredData);
                }
                po.showData(g.currentData);
            }
            else if (p.dataAction == "local" && !loadServer) {
                if (g.data && g.data[p.root]) {
                    g.filteredData = $.extend({}, g.data);
                    if (clause)
                        g.filteredData[p.root] = po.searchData(g.filteredData[p.root], clause);
                    g.currentData = po.getCurrentPageData(g.filteredData);
                    po.showData(g.currentData);
                }
            }
            else {
                if (p.onLoading) p.onLoading(g);
                else g.gridloading.show();
                setTimeout(function () {
                    g.loadServerData(param, clause);
                }, 10);
            }
            g.loading = false;
        },
        loadServerData: function (param, clause) {
            var po = this.po, g = this, p = this.options;
            var ajaxOptions = {
                type: p.method,
                url: p.url,
                data: param,
                async: false,
                dataType: 'json',
                beforeSend: function () {
                },
                success: function (data) {
                    if (p.onSuccess) p.onSuccess(data, g);
                    if (!data || !data[p.root] || !data[p.root].length) {
                        g.currentData = g.data = {};
                        g.currentData[p.root] = g.data[p.root] = [];
                        g.currentData[p.record] = g.data[p.record] = 0;
                        po.showData(g.currentData);
                        return;
                    }
                    g.data = $.extend({}, data);
                    for (var rowindex in g.data[p.root]) {
                        if (g.data[p.root][rowindex][p.statusName] == undefined)
                            g.data[p.root][rowindex][p.statusName] = '';
                    }
                    if (p.dataAction == "server") {
                        g.currentData = g.data;
                    }
                    else {
                        g.filteredData = $.extend({}, g.data);
                        if (clause) g.filteredData[p.root] = po.searchData(g.filteredData[p.root], clause);
                        g.currentData = po.getCurrentPageData(g.filteredData);
                    }
                    setTimeout(function () { po.showData(g.currentData); }, 10);
                },
                complete: function () {
                    if (p.onLoaded) {
                        p.onLoaded(g);
                    }
                    else {
                        setTimeout(function () {
                            g.gridloading.hide();
                        }, 10);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    g.currentData = g.data = {};
                    g.currentData[p.root] = g.data[p.root] = [];
                    g.currentData[p.record] = g.data[p.record] = 0;
                    g.gridloading.hide();
                    $(".l-bar-btnload span", g.toolbar).removeClass("l-disabled");
                    try { if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { }
                }
            };
            if (p.contentType) ajaxOptions.contentType = p.contentType;
            $.ajax(ajaxOptions);
        },
        //add function()
        setURL: function (linkurl) {
            var po = this.po, g = this, p = this.options;
            p.url = linkurl;
        },
        //add function()
        GetDataByURL: function (linkurl) {
            var po = this.po, g = this, p = this.options;
            //参数初始化
            if (!p.newPage) p.newPage = 1;

            var param = [];
            if (p.parms && p.parms.length) {
                $(p.parms).each(function () {
                    param.push({ name: this.name, value: this.value });
                });
            }
            p.url = linkurl;
            //loading状态 
            g.gridloading.show();
            $(".l-bar-btnload span", g.toolbar).addClass("l-disabled");
            this.loading = true;

            //请求服务器
            $.ajax({
                type: p.method,
                url: linkurl,
                data: param,
                async: false,
                dataType: 'json',
                beforeSend: function () {
                },
                success: function (data) {
                    if (p.onSuccess) p.onSuccess(data, g);
                    if (!data || !data[p.root] || !data[p.root].length) {
                        g.currentData = g.data = {};
                        g.currentData[p.root] = g.data[p.root] = [];
                        g.currentData[p.record] = g.data[p.record] = 0;
                        return;
                    }
                    g.data = $.extend({}, data);
                    for (var rowindex in g.data[p.root]) {
                        if (g.data[p.root][rowindex][p.statusName] == undefined)
                            g.data[p.root][rowindex][p.statusName] = '';
                    }
                    if (p.dataAction == "server") {
                        g.currentData = g.data;
                    }
                    else {
                        g.filteredData = $.extend({}, g.data);
                        //if (clause) g.filteredData[p.root] = po.searchData(g.filteredData[p.root], clause);
                        g.currentData = po.getCurrentPageData(g.filteredData);
                    }
                    setTimeout(function () { po.showData(g.currentData); }, 10);
                },
                complete: function () {
                    if (p.onLoaded) {
                        p.onLoaded(g);
                    }
                    else {
                        setTimeout(function () {
                            g.gridloading.hide();
                        }, 10);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    g.currentData = g.data = {};
                    g.currentData[p.root] = g.data[p.root] = [];
                    g.currentData[p.record] = g.data[p.record] = 0;
                    g.gridloading.hide();
                    $(".l-bar-btnload span", g.toolbar).removeClass("l-disabled");
                    try { if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown); } catch (e) { }
                }
            });
        },
        test: function () {
            var po = this.po, g = this, p = this.options;
            var rows = g.getRow(g.currentData[p.root]);
            for (var row in rows) {
                g.deleteRow(row);
            }
        },
        //add function
        setCheck: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            var row = $("tbody:first > tr[growid=" + rowParm + "]", g.gridbody);
            row.addClass("l-checked");
        },
        //add function
        collapseleaf: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            var row = $("tbody:first > tr[treelevel=" + rowParm + "]", g.gridbody);
            for (var j = 0; j < row.length; j++) {
                g.collapse(row[j]);
            }
        },
        //add function
        expandleaf: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            var row = $("tbody:first > tr[treelevel=" + rowParm + "]", g.gridbody);
            for (var j = 0; j < row.length; j++) {
                g.expand(row[j]);
            }
        },
        //add function
        collapseAll: function () {
            var po = this.po, g = this, p = this.options;
            $(".l-grid-tree-link-open", g.gridbody).click();
        },
        //add function
        expandAll: function () {
            var po = this.po, g = this, p = this.options;
            $(".l-grid-tree-link-close", g.gridbody).click();
        },
        //addfunction()
        getColumnDateByType: function (columnName, type) {
            var po = this.po, g = this, p = this.options;

            var totalsummaryArr = [];

            var data = g.getCurrentData();
            var sum = 0, count = 0, avg = 0;
            var max = parseFloat(g.getColumn(columnName));
            var min = parseFloat(g.getColumn(columnName));
            for (var i = 0; i < data.length; i++) {
                var value;
                //alert(JSON.stringify(data[i]));
                if (typeof (data[i][columnName]) == 'number')
                    value = parseFloat(data[i][columnName]);
                else {
                    //alert(data.length)                    
                    value = parseFloat(data[i][columnName].replace(/\$|\,/g, ''));
                }
                if (!value) continue;
                sum += value;
                count += 1;
                if (value > max) max = value;
                if (value < min) min = value;
            }
            avg = sum * 1.0 / data.length;

            switch (type) {
                case "sum": return sum;
                    break;
                case "max": return max;
                    break;
                case "min": return min;
                    break;
                case "count": return count;
                    break;
                case "avg": return avg;
                    break;
                default: return sum;
            }


        },
        //add function
        showData: function (data) {
            var po = this.po, g = this, p = this.options;
            po.showData(data);
        },
        //add function
        onResize: function () {
            var po = this.po, g = this, p = this.options;
            po.onResize();
        },
        //add function
        getCurrentData: function () {
            var po = this.po, g = this, p = this.options;

            var rows = $("tbody:first > l-grid-row", g.gridbody);
            var rowdata = [];
            $("tbody > .l-grid-row", g.gridbody).each(function (i, row) {
                var rowid = $(row).attr("rowid");
                rowdata.push(g.getRow(rowid));
            });

            return rowdata;
        },

        setOptions: function (parms) {
            var po = this.po, g = this, p = this.options;
            $.extend(p, parms);
            if (parms.data) {
                g.data = parms.data;
                p.dataType = "local";
            }
        },
        stringToDate: function (obj) {
            var po = this.po, g = this, p = this.options;
            if (obj instanceof Date) return obj;
            var myDate = new Date();
            try {
                myDate.setYear(parseInt(obj.substring(0, 4), 10));
                myDate.setMonth(parseInt(obj.substring(5, 7) - 1, 10));
                myDate.setDate(parseInt(obj.substring(8, 10), 10));
                if (obj.length > 10) {
                    myDate.setHours(parseInt(obj.substring(11, 13), 10));
                    myDate.setMinutes(parseInt(obj.substring(14, 16), 10));
                }
                if (obj.length > 16) {
                    myDate.setSeconds(parseInt(obj.substring(17, 19), 10));
                }
            }
            catch (e) {
            }
            return myDate;
        },
        getFormatDate: function (date, dateformat) {
            var po = this.po, g = this, p = this.options;
            if (isNaN(date)) return null;
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
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        },
        endEdit: function () {
            var po = this.po, g = this, p = this.options;
            if (!g.grideditor.editingCell) return;
            var cell = g.grideditor.editingCell;
            var value = g.grideditor.editingValue;
            g.grideditor.html("").hide();
            var row = $(cell).parent();
            var rowindex = row.attr("rowindex");
            var rowid = row.attr("rowid");
            var columnindex = $(cell).attr("columnindex");
            var columnname = $(cell).attr("columnname");
            var column = g.columns[columnindex];
            var rowdata = g.getRow(rowid);
            var editParm = {
                record: rowdata,
                value: value,
                column: column,
                columnname: columnname,
                columnindex: columnindex,
                rowindex: rowindex,
                rowObj: row[0],
                cellObj: cell
            };
            if (p.onAfterEdit) p.onAfterEdit(editParm);
            g.grideditor.editingCell = null;
            g.grideditor.editingValue = null;
        },
        setWidth: function (w) {

        },
        setHeight: function (h) {
            var po = this.po, g = this, p = this.options;
            if (p.title) h -= 24;
            if (p.usePager) h -= 32;
            if (p.totalRender) h -= 25;
            h -= 23 * (g.getMulHeaderLevel() - 1);
            h -= 22;
            h > 0 && g.gridbody.height(h);
        },
        //是否启用明细模式
        enabledDetail: function () {
            if (this.options.detail && this.options.detail.onShowDetail) return true;
            return false;
        },
        deleteSelectedRow: function () {
            var po = this.po, g = this, p = this.options;
            if (p.checkbox) {
                $("tbody:first > tr.l-checked", g.gridbody).each(function () {
                    g.deleteRow(this);
                });
            }
            else {
                var row = $("tbody:first > tr.l-selected", g.gridbody);
                if (row.length == 0) return;
                g.deleteRow(row[0]);
            }
        },
        deleteRow: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            var rowObj = g.getRowObj(rowParm);
            if (!rowObj) return;
            g.popup.hide();
            g.endEdit();
            var rowid = $(rowObj).attr("rowid");
            if (p.tree && g.hasChildren(rowObj)) {
                $("tbody:first > tr[parentrowid=" + rowid + "]", g.gridbody).each(function () {
                    g.deleteRow(this);
                });
            }

            $(rowObj).remove();
            //alert(JSON.stringify(g.data.Rows));
            g.deleteData(rowid);
            g.isDataChanged = true;
        },
        deleteData: function (rowid) {
            var po = this.po, g = this, p = this.options;
            g.records[rowid][p.statusName] = 'delete';
            //alert(JSON.stringify(g.records));
        },
        //add function
        updateCelldata: function (rowid, columindex, value) {
            var po = this.po, g = this, p = this.options;

            var rowdata = g.getRow(rowid);
            var column = g.columns[columindex];
            if (!column) return;
            var columnname = column.name;
            if (!columnname) return;

            //alert(column.type);

            if (column.type == 'int')
                rowdata[columnname] = parseInt(value);
            else if (column.type == 'float')
                rowdata[columnname] = parseFloat(value);
            else if (column.type == 'date') {
                var dv = p.renderDate(value);
                if (!dv || isNaN(dv))
                    dv = g.stringToDate(value);
                rowdata[columnname] = dv;
            }
            else {
                rowdata[columnname] = value;
            }

            if (rowdata[p.statusName] != 'add')
                rowdata[p.statusName] = 'update';
            g.isDataChanged = true;
        },
        //add function
        updateCelldataByColumname: function (rowid, columname, value) {
            var po = this.po, g = this, p = this.options;

            var rowdata = g.getRow(rowid);
            if (!rowdata) return;

            rowdata[columname] = value;

            if (rowdata[p.statusName] != 'add')
                rowdata[p.statusName] = 'update';
            g.isDataChanged = true;
        },
        //add function
        getAllRows: function () {
            var po = this.po, g = this, p = this.options;
            var rows = $("tbody:first > .l-grid-row", g.gridbody);
            var rowdata = [];
            $("tbody:first > .l-grid-row", g.gridbody).each(function (i, row) {
                var rowid = $(row).attr("rowid");
                rowdata.push(g.getRow(rowid));
            });
            return rowdata;
        },
        updateCell: function (cell, value, rowParm) {
            var po = this.po, g = this, p = this.options;
            var columnindex;
            var column;
            var cellObj;
            if (typeof (cell) == "number") {
                columnindex = cell;
                column = g.columns[columnindex];
                cellObj = $("td[columnindex=" + columnindex + "]", rowObj)[0];
            }
            else if (typeof (cell) == "string") {
                var rowObj = g.getRowObj(rowParm);
                cellObj = $("td[columnname=" + cell + "]", rowObj)[0];
                columnindex = $(cellObj).attr("columnindex");
                column = g.columns[columnindex];
            }
            else {
                cellObj = cell;
                columnindex = $(cellObj).attr("columnindex");
                column = g.columns[columnindex];
            }
            var row = $(cellObj).parent();
            var rowindex = row.attr("rowindex");
            var rowid = row.attr("rowid");
            var rowData = g.getRow(rowid);
            g.updateData(cellObj, value);
            var cellContent = po.getCellContent(rowData, rowindex, value, column, p.tree, row.attr("treelevel"), rowid);
            $(".l-grid-row-cell-inner:first", cellObj).html(cellContent);
        },
        updateData: function (cell, value, rowObj) {
            var po = this.po, g = this, p = this.options;
            if (typeof (cell) == "string") {
                var rowindex = $(rowObj).attr("rowindex");
                var rowid = $(rowObj).attr("rowid");
                var rowdata = g.getRow(rowid);
                rowdata[cell] = value;
                if (rowdata[p.statusName] != 'add')
                    rowdata[p.statusName] = 'update';
                g.isDataChanged = true;
                return;
            }
            var columnindex = $(cell).attr("columnindex");
            var column = g.columns[columnindex];
            if (!column) return;
            var columnname = column.name;
            if (!columnname) return;
            var row = $(cell).parents(".l-grid-row:eq(0)");
            var rowindex = row.attr("rowindex");
            var rowid = row.attr("rowid");
            var rowdata = g.getRow(rowid);
            if (column.type == 'int')
                rowdata[columnname] = parseInt(value);
            else if (column.type == 'float')
                rowdata[columnname] = parseFloat(value);
            else if (column.type == 'date') {
                var dv = p.renderDate(value);
                if (!dv || isNaN(dv))
                    dv = g.stringToDate(value);
                rowdata[columnname] = dv;
            }
            else
                rowdata[columnname] = value;
            if (rowdata[p.statusName] != 'add')
                rowdata[p.statusName] = 'update';
            g.isDataChanged = true;
        },
        addRows: function (rowdataArr) {
            var g = this;
            $(rowdataArr).each(function () {
                g.addRow(this);
            });
        },
        addRow: function (rowdata, rowParm, isBefore, parentRow) {
            var po = this.po, g = this, p = this.options;
            if (!rowdata) rowdata = {};
            var treelevel, parentrowid, parentRowObj, parentRowData, parentRowIsOpened;
            if (parentRow) {
                parentRowObj = g.getRowObj(parentRow);
                treelevel = parseInt($(parentRowObj).attr("treelevel")) + 1;
                parentrowid = $(parentRowObj).attr("rowid");
                parentRowData = g.getRow(parentrowid);
                parentRowIsOpened = $(".l-grid-tree-link:first", parentRowObj).hasClass("l-grid-tree-link-open");
            }

            var olddatanumber = parentRowData ? parentRowData[p.tree.childrenName].length : g.currentData[p.root].length;
            var rowObj = g.getRowObj(rowParm);
            var rowindex = rowObj
                ? (parseInt($(rowObj).attr("rowindex")) + (isBefore ? 0 : 1))
                : olddatanumber;
            var rowHTML = po.getHtmlFromData([rowdata], p.tree, treelevel ? treelevel : 1, parentrowid);
            var row = $(rowHTML);
            po.recordRow(row[0]);
            row.attr("rowindex", rowindex).removeClass("l-grid-row-last");
            if (parentRow && !parentRowIsOpened) row.hide();
            if (rowindex == olddatanumber) {
                if (parentRowData)
                    parentRowData[p.tree.childrenName][rowindex] = rowdata;
                else
                    g.currentData[p.root][rowindex] = rowdata;
                if (!p.usePager && !g.isTotalSummary()) {
                    $("tbody:first > .l-grid-row:last", g.gridbody).removeClass("l-grid-row-last");
                    row.addClass("l-grid-row-last");
                }
            }
            else {
                if (parentRowData)
                    parentRowData[p.tree.childrenName].splice(rowindex, 0, rowdata);
                else
                    g.currentData[p.root].splice(rowindex, 0, rowdata);
                var selectexpr = p.tree ? "tr[parentrowid=" + parentrowid + "][treelevel=" + treelevel + "]" : "tr";
                $(rowObj).nextAll(selectexpr).add(rowObj).each(function () {
                    var ri = $(this).attr("rowindex");
                    if (ri >= rowindex)
                        $(this).attr("rowindex", parseInt(ri) + 1);
                });
            }
            if ($("tbody", g.gridbody).length == 0) {
                g.gridbody.html('<div class="l-grid-body-inner"><table class="l-grid-body-table" cellpadding=0 cellspacing=0><tbody></tbody></table></div>');
            }
            if (rowObj != undefined) {
                if (isBefore)
                    $(rowObj).before(row);
                else
                    $(rowObj).after(row);
            }
            else {
                $("tbody:first", g.gridbody).append(row);
            }
            rowdata[p.statusName] = 'add';
            //添加事件
            po.setRowEven(row[0]);
            //标识状态
            g.isDataChanged = true;

            p.total = p.total ? (p.total + 1) : 1;
            p.pageCount = Math.ceil(p.total / p.pageSize);
            po.buildPager();
            if (p.onAfterAddRow) p.onAfterAddRow(row, rowdata);
            return row;
        },
        updateRow: function (rowDom, newRowData) {
            var po = this.po, g = this, p = this.options;
            var rowdata = g.getRow(rowDom);
            //标识状态
            g.isDataChanged = true;
            if (newRowData) {
                for (var columnname in newRowData) {
                    if (columnname == p.statusName) continue;
                    rowdata[columnname] = newRowData[columnname];
                    var cellobj = $("> .l-grid-row-cell[columnname=" + columnname + "]", rowDom);
                    if (cellobj.length == 0) continue;
                    var columnindex = cellobj.attr("columnindex");
                    var column = g.columns[columnindex];
                    g.updateCell(cellobj, newRowData[columnname]);
                }
                rowdata[p.statusName] = 'update';
            }
            return rowdata;
        },
        getData: function () {
            var po = this.po, g = this, p = this.options;
            if (g.currentData == null) return null;
            return g.currentData[p.root];
        },
        getColumn: function (columnname) {
            var po = this.po, g = this, p = this.options;
            for (i = 0; i < g.columns.length; i++) {
                if (g.columns[i].name == columnname) {
                    return g.columns[i];
                }
            }
            return null;
        },
        getColumnType: function (columnname) {
            var po = this.po, g = this, p = this.options;
            for (i = 0; i < g.columns.length; i++) {
                if (g.columns[i].name == columnname) {
                    if (g.columns[i].type) return g.columns[i].type;
                    return "string";
                }
            }
            return null;
        },
        //是否包含汇总
        isTotalSummary: function () {
            var po = this.po, g = this, p = this.options;
            for (var i = 0; i < g.columns.length; i++) {
                if (g.columns[i].totalSummary) return true;
            }
            return false;
        },
        getMulHeaderLevel: function () {
            var po = this.po, g = this, p = this.options;
            if (!p.columns.length) return 1;
            var level = 0;
            var currentColumn = p.columns[0];
            while (currentColumn) {
                level++;
                if (!currentColumn.columns || !currentColumn.columns.length) break;
                currentColumn = currentColumn.columns[0];
            }
            return level;
        },
        getColumns: function (columnLevel) {
            var po = this.po, g = this, p = this.options;
            if (columnLevel <= 1) return p.columns;
            return g.getLevelColumns({ columns: p.columns }, 0, columnLevel);
        },
        getLevelColumns: function (column, level, columnLevel) {
            var po = this.po, g = this, p = this.options;
            if (level == columnLevel) return [column];
            var columns = [];
            for (var i = 0; column.columns && i < column.columns.length; i++) {
                var currentColumns = g.getLevelColumns(column.columns[i], level + 1, columnLevel);
                $(currentColumns).each(function () {
                    columns.push(this);
                });
            }
            return columns;
        },
        getMulHeaders: function (columnLevel) {
            var po = this.po, g = this, p = this.options;
            var getColumnNumber = function (column) {
                //if (!column) return 1;
                if (!column.columns || !column.columns.length) return 1;
                var number = 0;
                for (var i = 0; i < column.columns.length; i++) {
                    number += getColumnNumber(column.columns[i]);
                }
                return number;
            };
            var currentLevelColumns = g.getColumns(columnLevel);
            var mulHeaders = [];
            for (var i = 0; i < currentLevelColumns.length; i++) {
                mulHeaders.push({
                    display: currentLevelColumns[i]['display'],
                    number: getColumnNumber(currentLevelColumns[i])
                });
            }
            return mulHeaders;
        },
        //改变排序
        changeSort: function (columnName, sortOrder) {
            var po = this.po, g = this, p = this.options;
            if (g.loading) return true;
            if (p.dataAction == "local") {
                var columnType = g.getColumnType(columnName);
                if (!g.sortedData)
                    g.sortedData = $.extend({}, g.filteredData);
                if (p.sortName == columnName) {
                    g.sortedData[p.root].reverse();
                } else {
                    g.sortedData[p.root].sort(function (data1, data2) {
                        return po.compareData(data1, data2, columnName, columnType);
                    });
                }
                if (p.usePager)
                    g.currentData = po.getCurrentPageData(g.sortedData);
                else
                    g.currentData = g.sortedData;
                po.showData(g.currentData);
            }
            p.sortName = columnName;
            p.sortOrder = sortOrder;
            if (p.dataAction == "server") {
                g.loadData(p.where);
            }
        },
        //改变分页
        changePage: function (ctype) {
            var po = this.po, g = this, p = this.options;
            if (g.loading) return true;
            if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                return false;
            //计算新page
            switch (ctype) {
                case 'first': if (p.page == 1) return; p.newPage = 1; break;
                case 'prev': if (p.page == 1) return; if (p.page > 1) p.newPage = parseInt(p.page) - 1; break;
                case 'next': if (p.page >= p.pageCount) return; p.newPage = parseInt(p.page) + 1; break;
                case 'last': if (p.page >= p.pageCount) return; p.newPage = p.pageCount; break;
                case 'input':
                    var nv = parseInt($('.pcontrol input', g.toolbar).val());
                    if (isNaN(nv)) nv = 1;
                    if (nv < 1) nv = 1;
                    else if (nv > p.pageCount) nv = p.pageCount;
                    $('.pcontrol input', g.toolbar).val(nv);
                    p.newPage = nv;
                    break;
            }
            if (p.newPage == p.page) return false;
            if (p.newPage == 1) {
                $(".l-bar-btnfirst span", g.toolbar).addClass("l-disabled");
                $(".l-bar-btnprev span", g.toolbar).addClass("l-disabled");
            }
            else {
                $(".l-bar-btnfirst span", g.toolbar).removeClass("l-disabled");
                $(".l-bar-btnprev span", g.toolbar).removeClass("l-disabled");
            }
            if (p.newPage == p.pageCount) {
                $(".l-bar-btnlast span", g.toolbar).addClass("l-disabled");
                $(".l-bar-btnnext span", g.toolbar).addClass("l-disabled");
            }
            else {
                $(".l-bar-btnlast span", g.toolbar).removeClass("l-disabled");
                $(".l-bar-btnnext span", g.toolbar).removeClass("l-disabled");
            }
            if (p.onChangePage)
                p.onChangePage(p.newPage);
            if (p.dataAction == "server") {
                g.loadData(p.where);
            }
            else {
                g.currentData = po.getCurrentPageData(g.filteredData);
                po.showData(g.currentData);
            }
        },
        getCheckedRows: function () {
            var po = this.po, g = this, p = this.options;
            var rows = $("tbody:first > .l-checked", g.gridbody);
            var rowdata = [];
            $("tbody:first > .l-checked", g.gridbody).each(function (i, row) {
                var rowid = $(row).attr("rowid");
                rowdata.push(g.getRow(rowid));
            });
            return rowdata;
        },

        getSelectedRow: function () {
            var po = this.po, g = this, p = this.options;
            var row = $("tbody:first > .l-selected", g.gridbody);
            var rowid = row.attr("rowid");
            return g.getRow(rowid);
        },
        getCheckedRowObjs: function () {
            var po = this.po, g = this, p = this.options;
            return $("tbody:first > .l-checked", g.gridbody).get();
        },
        getSelectedRowObj: function () {
            var po = this.po, g = this, p = this.options;
            var row = $("tbody:first > .l-selected", g.gridbody);
            if (row.length == 0) return null;
            return row[0];
        },
        getRowObj: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            if (typeof (rowParm) == "string" || typeof (rowParm) == "number") {
                return $("tbody:first > .l-grid-row[rowid=" + rowParm + "]", g.gridbody).get(0);
            }
            else if (typeof (rowParm) == "object") {
                if (!rowParm) return null;
                if (typeof (rowParm.nodeType) != "undefined" && rowParm.nodeType == 1)
                    return rowParm;
                else {
                    for (var p in g.records) {
                        if (g.records[p] == rowParm)
                            return $("tbody:first > .l-grid-row[rowid=" + p + "]", g.gridbody).get(0);
                    }
                }
            }
            return null;
        },
        getRow: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            if (typeof (rowParm) == "string" || typeof (rowParm) == "number") {
                return g.records[parseInt(rowParm)];
            }
            else if (typeof (rowParm) == "object") {
                if (!rowParm) return null;
                if (typeof (rowParm.nodeType) != "undefined" && rowParm.nodeType == 1)
                    return g.records[$(rowParm).attr("rowid")];
                else
                    return rowParm;
            }
            return null;
        },
        toggleCol: function (columnparm, visible, toggleByPopup) {
            var po = this.po, g = this, p = this.options;
            var headercell = null;
            var columnindex = -1;
            if (typeof (columnparm) == "number") {
                columnindex = columnparm;
                headercell = $(".l-grid-hd-cell[columnindex='" + columnparm + "']", g.gridheader);
            }
            else if (typeof (columnparm) == "string") {
                headercell = $(".l-grid-hd-cell[columnname='" + columnparm + "']", g.gridheader);
                if (!headercell) return;
                columnindex = headercell.attr("columnindex");
            }
            if (!headercell) return;
            var cellWidth = headercell.width();
            if (visible) {
                g.gridtablewidth += cellWidth + 1;
                headercell.show();
                g.columns[columnindex].hide = false;
                if (g.columnCells[columnindex])
                    $(g.columnCells[columnindex]).show();
                $("td[columnindex=" + columnindex + "]", g.totalRows).show();
            } else {
                g.gridtablewidth -= cellWidth + 1;
                headercell.hide();
                g.columns[columnindex].hide = true;
                if (g.columnCells[columnindex])
                    $(g.columnCells[columnindex]).hide();
                $("td[columnindex=" + columnindex + "]", g.totalRows).hide();
            }
            $("div:first", g.gridheader).width(g.gridtablewidth + 40);
            $("div:first", g.gridbody).width(g.gridtablewidth);
            if (!toggleByPopup) {
                $(':checkbox[columnindex=' + columnindex + "]", g.popup).each(function () {
                    this.checked = visible;
                    if ($.fn.ligerCheckBox) {
                        var checkboxmanager = $(this).ligerGetCheckBoxManager();
                        if (checkboxmanager) checkboxmanager.updateStyle();
                    }
                });
            }
        },
        changeHeaderText: function (columnparm, headerText) {
            var po = this.po, g = this, p = this.options;
            var headercell = null;
            var columnindex = -1;
            if (typeof (columnparm) == "number") {
                columnindex = columnparm;
                headercell = $(".l-grid-hd-cell[columnindex='" + columnparm + "']", g.gridheader);
            }
            else if (typeof (columnparm) == "string") {
                headercell = $(".l-grid-hd-cell[columnname='" + columnparm + "']", g.gridheader);
                if (!headercell) return;
                columnindex = headercell.attr("columnindex");
            }
            if (!headercell) return;
            $(".l-grid-hd-cell-text", headercell).html(headerText);
            if (p.allowHideColumn) {
                $(':checkbox[columnindex=' + columnindex + "]", g.popup).parent().next().html(headerText);
            }
        },
        getParent: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            var rowObj = g.getRowObj(rowParm);
            if (!rowObj) return;
            var parentrowid = $(rowObj).attr("parentrowid");
            if (parentrowid == undefined) return null;
            return g.getRow(parentrowid);
        },
        getChidren: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            if (!p.tree) return null;
            var rowData = g.getRow(rowParm);
            if (!rowData) return null;
            return rowData[p.tree.childrenName];
        },
        isLeaf: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            var rowObj = g.getRowObj(rowParm);
            if (!rowObj) return;
            return !$("> td > div > .l-grid-tree-space:last", rowObj).hasClass("l-grid-tree-link");
        },
        hasChildren: function (rowParm) {
            var po = this.po, g = this, p = this.options;
            var rowObj = g.getRowObj(rowParm);
            if (!rowObj) return;
            var treelevel = $(rowObj).attr("treelevel");
            var nextRow = $(rowObj).next(".l-grid-row");
            if (nextRow.length == 0) return false;
            var nextRowTreelevel = nextRow.attr("treelevel");
            return parseInt(treelevel) < parseInt(nextRowTreelevel);
        },
        appendRow: function (rowData, targetRow, nearRow, isBefore) {
            var po = this.po, g = this, p = this.options;
            var targetRowObj = g.getRowObj(targetRow);
            if (!targetRow) {
                g.addRow(rowData);
                return;
            }
            if (nearRow) {
                g.addRow(rowData, nearRow, isBefore ? true : false, targetRowObj);
                return;
            }
            var rowid = $(targetRowObj).attr("rowid");
            var children = $(targetRowObj).nextAll("tr[parentrowid=" + rowid + "]").get();
            if (!children) return;
            if (children.length == 0)
                g.addRow(rowData, targetRowObj, false, targetRowObj);
            else
                g.addRow(rowData, children[children.length - 1], false, targetRowObj);
        },
        upgrade: function (targetRow) {
            var po = this.po, g = this, p = this.options;
            if (!targetRow || !p.tree) return;
            var targetRowData = g.getRow(targetRow);
            var targetRowObj = g.getRowObj(targetRow);
            if (!targetRowData[p.tree.childrenName])
                targetRowData[p.tree.childrenName] = [];
            $("> td > div > .l-grid-tree-space:last", targetRow).addClass("l-grid-tree-link l-grid-tree-link-open");
        },
        demotion: function (targetRow) {
            var po = this.po, g = this, p = this.options;
            if (!targetRow || !p.tree) return;
            var targetRowData = g.getRow(targetRow);
            var targetRowObj = g.getRowObj(targetRow);
            var rowid = $(targetRowObj).attr("rowid");
            $("> td > div > .l-grid-tree-space:last", targetRow).removeClass("l-grid-tree-link l-grid-tree-link-open l-grid-tree-link-close");
            if (g.hasChildren(targetRowObj)) {
                $("tbody:first > tr[parentrowid=" + rowid + "]", g.gridbody).each(function () {
                    g.deleteRow(this);
                });
            }
        },
        collapse: function (targetRow) {
            var po = this.po, g = this, p = this.options;
            var targetRowObj = g.getRowObj(targetRow);
            var linkbtn = $(".l-grid-tree-link", targetRowObj);
            if (linkbtn.hasClass("l-grid-tree-link-close")) return;
            g.toggle(targetRow);
        },
        expand: function (targetRow) {
            var po = this.po, g = this, p = this.options;
            var targetRowObj = g.getRowObj(targetRow);
            var linkbtn = $(".l-grid-tree-link", targetRowObj);
            if (linkbtn.hasClass("l-grid-tree-link-open")) return;
            g.toggle(targetRow);
        },
        toggle: function (targetRow) {
            var po = this.po, g = this, p = this.options;
            var targetRowObj = g.getRowObj(targetRow);
            var treerow = $(targetRowObj);
            var level = treerow.attr("treelevel");
            var linkbtn = $(".l-grid-tree-link", treerow);
            var opening = true;
            if (linkbtn.hasClass("l-grid-tree-link-close")) {
                linkbtn.removeClass("l-grid-tree-link-close").addClass("l-grid-tree-link-open");
            }
            else {
                opening = false;
                linkbtn.addClass("l-grid-tree-link-close").removeClass("l-grid-tree-link-open");
            }
            var currentRow = treerow.next(".l-grid-treerow");
            while (true) {
                if (currentRow.length == 0) break;
                var treelevel = currentRow.attr("treelevel");
                if (treelevel <= level) break;
                if (opening) {
                    $(".l-grid-tree-link", currentRow).removeClass("l-grid-tree-link-close").addClass("l-grid-tree-link-open");
                    currentRow.show();
                }
                else {
                    $(".l-grid-tree-link", currentRow).removeClass("l-grid-tree-link-open").addClass("l-grid-tree-link-close");
                    currentRow.hide();
                }
                currentRow = currentRow.next(".l-grid-treerow");
            }
        }
    };


    $.ligerAddGrid = function (grid, p) {
        if (grid.applyligerui) return;
        /*----------------------------------
        -------- liger grid 初始化------------
        ----------------------------------*/
        p.cssClass && $(grid).addClass(p.cssClass);
        $(grid).addClass("l-grid-panel");
        var gridhtmlarr = [];
        gridhtmlarr.push("        <div class='l-grid-panel-header'><span class='l-panel-header-text'></span></div>");
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
        gridhtmlarr.push("                <div class='l-bar-group'><span class='pcontrol'> <input type='text' size='4' value='1' style='width:30px' maxlength='3' /> / <span></span></span></div>");
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
        var po = {
            init: function () {
                po.clearGrid();
                //创建头部
                po.initBuildHeader();
                //创建表头
                po.initBuildGridHeader();
                //创建 显示/隐藏 列 列表
                po.initBuildPopup();
                //宽度高度初始化
                po.initHeight();
                //创建表体
                p.delayLoad || g.loadData(p.where);
                //创建底部工具条
                po.initFootbar();
                //创建分页
                po.buildPager();
                //创建Loading
                g.gridloading.html(p.loadingMessage);
                //创建事件
                po.initEven();
            },
            initBuildHeader: function () {
                if (p.title)
                    $(".l-panel-header-text", g.header).html(p.title);
                else
                    g.header.hide();
            },
            initBuildGridHeader: function () {
                var maxLevel = g.getMulHeaderLevel();
                for (var level = 1; level <= maxLevel - 1; level++) {
                    var mulHeaders = g.getMulHeaders(level);
                    var tr = $("<tr class='l-grid-hd-mul'></tr>");
                    $("tr:last", g.gridheader).before(tr);
                    //如果有复选框列 
                    if (p.checkbox) {
                        var headerCell = $("<td class='l-grid-hd-cell l-grid-hd-cell-checkbox l-grid-hd-cell-mul'></td>");
                        tr.append(headerCell);
                    }
                    //如果有明细，创建列
                    if (g.enabledDetail()) {
                        var detailHeaderCell = $("<td class='l-grid-hd-cell l-grid-hd-cell-detail l-grid-hd-cell-mul'></td>");
                        tr.append(detailHeaderCell);
                    }
                    $(mulHeaders).each(function (i, item) {
                        var $headerCell = $("<td class='l-grid-hd-cell l-grid-hd-cell-mul'><div class='l-grid-hd-cell-inner'><span class='l-grid-hd-cell-text'> </span></div></td>");
                        $headerCell.attr("colSpan", item.number);
                        $(".l-grid-hd-cell-text", $headerCell).html(item.display);
                        tr.append($headerCell);
                    });
                }
                g.columns = g.getColumns(maxLevel);
                if (maxLevel > 1)
                    g.gridheader.height(g.gridheader.height() * maxLevel);

                g.headers = [];
                g.gridtablewidth = 0;
                //如果有复选框列 
                if (p.checkbox) {
                    var headerCell = $("<td class='l-grid-hd-cell l-grid-hd-cell-checkbox'><div class='l-grid-hd-cell-inner'><div class='l-grid-hd-cell-text l-grid-hd-cell-btn-checkbox'></div></div></td>");
                    headerCell.css({ width: p.checkboxColWidth });
                    $("tr:last", g.gridheader).append(headerCell);
                    g.headers.push({
                        width: p.checkboxColWidth,
                        ischeckbox: true
                    });
                    g.gridtablewidth += p.checkboxColWidth + 1;
                }
                //如果有明细，创建列
                if (g.enabledDetail()) {
                    var detailHeaderCell = $("<td class='l-grid-hd-cell l-grid-hd-cell-detail'><div class='l-grid-hd-cell-inner'><div class='l-grid-hd-cell-text'></div></div></td>");
                    detailHeaderCell.css({ width: 29 });
                    $("tr:last", g.gridheader).append(detailHeaderCell);
                    g.headers.push({
                        width: p.detailColWidth,
                        isdetail: true
                    });
                    g.gridtablewidth += p.detailColWidth + 1;
                }
                $(g.columns).each(function (i, item) {
                    var $headerCell = $("<td class='l-grid-hd-cell' columnindex='" + i + "'><div class='l-grid-hd-cell-inner'><span class='l-grid-hd-cell-text'> </span></div></td>");
                    if (i == g.columns.length - 1) {
                        //$(".l-grid-hd-cell-drophandle", $headerCell).remove();
                        $headerCell.addClass("l-grid-hd-cell-last");
                    }
                    if (item.hide)
                        $headerCell.hide();
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
                    $("tr:last", g.gridheader).append($headerCell);
                    var colwidth = item.width;
                    if (item.width) {
                        colwidth = item.width;
                    }
                    else if (item.minWidth) {
                        colwidth = item.minWidth;
                    }
                    else if (p.columnWidth) {
                        colwidth = p.columnWidth;
                    }
                    if (!colwidth) {
                        var lwidth = 4;
                        if (p.checkbox) lwidth += p.checkboxColWidth;
                        if (g.enabledDetail()) lwidth += p.detailColWidth;
                        colwidth = parseInt((g.gridbody.width() - lwidth) / g.columns.length);
                    }
                    if (typeof (colwidth) == "string" && colwidth.indexOf('%') > 0) {
                        item.width = colwidth = parseInt(parseInt(colwidth) * 0.01 * (g.gridbody.width() - g.columns.length));
                    }
                    $headerCell.width(colwidth);
                    g.gridtablewidth += (parseInt(colwidth) ? parseInt(colwidth) : 0) + 1;
                    g.headers.push({
                        width: colwidth,
                        columnname: item.name,
                        columnindex: i,
                        islast: i == g.columns.length - 1,
                        isdetail: false
                    });
                });
                $("div:first", g.gridheader).width(g.gridtablewidth + 40);
            },
            initBuildPopup: function () {
                $("tr:last .l-grid-hd-cell", g.gridheader).each(function (i, td) {
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
                $.fn.ligerCheckBox && $('input:checkbox', g.popup).ligerCheckBox(
                {
                    onBeforeClick: function (obj) {
                        if (!obj.checked) return true;
                        if ($('input:checked', g.popup).length <= p.minColToggle)
                            return false;
                        return true;
                    }
                });
                //创建 显示/隐藏 列 
                $(".l-grid-hd-cell", g.gridheader).bind("contextmenu", function (e) {
                    if (g.colresize) return true;
                    if (!p.allowHideColumn) return true;
                    var columnindex = $(this).attr("columnindex");
                    if (columnindex == undefined) return true;
                    var left = (e.pageX - g.body.offset().left + parseInt(g.body[0].scrollLeft));
                    if (columnindex == g.columns.length - 1) left -= 50;
                    g.popup.css({ left: left, top: g.gridheader.height() + 1 });
                    g.popup.toggle();
                    return false;
                }
                );
            },
            initHeight: function () {
                if (p.isScroll == false) p.height = 'auto';
                if (p.height == 'auto') {
                    g.gridbody.height('auto');
                }
                if (p.width) {
                    $(grid).width(p.width);
                }
                po.onResize();
            },
            initFootbar: function () {
                if (p.usePager) {
                    //创建底部工具条 - 选择每页显示记录数
                    var optStr = "";
                    var selectedIndex = -1;
                    $(p.pageSizeOptions).each(function (i, item) {
                        var selectedStr = "";
                        if (p.pageSize == item) selectedIndex = i;
                        optStr += "<option value='" + item + "' " + selectedStr + " >" + item + "</option>";
                    });

                    $('.l-bar-selectpagesize', g.toolbar).append("<select name='rp'>" + optStr + "</select>");
                    if (selectedIndex != -1) $('.l-bar-selectpagesize select', g.toolbar)[0].selectedIndex = selectedIndex;
                    if (p.switchPageSizeApplyComboBox && $.fn.ligerComboBox) {
                        $(".l-bar-selectpagesize select", g.toolbar).ligerComboBox(
                        {
                            onBeforeSelect: function () {
                                if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                                    return false;
                                return true;
                            },
                            width: 45
                        });
                    }
                }
                else {
                    g.toolbar.hide();
                }
            },
            initEven: function () {
                g.header.click(function () {
                    g.popup.hide();
                    g.endEdit();
                });
                $(".l-grid-hd-cell-text", g.gridheader).click(function (e) {
                    var obj = (e.target || e.srcElement);
                    var row = $(this).parent().parent();
                    if (!row.attr("columnname")) return;
                    if (g.colresize) return false; //如果正在调整列宽
                    if (!p.enabledSort) return;
                    if (row.attr("isSort") != undefined && row.attr("isSort").toLowerCase() == "false") return;
                    if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                        return false;
                    var sort = $(".l-grid-hd-cell-sort", row);
                    var columnName = $(row).attr("columnname");
                    if (sort.length > 0) {
                        if (sort.hasClass("l-grid-hd-cell-sort-asc")) {
                            sort.removeClass("l-grid-hd-cell-sort-asc").addClass("l-grid-hd-cell-sort-desc");
                            row.removeClass("l-grid-hd-cell-asc").addClass("l-grid-hd-cell-desc");
                            g.changeSort(columnName, 'desc');
                        }
                        else if (sort.hasClass("l-grid-hd-cell-sort-desc")) {
                            sort.removeClass("l-grid-hd-cell-sort-desc").addClass("l-grid-hd-cell-sort-asc");
                            row.removeClass("l-grid-hd-cell-desc").addClass("l-grid-hd-cell-asc");
                            g.changeSort(columnName, 'asc');
                        }
                    }
                    else {
                        row.removeClass("l-grid-hd-cell-desc").addClass("l-grid-hd-cell-asc");
                        $(this).after("<span class='l-grid-hd-cell-sort l-grid-hd-cell-sort-asc'>&nbsp;&nbsp;</span>");
                        g.changeSort(columnName, 'asc');
                    }
                    $(".l-grid-hd-cell-sort", row.siblings()).remove();
                    return false;
                });
                g.gridheader.click(function () {
                    g.popup.hide();
                    g.endEdit();
                });
                //调整列宽
                if (p.allowAdjustColWidth) {
                    g.gridheader.mousemove(function (e) {
                        if (g.colresize) return; //如果正在调整列宽
                        var posLeft = e.pageX - $(grid).offset().left; //当前鼠标位置
                        var currentLeft = 0;
                        for (var i = 0; i < g.headers.length; i++) {
                            var hide = false;
                            if (g.headers[i].columnindex != undefined) {
                                hide = g.columns[g.headers[i].columnindex].hide ? true : false;

                            }
                            if (!hide && g.headers[i].width) currentLeft += g.headers[i].width + 1;
                            if (g.headers[i].isdetail || g.headers[i].ischeckbox || hide) continue;

                            if (posLeft >= currentLeft - 2 - g.gridbody[0].scrollLeft && posLeft <= currentLeft + 2 - g.gridbody[0].scrollLeft) {
                                $('body').css({ cursor: 'e-resize' });
                                g.toDragHeaderIndex = i;
                                return;
                            }
                        }
                        $('body').css({ cursor: 'default' });
                        g.toDragHeaderIndex = null;
                    }).mouseout(function (e) {
                        if (g.colresize) return; //如果正在调整列宽
                        $('body').css({ cursor: 'default' });
                    }).mousedown(function (e) {
                        if (e.button == 2) return;
                        if (g.colresize) return; //如果正在调整列宽
                        if (g.toDragHeaderIndex == null) return; //如果不在位置上
                        po.dragStart('colresize', e, g.toDragHeaderIndex);
                    });
                }

                //表头 - 显示/隐藏'列控制'按钮事件
                if (p.allowHideColumn) {

                    $('tr', g.popup).hover(function () { $(this).addClass('l-popup-row-over'); },
                    function () { $(this).removeClass('l-popup-row-over'); });
                    var onPopupCheckboxChange = function () {
                        if ($('input:checked', g.popup).length + 1 <= p.minColToggle) {
                            return false;
                        }
                        g.toggleCol(parseInt($(this).attr("columnindex")), this.checked, true);
                    };
                    if ($.fn.ligerCheckBox)
                        $(':checkbox', g.popup).change(onPopupCheckboxChange);
                    else
                        $(':checkbox', g.popup).click(onPopupCheckboxChange);
                }
                //表头 - 调整列宽层事件
                //表体 - 滚动联动事件
                g.gridbody.scroll(function () {

                    var scrollLeft = g.gridbody.scrollLeft();
                    if (scrollLeft == undefined) return;
                    g.gridheader[0].scrollLeft = scrollLeft;
                });
                //表体 - 数据 单元格事件
                $(grid).click(function (e) {
                    var obj = (e.target || e.srcElement);
                    //明细 - 事件
                    if (obj.tagName.toLowerCase() == "span" && $(obj).hasClass("l-grid-row-cell-detailbtn")) {
                        var row = $(obj).parent().parent().parent();
                        //确保不是在内嵌表格点击的 
                        if (row.parent().parent()[0] != $("table:first", g.gridbody)[0]) return;
                        var rowindex = parseInt($(row).attr("rowindex"));
                        var rowid = $(row).attr("rowid");
                        var item = g.getRow(rowid);
                        if ($(obj).hasClass("l-open")) {
                            row.next(".l-grid-detailpanel").hide();
                            $(obj).removeClass("l-open");
                        }
                        else {
                            var nextrow = row.next(".l-grid-detailpanel");
                            if (nextrow.length > 0) {
                                nextrow.show();
                                $(obj).addClass("l-open");
                                return;
                            }
                            var detailRow = $("<tr class='l-grid-detailpanel'><td><div class='l-grid-detailpanel-inner' style='display:none'></div></td></tr>");
                            var detailRowInner = $("div:first", detailRow);
                            detailRowInner.parent().attr("colSpan", g.headers.length);
                            row.after(detailRow);
                            if (p.detail.onShowDetail) {
                                p.detail.onShowDetail(item, detailRowInner[0]);
                                detailRowInner.show();
                            }
                            else if (p.detail.render) {
                                detailRowInner.append(p.detail.render());
                                detailRowInner.show();
                            }
                            $(obj).addClass("l-open");
                        }
                        return;
                    }
                    //树 - 伸展/收缩节点
                    if ($(obj).hasClass("l-grid-tree-link")) {
                        var rowObj = $(obj).parent().parent().parent().get(0);
                        g.toggle(rowObj);
                        return;
                    }
                    //全选
                    if (obj.tagName.toLowerCase() == "div" && $(obj).hasClass("l-grid-hd-cell-btn-checkbox")) {
                        var row = $(obj).parent().parent().parent();
                        var uncheck = row.hasClass("l-checked");
                        if (p.onBeforeCheckAllRow) {
                            if (p.onBeforeCheckAllRow(!uncheck, grid) == false) return false;
                        }
                        if (uncheck) {
                            row.removeClass("l-checked");
                            $("tbody:first > tr.l-grid-row", g.gridbody).removeClass("l-checked");
                        }
                        else {
                            row.addClass("l-checked");
                            $("tbody:first > tr.l-grid-row", g.gridbody).addClass("l-checked");
                        }
                        p.onCheckAllRow && p.onCheckAllRow(!uncheck, grid);
                    }
                    if (obj.tagName.toLowerCase() == "div" || $(obj).hasClass("l-grid-row-cell-inner") || $(obj).hasClass("l-grid-row-cell")) {
                        if (p.enabledEdit && !p.dblClickToEdit) {
                            var row = null;
                            if ($(obj).hasClass("l-grid-row-cell")) row = $(obj).parent();
                            else row = $(obj).parent().parent();
                            //第一次选择的时候不允许编辑，第二次才允许
                            if (p.allowUnSelectRow || row.hasClass("l-selected-again"))
                                po.applyEditor(obj);
                        }
                    }
                });
                //工具条 - 切换每页记录数事件
                $('select', g.toolbar).change(function () {
                    if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                        return false;
                    p.newPage = 1;
                    p.pageSize = this.value;
                    g.loadData(p.where);
                });
                //工具条 - 切换当前页事件
                $('.pcontrol input', g.toolbar).keydown(function (e) { if (e.keyCode == 13) g.changePage('input') });
                //工具条 - 按钮事件
                $(".l-bar-button", g.toolbar).hover(function () {
                    $(this).addClass("l-bar-button-over");
                }, function () {
                    $(this).removeClass("l-bar-button-over");
                }).click(function () {
                    if ($(this).hasClass("l-bar-btnfirst")) {
                        if (p.onToFirst && p.onToFirst(grid) == false) return false;
                        g.changePage('first');
                    }
                    else if ($(this).hasClass("l-bar-btnprev")) {
                        if (p.onToPrev && p.onToPrev(grid) == false) return false;
                        g.changePage('prev');
                    }
                    else if ($(this).hasClass("l-bar-btnnext")) {
                        if (p.onToNext && p.onToNext(grid) == false) return false;
                        g.changePage('next');
                    }
                    else if ($(this).hasClass("l-bar-btnlast")) {
                        if (p.onToLast && p.onToLast(grid) == false) return false;
                        g.changePage('last');
                    }
                    else if ($(this).hasClass("l-bar-btnload")) {
                        if ($("span", this).hasClass("l-disabled")) return false;
                        if (p.onReload && p.onReload(grid) == false) return false;
                        if (g.isDataChanged && !confirm(p.isContinueByDataChanged))
                            return false;
                        g.loadData(p.where);
                    }
                });
                g.toolbar.click(function () {
                    g.popup.hide();
                    g.endEdit();
                });

                //全局事件
                $(document)
                .mousemove(function (e) { po.dragMove(e) })
                .mouseup(function (e) { po.dragEnd() })
                .click(function (e) { po.onClick(e) });

                $(window).resize(po.onResize);
            },
            searchData: function (data, clause) {
                var newData = new Array();
                for (var i = 0; i < data.length; i++) {
                    if (clause(data[i], i)) {
                        newData[newData.length] = data[i];
                    }
                }
                return newData;
            },
            recordRow: function (rowDom) {
                if (!$(rowDom).hasClass("l-grid-row")) {
                    if ($(rowDom).hasClass("l-grid-totalsummary")) {
                        g.totalRows.push(rowDom);
                    }
                    else if ($(rowDom).hasClass("l-grid-grouprow")) {
                        g.groupRows.push(rowDom);
                    }
                    return;
                }
                var rowid = $(rowDom).attr("rowid");
                g.rows[rowid] = rowDom;
                g.cells[rowid] = {};
                $(" > td", rowDom).each(function () {
                    var columnindex = $(this).attr("columnindex");
                    if (columnindex) {
                        g.columnCells[columnindex] = g.columnCells[columnindex] || [];
                        g.columnCells[columnindex].push(this);
                        g.cells[rowid][columnindex] = this;
                    }
                });
            },
            clearGrid: function () {
                //清空数据
                g.gridbody.html("");
                g.recordNumber = 0;
                g.records = {};
                g.rows = {};
                g.cells = {};
                g.columnCells = {};
                g.totalRows = [];
                g.groupRows = [];
            },
            showData: function (data) {
                if (p.usePager) {
                    if (data) {
                        //更新分页
                        if (data[p.record])
                            p.total = data[p.record];
                        else
                            p.total = data.length;
                    }
                    p.page = p.newPage;
                    if (!p.total) p.total = 0;
                    if (!p.page) p.page = 1;
                    p.pageCount = Math.ceil(p.total / p.pageSize);
                    if (!p.pageCount) p.pageCount = 1;
                    po.buildPager();
                }
                //加载中
                $('.l-bar-btnloading:first', g.toolbar).removeClass('l-bar-btnloading');
                if (!data || !data[p.root]) return;
                if (p.onBeforeShowData && p.onBeforeShowData(grid, data) == false) {
                    return false;
                }
                g.isDataChanged = false;
                $(".l-bar-btnload:first span", g.toolbar).removeClass("l-disabled");
                po.clearGrid();
                //$(".l-grid-row,.l-grid-detailpanel,.l-grid-totalsummary", g.gridbody).remove();
                //加载数据 
                var gridhtmlarr = ['<div class="l-grid-body-inner"><table class="l-grid-body-table" cellpadding=0 cellspacing=0><tbody>'];
                if (p.groupColumnName) //启用分组模式
                {
                    var groups = []; //分组列名数组
                    var groupsdata = []; //切成几块后的数据
                    $(data[p.root]).each(function (i, item) {
                        var groupColumnValue = item[p.groupColumnName];
                        var valueIndex = $.inArray(groupColumnValue, groups);
                        if (valueIndex == -1) {
                            groups.push(groupColumnValue);
                            valueIndex = groups.length - 1;
                            groupsdata.push([]);
                        }
                        groupsdata[valueIndex].push(item);
                    });
                    $(groupsdata).each(function (i, item) {
                        if (groupsdata.length == 1)
                            gridhtmlarr.push('<tr class="l-grid-grouprow l-grid-grouprow-last l-grid-grouprow-first"');
                        if (i == groupsdata.length - 1)
                            gridhtmlarr.push('<tr class="l-grid-grouprow l-grid-grouprow-last"');
                        else if (i == 0)
                            gridhtmlarr.push('<tr class="l-grid-grouprow l-grid-grouprow-first"');
                        else
                            gridhtmlarr.push('<tr class="l-grid-grouprow"');
                        gridhtmlarr.push(' groupindex"=' + i + '" >');
                        gridhtmlarr.push('<td colSpan="' + g.headers.length + '" class="l-grid-grouprow-cell">');
                        gridhtmlarr.push('<span class="l-grid-group-togglebtn">&nbsp;&nbsp;&nbsp;&nbsp;</span>');


                        if (p.groupRender)
                            gridhtmlarr.push(p.groupRender(groups[i], p.groupColumnDisplay));
                        else
                            gridhtmlarr.push(p.groupColumnDisplay + ':' + groups[i]);


                        gridhtmlarr.push('</td>');
                        gridhtmlarr.push('</tr>');

                        gridhtmlarr.push(po.getHtmlFromData(item));
                        //汇总
                        if (g.isTotalSummary())
                            gridhtmlarr.push(po.getTotalSummaryHtml(item, "l-grid-totalsummary-group"));
                    });
                }
                else if (p.tree)//启用分页模式
                {
                    if (!p.tree.columnName) p.tree.columnName = "name";
                    if (!p.tree.childrenName) p.tree.childrenName = "children";
                    if (!p.tree.isParent) p.tree.isParent = function (rowData) {
                        var exist = 'children' in rowData;
                        return exist;
                    };
                    if (!p.tree.isExtend) p.tree.isExtend = function (rowData) {
                        if ('isextend' in rowData && rowData['isextend'] == false)
                            return false;
                        return true;
                    };
                    gridhtmlarr.push(po.getHtmlFromData(data[p.root], p.tree, 1));
                    //alert(JSON.stringify( p.tree));
                }
                else {
                    gridhtmlarr.push(po.getHtmlFromData(data[p.root]));
                }
                gridhtmlarr.push('</tbody></table></div>');
                var jgridbody = $(gridhtmlarr.join(''));
                $("tbody:first > tr", jgridbody).each(function () {
                    po.recordRow(this);
                });
                g.gridbody.append(jgridbody);

                g.currentData = data;
                //分组时不需要
                if (!p.groupColumnName) {
                    //创建汇总行
                    po.bulidTotalSummary();
                }
                $("> div:first", g.gridbody).width(g.gridtablewidth);

                po.onResize();
                //分组 - 事件
                $("tbody:first > .l-grid-grouprow", g.gridbody).each(function () {
                    var grouprow = $(this);
                    $(".l-grid-group-togglebtn", grouprow).click(function () {
                        var opening = true;
                        if ($(this).hasClass("l-grid-group-togglebtn-close")) {
                            $(this).removeClass("l-grid-group-togglebtn-close");

                            if (grouprow.hasClass("l-grid-grouprow-last")) {
                                $("td:first", grouprow).width('auto');
                            }
                        }
                        else {
                            opening = false;
                            $(this).addClass("l-grid-group-togglebtn-close");
                            if (grouprow.hasClass("l-grid-grouprow-last")) {
                                $("td:first", grouprow).width(g.gridtablewidth);
                            }
                        }
                        var currentRow = grouprow.next(".l-grid-row,.l-grid-totalsummary-group,.l-grid-detailpanel");
                        while (true) {
                            if (currentRow.length == 0) break;
                            if (opening) {
                                currentRow.show();
                                //如果是明细展开的行，并且之前的状态已经是关闭的，隐藏之
                                if (currentRow.hasClass("l-grid-detailpanel") && !currentRow.prev().find("td.l-grid-row-cell-detail:first span.l-grid-row-cell-detailbtn:first").hasClass("l-open")) {
                                    currentRow.hide();
                                }
                            }
                            else {
                                currentRow.hide();
                            }
                            currentRow = currentRow.next(".l-grid-row,.l-grid-totalsummary-group,.l-grid-detailpanel");
                        }
                    });
                });
                //表体 - 行经过事件
                $("tbody:first > .l-grid-row", g.gridbody).each(function () { po.setRowEven(this); });
                if (p.totalRender) {
                    $(".l-panel-bar-total", grid).remove();
                    $(".l-panel-bar", grid).before('<div class="l-panel-bar-total">' + p.totalRender(g.data, g.filteredData) + '</div>');
                }
                if (p.onAfterShowData) {
                    p.onAfterShowData(grid, data, g);
                }
            },
            onClick: function (e) {
                var obj = (e.target || e.srcElement);
                var tagName = obj.tagName.toLowerCase();
                if (g.grideditor.editingCell) {
                    if (tagName == 'html' || tagName == 'body' || $(obj).hasClass("l-grid-body") || $(obj).hasClass("l-grid-row")) {
                        g.endEdit(true);
                    }
                }
                if (p.allowHideColumn) {
                    if (tagName == 'html' || tagName == 'body' || $(obj).hasClass("l-grid-body") || $(obj).hasClass("l-grid-row") || $(obj).hasClass("l-grid-row-cell-inner") || $(obj).hasClass("l-grid-header") || $(obj).hasClass("l-grid-grouprow-cell") || $(obj).hasClass("l-grid-totalsummary-cell") || $(obj).hasClass("l-grid-totalsummary-cell-inner")) {
                        g.popup.hide();
                    }
                }
            },
            getHtmlFromData: function (dataArray, tree, level, parentrowid) {
                if (!dataArray || !dataArray.length) return "";
                var gridhtmlarr = [];
                var rowlenth = dataArray.length;
                $(dataArray).each(function (i, item) {
                    if (!item) return;
                    if (!p.usePager && i == rowlenth - 1 && !g.isTotalSummary())
                        gridhtmlarr.push('<tr class="l-grid-row l-grid-row-last');
                    else
                        gridhtmlarr.push('<tr class="l-grid-row');
                    if (tree) {
                        gridhtmlarr.push(' l-grid-treerow');
                    }
                    if (p.checkbox && p.isChecked && p.isChecked(item)) {
                        gridhtmlarr.push(' l-checked');
                    }
                    if (i % 2 == 1 && p.alternatingRow)
                        gridhtmlarr.push(' l-grid-row-alt');
                    gridhtmlarr.push('" ');
                    if (tree) gridhtmlarr.push(" treelevel= " + level);
                    if (p.rowAttrRender) gridhtmlarr.push(p.rowAttrRender(item, i));
                    var rowid = g.recordNumber;
                    if (p.rowid) {
                        growid = item[p.rowid];
                        gridhtmlarr.push(" growid= " + growid);
                    }
                    if (p.rowtype) {
                        gridhtmlarr.push(" rowtype='" + item[p.rowtype] + "'");
                    }

                    gridhtmlarr.push(" rowid= " + rowid);
                    g.records[g.recordNumber] = item;
                    g.recordNumber++;
                    if (parentrowid != undefined)
                        gridhtmlarr.push(" parentrowid= " + parentrowid);
                    gridhtmlarr.push(' rowindex="' + i + '">');
                    $(g.headers).each(function (headerCellIndex, headerInfor) {
                        //如果是复选框(系统列)
                        if (this.ischeckbox) {
                            gridhtmlarr.push('<td class="l-grid-row-cell l-grid-row-cell-checkbox" style="width:' + this.width + 'px"><div class="l-grid-hd-cell-inner"><span class="l-grid-row-cell-btn-checkbox"></span></div></td>');
                            return;
                        }
                            //如果是明细列(系统列)
                        else if (this.isdetail) {
                            gridhtmlarr.push('<td class="l-grid-row-cell l-grid-row-cell-detail" style="width:' + this.width + 'px"><div class="l-grid-row-cell-inner"><span class="l-grid-row-cell-detailbtn"></span></div></td>');
                            return;
                        }
                        var column = g.columns[this.columnindex];
                        var colwidth = this.width;
                        if (!this.islast)
                            gridhtmlarr.push('<td class="l-grid-row-cell" columnindex="' + this.columnindex + '" ');
                        else
                            gridhtmlarr.push('<td class="l-grid-row-cell l-grid-row-cell-last" columnindex="' + this.columnindex + '" ');
                        if (this.columnname) gridhtmlarr.push('columnname="' + this.columnname + '"');
                        gridhtmlarr.push(' style = "');
                        if (typeof (colwidth) == "string" && colwidth.indexOf('%') > 0) {
                            gridhtmlarr.push('width:' + colwidth + '; ');
                        }
                        else {
                            gridhtmlarr.push('width:' + colwidth + 'px; ');
                        }
                        if (column && column.hide) {
                            gridhtmlarr.push('display:none;');
                        }
                        if (p.fixedCellHeight)
                            gridhtmlarr.push('"><div class="l-grid-row-cell-inner l-grid-row-cell-inner-fixedheight" ');
                        else
                            gridhtmlarr.push('><div class="l-grid-row-cell-inner" ');
                        if (typeof (colwidth) == "string" && colwidth.indexOf('%') > 0) {
                            gridhtmlarr.push(' style = "width:95%; ');
                        }
                        else {
                            gridhtmlarr.push(' style = "width:' + parseInt(colwidth - 8) + 'px; ');
                        }
                        if (column && column.align) gridhtmlarr.push('text-align:' + column.align + ';');
                        if (column && column.type == "date") {
                            var date = p.renderDate(item[this.columnname]);
                            item[this.columnname] = date;
                        }
                        var content = po.getCellContent(item, i, item[this.columnname], column, tree, level, rowid);

                        gridhtmlarr.push('">' + content + '</div></td>');
                    });
                    gridhtmlarr.push('</tr>');
                    if (tree && tree.isParent(item)) {
                        var childrenData = item[tree.childrenName];
                        if (childrenData)
                            gridhtmlarr.push(po.getHtmlFromData(childrenData, tree, level + 1, rowid));
                    }
                });
                return gridhtmlarr.join('');
            },
            getTreeCellHtml: function (tree, oldContent, rowData, level) {
                var isExtend = tree.isExtend(rowData);
                var isParent = tree.isParent(rowData);
                var content = "";
                for (var i = 1; i < level; i++) {
                    content += "<div class='l-grid-tree-space'></div>";
                }
                if (isExtend && isParent)
                    content += "<div class='l-grid-tree-space l-grid-tree-link l-grid-tree-link-open'></div>";
                else if (isParent)
                    content += "<div class='l-grid-tree-space l-grid-tree-link l-grid-tree-link-close'></div>";
                else
                    content += "<div class='l-grid-tree-space'></div>";
                content += "<span class='l-grid-tree-content'>" + oldContent + "</span>";
                return content;
            },
            getCellContent: function (rowData, rowindex, value, column, tree, level, rowid) {
                var content = "";
                if (!rowData || !column) return "";
                if (column.render) {
                    if (!p.page) p.page = 1;
                    //if (!p.pagesize) p.page = 1;
                    var page = p.page;
                    var pagesize = p.pageSize;
                    content = column.render(rowData, rowindex, value, column, rowid, page, pagesize);
                }
                else if (column.type == 'date') {
                    if (value != null) content = value.toString();
                    if (value instanceof Date) {
                        if (column.format) content = g.getFormatDate(value, column.format);
                        else content = g.getFormatDate(value, p.dateFormat);
                    }
                }
                else {
                    if (value != null) content = value.toString();
                }
                if (tree && tree.columnName == column.name) {
                    content = po.getTreeCellHtml(tree, content, rowData, level);
                }
                if (content == null || content == undefined) content = "";
                return content;
            },
            setRowEven: function (rowobj) {
                if (p.onRClickToSelect || p.onContextmenu) {
                    $(rowobj).bind("contextmenu", function (e) {
                        var obj = (e.target || e.srcElement);
                        if (p.onRClickToSelect)
                            $(this).addClass("l-selected").siblings(".l-selected").removeClass("l-selected");
                        if (p.onContextmenu) {
                            var rowid = $(this).attr("rowid");
                            var rowindex = $(this).attr("rowindex");
                            var rowdata = g.getRow(rowid);
                            return p.onContextmenu({ data: rowdata, rowindex: rowindex, row: this }, e);
                        }
                        return true;
                    });
                }
                $(rowobj).hover(function (e) {
                    if (p.mouseoverRowCssClass)
                        $(this).addClass(p.mouseoverRowCssClass);

                }, function (e) {
                    if (p.mouseoverRowCssClass)
                        $(this).removeClass(p.mouseoverRowCssClass);
                }).click(function (e) {
                    if (p.checkbox) {
                        var srcObj = (e.target || e.srcElement);
                        var selectRowButtonOnly = p.selectRowButtonOnly ? true : false;
                        if (p.enabledEdit) selectRowButtonOnly = true;
                        if (!selectRowButtonOnly || $(srcObj).hasClass("l-grid-row-cell-btn-checkbox")) {
                            var row = $(this);
                            var index = row.attr('rowindex');
                            var rowid = row.attr("rowid");
                            var uncheck = row.hasClass("l-checked");
                            if (p.onBeforeCheckRow) {
                                if (p.onBeforeCheckRow(!uncheck, g.getRow(rowid), index, row[0]) == false) return false;
                            }
                            if (uncheck)
                                row.removeClass("l-checked");
                            else
                                row.addClass("l-checked");
                            p.onCheckRow && p.onCheckRow(!uncheck, g.getRow(rowid), index, row[0]);
                        }
                        if (!p.enabledEdit)
                            return;
                    }
                    var index = $(this).attr('rowindex');
                    var rowid = $(this).attr("rowid");
                    if ($(this).hasClass("l-selected")) {
                        if (!p.allowUnSelectRow) {
                            $(this).addClass("l-selected-again");
                            return;
                        }
                        $(this).removeClass("l-selected l-selected-again");
                        if (p.onUnSelectRow) {
                            p.onUnSelectRow(g.getRow(rowid), index, this);
                        }
                    }
                    else {
                        $(this).siblings(".l-selected").each(function () {
                            if (p.allowUnSelectRow || $(this).hasClass("l-selected-again"))
                                g.endEdit();
                            $(this).removeClass("l-selected l-selected-again");
                        });
                        $(this).addClass("l-selected");
                        if (p.onSelectRow) {
                            p.onSelectRow(g.getRow(rowid), index, this);
                        }
                    }

                }).dblclick(function () {
                    var index = $(this).attr('rowindex');
                    var rowid = $(this).attr('rowid');
                    if (p.onDblClickRow) {
                        p.onDblClickRow(g.getRow(rowid), index, this);
                    }
                });
            },
            applyEditor: function (obj) {
                if (obj.href || obj.type) return true;
                var rowcell;
                if ($(obj).hasClass("l-grid-row-cell")) rowcell = obj;
                else if ($(obj).parent().hasClass("l-grid-row-cell")) rowcell = $(obj).parent()[0];
                if (!rowcell) return;
                var row = $(rowcell).parent();
                var rowindex = row.attr("rowindex");
                var rowid = row.attr("rowid");
                var columnindex = $(rowcell).attr("columnindex");
                var columnname = $(rowcell).attr("columnname");
                var column = g.columns[columnindex];
                if (!column || !column.editor) return;
                var left = $(rowcell).offset().left - g.body.offset().left;
                var top = $(rowcell).offset().top - $(grid).offset().top;
                var rowdata = g.getRow(rowid);
                var currentdata = rowdata[columnname];
                var editParm = {
                    record: rowdata,
                    value: currentdata,
                    column: column,
                    columnname: columnname,
                    columnindex: columnindex,
                    rowindex: rowindex,
                    rowObj: row[0],
                    cellObj: rowcell
                };
                if (p.onBeforeEdit) {
                    if (!p.onBeforeEdit(editParm))
                        return false;
                }
                g.grideditor.css({ left: left, top: top, width: $(rowcell).css('width'), height: $(rowcell).css('height') }).html("");
                g.grideditor.editingCell = rowcell;
                if (column.editor.type == 'date') {
                    if ("" == currentdata || null == currentdata || isNaN(currentdata)) {
                        currentdata = new Date();
                    } else {
                        //注：该字段的type不能为date了，数据形式如："IncomeDay": '2009-08-09'
                        currentdata = g.stringToDate(currentdata);
                    }
                    var $inputText = $("<input type='text'/>");
                    g.grideditor.append($inputText);
                    $inputText.val(g.getFormatDate(currentdata, p.dateFormat));
                    var options = {
                        width: $(rowcell).width(),
                        onChangeDate: function (newValue) {
                            $(rowcell).addClass("l-grid-row-cell-edited");
                            if (column.editor.onChange) column.editor.onChange(rowcell, newValue);
                            editParm.value = newValue;
                            if (po.checkEditAndUpdateCell(editParm)) {
                                if (column.editor.onChanged) column.editor.onChanged(rowcell, newValue);
                            }
                        }
                    };
                    if (column.editor.p)
                        options = $.expend({}, typeof (column.editor.p) == 'function' ? column.editor.p(rowdata, rowindex, currentdata, column) : column.editor.p, options);
                    $inputText.ligerDateEditor(options);
                }
                else if (column.editor.type == 'select') {
                    var $inputText = $("<input type='text'/>");
                    g.grideditor.append($inputText);
                    //$inputText.val(currentdata);
                    var options = {
                        width: $(rowcell).width(),
                        onSelected: function (newValue, newText) {
                            $(rowcell).addClass("l-grid-row-cell-edited");
                            if (column.editor.valueColumnName)
                                rowdata[column.editor.valueColumnName] = newValue;
                            if (column.editor.displayColumnName)
                                rowdata[column.editor.displayColumnName] = newText;
                            if (column.editor.onChange) column.editor.onChange(rowcell, newValue);
                            editParm.value = newValue;
                            if (po.checkEditAndUpdateCell(editParm)) {
                                if (column.editor.onChanged) column.editor.onChanged(rowcell, newValue);
                            }
                        }
                    };
                    if (column.editor.data) options.data = column.editor.data;
                    if (column.editor.dataValueField) options.valueField = column.editor.dataValueField;
                    else if (column.editor.valueColumnName) options.valueField = column.editor.valueColumnName;
                    if (column.editor.dataDisplayField) options.displayField = options.textField = column.editor.dataDisplayField;
                    else if (column.editor.displayColumnName) options.displayField = options.textField = column.editor.displayColumnName;
                    if (column.editor.valueColumnName)
                        options.initValue = rowdata[column.editor.valueColumnName];
                    else if (column.editor.dataDisplayField)
                        options.initText = rowdata[column.editor.dataDisplayField];
                    if (column.editor.p) {
                        var tmp = typeof (column.editor.p) == 'function'
                        ? column.editor.p(rowdata, rowindex, currentdata, column)
                        : column.editor.p;
                        options = $.extend({}, options, tmp);
                    }
                    $inputText.ligerComboBox(options);
                }
                else if (column.editor.type == 'int' || column.editor.type == 'float' || column.editor.type == 'spinner') {
                    var $inputText = $("<input type='text'/>");
                    g.grideditor.append($inputText);
                    $inputText.attr({ style: 'border:#6E90BE' }).val(currentdata);
                    var options = {
                        width: $(rowcell).width(),
                        height: $(rowcell).height(),
                        type: column.editor.type == 'float' ? 'float' : 'int',
                        onChangeValue: function (newValue) {
                            $(rowcell).addClass("l-grid-row-cell-edited");
                            if (column.editor.onChange) column.editor.onChange(rowcell, newValue);
                            editParm.value = newValue;
                            if (po.checkEditAndUpdateCell(editParm)) {
                                if (column.editor.onChanged) column.editor.onChanged(rowcell, newValue);
                            }
                        }
                    };
                    if (column.editor.minValue != undefined) options.minValue = column.editor.minValue;
                    if (column.editor.maxValue != undefined) options.maxValue = column.editor.maxValue;
                    $inputText.ligerSpinner(options);
                }
                else if (column.editor.type == 'string' || column.editor.type == 'text') {
                    var $inputText = $("<input type='text' class='l-text-editing'/>");

                    g.grideditor.append($inputText);
                    $inputText.val(currentdata);

                    var options = {
                        width: $(rowcell).width() - 1,
                        height: $(rowcell).height(),
                        onChangeValue: function (newValue) {
                            $(rowcell).addClass("l-grid-row-cell-edited");
                            if (column.editor.onChange) column.editor.onChange(rowcell, newValue);
                            editParm.value = newValue;
                            if (po.checkEditAndUpdateCell(editParm)) {
                                if (column.editor.onChanged) column.editor.onChanged(rowcell, newValue);
                            }
                        }
                    };
                    $inputText.ligerTextBox(options);
                    $inputText.bind('keydown', function (e) {
                        var key = e.which;
                        if (key == 13) {
                            $inputText.trigger("change");
                            g.endEdit();
                        }
                    });
                    $inputText.parent().addClass("l-text-editing");
                }
                else if (column.editor.type == 'chk' || column.editor.type == 'checkbox') {
                    var $input = $("<input type='checkbox'/>");
                    g.grideditor.append($input);
                    $input[0].checked = currentdata == 1 ? true : false;
                    $input.ligerCheckBox();
                    $input.change(function () {
                        if (column.editor.onChange) column.editor.onChange(rowcell, this.checked);
                        editParm.value = this.checked ? 1 : 0;
                        if (po.checkEditAndUpdateCell(editParm)) {
                            if (column.editor.onChanged) column.editor.onChanged(rowcell, this.checked);
                        }
                    });
                }
                g.grideditor.show();
                //$(":input", g.grideditor).focus();//add
                try {
                    if (typeof (eval(moveEnd)) == "function") {
                        moveEnd($(":input", g.grideditor));
                    }
                } catch (e) { //alert(e);
                }
            },
            checkEditAndUpdateCell: function (editParm) {
                if (p.onBeforeSubmitEdit) {
                    if (!p.onBeforeSubmitEdit(editParm)) return false;
                }
                g.grideditor.editingValue = editParm.value;
                g.updateCell(editParm.cellObj, editParm.value);
                return true;
            },
            getCurrentPageData: function (jsonObj) {
                var data = $.extend({}, jsonObj);
                data[p.root] = new Array();
                if (!jsonObj || !jsonObj[p.root] || !jsonObj[p.root].length) {
                    data[p.record] = 0;
                    return data;
                }
                data[p.record] = jsonObj[p.root].length ? jsonObj[p.root].length : 0;
                if (!p.newPage) p.newPage = 1;
                for (i = (p.newPage - 1) * p.pageSize; i < jsonObj[p.root].length && i < p.newPage * p.pageSize; i++) {
                    var obj = $.extend({}, jsonObj[p.root][i]);
                    data[p.root].push(obj);
                }
                return data;
            },
            //比较某一列两个数据
            compareData: function (data1, data2, columnName, columnType) {
                if (data1[columnName] == null && data2[columnName] != null)
                    return 1;
                else if (data1[columnName] == null && data2[columnName] == null)
                    return 0;
                else if (data1[columnName] != null && data2[columnName] == null)
                    return -1;
                switch (columnType) {
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
            getTotalSummaryHtml: function (data, classCssName) {
                var totalsummaryArr = [];
                if (classCssName)
                    totalsummaryArr.push('<tr class="l-grid-totalsummary ' + classCssName + '">');
                else
                    totalsummaryArr.push('<tr class="l-grid-totalsummary">');
                $(g.headers).each(function (headerCellIndex, headerInfor) {
                    //如果是复选框(系统列)
                    if (this.ischeckbox) {
                        totalsummaryArr.push('<td class="l-grid-totalsummary-cell l-grid-totalsummary-cell-checkbox" style="width:' + this.width + 'px"></td>');
                        return;
                    }
                        //如果是明细列(系统列)
                    else if (this.isdetail) {
                        totalsummaryArr.push('<td class="l-grid-totalsummary-cell l-grid-totalsummary-cell-detail" style="width:' + this.width + 'px"></td>');
                        return;
                    }
                    totalsummaryArr.push('<td class="l-grid-totalsummary-cell');
                    if (this.islast)
                        totalsummaryArr.push(" l-grid-totalsummary-cell-last");
                    totalsummaryArr.push('" ');
                    totalsummaryArr.push('width="' + this.width + '" ');
                    columnname = this.columnname;
                    columnindex = this.columnindex;
                    if (columnname) {
                        totalsummaryArr.push('columnname="' + columnname + '" ');
                    }
                    totalsummaryArr.push('columnindex="' + columnindex + '" ');
                    totalsummaryArr.push('><div class="l-grid-totalsummary-cell-inner"');

                    var column = g.columns[columnindex];
                    if (column.align)
                        totalsummaryArr.push(' textAlign="' + column.align + '"');
                    totalsummaryArr.push('>');

                    if (column.totalSummary) {
                        var isExist = function (type) {
                            for (var i = 0; i < types.length; i++)
                                if (types[i].toLowerCase() == type.toLowerCase()) return true;
                            return false;
                        };
                        var sum = 0, count = 0, avg = 0;
                        var max = parseFloat(data[0][column.name]);
                        var min = parseFloat(data[0][column.name]);
                        for (var i = 0; i < data.length; i++) {
                            count += 1;
                            var value = parseFloat(data[i][column.name]);
                            if (!value) continue;
                            sum += value;
                            if (value > max) max = value;
                            if (value < min) min = value;
                        }
                        avg = sum * 1.0 / data.length;
                        if (column.totalSummary.render) {
                            var renderhtml = column.totalSummary.render({
                                sum: sum,
                                count: count,
                                avg: avg,
                                min: min,
                                max: max
                            }, column, g.data);
                            totalsummaryArr.push(renderhtml);
                        }
                        else if (column.totalSummary.type) {
                            var types = column.totalSummary.type.split(',');
                            if (isExist('sum'))
                                //totalsummaryArr.push("<div>Sum=" + sum.toFixed(2) + "</div>");
                                totalsummaryArr.push("<div>" + sum.toFixed(0) + "</div>");
                            if (isExist('count'))
                                totalsummaryArr.push("<div>Count=" + count + "</div>");
                            if (isExist('max'))
                                totalsummaryArr.push("<div>Max=" + max.toFixed(2) + "</div>");
                            if (isExist('min'))
                                totalsummaryArr.push("<div>Min=" + min.toFixed(2) + "</div>");
                            if (isExist('avg'))
                                totalsummaryArr.push("<div>Avg=" + avg.toFixed(2) + "</div>");
                            if (isExist('total'))
                                totalsummaryArr.push("<div style='text-align:right;'>总计：</div>");
                            if (isExist('sum_money'))
                                //totalsummaryArr.push("<div>Sum=" + sum.toFixed(2) + "</div>");
                                totalsummaryArr.push("<div style='text-align:right;'>￥" + toMoney(sum.toFixed(0)) + "</div>");
                        }
                        totalsummaryArr.push('</div></td>');
                    }
                });
                totalsummaryArr.push('</tr>');
                return totalsummaryArr.join('');
            },
            bulidTotalSummary: function () {
                if (!g.isTotalSummary()) return false;
                if (!g.currentData || g.currentData[p.root].length == 0) return false;
                var totalRow = $(po.getTotalSummaryHtml(g.currentData[p.root]));
                po.recordRow(totalRow[0]);
                $("tbody:first", g.gridbody).append(totalRow);
            },
            buildPager: function () {
                $('.pcontrol input', g.toolbar).val(p.page);
                if (!p.pageCount) p.pageCount = 1;
                $('.pcontrol span', g.toolbar).html(p.pageCount);
                var r1 = parseInt((p.page - 1) * p.pageSize) + 1.0;
                var r2 = parseInt(r1) + parseInt(p.pageSize) - 1;
                if (!p.total) p.total = 0;
                if (p.total < r2) r2 = p.total;
                if (!p.total) r1 = r2 = 0;
                if (r1 < 0) r1 = 0;
                if (r2 < 0) r2 = 0;
                var stat = p.pageStatMessage;
                stat = stat.replace(/{from}/, r1);
                stat = stat.replace(/{to}/, r2);
                stat = stat.replace(/{total}/, p.total);
                stat = stat.replace(/{pagesize}/, p.pageSize);
                $('.l-bar-text', g.toolbar).html(stat);
                if (!p.total) {
                    $(".l-bar-btnfirst span,.l-bar-btnprev span,.l-bar-btnnext span,.l-bar-btnlast span", g.toolbar)
                    .addClass("l-disabled");
                }
                if (p.page == 1) {
                    $(".l-bar-btnfirst span", g.toolbar).addClass("l-disabled");
                    $(".l-bar-btnprev span", g.toolbar).addClass("l-disabled");
                }
                else if (p.page > p.pageCount && p.pageCount > 0) {
                    $(".l-bar-btnfirst span", g.toolbar).removeClass("l-disabled");
                    $(".l-bar-btnprev span", g.toolbar).removeClass("l-disabled");
                }
                if (p.page == p.pageCount) {
                    $(".l-bar-btnlast span", g.toolbar).addClass("l-disabled");
                    $(".l-bar-btnnext span", g.toolbar).addClass("l-disabled");
                }
                else if (p.page < p.pageCount && p.pageCount > 0) {
                    $(".l-bar-btnlast span", g.toolbar).removeClass("l-disabled");
                    $(".l-bar-btnnext span", g.toolbar).removeClass("l-disabled");
                }
            },
            onResize: function () {
                if (p.height && p.height != 'auto') {
                    var windowHeight = $(window).height();
                    //if(g.windowHeight != undefined && g.windowHeight == windowHeight) return;

                    var h = 0;
                    var parentHeight = null;
                    if (typeof (p.height) == "string" && p.height.indexOf('%') > 0) {
                        var gridparent = $(grid).parent();
                        if (p.InWindow || gridparent[0].tagName.toLowerCase() == "body") {
                            parentHeight = windowHeight;
                            parentHeight -= parseInt($('body').css('paddingTop'));
                            parentHeight -= parseInt($('body').css('paddingBottom'));
                        }
                        else {
                            parentHeight = gridparent.height();
                        }
                        h = parentHeight * parseFloat(p.height) * 0.01;
                        if (p.InWindow || gridparent[0].tagName.toLowerCase() == "body")
                            h -= ($(grid).offset().top - parseInt($('body').css('paddingTop')));
                    }
                    else {
                        h = parseInt(p.height);
                    }

                    h += p.heightDiff;
                    g.windowHeight = windowHeight;
                    po.setHeight(h);
                }
            },
            setHeight: function (h) {
                if (p.title) h -= 24;
                if (p.usePager) h -= 32;
                if (p.totalRender) h -= 25;
                h -= 23 * (g.getMulHeaderLevel() - 1);
                h -= 22;
                h > 0 && g.gridbody.height(h);
            },
            dragStart: function (dragtype, e, toDragHeaderIndex) {
                if (dragtype == 'colresize') //列宽调整
                {
                    g.popup.hide();
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
            dragMove: function (e) {
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
            dragEnd: function (e) {
                if (g.colresize) {
                    if (g.colresize.newwidth == undefined) {
                        $('body').css('cursor', 'default');
                        return false;
                    }
                    var mincolumnwidth = 80;
                    var columnindex = g.colresize.columnindex;
                    var column = g.columns[columnindex];
                    if (column && column.minWidth) mincolumnwidth = column.minWidth;
                    var newwidth = g.colresize.newwidth;
                    newwidth = newwidth < mincolumnwidth ? mincolumnwidth : newwidth;
                    var diff = newwidth - g.colresize.width;
                    g.headers[g.toDragHeaderIndex].width += diff;
                    g.gridtablewidth += diff;


                    $("div:first", g.gridheader).width(g.gridtablewidth + 40);
                    $("div:first", g.gridbody).width(g.gridtablewidth);
                    $('td[columnindex=' + columnindex + ']', g.gridheader).css('width', newwidth);
                    if (g.recordNumber > 0) {
                        $('td[columnindex=' + columnindex + ']', g.totalRows).add(g.columnCells[columnindex]).each(function () {
                            $(this).css('width', newwidth);
                            $("div:first", this).css('width', newwidth - 8);
                        });

                    }
                    po.onResize();
                    g.draggingline.hide();

                    g.colresize = false;
                }

                $('body').css('cursor', 'default');
                $.fn.ligerNoSelect && $('body').ligerNoSelect(false);
            }
        };
        var g = new $.ligerManagers.Grid(p, po);
        //头部
        g.header = $(".l-grid-panel-header:first", grid);
        //主体
        g.body = $(".l-panel-body:first", grid);
        //底部工具条         
        g.toolbar = $(".l-panel-bar:first", grid);
        //显示/隐藏列      
        g.popup = $(".l-grid-popup:first", grid);
        //编辑   
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



        po.init();

        $.ligerui.addManager(grid, g);
    };

    var ligerGridSetParms = function (options, fixedP) {
        var p = $.extend({}, $.ligerDefaults.Grid, $.ligerDefaults.GridString, options || {});
        if (p.url && p.data) {
            p.dataType = "local";
        }
        else if (p.url && !p.data) {
            p.dataType = "server";
        }
        else if (!p.url && p.data) {
            p.dataType = "local";
        }
        else if (!p.url && !p.data) {
            p.dataType = "local";
            p.data = [];
        }
        if (p.dataType == "local")
            p.dataAction = "local";
        if (fixedP) {
            $.extend(p, fixedP);
        }
        return p;
    };

    $.fn.ligerGrid = function (options) {
        var fixedP = {};
        this.each(function () {
            var p = ligerGridSetParms(options, fixedP);
            $.ligerAddGrid(this, p);
        });
        return $.ligerui.getManager(this);
    };

})(jQuery);