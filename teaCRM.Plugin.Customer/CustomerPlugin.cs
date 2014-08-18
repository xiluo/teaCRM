using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using teaCRM.Plugin.Framework;

namespace teaCRM.Plugin.Customer
{
    /// <summary>
    /// 客户插件。
    /// </summary>
    public class CustomerPlugin:IPlugin
    {  //使用GUID最为路由标识。
        public static string PluginUrl = new Guid().ToString();

        /// <summary>
        /// 插件名称（英文）。
        /// </summary>
        public string Name
        {
            get { return "Customer"; }
        }

        /// <summary>
        /// 插件初始化。
        /// </summary>
        public void Initialize()
        {
            // URL规则。
            // 完整访问：/Plugins/{插件名称}/{控制器名称}/{Action名称}/{可选的id}
            // 默认访问：/Plugins/{插件名称}/{控制器名称}
            RouteTable.Routes.MapRoute(
                name: PluginUrl, //保证路由名称的唯一性
                url: "Plugins/{pluginName}/{controller}/{action}/{id}", //名称统一以/Plugins开头，防止Url冲突，格式：/Plugins/插件名称（英文）
                defaults:
                    new { pluginName = this.Name, controller = "Index", action = "Index", id = UrlParameter.Optional }
                );
        }

        /// <summary>
        /// 插件卸载。
        /// </summary>
        public void Unload()
        {
            RouteTable.Routes.Remove(RouteTable.Routes[PluginUrl]);
        }
    }
}