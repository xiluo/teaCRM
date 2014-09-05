using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Common;
using teaCRM.Entity;

namespace teaCRM.Web.Filters
{
    /// <summary>
    ///自动登录过滤器 2014-08-22 14:58:50 By 唐有炜
    /// </summary>
    public class AutoLoginAttribute : FilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            //检查是否登录
            if (filterContext.HttpContext.Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID] != null && filterContext.HttpContext.Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM]!=null)
            {
                //跳转到登录页面
                filterContext.HttpContext.Response.Redirect("/");
            }
        }
    }
}