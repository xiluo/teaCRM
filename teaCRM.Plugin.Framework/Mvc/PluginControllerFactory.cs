using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace teaCRM.Plugin.Framework.Mvc
{
    /// <summary>
    /// 插件控制器工厂。
    /// </summary>
    public class PluginControllerFactory : DefaultControllerFactory
    {
        /// <summary>
        /// 根据控制器名称及请求信息获得控制器类型。
        /// </summary>
        /// <param name="requestContext">请求信息</param>
        /// <param name="controllerName">控制器名称。</param>
        /// <returns>控制器类型。</returns>
        protected override Type GetControllerType(RequestContext requestContext, string controllerName)
        {
            Type controllerType = this.GetControllerType(controllerName);

            if (controllerType == null)
            {
                controllerType = base.GetControllerType(requestContext, controllerName);
            }

            return controllerType;
        }

        /// <summary>
        /// 根据控制器名称获得控制器类型。
        /// </summary>
        /// <param name="controllerName">控制器名称。</param>
        /// <returns>控制器类型。</returns>
        private Type GetControllerType(string controllerName)
        {
            foreach (var plugin in PluginManager.GetPlugins())
            {
                var type = plugin.GetControllerType(controllerName + "Controller");

                if (type != null)
                {
                    return type;
                }
            }

            return null;
        }
    }
}