using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.WebPages;
using teaCRM.Common;

namespace teaCRM.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    //public class MvcApplication : System.Web.HttpApplication
    public class MvcApplication : Spring.Web.Mvc.SpringMvcApplication
    {
        protected void Application_Start()
        {
            //注册区域
            AreaRegistration.RegisterAllAreas();
            //注册WebApi
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            //注册过滤器
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            RegisterView(); //注册视图访问规则
        }

        /// <summary>
        /// 注册自定义视图
        /// </summary>
        protected void RegisterView()
        {
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new MyViewEngine());
        }
//
//        /// <summary>
//        /// 捕捉全局异常
//        /// </summary>
//        /// <param name="sender"></param>
//        /// <param name="e"></param>
//        protected void Application_Error(object sender, EventArgs e)
//        {
//            // 在出现未处理的错误时运行的代码
//            Exception objExp = HttpContext.Current.Server.GetLastError();
//          
//            //获取用户id
//            if (Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID] != null)
//            {
//                LogHelper.Error("客户端IP为" + Request.UserHostAddress + ",id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID] .ToString()+ "的用户在访问" +
//                         Request.Url + "时发生了异常," + objExp.Message);
//            }
//            else
//            {
//                LogHelper.Error("客户端IP为" + Request.UserHostAddress + "的用户在访问" +
//                         Request.Url + "时发生了异常," + objExp.Message);
//            }
//         
//        }
    }
}