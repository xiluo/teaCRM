using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace teaCRM.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {


            //CRM api
            config.Routes.MapHttpRoute(
                name: "CRMApi",
                routeTemplate: "api/crm/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //设置api
            config.Routes.MapHttpRoute(
                name: "SettingsApi",
                routeTemplate: "api/settings/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //默认api
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
           
        }
    }
}
