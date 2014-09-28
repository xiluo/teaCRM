// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-18-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-21-2014

using System.Text;
using NLite.Data.CodeGeneration;
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="MyHtmlHelper.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Web.Mvc;
using System.Web.Routing;
using Spring.Context;
using Spring.Context.Support;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Service;

/// <summary>
/// The Helpers namespace.
/// </summary>

namespace teaCRM.Web.Helpers
{
    /// <summary>
    /// Html格式化输出辅助类
    /// 2014-06-07 修改 By 唐有炜
    /// </summary>
    public static class MyHtmlHelper
    {
        #region 根据字段属性输出对应的表单元素 14-09-26 By 唐有炜

        /// <summary>
        /// 获取表单字段html 14-09-26 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="expCtype">字段类型（1 字符 2 长字符 3 连接 4 数字 5下拉框 6复选框 7单选框 8 附件 9日期 10时间 11手机 12QQ 13 微信号 14邮箱）</param>
        /// <param name="expName">属性名称</param>
        /// <param name="expTitle">The exp_title.</param>
        /// <param name="expOpton">The exp opton.</param>
        /// <param name="expIsNull">The exp is null.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString GetFormFieldHtmlString(this HtmlHelper htmlHelper, int expCtype, string expName,
            string expTitle, string expCss, int expIsNull, string expOpton)
        {
            if (expName.Contains("_"))
            {
                expName = NamingConversion.Default.PropertyName(expName);
            }

            StringBuilder FieldHtmlString = new StringBuilder();

            switch (expCtype)
            {
                case 1: //短文本框
                    FieldHtmlString.Append(String.Format("<div class=\"{0}\">", expCss));
                    FieldHtmlString.Append("<div class=\"tit\">");
                    FieldHtmlString.Append(BooleanParse(htmlHelper, expIsNull, "<em class=\"imp\">*</em>", "", ""));
                    FieldHtmlString.Append(string.Format("{0}：", expTitle));
                    FieldHtmlString.Append("</div>");
                    FieldHtmlString.Append(
                        string.Format(
                            "<input type=\"text\" name=\"{0}\" id=\"{0}\" class=\"form-control comm-tbox-1\" />",
                            expName));
                    FieldHtmlString.Append("</div>");
                    break;
//                        case 2: //长文本框
//                            <dl>
//                                <dt>
//                                    @Html.BooleanParse(field.ExpIsNull, "<em class=\"imp\">*</em>", "", "")
//                                    @field.ExpTitle ：
//                                </dt>
//                                <dd>
//                                    <textarea class="form-control comm-abox-1 " id="@field.ExpName" name="@field.ExpName" cols="50" rows="5"></textarea>
//                                </dd>
//                            </dl>
//                            break;
//                        case 3: //短文本框(链接)
//                            <dl>
//                                <dt>
//                                    @Html.BooleanParse(field.ExpIsNull, "<em class=\"imp\">*</em>", "", "")
//                                    @field.ExpTitle ：
//                                </dt>
//                                <dd>
//                                    <input type="text" id="@field.ExpName" name="@field.ExpName" class="form-control " />
//                                </dd>
//                            </dl>
//                            break;
//                        case 4: //短文本框(年龄)
//                            <dl>
//                                <dt>
//                                    @Html.BooleanParse(field.ExpIsNull, "<em class=\"imp\">*</em>", "", "")
//                                    @field.ExpTitle ：
//                                </dt>
//                                <dd>
//                                    <input type="text" id="@field.ExpName" class="form-control comm-tbox-1 " name="@field.ExpName" />
//                                </dd>
//                            </dl>
//                            break;
//                        case 5: //下拉框
//                            <dl>
//                                <dt>
//                                    @Html.BooleanParse(field.ExpIsNull, "<em class=\"imp\">*</em>", "", "")
//                                    @field.ExpTitle ：
//                                </dt>
//                                <dd>
//                                    <select id="@field.ExpName" name="@field.ExpName" class="form-control ">
//                                        <option selected="selected" value="">--请选择--</option>
//                                        @Html.StringToOptions(field.ExpOption)
//                                    </select>
//                                </dd>
//                            </dl>
//                            break;
//                        case 6: //复选框
//                            <dl>
//                                <dt>
//                                    @Html.BooleanParse(field.ExpIsNull, "<em class=\"imp\">*</em>", "", "")
//                                    @field.ExpTitle ：
//                                </dt>
//                                <dd>
//                                    @Html.StringToCheckboxList(field.ExpOption, field.ExpName, field.ExpName, field.ExpTitle, field.ExpIsNull)
//                                </dd>
//                            </dl>
//                            break;
//                        case 7: //附件上传
//                            <dl>
//                                <dt>
//                                    @Html.BooleanParse(field.ExpIsNull, "<em class=\"imp\">*</em>", "", "")
//                                    @field.ExpTitle
//                                </dt>
//                                <dd>
//                                    <div class="box">
//                                        <input type="text" name="copyFile" class="form-control textbox" />
//                                        <a href="javascript:void(0);" class="link">浏览</a>
//                                        <input type="file" class="form-control uploadFile" name="upload" onChange=" getFile(this, 'copyFile') " />
//                                    </div>
//                                </dd>
//                            </dl>
//                            break;
//                        case 8: //时间日期
//                            <dl>
//                                <dt>
//                                    @Html.BooleanParse(field.ExpIsNull, "<em class=\"imp\">*</em>", "", "")
//                                    @field.ExpTitle ：
//                                </dt>
//                                <dd>
//                                    <input type="text" id="@field.ExpName" name="@field.ExpName" class="form-control Wdate " style="width: 90px;" onClick=" WdatePicker({ dateFmt: 'yyyy-MM-dd' }) " />
//                                </dd>
//                            </dl>
//                            break;
//                        case 9: //复选框
//                            <dl>
//                                <dt>
//                                    @Html.BooleanParse(field.ExpIsNull, "<em class=\"imp\">*</em>", "", "")
//                                    @field.ExpTitle
//                                </dt>
//                                <dd>
//                                    @Html.StringToCheckboxList(field.ExpOption, field.ExpName, field.ExpName, field.ExpTitle, field.ExpIsNull)
//                                </dd>
//                            </dl>
//                            break;
                default:
                    FieldHtmlString.Append(String.Format("<div class='span6'><div class=\"tit\"><em class='imp'></em>默认字段：</div> <input type='text' id=\"{0}\" name=\"{0}\" class='form-control ' placeholder=''/></div>",expName));
                    break;
            }


            return MvcHtmlString.Create(FieldHtmlString.ToString());
        }

