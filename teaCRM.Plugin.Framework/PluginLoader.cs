using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web.Hosting;

namespace teaCRM.Plugin.Framework
{
    /// <summary>
    /// 插件加载器。
    /// </summary>
    public static class PluginLoader
    {
        /// <summary>
        /// 插件目录。
        /// </summary>
        private static readonly DirectoryInfo PluginFolder;

        /// <summary>
        /// 插件临时目录。
        /// </summary>
        private static readonly DirectoryInfo TempPluginFolder;

        /// <summary>
        /// 初始化。
        /// </summary>
        static PluginLoader()
        {
            PluginFolder = new DirectoryInfo(HostingEnvironment.MapPath("~/Plugins"));
            TempPluginFolder = new DirectoryInfo(HostingEnvironment.MapPath("~/App_Data/Dependencies"));
        }

        /// <summary>
        /// 加载插件。
        /// </summary>
        public static IEnumerable<PluginDescriptor> Load()
        {
            List<PluginDescriptor> plugins = new List<PluginDescriptor>();

            //程序集复制到临时目录。
            FileCopyTo();

            IEnumerable<Assembly> assemblies = null;

            //加载 bin 目录下的所有程序集。
            assemblies = AppDomain.CurrentDomain.GetAssemblies();

            plugins.AddRange(GetAssemblies(assemblies));

            //加载临时目录下的所有程序集。
            assemblies =
                TempPluginFolder.GetFiles("*.dll", SearchOption.AllDirectories)
                    .Select(x => Assembly.LoadFile(x.FullName));

            plugins.AddRange(GetAssemblies(assemblies));

            return plugins;
        }

        /// <summary>
        /// 获得插件信息。
        /// </summary>
        /// <param name="pluginType"></param>
        /// <param name="assembly"></param>
        /// <returns></returns>
        private static PluginDescriptor GetPluginInstance(Type pluginType, Assembly assembly)
        {
            if (pluginType != null)
            {
                var plugin = (IPlugin) Activator.CreateInstance(pluginType);

                if (plugin != null)
                {
                    return new PluginDescriptor(plugin, assembly, assembly.GetTypes());
                }
            }

            return null;
        }

        /// <summary>
        /// 程序集复制到临时目录。
        /// </summary>
        private static void FileCopyTo()
        {
            Directory.CreateDirectory(PluginFolder.FullName);
            Directory.CreateDirectory(TempPluginFolder.FullName);

            //清理临时文件。
            foreach (var file in TempPluginFolder.GetFiles("*.dll", SearchOption.AllDirectories))
            {
                try
                {
                    file.Delete();
                }
                catch (Exception)
                {

                }

            }

            //复制插件进临时文件夹。
            foreach (var plugin in PluginFolder.GetFiles("*.dll", SearchOption.AllDirectories))
            {
                try
                {
                    var di = Directory.CreateDirectory(TempPluginFolder.FullName);
                    File.Copy(plugin.FullName, Path.Combine(di.FullName, plugin.Name), true);
                }
                catch (Exception)
                {

                }
            }
        }

        /// <summary>
        /// 根据程序集列表获得该列表下的所有插件信息。
        /// </summary>
        /// <param name="assemblies">程序集列表</param>
        /// <returns>插件信息集合。</returns>
        private static IEnumerable<PluginDescriptor> GetAssemblies(IEnumerable<Assembly> assemblies)
        {
            IList<PluginDescriptor> plugins = new List<PluginDescriptor>();

            foreach (var assembly in assemblies)
            {
                var pluginTypes =
                    assembly.GetTypes()
                        .Where(
                            type => type.GetInterface(typeof (IPlugin).Name) != null && type.IsClass && !type.IsAbstract);

                foreach (var pluginType in pluginTypes)
                {
                    var plugin = GetPluginInstance(pluginType, assembly);

                    if (plugin != null)
                    {
                        plugins.Add(plugin);
                    }
                }
            }

            return plugins;
        }
    }
}
