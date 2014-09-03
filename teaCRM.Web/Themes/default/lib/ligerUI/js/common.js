var defaultValidateErrorPlacement = function (lable, element)
{
    if (element.hasClass("l-textarea")) element.ligerTip({ content: lable.html(), appendIdTo: lable });
    else if (element.hasClass("l-text-field")) element.parent().ligerTip({ content: lable.html(), appendIdTo: lable });
    else lable.appendTo(element.parents("td:first").next("td"));
};

var defaultValidateSuccess = function (lable)
{
    lable.ligerHideTip();
};

var deafultValidate = function (validateElements)
{
    return  validateElements.validate({
        errorPlacement: function (lable, element)
        {
            defaultValidateErrorPlacement(lable, element);
        },
        success: function (lable)
        {
            defaultValidateSuccess(lable);
        }
    });
};
$(function () {
    if (jQuery.validator) {
        //字母数字
        jQuery.validator.addMethod("alnum", function (value, element) {
            return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
        }, "只能包括英文字母和数字");

        //货币
        jQuery.validator.addMethod("Coin", function (value, element) {
            return this.optional(element) || /^((([1-9]{1,3},)([0-9]{3},)*)?(\d{1,3})\.\d{2}$)|((^\d*\.)?\d{2} $)|(^\d $)  /.test(value);
        });

        // 手机号码验证   
        jQuery.validator.addMethod("cellphone", function (value, element) {
            var length = value.length;
            return this.optional(element) || (length == 11 && /^(1\d{10})$/.test(value));
        }, "请正确填写手机号码");

        // 电话号码验证   
        jQuery.validator.addMethod("telephone", function (value, element) {
            var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
            return this.optional(element) || (tel.test(value));
        }, "请正确填写电话号码");

        // 邮政编码验证
        jQuery.validator.addMethod("zipcode", function (value, element) {
            var tel = /^[0-9]{6}$/;
            return this.optional(element) || (tel.test(value));
        }, "请正确填写邮政编码");

        // 汉字
        jQuery.validator.addMethod("chcharacter", function (value, element) {
            var tel = /^[\u4e00-\u9fa5]+$/;
            return this.optional(element) || (tel.test(value));
        }, "请输入汉字");

        // QQ
        jQuery.validator.addMethod("qq", function (value, element) {
            var tel = /^[1-9][0-9]{4,}$/;
            return this.optional(element) || (tel.test(value));
        }, "请输入正确的QQ");

        // 用户名
        jQuery.validator.addMethod("username", function (value, element) {
            return this.optional(element) || /^[a-zA-Z]\w*$/.test(value);
        }, "必须以字母开头");

        // 用户名
        jQuery.validator.addMethod("unnumber", function (value, element) {
            return this.optional(element) || /^(?![0-9])(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value);
        }, "不能以数字开头");

        //身份证
        jQuery.validator.addMethod("IdNumber", function (value, element) {
            var tel = /(^\d{15}$)|(^\d{17}([0-9]|X)$)|(^\d{17}([0-9]|x)$)/;
            return this.optional(element) || (tel.test(value));
        }, "请输入正确的身份证号码");
        //网址
        jQuery.validator.addMethod("IsURL", function (value, element) {
            var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
              + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
              + "(([0-9]{1,3}/.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
              + "|" // 允许IP和DOMAIN（域名）
              + "([0-9a-z_!~*'()-]+/.)*" // 域名- www.
              + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]/." // 二级域名
              + "[a-z]{1,6})" // first level domain- .com or .museum
              + "(:[0-9]{1,4})?" // 端口- :80
              + "((/?)|" // a slash isn't required if there is no file name
              + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
            var re = new RegExp(strRegex);
            return this.optional(element) || (re.test(value));
        }, "请输入正确的网址");
    }
});


var GetUrlParam = function(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var SetButtons = function (toolbar ,url)
{
    if (!url)
    { 
        url = '../service/SystemData.ashx?Action=GetButton';
        url += '&MenuNo=' + GetUrlParam('MenuNo');
    }
    url += "&rnd" + Math.random(); 
    $.getJSON(url, function (data)
    {
        if (!data) return;
        var buttons = []; 
        $(data).each(function (i, dataitem)
        {
            var btn = { text: this.name, icon: this.icon, id: this.id };
            if (f_btnClick) btn.click = f_btnClick;
            buttons.push(btn);
        });
        toolbar.ligerToolBar({ items: buttons });
    });
};