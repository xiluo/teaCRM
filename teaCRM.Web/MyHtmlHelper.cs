using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Service;
using teaCRM.Service.Impl;


namespace UCsoft.Web
{
    /// <summary>
    /// Html格式化输出辅助类
    /// 2014-06-07 修改 By 唐有炜
    /// </summary>
    public static class MyHtmlHelper
    {
        //===============================================
        //输出相关===================================

        #region 自定义日期格式化

        /// <summary>
        /// 自定义日期格式化 2014-05-25 By 唐有炜
        /// </summary>
        /// <param name="datatime">日期</param>
        /// <param name="formateStr">格式化字符串</param>
        /// <param name="htmlHelper"></param>
        /// <returns></returns>
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
        /// <param name="datatime">日期</param>
        /// <param name="formateStr">格式化字符串</param>
        /// <param name="htmlHelper"></param>
        /// <param name="replaceValue"></param>
        /// <returns></returns>
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
        /// <param name="htmlHelper"></param>
        /// <param name="str"></param>
        /// <param name="length"></param>
        /// <returns></returns>
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
        /// <param name="htmlHelper"></param>
        /// <param name="value"></param>
        /// <param name="replaceValue"></param>
        /// <returns></returns>
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
        /// <param name="helper"></param>
        /// <param name="name">id</param>
        /// <param name="url">图片地址</param>
        /// <param name="altText">说明文字</param>
        /// <param name="htmlAttributes">html属性</param>
        /// <returns></returns>
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
        /// <param name="htmlHelper"></param>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <param name="htmlAttributes"></param>
        /// <returns></returns>
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
        /// <param name="htmlHelper"></param>
        /// <param name="b"></param>
        /// <param name="displayNameTrue"></param>
        /// <param name="displayNameFalse"></param>
        /// <param name="replaceValue"></param>
        /// <returns></returns>
        public static MvcHtmlString BooleanParse(this HtmlHelper htmlHelper, bool? b, string displayNameTrue,
            string displayNameFalse, string replaceValue = "default")
        {
            if (null == b)
            {
                return MvcHtmlString.Create(replaceValue);
            }
            bool state = bool.Parse(b.ToString().ToLower());
            if (state)
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
        /// <param name="htmlHelper"></param>
        /// <param name="value">当前值</param>
        /// <param name="options">选项1|a,2|b</param>
        /// <param name="replaceValue"></param>
        /// <returns></returns>
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

        #region 加载默认图片

        /// <summary>
        /// 加载默认图片 2014-05-25 By 唐有炜
        /// 
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="src"></param>
        /// <param name="imgUrl"></param>
        /// <returns></returns>
        public static MvcHtmlString LoadDefaultPic(this HtmlHelper htmlHelper, string src, string imgUrl)
        {
            if (String.IsNullOrEmpty(src))
            {
                return MvcHtmlString.Create(imgUrl);
            }
            return MvcHtmlString.Create(src);
        }

        public static MvcHtmlString LoadDefaultValue(this HtmlHelper htmlHelper, string value, string replaceValue)
        {
            if (String.IsNullOrEmpty(value) || value == "0000-00-00")
            {
                return MvcHtmlString.Create(replaceValue);
            }
            return MvcHtmlString.Create(value);
        }

        public static MvcHtmlString LoadDefaultValue(this HtmlHelper htmlHelper, int? value, string replaceValue)
        {
            if (null == value || value == 0)
            {
                return MvcHtmlString.Create(replaceValue);
            }
            return MvcHtmlString.Create(value.ToString());
        }

        #endregion

        #region 加载默认图片

        /// <summary>
        /// 加载默认图片 2014-05-25 By 唐有炜
        /// 
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="field"></param>
        /// <returns></returns>
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

        public static VCompanyUser GetCurrentCompanyUser(this HtmlHelper htmlHelper)
        {
            IAccountService accountService = new teaCRM.Service.Impl.AccountServiceImpl();
            var compUser = accountService.GetCurrentCompanyUser();
            return compUser;
        }

        #endregion
    }
}