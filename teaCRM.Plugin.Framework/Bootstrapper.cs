using System.Web.Mvc;
using teaCRM.Plugin.Framework;
using teaCRM.Plugin.Framework.Mvc;

//取消自动注册

[assembly: System.Web.PreApplicationStartMethod(typeof(Bootstrapper), "Initialize")]
namespace teaCRM.Plugin.Framework
{
    /// <summary>
    /// 引导程序。
    /// </summary>
    public static class Bootstrapper
    {
        /// <summary>
        /// 初始化。
        /// </summary>
        public static void Initialize()
        {
            //注册插件控制器工厂。
            ControllerBuilder.Current.SetControllerFactory(new PluginControllerFactory());

            //注册插件模板引擎。
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new PluginRazorViewEngine());

            //初始化插件。
            PluginManager.Initialize();

            //启动插件检测器。
            PluginWatcher.Start();
        }
    }
}
