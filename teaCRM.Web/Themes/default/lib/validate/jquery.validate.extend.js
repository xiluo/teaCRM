///////////////////////////////////////////////////////////////
/*这里是JQuery验证扩展*/
/*2014-09-01 修改 By 唐有炜*/
//jQuery默认实现的验证有
//(1)required:true               必输字段
//(2)remote:"check.ashx"         使用ajax方法调用check.ashx验证输入值
//(3)email:true                  必须输入正确格式的电子邮件
//(4)url:true                    必须输入正确格式的网址
//(5)date:true                   必须输入正确格式的日期
//(6)dateISO:true                必须输入正确格式的日期(ISO)，例如：2009-06-23，1998/01/22 只验证格式，不验证有效性
//(7)number:true                 必须输入合法的数字(负数，小数)
//(8)digits:true                 必须输入整数
//(9)creditcard:                 必须输入合法的信用卡号
//(10)equalTo:"#field"           输入值必须和#field相同
//(11)accept:                    输入拥有合法后缀名的字符串（上传文件的后缀）
//(12)maxlength:5                输入长度最多是5的字符串(汉字算一个字符)
//(13)minlength:10               输入长度最小是10的字符串(汉字算一个字符)
//(14)rangelength:[5,10]         输入长度必须介于 5 和 10 之间的字符串")(汉字算一个字符)
//(15)range:[5,10]               输入值必须介于 5 和 10 之间
//(16)max:5                      输入值不能大于5
//(17)min:10                     输入值不能小于10

///////////////////////////////////////////////////////////////////////////////////////////
//下面是自定义扩展
$(function() {
    //验证手机号
    jQuery.validator.addMethod("phone", function(value, element) {
        var reg = /^1[3|4|5|8|9]\d{9}$/;
        return reg.test(value);
    }, "&nbsp;手机号格式错误!");

    //验证电话号码
    jQuery.validator.addMethod("tel", function(value, element) {
        var reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
        return reg.test(value);
    }, "&nbsp;电话号码格式错误!");

    //验证手机和电话号码
    jQuery.validator.addMethod("mobileTelephome", function(value, element) {
        var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        if (pattern.test(value)) {
            return true;
        } else {
            return false;
        }
    }, "&nbsp;请输入正确的手机或电话号码!");


    //只允许输入汉字以外的字符
    jQuery.validator.addMethod("noCHS", function(value, element) {
        return !(/^[\u4E00-\u9FA0]+$/.test(value));
    }, "&nbsp;不能包含中文字符!");


    //只允许输入汉字以外的字符
    jQuery.validator.addMethod("idcard", function(value, element) {
        return isChinaIDCard(value);
    }, "&nbsp;错误");


});


//==================================================
//身份证验证=================================
//身份证验证函数

