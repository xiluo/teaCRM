using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

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
    }
}