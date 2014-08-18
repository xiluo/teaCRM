using System.Collections.Generic;
using System.Linq;

namespace teaCRM.Plugin.Framework
{
    /// <summary>
    /// 插件管理器。
    /// </summary>
    public static class PluginManager
    {
        /// <summary>
        /// 插件字典。
        /// </summary>
        private readonly static IDictionary<string, PluginDescriptor> _plugins = new Dictionary<string, PluginDescriptor>();

        /// <summary>
        /// 初始化。
        /// </summary>
        public static void Initialize()
        {
            //遍历所有插件描述。
            foreach (var plugin in PluginLoader.Load())
            {
                //卸载插件。
                Unload(plugin);
                //初始化插件。
                Initialize(plugin);
            }
        }

        /// <summary>
        /// 初始化插件。
        /// </summary>
        /// <param name="pluginDescriptor">插件描述</param>
        private static void Initialize(PluginDescriptor pluginDescriptor)
        {
            //使用插件名称做为字典 KEY。
            string key = pluginDescriptor.Plugin.Name;

            //不存在时才进行初始化。
            if (!_plugins.ContainsKey(key))
            {
                //初始化。
                pluginDescriptor.Plugin.Initialize();

                //增加到字典。
                _plugins.Add(key, pluginDescriptor);
            }
        }

        /// <summary>
        /// 卸载。
        /// </summary>
        public static void Unload()
        {
            //卸载所有插件。
            foreach (var plugin in PluginLoader.Load())
            {
                plugin.Plugin.Unload();
            }

            //清空插件字典中的所有信息。
            _plugins.Clear();
        }

        /// <summary>
        /// 卸载。
        /// </summary>
        public static void Unload(PluginDescriptor pluginDescriptor)
        {
            pluginDescriptor.Plugin.Unload();

            _plugins.Remove(pluginDescriptor.Plugin.ToString());
        }

        /// <summary>
        /// 获得当前系统所有插件描述。
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<PluginDescriptor> GetPlugins()
        {
            return _plugins.Select(m => m.Value).ToList();
        }

        /// <summary>
        /// 根据插件名称获得插件描述。
        /// </summary>
        /// <param name="name">插件名称。</param>
        /// <returns>插件描述。</returns>
        public static PluginDescriptor GetPlugin(string name)
        {
            return GetPlugins().SingleOrDefault(plugin => plugin.Plugin.Name == name);
        }
    }
}
