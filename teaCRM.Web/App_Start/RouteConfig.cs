using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace teaCRM.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //系统设置路由
            routes.MapRoute(
                name: "Settings",
                url: "Settings/{controller}/{action}/{id}",
                defaults: new {controller = "Index", action = "Index", id = UrlParameter.Optional}
                );


            //默认路由
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Index", action = "Index", id = UrlParameter.Optional }
                );
        }
    }
}