using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace teaCRM.Common
{
    /// <summary>
    /// DataTable List相互转化
    /// </summary>
   public class DataTableHelper
    {
        /// <summary>
        /// 将泛型集合类转换成DataTable
        /// </summary>
        /// <typeparam name="T">集合项类型</typeparam>
        /// <param name="list">集合</param>
        /// <returns>数据集(表)</returns>
        ///
        //====表中无数据时使用:
        public static DataTable nullListToDataTable(IList list)
        {
            DataTable result = new DataTable();
            object temp;
            if (list.Count > 0)
            {
                PropertyInfo[] propertys = list[0].GetType().GetProperties();
                foreach (PropertyInfo pi in propertys)
                {
                    //if (!(pi.Name.GetType() is System.Nullable))
                    if (pi != null)
                    {
                        //pi = (PropertyInfo)temp;  
                        result.Columns.Add(pi.Name, pi.PropertyType);
                    }
                }
                for (int i = 0; i < list.Count; i++)
                {
                    ArrayList tempList = new ArrayList();
                    foreach (PropertyInfo pi in propertys)
                    {
                        object obj = pi.GetValue(list[i], null);
                        tempList.Add(obj);
                    }
                    object[] array = tempList.ToArray();
                    result.LoadDataRow(array, true);
                }
            }
            return result;
        }
        //====表中有数据时使用:
        public static DataTable noNullListToDataTable<T>(IList<T> list)
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable(typeof(T).Name);
            DataColumn column;
            DataRow row;
            System.Reflection.PropertyInfo[] myPropertyInfo =
                typeof(T).GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
            foreach (T t in list)
            {
                if (t == null) continue;
                row = dt.NewRow();
                for (int i = 0, j = myPropertyInfo.Length; i < j; i++)
                {
                    System.Reflection.PropertyInfo pi = myPropertyInfo[i];
                    String name = pi.Name;
                    if (dt.Columns[name] == null)
                    {
                        if (pi.PropertyType.UnderlyingSystemType.ToString() == "System.Nullable`1[System.Int32]")
                        {
                            column = new DataColumn(name, typeof(Int32));
                            dt.Columns.Add(column);
                            //row[name] = pi.GetValue(t, new object[] {i});//PropertyInfo.GetValue(object,object[])
                            if (pi.GetValue(t, null) != null)
                                row[name] = pi.GetValue(t, null);
                            else
                                row[name] = System.DBNull.Value;
                        }
                        else
                        {
                            column = new DataColumn(name, pi.PropertyType);
                            dt.Columns.Add(column);
                            row[name] = pi.GetValue(t, null);
                        }
                    }
                }
                dt.Rows.Add(row);
            }
            ds.Tables.Add(dt);
            return ds.Tables[0];
        }
        //表中有数据或无数据时使用,可排除DATASET不支持System.Nullable错误
        public static DataTable ToDataTable<T>(IList<T> list)
        {
            if (list == null || list.Count <= 0)
            //return null;
            {
                DataTable result = new DataTable();
                object temp;
                if (list.Count > 0)
                {
                    PropertyInfo[] propertys = list[0].GetType().GetProperties();
                    foreach (PropertyInfo pi in propertys)
                    {
                        //if (!(pi.Name.GetType() is System.Nullable))
                        //if (pi!=null)
                        {
                            //pi = (PropertyInfo)temp;  
                            result.Columns.Add(pi.Name, pi.PropertyType);
                        }
                    }
                    for (int i = 0; i < list.Count; i++)
                    {
                        ArrayList tempList = new ArrayList();
                        foreach (PropertyInfo pi in propertys)
                        {
                            object obj = pi.GetValue(list[i], null);
                            tempList.Add(obj);
                        }
                        object[] array = tempList.ToArray();
                        result.LoadDataRow(array, true);
                    }
                }
                return result;
            }
            else
            {
                DataSet ds = new DataSet();
                DataTable dt = new DataTable(typeof(T).Name);
                DataColumn column;
                DataRow row;
                System.Reflection.PropertyInfo[] myPropertyInfo =
                    typeof(T).GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
                foreach (T t in list)
                {
                    if (t == null) continue;
                    row = dt.NewRow();
                    for (int i = 0, j = myPropertyInfo.Length; i < j; i++)
                    {
                        System.Reflection.PropertyInfo pi = myPropertyInfo[i];
                        String name = pi.Name;
                        if (dt.Columns[name] == null)
                        {
                            if (pi.PropertyType.UnderlyingSystemType.ToString() == "System.Nullable`1[System.Int32]")
                            {
                                column = new DataColumn(name, typeof(Int32));
                                dt.Columns.Add(column);
                                //row[name] = pi.GetValue(t, new object[] {i});//PropertyInfo.GetValue(object,object[])
                                if (pi.GetValue(t, null) != null)
                                    row[name] = pi.GetValue(t, null);
                                else
                                    row[name] = System.DBNull.Value;
                            }
                            else
                            {
                                column = new DataColumn(name, pi.PropertyType);
                                dt.Columns.Add(column);
                                row[name] = pi.GetValue(t, null);
                            }
                        }
                    }
                    dt.Rows.Add(row);
                }
                ds.Tables.Add(dt);
                return ds.Tables[0];
            }
        }



       /// <summary>
       /// 合并相同的DataTable
       /// </summary>
       /// <param name="DataTable1"></param>
       /// <param name="DataTable2"></param>
       /// <returns></returns>
        public static DataTable MergeSameDatatable(DataTable DataTable1, DataTable DataTable2)
        {

            DataTable newDataTable = DataTable1.Clone();

            object[] obj = new object[newDataTable.Columns.Count];
            for (int i = 0; i < DataTable1.Rows.Count; i++)
            {
                DataTable1.Rows[i].ItemArray.CopyTo(obj, 0);
                newDataTable.Rows.Add(obj);
            }
            for (int i = 0; i < DataTable2.Rows.Count; i++)
            {
                DataTable2.Rows[i].ItemArray.CopyTo(obj, 0);
                newDataTable.Rows.Add(obj);
            }
            //或者
//          
//            object[] obj = new object[DataTable1.Columns.Count];
//            for (int i = 0; i < DataTable2.Rows.Count; i++)
//            {
//                DataTable2.Rows[i].ItemArray.CopyTo(obj, 0);
//                DataTable1.Rows.Add(obj);
//            }
            return new DataTable();
        }

        /// <summary> 
        /// 将两个列不同的DataTable合并成一个新的DataTable 
        /// </summary> 
        /// <param name="dt1">Table表1</param> 
        /// <param name="dt2">Table表2</param> 
        /// <param name="DTName">合并后新的表名</param> 
        /// <returns></returns>

        public static  DataTable UniteDataTable(DataTable dt1, DataTable dt2, string DTName)
        {
            DataTable dt3 = dt1.Clone();
            for (int i = 0; i < dt2.Columns.Count; i++)
            {
                dt3.Columns.Add(dt2.Columns[i].ColumnName);
            }
            object[] obj = new object[dt3.Columns.Count];

            for (int i = 0; i < dt1.Rows.Count; i++)
            {
                dt1.Rows[i].ItemArray.CopyTo(obj, 0);
                dt3.Rows.Add(obj);
            }

            if (dt1.Rows.Count >= dt2.Rows.Count)
            {
                for (int i = 0; i < dt2.Rows.Count; i++)
                {
                    for (int j = 0; j < dt2.Columns.Count; j++)
                    {
                        dt3.Rows[i][j + dt1.Columns.Count] = dt2.Rows[i][j].ToString();
                    }
                }
            }
            else
            {
                DataRow dr3;
                for (int i = 0; i < dt2.Rows.Count - dt1.Rows.Count; i++)
                {
                    dr3 = dt3.NewRow();
                    dt3.Rows.Add(dr3);
                }
                for (int i = 0; i < dt2.Rows.Count; i++)
                {
                    for (int j = 0; j < dt2.Columns.Count; j++)
                    {
                        dt3.Rows[i][j + dt1.Columns.Count] = dt2.Rows[i][j].ToString();
                    }
                }
            }
            dt3.TableName = DTName;
            return dt3;
        }





       /// <summary>
        /// Datatable 转 List<Dictionary<string, object>>
       /// </summary>
       /// <param name="table"></param>
       /// <returns></returns>
        public static List<Dictionary<string, object>> DataTableToListDictory(DataTable table)
        {
            List<Dictionary<string, object>> ld=new List<Dictionary<string, object>>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                Dictionary<string, object> dic = new Dictionary<string, object>();
                for (int j = 0; j < table.Columns.Count; j++)
                {
                    dic.Add(table.Columns[j].ColumnName, table.Rows[i][j]);
                }
                ld.Add(dic);
            }
           return ld;
        }

    }
}
