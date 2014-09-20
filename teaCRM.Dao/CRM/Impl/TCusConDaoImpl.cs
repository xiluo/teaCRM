using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLite.Data;
using NLite.Reflection;
using teaCRM.Common;
using teaCRM.DBContext;
using teaCRM.Entity;
using System.Linq.Dynamic;

namespace teaCRM.Dao.Impl
{
    /// <summary>
    /// 自动生成的实现ITCusConDao接口的Dao类。 2014-08-28 05:06:48 By 唐有炜
    /// </summary>
    public class TCusConDaoImpl : ITCusConDao
    {
        #region T4自动生成的函数 2014-09-05 14:58:50 By 唐有炜

        #region 读操作

        /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <returns>返回所有数据总数</returns>
        public int GetCount()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusCons;
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.Count();
            }
        }


        /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据总数</returns>
        public int GetCount(Expression<Func<TCusCon, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusCons.Where<TCusCon>(predicate);
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.Count();
            }
        }


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <returns>返回所有数据列表</returns>
        public List<TCusCon> GetList()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusCons;
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.ToList();
            }
        }


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据列表</returns>
        public List<TCusCon> GetList(Expression<Func<TCusCon, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusCons.Where<TCusCon>(predicate);
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.ToList();
            }
        }

        /// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
        public TCusCon GetEntity(Expression<Func<TCusCon, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var model = db.TCusCons.Where<TCusCon>(predicate);
                var sqlText = model.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return model.SingleOrDefault();
            }
        }


        /// <summary>
        /// 根据条件查询某些字段(LINQ 动态查询)
        /// </summary>
        /// <param name="selector">要查询的字段（格式：new(ID,Name)）</param>
        /// <param name="predicate">筛选条件（id=0）</param>
        /// <returns></returns>
        public IQueryable<Object> GetFields(string selector, string predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var model = db.TCusCons.Where(predicate).Select(selector);
                var sqlText = model.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return (IQueryable<object>) model;
            }
        }


        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        public bool ExistsEntity(Expression<Func<TCusCon, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                bool status = db.TCusCons.Any(predicate);
                return status;
            }
        }


        //查询分页
        public IPagination<TCusCon> GetListByPage(int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TCusCon, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var roles = db.TCusCons;
                rowCount = roles.Count();
                var prevCount = (pageIndex - 1)*pageSize;
                var models = roles
                    .Skip(prevCount)
                    .Take(pageSize)
                    .Where(predicate);
                foreach (var order in orders)
                {
                    models = models.OrderBy(String.Format("{0} {1}", order.Key, order.Value));
                }
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug("ELINQ Paging:<br/>" + sqlText.ToString());
                return models.ToPagination(pageSize, pageSize, rowCount);
            }
        }


        //以下是原生Sql方法==============================================================
        //===========================================================================
        /// <summary>
        /// 用SQL语句查询
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="namedParameters">sql参数</param>
        /// <returns>集合</returns>
        public IEnumerable<TCusCon> GetListBySql(string sql, dynamic namedParameters)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                return db.DbHelper.ExecuteDataTable(sql, namedParameters).ToList<TCusCon>();
            }
        }

        #endregion

        #region 写操作

        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool InsertEntity(TCusCon entity)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                int rows = db.TCusCons.Insert(entity);
                if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// 删除实体
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        public bool DeleteEntity(Expression<Func<TCusCon, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                TCusCon entity = db.TCusCons.Where(predicate).First();
                int rows = db.TCusCons.Delete(entity);
                if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// 批量删除
        /// </summary>
        /// <param name="list">实体集合</param>
        public bool DeletesEntity(List<TCusCon> list)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                //var tran = db.Connection.BeginTransaction();
                try
                {
                    foreach (var item in list)
                    {
                        db.TCusCons.Delete(item);
                    }
                    //tran.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    //tran.Rollback();
                    return false;
                    throw new Exception(ex.Message);
                }
            }
        }

        /// <summary>
        /// 修改实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool UpadateEntity(TCusCon entity)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                int rows = db.TCusCons.Update(entity);
                if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }


        /// <summary>
        /// 执行Sql
        /// </summary>
        /// <param name="sql">Sql语句</param>
        /// <param name="namedParameters">查询字符串</param>
        /// <returns></returns>
        public bool ExecuteSql(string sql, dynamic namedParameters = null)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var rows = db.DbHelper.ExecuteNonQuery(sql, namedParameters);
                if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        #endregion

        #endregion

        #region 手写的扩展函数 2014-08-21 14:58:50 By 唐有炜

        #region 获取联系人信息列表

        /// <summary>
        /// 获取联系人信息列表
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="selectFields">选择的字段</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="strWhere">筛选条件</param>
        /// <param name="filedOrder">排序字段</param>
        /// <param name="recordCount">记录总数</param>
        /// <returns>DataTable</returns>
        public DataTable GetContactLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder, out int recordCount)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append("SELECT ");
                string select = @"id
      ,cus_id
      ,con_name
      ,con_tel
      ,con_qq
      ,con_email
      ,con_bir
      ,con_note
      ,con_is_main
      , 