function isChinaIDCard(StrNo) {
    StrNo = StrNo.toString();
    if (StrNo.length == 18) {
        var a, b, c;
        if (!isInteger(StrNo.substr(0, 17))) {
            return false;
        }
        a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1)) * 9 + parseInt(StrNo.substr(2, 1)) * 10;
        a = a + parseInt(StrNo.substr(3, 1)) * 5 + parseInt(StrNo.substr(4, 1)) * 8 + parseInt(StrNo.substr(5, 1)) * 4;
        a = a + parseInt(StrNo.substr(6, 1)) * 2 + parseInt(StrNo.substr(7, 1)) * 1 + parseInt(StrNo.substr(8, 1)) * 6;
        a = a + parseInt(StrNo.substr(9, 1)) * 3 + parseInt(StrNo.substr(10, 1)) * 7 + parseInt(StrNo.substr(11, 1)) * 9;
        a = a + parseInt(StrNo.substr(12, 1)) * 10 + parseInt(StrNo.substr(13, 1)) * 5 + parseInt(StrNo.substr(14, 1)) * 8;
        a = a + parseInt(StrNo.substr(15, 1)) * 4 + parseInt(StrNo.substr(16, 1)) * 2;
        b = a % 11;

        if (b == 2) //最后一位为校验位  
        {
            c = StrNo.substr(17, 1).toUpperCase(); //转为大写X  
        } else {
            c = parseInt(StrNo.substr(17, 1));
        }

        switch (b) {
        case 0:
            if (c != 1) {
                return false;
            }
            break;
        case 1:
            if (c != 0) {
                return false;
            }
            break;
        case 2:
            if (c != "X") {
                return false;
            }
            break;
        case 3:
            if (c != 9) {
                return false;
            }
            break;
        case 4:
            if (c != 8) {
                return false;
            }
            break;
        case 5:
            if (c != 7) {
                return false;
            }
            break;
        case 6:
            if (c != 6) {
                return false;
            }
            break;
        case 7:
            if (c != 5) {
                return false;
            }
            break;
        case 8:
            if (c != 4) {
                return false;
            }
            break;
        case 9:
            if (c != 3) {
                return false;
            }
            break;
        case 10:
            if (c != 2) {
                return false;
            }
        }
    } else //15位身份证号  
    {
        if (!isInteger(StrNo)) {
            return false;
        }
    }

    switch (StrNo.length) {
    case 15:
        if (isValidDate("19" + StrNo.substr(6, 2), StrNo.substr(8, 2), StrNo.substr(10, 2))) {
            return true;
        } else {
            return false;
        }
    case 18:
        if (isValidDate(StrNo.substr(6, 4), StrNo.substr(10, 2), StrNo.substr(12, 2))) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

function isValidDate(iY, iM, iD) {
    var a = new Date(iY, iM - 1, iD);
    var y = a.getFullYear();
    var m = a.getMonth();
    var d = a.getDate();
    if (y != iY || (m + 1) != iM || d != iD) {
        return false;
    }
    return true;
}

function isInteger(str) {
    if (/[^\d]+$/.test(str)) {
        return false;
    }
    return true;
}


function IDUpdate(StrNo) {

    if (!isChinaIDCard(StrNo)) {
        return false;
    }
    if (StrNo.length == 15) {
        var a, b, c;
        StrNo = StrNo.substr(0, 6) + "19" + StrNo.substr(6, 9);
        a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1)) * 9 + parseInt(StrNo.substr(2, 1)) * 10;
        a = a + parseInt(StrNo.substr(3, 1)) * 5 + parseInt(StrNo.substr(4, 1)) * 8 + parseInt(StrNo.substr(5, 1)) * 4;
        a = a + parseInt(StrNo.substr(6, 1)) * 2 + parseInt(StrNo.substr(7, 1)) * 1 + parseInt(StrNo.substr(8, 1)) * 6;
        a = a + parseInt(StrNo.substr(9, 1)) * 3 + parseInt(StrNo.substr(10, 1)) * 7 + parseInt(StrNo.substr(11, 1)) * 9;
        a = a + parseInt(StrNo.substr(12, 1)) * 10 + parseInt(StrNo.substr(13, 1)) * 5 + parseInt(StrNo.substr(14, 1)) * 8;
        a = a + parseInt(StrNo.substr(15, 1)) * 4 + parseInt(StrNo.substr(16, 1)) * 2;
        b = a % 11;

        switch (b) {
        case 0:
            {
                StrNo = StrNo + "1";
            }
            break;
        case 1:
            {
                StrNo = StrNo + "0";
            }
            break;
        case 2:
            {
                StrNo = StrNo + "X";
            }
            break;
        case 3:
            {
                StrNo = StrNo + "9";
            }
            break;
        case 4:
            {
                StrNo = StrNo + "8";
            }
            break;
        case 5:
            {
                StrNo = StrNo + "7";
            }
            break;
        case 6:
            {
                StrNo = StrNo + "6";
            }
            break;
        case 7:
            {
                StrNo = StrNo + "5";
            }
            break;
        case 8:
            {
                StrNo = StrNo + "4";
            }
            break;
        case 9:
            {
                StrNo = StrNo + "3";
            }
            break;
        case 10:
        {
            StrNo = StrNo + "3";
        }
        }
    }
    return StrNo;
}
//=================================================================