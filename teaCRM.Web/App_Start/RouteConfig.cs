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


            //设置路由
            routes.MapRoute(
                name: "Settings",
                url: "Apps/Settings/{controller}/{action}/{id}",
                defaults: new { controller = "Department", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "teaCRM.Web.Controllers.Apps.Settings" }
                );

            //服务路由
            routes.MapRoute(
                name: "Service",
                url: "Apps/Service/{controller}/{action}/{id}",
                defaults: new { controller = "Index", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "teaCRM.Web.Controllers.Apps.Service" }
                );

            //产品路由
            routes.MapRoute(
                name: "Product",
                url: "Apps/Product/{controller}/{action}/{id}",
                defaults: new { controller = "Index", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "teaCRM.Web.Controllers.Apps.Product" }
                );

            //销售路由
            routes.MapRoute(
                name: "Sale",
                url: "Apps/Sale/{controller}/{action}/{id}",
                defaults: new { controller = "Index", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "teaCRM.Web.Controllers.Apps.Sale" }
                );

            //CRM路由
            routes.MapRoute(
                name: "CRM",
                url: "Apps/CRM/{controller}/{action}/{id}",
                defaults: new {controller = "Index", action = "Index", id = UrlParameter.Optional},
                namespaces: new string[] {"teaCRM.Web.Controllers.Apps.CRM"}
                );


            //应用市场路由
            routes.MapRoute(
                name: "Apps",
                url: "Apps/{controller}/{action}/{id}",
                defaults: new { controller = "Market", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "teaCRM.Web.Controllers.Apps" }
                );

            //工作人员后台路由路由
            routes.MapRoute(
                name: "Admin",
                url: "Admin/{controller}/{action}/{id}",
                defaults: new { controller = "Main", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "teaCRM.Web.Controllers.Admin" }
                );

            //默认路由
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Desktop", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] {"teaCRM.Web.Controllers"}
                );
        }
    }
}