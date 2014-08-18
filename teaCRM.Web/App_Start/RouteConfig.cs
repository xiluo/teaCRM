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

            //循环添加插件路由
            DirectoryInfo TheFolder = new DirectoryInfo(HttpRuntime.AppDomainAppPath + "/Plugins");
            //遍历文件夹
            DirectoryInfo[] plugins = TheFolder.GetDirectories();
            foreach (var p in plugins)
            {
                var pname = p.Name;
                routes.MapRoute(
                    name: System.Guid.NewGuid().ToString(), //保证路由名称的唯一性
                    url: "Plugins/{pluginName}/{controller}/{action}/{id}",
                    //名称统一以/Plugins开头，防止Url冲突，格式：/Plugins/插件名称（英文）
                    defaults:
                        new {pluginName = pname, controller = "Home", action = "Index", id = UrlParameter.Optional}
                    );
            }
            //设置路由
            routes.MapRoute(
                name: "Settings",
                url: "Settings/{controller}/{action}/{id}",
                defaults: new {controller = "Department", action = "Index", id = UrlParameter.Optional}
                );

//            //默认路由
//            routes.MapRoute(
//                name: "Default",
//                url: "{controller}/{action}/{id}",
//                defaults: new {controller = "Index", action = "Index", id = UrlParameter.Optional}
//                );



                          //默认路由
                        routes.MapRoute(
                            name: "Default",
                            url: "{controller}/{action}/{id}",
                            defaults: new {controller = "Show", action = "Plugin", id = UrlParameter.Optional}
                            );
        }
    }
}