        #endregion

        #region 自定义日期格式化

        /// <summary>
        /// 自定义日期格式化 2014-05-25 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="datatime">日期</param>
        /// <param name="formateStr">格式化字符串</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString DateTimeParse(this HtmlHelper htmlHelper, DateTime? datatime, string formateStr)
        {
            if (datatime == null)
            {
                return MvcHtmlString.Create("0000-00-00");
            }

            var dt = (DateTime) datatime;
            return MvcHtmlString.Create(dt.ToString(formateStr));
        }

        /// <summary>
        /// 自定义日期格式化 2014-05-25 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="datatime">日期</param>
        /// <param name="formateStr">格式化字符串</param>
        /// <param name="replaceValue">The replace value.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString DateTimeParse(this HtmlHelper htmlHelper, DateTime? datatime, string formateStr,
            string replaceValue = "")
        {
            if (datatime == null)
            {
                return MvcHtmlString.Create("0000-00-00");
            }

            var dt = (DateTime) datatime;

            if (!String.IsNullOrEmpty(replaceValue))
            {
                if ((DateTime.Now.Month - dt.Month > 1))
                {
                    return MvcHtmlString.Create(replaceValue);
                }
            }
            return MvcHtmlString.Create(dt.ToString(formateStr));
        }


        /// <summary>
        /// Formates the date time.
        /// </summary>
        /// <param name="datatime">The datatime.</param>
        /// <param name="formateStr">The formate string.</param>
        /// <returns>System.String.</returns>
        public static string FormateDateTime(DateTime? datatime, string formateStr)
        {
            if (datatime == null)
            {
                return "0000-00-00";
            }

            var dt = (DateTime) datatime;
            return dt.ToString(formateStr);
        }

        #endregion

        #region 自定义字符串长度

        /// <summary>
        /// 自定义字符串长度 2014-05-25 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="str">The string.</param>
        /// <param name="length">The length.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString StringParse(this HtmlHelper htmlHelper, string str, int length)
        {
            //清楚Html标记
            str = Utils.DropHTML(str);

            if (str.Length <= length)
            {
                return MvcHtmlString.Create(str);
            }

            return MvcHtmlString.Create(str.Substring(0, length) + "...");
        }

        /// <summary>
        /// Strings the parse.
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="str">The string.</param>
        /// <param name="length">The length.</param>
        /// <param name="endStr">The end string.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString StringParse(this HtmlHelper htmlHelper, string str, int length, string endStr)
        {
            //清楚Html标记
            str = Utils.DropHTML(str);

            if (str.Length <= length)
            {
                return MvcHtmlString.Create(str);
            }

            return MvcHtmlString.Create(str.Substring(0, length) + endStr);
        }

        #endregion

        #region 空值判断

        /// <summary>
        /// 自定义字符串长度 2014-05-25 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="value">The value.</param>
        /// <param name="replaceValue">The replace value.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString IsNull(this HtmlHelper htmlHelper, string value, string replaceValue)
        {
            if (String.IsNullOrEmpty(value))
            {
                return MvcHtmlString.Create("");
            }
            else
            {
                return MvcHtmlString.Create(replaceValue);
            }
        }

        #endregion

        #region 自定义Image输出

        /// <summary>
        /// 自定义Image输出
        /// </summary>
        /// <param name="helper">The helper.</param>
        /// <param name="name">id</param>
        /// <param name="url">图片地址</param>
        /// <param name="altText">说明文字</param>
        /// <param name="htmlAttributes">html属性</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString Image(this HtmlHelper helper, string name, string url, string altText,
            object htmlAttributes)
        {
            TagBuilder builder = new TagBuilder("img");
            builder.Attributes.Add("id", name);
            builder.Attributes.Add("name", name);
            builder.Attributes.Add("src", url);
            builder.Attributes.Add("alt", altText);
            builder.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            return MvcHtmlString.Create(builder.ToString(TagRenderMode.SelfClosing));
        }

        #endregion

        #region 自定义Submit输出

        /// <summary>
        /// 自定义Submit输出
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="name">The name.</param>
        /// <param name="value">The value.</param>
        /// <param name="htmlAttributes">The HTML attributes.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString Submit(this HtmlHelper htmlHelper, string name, object value, object htmlAttributes)
        {
            TagBuilder builder = new TagBuilder("input");
            builder.Attributes.Add("id", name);
            builder.Attributes.Add("name", name);
            builder.Attributes.Add("value", value.ToString());
            builder.Attributes.Add("type", "submit");
            builder.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            return MvcHtmlString.Create(builder.ToString(TagRenderMode.SelfClosing));
        }

        #endregion

        #region Boolean格式化输出

        /// <summary>
        /// Boolean格式化输出 2014-05-25 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="b">The b.</param>
        /// <param name="displayNameTrue">The display name true.</param>
        /// <param name="displayNameFalse">The display name false.</param>
        /// <param name="replaceValue">The replace value.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString BooleanParse(this HtmlHelper htmlHelper, int? b, string displayNameTrue,
            string displayNameFalse, string replaceValue = "default")
        {
            if (null == b)
            {
                return MvcHtmlString.Create(replaceValue);
            }
            if (b == 1)
            {
                return MvcHtmlString.Create(displayNameTrue);
            }
            return MvcHtmlString.Create(displayNameFalse);
        }

        #endregion

        #region 整型多选项输出

        /// <summary>
        /// 整型多选项输出 2014-07-29 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="value">当前值</param>
        /// <param name="options">选项1|a,2|b</param>
        /// <param name="replaceValue">The replace value.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString OptionsPalse(this HtmlHelper htmlHelper, int? value, string options,
            string replaceValue = "default")
        {
            if (value != null)
            {
                string result = "";
                string[] str_arr = options.Split(',');
                foreach (var str in str_arr)
                {
                    if (value == int.Parse(str.Split('|')[0].ToString()))
                    {
                        result = str.Split('|')[1];
                    }
                }
                return MvcHtmlString.Create(result);
            }
            else
            {
                return MvcHtmlString.Create(replaceValue);
            }
        }

        #endregion

        #region 下拉框输出

        /// <summary>
        /// 下拉框输出
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="value">v1|t1,v2|t2</param>
        /// <returns>MvcHtmlString.</returns>
        //<option>aaaa</option>
        //<option>aaaa</option>
        public static MvcHtmlString StringToOptions(this HtmlHelper htmlHelper, string value)
        {
            if (!String.IsNullOrEmpty(value))
            {
                string result = "";
                string[] str_arr = value.Split(',');
                foreach (var str in str_arr)
                {
                    result += "<option value=\"" + str.Split('|')[0] + "\">" + str.Split('|')[1] + "</option>";
                }
                return MvcHtmlString.Create(result);
            }
            else
            {
                return MvcHtmlString.Create("<option>default</option>");
            }
        }

        /// <summary>
        /// 根据id获取制定下拉框的值
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="key">The key.</param>
        /// <param name="options">选项</param>
        /// <param name="replaceValue">The replace value.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString GetOptionValue(this HtmlHelper htmlHelper, string key, string options,
            string replaceValue = "default")
        {
            string[] str_arr = options.Split(',');
            foreach (var str in str_arr)
            {
                var k = str.Split('|')[0];
                var v = str.Split('|')[1];
                if (key == k)
                {
                    return MvcHtmlString.Create(v);
                }
            }
            return MvcHtmlString.Create(replaceValue);
        }

        #endregion

        #region 文本复选框   2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 复选框
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="value">v1|t1,v2|t2</param>
        /// <param name="id">The identifier.</param>
        /// <param name="name">The name.</param>
        /// <param name="field_cname">The field_cname.</param>
        /// <param name="field_required">The field_required.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString StringToCheckboxList(this HtmlHelper htmlHelper, string value, string id,
            string name, string field_cname, int field_required)
        {
            if (!String.IsNullOrEmpty(value))
            {
                string result = "";
                string[] str_arr = value.Split(',');

                foreach (var str in str_arr)
                {
                    result +=
                        String.Format(
                            "<input type=\"checkbox\" field_type=\"radio\" style=\"padding-right: 10px; padding-left: 10px;value=\"{0}\" id=\"{1}\" name=\"{2}\" field_cname=\"{3}\" field_required=\"{4}\" />{5}",
                            str.Split('|')[0], id, name, field_cname, field_required, str.Split('|')[1]);
                    //result += String.Format("{0},{1},{2}", 1,2,3);
                    //result += "<input type=\"checkbox\" field_type=\"checkbox\" style=\"padding-right: 10px; padding-left: 10px;\" value=\"" + str.Split('|')[0] +
                    //          "\"/>" + str.Split('|')[1];
                }
                return MvcHtmlString.Create(result);
            }
            else
            {
                return MvcHtmlString.Create("<input type=\"checkbox\"/>");
            }
        }

        #endregion

        #region 加载默认图片

        /// <summary>
        /// 加载默认图片 2014-05-25 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="src">The source.</param>
        /// <param name="imgUrl">The img URL.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString LoadDefaultPic(this HtmlHelper htmlHelper, string src, string imgUrl)
        {
            if (String.IsNullOrEmpty(src))
            {
                return MvcHtmlString.Create(imgUrl);
            }
            return MvcHtmlString.Create(src);
        }

        /// <summary>
        /// Loads the default value.
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="value">The value.</param>
        /// <param name="replaceValue">The replace value.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString LoadDefaultValue(this HtmlHelper htmlHelper, string value, string replaceValue)
        {
            if (String.IsNullOrEmpty(value) || value == "0000-00-00")
            {
                return MvcHtmlString.Create(replaceValue);
            }
            return MvcHtmlString.Create(value);
        }

        /// <summary>
        /// Loads the default value.
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="value">The value.</param>
        /// <param name="replaceValue">The replace value.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString LoadDefaultValue(this HtmlHelper htmlHelper, int? value, string replaceValue)
        {
            if (null == value || value == 0)
            {
                return MvcHtmlString.Create(replaceValue);
            }
            return MvcHtmlString.Create(value.ToString());
        }


        /// <summary>
        /// Loads the default value.
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="obj">The object.</param>
        /// <param name="value">The value.</param>
        /// <param name="replaceValue">The replace value.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString LoadDefaultValue(this HtmlHelper htmlHelper, dynamic obj, object value,
            string replaceValue)
        {
            if (null == obj || null == value)
            {
                return MvcHtmlString.Create(replaceValue);
            }
            return MvcHtmlString.Create(value.ToString());
        }

        #endregion

        #region 加载默认图片

        /// <summary>
        /// 加载默认图片 2014-05-25 By 唐有炜
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="field">The field.</param>
        /// <returns>MvcHtmlString.</returns>
        public static MvcHtmlString NullPalse(this HtmlHelper htmlHelper, object field)
        {
            if (null == field)
            {
                return MvcHtmlString.Create("");
            }
            return MvcHtmlString.Create(field.ToString());
        }

        #endregion

        //===============================================
        //账户相关===================================

        #region 获取企业用户

        /// <summary>
        /// Gets the current company user.
        /// </summary>
        /// <param name="htmlHelper">The HTML helper.</param>
        /// <param name="userId">The user identifier.</param>
        /// <returns>VCompanyUser.</returns>
        public static VCompanyUser GetCurrentCompanyUser(this HtmlHelper htmlHelper, int userId)
        {
            //IAccountService accountService = new teaCRM.Service.Impl.AccountServiceImpl();
            //使用Spring接管对象的创建
            IApplicationContext ctx = ContextRegistry.GetContext();
            IAccountService AccountService = ctx.GetObject("accountService") as IAccountService;
            var compUser = AccountService.GetCurrentCompanyUser(userId);
            return compUser;
        }

        #endregion
    }
}