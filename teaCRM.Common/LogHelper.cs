using System;
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
        private static readonly log4net.ILog loginfo = log4net.LogManager.GetLogger("loginfo");

        /// <summary>
        /// 错误标志
        /// </summary>
        private static readonly log4net.ILog logerror = log4net.LogManager.GetLogger("logerror");

        /// <summary>
        /// 调试标志
        /// </summary>
        private static readonly log4net.ILog logdebug = log4net.LogManager.GetLogger("logdebug");


        /// <summary>
        /// Log4Net信息记录封装  2014-08-28 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static void Info(string message)
        {
            if (loginfo.IsInfoEnabled)
            {
                loginfo.Info(message);
            }
        }

        /// <summary>
        /// Log4Net错误记录封装  2014-08-28 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static void Error(string message)
        {
            if (logerror.IsErrorEnabled)
            {
                logerror.Error(message);
            }
        }

        /// <summary>
        /// Log4Net错误记录封装  2014-08-28 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="message"></param>
        /// <param name="ex"></param>
        /// <returns></returns>
        public static void Error(string message, Exception ex)
        {
            if (logerror.IsErrorEnabled)
            {
                if (!string.IsNullOrEmpty(message) && ex == null)
                {
                    logerror.ErrorFormat("<br/>【附加信息】 : {0}<br>", new object[] {message});
                }
                else if (!string.IsNullOrEmpty(message) && ex != null)
                {
                    string errorMsg = BeautyErrorMsg(ex);
                    logerror.ErrorFormat("<br/>【附加信息】 : {0}<br>{1}", new object[] { message, errorMsg });
                }
                else if (string.IsNullOrEmpty(message) && ex != null)
                {
                    string errorMsg = BeautyErrorMsg(ex);
                    logerror.Error(errorMsg);
                }
            }
        }


        /// <summary>
        /// Log4Net调试记录封装  2014-08-28 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public static void Debug(string message)
        {
            if (logdebug.IsErrorEnabled)
            {
                logdebug.Debug(message);
            }
        }

        /// <summary>
        /// Log4Net调试记录封装  2014-08-28 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="message"></param>
        /// <param name="ex"></param>
        /// <returns></returns>
        public static void Debug(string message, Exception ex)
        {
            if (logdebug.IsDebugEnabled)
            {
                if (!string.IsNullOrEmpty(message) && ex == null)
                {
                    logdebug.DebugFormat("<br/>【附加信息】 : {0}<br>", new object[] {message});
                }
                else if (!string.IsNullOrEmpty(message) && ex != null)
                {
                    string errorMsg = BeautyErrorMsg(ex);
                    logdebug.DebugFormat("<br/>【附加信息】 : {0}<br>{1}", new object[] { message, errorMsg });
                }
                else if (string.IsNullOrEmpty(message) && ex != null)
                {
                    string errorMsg = BeautyErrorMsg(ex);
                    logdebug.Debug(errorMsg);
                }
            }
        }

        /// <summary>
        /// 美化错误信息
        /// </summary>
        /// <param name="ex">异常</param>
        /// <returns>错误信息</returns>
        private static string BeautyErrorMsg(Exception ex)
        {
            string errorMsg = string.Format("【异常类型】：{0} <br>【异常信息】：{1} <br>【堆栈调用】：{2}",
                new object[] {ex.GetType().Name, ex.Message, ex.StackTrace});
            errorMsg = errorMsg.Replace("\r\n", "<br>");
            errorMsg = errorMsg.Replace("位置", "<strong style=\"color:red\">位置</strong><br/>");
            return errorMsg;
        }
    }
}