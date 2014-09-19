using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Dynamic;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using NLite.Data;
using NLite.Reflection;
using teaCRM.Common;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao.Impl
{
    /// <summary>
    /// 实现ITFunExpandDao接口的Dao类。 2014-08-28 05:06:48 By 唐有炜
    /// </summary>
    public class TFunExpandDaoImpl : ITFunExpandDao
    {
        #region T4自动生成的函数 2014-08-29 14:58:50 By 唐有炜

        #region 读操作

        /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <returns>返回所有数据总数</returns>
        public int GetCount()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TFunExpands;
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
        public int GetCount(Expression<Func<TFunExpand, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TFunExpands.Where<TFunExpand>(predicate);
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.Count();
            }
        }


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <returns>返回所有数据列表</returns>
        public List<TFunExpand> GetList()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TFunExpands;
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
        public List<TFunExpand> GetList(Expression<Func<TFunExpand, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TFunExpands.Where<TFunExpand>(predicate);
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
        public TFunExpand GetEntity(Expression<Func<TFunExpand, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var model = db.TFunExpands.Where<TFunExpand>(predicate);
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
                var model = db.TFunExpands.Where(predicate).Select(selector);
                var sqlText = model.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return (IQueryable<object>) model;
            }
        }


        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        public bool ExistsEntity(Expression<Func<TFunExpand, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                bool status = db.TFunExpands.Any(predicate);
                return status;
            }
        }


        //查询分页
        public IPagination<TFunExpand> GetListByPage(int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TFunExpand, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var roles = db.TFunExpands;
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
        public IEnumerable<TFunExpand> GetListBySql(string sql, dynamic namedParameters)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                return db.DbHelper.ExecuteDataTable(sql, namedParameters).ToList<TFunExpand>();
            }
        }

        #endregion

        #region 写操作

        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool InsertEntity(TFunExpand entity)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                int rows = db.TFunExpands.Insert(entity);
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
        public bool DeleteEntity(Expression<Func<TFunExpand, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                TFunExpand entity = db.TFunExpands.Where(predicate).First();
                int rows = db.TFunExpands.Delete(entity);
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
        public bool DeletesEntity(List<TFunExpand> list)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                //var tran = db.Connection.BeginTransaction();
                try
                {
                    foreach (var item in list)
                    {
                        db.TFunExpands.Delete(item);
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
        public bool UpadateEntity(TFunExpand entity)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                int rows = db.TFunExpands.Update(entity);
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

        #region 查询某个模块的扩展字段

        /// <summary>
        /// 查询某个模块的扩展字段
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <param name="myappId">模块id</param>
        /// <returns></returns>
        public DataTable GetExpandFields(string compNum, int myappId)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                IDictionary<string, object> namedParameters = new Dictionary<string, object>();
                var baseTableName =
                    db.TFunMyapps.Where(m => m.Id == myappId).Select(m => m.MyappBaseTable).SingleOrDefault();
                namedParameters.Add(new KeyValuePair<string, object>("@table_name", baseTableName));
                namedParameters.Add(new KeyValuePair<string, object>("@comp_num", compNum));
                namedParameters.Add(new KeyValuePair<string, object>("@myapp_id", myappId));
                var tableBase = db.DbHelper.ExecuteDataTable(@"
SELECT 'base'+CAST((row_number() OVER(ORDER BY
       sys.columns.column_id)) AS VARCHAR) AS id,
       @myapp_id AS myapp_id,
       @comp_num AS comp_num,
       sys.columns.name AS exp_name,
       (
           SELECT VALUE
           FROM   sys.extended_properties
           WHERE  sys.extended_properties.major_id = sys.columns.object_id
                  AND sys.extended_properties.minor_id = sys.columns.column_id
       ) AS exp_title,
       0 AS exp_ctype,
       sys.types.name AS exp_dtype,
       sys.columns.max_length AS exp_length,
       '' AS exp_place,
       '' AS exp_option,
       NULL AS exp_default,
       sys.columns.is_nullable AS exp_is_null,
       0 AS exp_is_pw,
       0 AS exp_is_html,
       0 AS exp_etype,
       NULL AS exp_tipmsg,
       NULL AS exp_errmsg,
       NULL AS exp_pattern,
       NULL AS exp_sortid,
       NULL AS exp_css,
       1 AS exp_is_sys
FROM   sys.columns,
       sys.tables,
       sys.types
WHERE  sys.columns.object_id = sys.tables.object_id
       AND sys.columns.system_type_id = sys.types.system_type_id
       AND sys.tables.name = @table_name
       AND sys.types.name <> 'sysname'
ORDER BY
       sys.columns.column_id
", namedParameters);
                var listExpand = GetList(e => e.CompNum == compNum && e.MyappId == myappId);
                //合并数据
                foreach (var expand in listExpand)
                {
                    tableBase.Rows.Add(new object[]
                    {
                        expand.Id,
                        expand.MyappId,
                        expand.CompNum,
                        expand.ExpName,
                        expand.ExpTitle,
                        expand.ExpCtype,
                        expand.ExpDtype,
                        expand.ExpLength,
                        expand.ExpPlace,
                        expand.ExpOption,
                        expand.ExpDefault,
                        expand.ExpIsNull,
                        expand.ExpIsPw,
                        expand.ExpIsHtml,
                        expand.ExpEtype,
                        expand.ExpTipmsg,
                        expand.ExpErrmsg,
                        expand.ExpPattern,
                        expand.ExpSortid,
                        expand.ExpCss,
                        expand.ExpIsSys
                    });
                }
                return tableBase;
            }
        }

        #endregion


     
        #endregion
    }
}