using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace teaCRM.Common
{
    public class Utils
    {

        // <summary>
        /// 写日志
        /// </summary>
        /// <param name="path">路径</param>
        /// <param name="log">内容</param>
        /// <param name="isAppend">是否追加</param>
        public static void WriteLog(string path, string log, bool isAppend)
        {
            StreamWriter sw = new StreamWriter(HttpRuntime.AppDomainAppPath + path, isAppend);
            sw.Write(log);
            sw.Close();
        }

    }
}