(SELECT ISNULL(u.user_tname,u.user_lname) FROM t_sys_user  AS u WHERE id=a.[user_id]) AS user_name,
con_fields
";

                //选择字段
                if (selectFields.Length > 0)
                {
                    select = "";
                    foreach (var selectField in selectFields)
                    {
                        if (!selectField.Contains("exp"))
                        {
                            select += " a." + selectField + ",";
                        }
                        else
                        {
                            select += " a.con_fields,";
                        }
                    }
                    select = select.TrimEnd(',');
                }

                strSql.Append(select);


                //表处理
                string from = "FROM   T_cus_con AS a";
                strSql.Append(from);

                if (strWhere.Trim() != "")
                {
                    strSql.Append(" WHERE " + strWhere);
                }

                //查询总数Sql
                //counttingSql
                string counttingSql = PagingHelper.CreateCountingSql(strSql.ToString());
                LogHelper.Debug("contact counttingSql," + counttingSql);

                //查询分页Sql
                //pagingSql
                recordCount =
                    Convert.ToInt32(db.DbHelper.ExecuteScalar(counttingSql));
                dynamic namedParameters = null;
                string pagingSql = PagingHelper.CreatePagingSql(recordCount, pageSize, pageIndex, strSql.ToString(),
                    filedOrder);
                LogHelper.Debug("contact pagingSql," + pagingSql);


                try
                {
                    DataTable conTable =
                        db.DbHelper.ExecuteDataTable(pagingSql, namedParameters);

                    for (int i = 0; i < conTable.Rows.Count; i++)
                    {
                        for (int j = 0; j < conTable.Columns.Count; j++)
                        {
                            if (conTable.Columns[j].ColumnName == "con_fields")
                            {
                                DataColumn fieldColumn = conTable.Columns[j];
                                //转换字段
                                string fieldString = conTable.Rows[i][j].ToString();
                                IDictionary<string, JToken> fieldsDictionary =
                                    (JObject) JsonConvert.DeserializeObject(fieldString);

                                LogHelper.Debug(conTable.Rows[i][j].ToString());
                                //循环添加新字段
                                foreach (var f in fieldsDictionary)
                                {
                                    DataColumn newColumn = new DataColumn();
                                    newColumn.ColumnName = f.Key;
                                    newColumn.DefaultValue = f.Value;
                                    conTable.Columns.Add(newColumn);
                                }
                                //删除此字段
                                conTable.Columns.Remove(fieldColumn);
                            }
                        }
                    }


                    return conTable;
                }
                catch(Exception ex)
                {
                    recordCount = 0;
                    LogHelper.Error("联系人扩展失败：",ex);
                    return null;
                }
            }
        }

        #endregion

        #endregion
    }
}