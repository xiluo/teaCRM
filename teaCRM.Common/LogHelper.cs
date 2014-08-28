using log4net;

namespace teaCRM.Common
{
    /// <summary>
    /// Log4Net日志封装类  2014-08-28 14:58:50 By 唐有炜
    /// </summary>
    public class LogHelper
    {
        /// <summary>
        /// 信息标志
        /// </summary>
        private static readonly string LOG_INFO = "loginfo";

        /// <summary>
        /// 错误标志
        /// </summary>
        private static readonly string LOG_ERROR = "logerror";


        /// <summary>
        /// Log4Net日志接口封装  2014-08-26 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="name">日志标志</param>
        /// <returns></returns>
        public static ILog GetMyLogger(string name)
        {
            ILog logger = log4net.LogManager.GetLogger(name);
            return logger;
        }

        /// <summary>
        /// Log4Net信息记录封装  2014-08-28 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static void Info(string message)
        {
            ILog logger = GetMyLogger(LOG_INFO);
            if (logger.IsInfoEnabled)
            {
                logger.Info(message);
            }
        }


        /// <summary>
        /// Log4Net错误记录封装  2014-08-28 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static void Error(string message)
        {
            ILog logger = GetMyLogger(LOG_ERROR);
            if (logger.IsErrorEnabled)
            {
                logger.Error(message);
            }
        }
    }
}