using System.IO;
using System.Web.Hosting;

namespace teaCRM.Plugin.Framework
{

    /// <summary>
    /// 插件检测器。
    /// </summary>
    public static class PluginWatcher
    {
        private readonly static object _lockobject = new object();

        /// <summary>
        /// 是否启用。
        /// </summary>
        private static bool _enable = false;

        /// <summary>
        /// 侦听文件系统。
        /// </summary>
        private static readonly FileSystemWatcher _fileSystemWatcher = new FileSystemWatcher();

        static PluginWatcher()
        {
            _fileSystemWatcher.Path = HostingEnvironment.MapPath("~/Plugins");
            _fileSystemWatcher.Filter = "*.dll";

            _fileSystemWatcher.Changed += _fileSystemWatcher_Changed;
            _fileSystemWatcher.Created += _fileSystemWatcher_Created;
            _fileSystemWatcher.Deleted += _fileSystemWatcher_Deleted;
            _fileSystemWatcher.Renamed += _fileSystemWatcher_Renamed;

            _fileSystemWatcher.IncludeSubdirectories = true;

            _fileSystemWatcher.NotifyFilter =
                NotifyFilters.Attributes | NotifyFilters.CreationTime | NotifyFilters.DirectoryName | NotifyFilters.FileName | NotifyFilters.LastAccess | NotifyFilters.LastWrite | NotifyFilters.Security | NotifyFilters.Size;

            Enable = false;
        }

        /// <summary>
        /// 是否启用。
        /// </summary>
        public static bool Enable
        {
            get
            {
                return _enable;
            }
            set
            {
                _enable = value;

                _fileSystemWatcher.EnableRaisingEvents = _enable;
            }
        }

        /// <summary>
        /// 启动。
        /// </summary>
        public static void Start()
        {
            Enable = true;
        }

        /// <summary>
        /// 停止。
        /// </summary>
        public static void Stop()
        {
            Enable = false;
        }

        private static void _fileSystemWatcher_Changed(object sender, FileSystemEventArgs e)
        {
            ResetPlugin();
        }

        private static void _fileSystemWatcher_Deleted(object sender, FileSystemEventArgs e)
        {
            ResetPlugin();
        }

        private static void _fileSystemWatcher_Created(object sender, FileSystemEventArgs e)
        {
            ResetPlugin();
        }

        private static void _fileSystemWatcher_Renamed(object sender, RenamedEventArgs e)
        {
            ResetPlugin();
        }

        /// <summary>
        /// 重置插件。
        /// </summary>
        private static void ResetPlugin()
        {
            lock (_lockobject)
            {
                PluginManager.Initialize();
            }
        }
    }
}
