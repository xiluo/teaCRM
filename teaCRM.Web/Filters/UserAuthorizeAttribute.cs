using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Common;

namespace teaCRM.Web.Filters
{
    /// <summary>
    ///账户授权过滤器 2014-08-22 14:58:50 By 唐有炜
    /// </summary>
    public class UserAuthorizeAttribute : FilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            //检查是否登录
            if (filterContext.HttpContext.Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID] == null)
            {
                filterContext.Result = new HttpUnauthorizedResult(); //返回未授权Result
                //跳转到登录页面
                filterContext.HttpContext.Response.Redirect("/Account/Login/");
            }
           
        }
    }
}