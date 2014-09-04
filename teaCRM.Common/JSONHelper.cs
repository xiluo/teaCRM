using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

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
        public static string DataTableToLigerUIList(DataTable table,int count)
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
    }
}