using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Mvc;

namespace teaCRM.Plugin.Framework
{
    /// <summary>
    /// 插件信息。
    /// </summary>
    public class PluginDescriptor
    {
        /// <summary>
        /// 控制器类型字典。
        /// </summary>
        private readonly IDictionary<string, Type> _controllerTypes = new Dictionary<string, Type>();

        /// <summary>
        /// 构造器。
        /// </summary>
        public PluginDescriptor(IPlugin plugin, Assembly assembly, IEnumerable<Type> types)
        {
            this.Plugin = plugin;
            this.Assembly = assembly;
            this.Types = types;

            this._controllerTypes = new Dictionary<string, Type>();

            foreach (var type in types)
            {
                this.AddControllerType(type);
            }
        }

        /// <summary>
        /// 插件信息。
        /// </summary>
        public IPlugin Plugin { get; private set; }

        /// <summary>
        /// 程序集。
        /// </summary>
        public Assembly Assembly { get; private set; }

        /// <summary>
        /// 类型。
        /// </summary>
        public IEnumerable<Type> Types { get; private set; }

        /// <summary>
        /// 根据控制器类型名称获得控制器类型。
        /// </summary>
        /// <param name="coltrollerTypeName">控制器类型名称。</param>
        /// <returns>控制器类型。</returns>
        public Type GetControllerType(string coltrollerTypeName)
        {
            if (this._controllerTypes.ContainsKey(coltrollerTypeName))
            {
                return this._controllerTypes[coltrollerTypeName];
            }

            return null;
        }

        /// <summary>
        /// 增加控制器类型。
        /// </summary>
        /// <param name="type">类型。</param>
        private void AddControllerType(Type type)
        {
            if (type.GetInterface(typeof(IController).Name) != null && type.Name.Contains("Controller") && type.IsClass && !type.IsAbstract)
            {
                this._controllerTypes.Add(type.Name, type);
            }
        }
    }
}
