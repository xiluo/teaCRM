using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;

namespace teaCRM.Common
{
    /// <summary>
    /// Json数据封装类  2014-09-04 14:58:50 By 唐有炜
    /// </summary>
    public class JSONHelper
    {
        #region 将DataTable转换成LigerUI列表数据 2014-09-04 14:58:50 By 唐有炜

        /// <summary>
        /// 将DataTable转换成LigerUI列表数据 2014-09-04 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="table">数据集</param>
        /// <param name="count">记录总数</param>
        /// <returns></returns>
        public static string DataTableToLigerUIList(DataTable table, int count)
        {
            string json = "{\"Rows\": [";
            for (int i = 0; i < table.Rows.Count; i++)
            {
                json += "{";
                for (int j = 0; j < table.Columns.Count; j++)
                {
                    var col = table.Columns[j];
                    json += "\"" + col.ColumnName + "\":" + "\"" + table.Rows[i][j].ToString() + "\",";
                }
                json = json.TrimEnd(',');
                json += "},";
            }
            json = json.TrimEnd(',');

            json += "],\"Total\":" + count;
            json += "}";
            return json;
        }

        #endregion

        #region 返回对象序列化(修复时间问题 14-09-18 By 唐有炜)

        /// <summary> 
        /// 返回对象序列化 
        /// </summary> 
        /// <param name="obj">源对象</param> 
        /// <returns>json数据</returns> 
        public static string ToJson(object obj)
        {
            JavaScriptSerializer serialize = new JavaScriptSerializer();
            string str = serialize.Serialize(obj);
            str = Regex.Replace(str, @"\\/Date\((\d+)\)\\/", match =>
            {
                DateTime dt = new DateTime(1970, 1, 1);
                dt = dt.AddMilliseconds(long.Parse(match.Groups[1].Value));
                dt = dt.ToLocalTime();
//                return dt.ToString("yyyy-MM-dd HH:mm:ss");
                return dt.ToString("yyyy-MM-dd");
            });
            return str;
        }

        /// <summary> 
        /// 控制深度 
        /// </summary> 
        /// <param name="obj">源对象</param> 
        /// <param name="recursionDepth">深度</param> 
        /// <returns>json数据</returns> 
        public static string ToJson(object obj, int recursionDepth)
        {
            JavaScriptSerializer serialize = new JavaScriptSerializer();
            serialize.RecursionLimit = recursionDepth;
            return serialize.Serialize(obj);
        }

        #endregion

        #region 读取json

        /// <summary>
        /// 读取json
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="szJson"></param>
        /// <returns></returns>
        public static object ParseFromJson<T>(string szJson)
        {
            T obj = Activator.CreateInstance<T>();
            using (MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(szJson)))
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(obj.GetType());
                return (T) serializer.ReadObject(ms);
            }
        }

        #endregion
    }
}