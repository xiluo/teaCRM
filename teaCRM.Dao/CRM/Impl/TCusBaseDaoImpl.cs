using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using NLite.Data;
using teaCRM.Common;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao.Impl
{
    /// <summary>
    //实现ITCusBaseDao接口的Dao类。 2014-08-28 05:06:48 By 唐有炜
    /// </summary>
    public class TCusBaseDaoImpl : ITCusBaseDao
    {
        #region T4自动生成的函数 2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <returns>返回所有数据列表</returns>
        public List<TCusBase> GetList()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusBases.ToList();
                return models;
            }
        }

        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据列表</returns>
        public List<TCusBase> GetList(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusBases.Where<TCusBase>(predicate).ToList();
                return models;
            }
        }

        /// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
        public TCusBase GetEntity(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var model = db.TCusBases.Where<TCusBase>(predicate).SingleOrDefault();
                return model;
            }
        }


        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool InsertEntity(TCusBase entity)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                int rows = db.TCusBases.Insert(entity);
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
        public bool DeleteEntity(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                TCusBase entity = db.TCusBases.Where(predicate).First();
                int rows = db.TCusBases.Delete(entity);
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
        public bool DeletesEntity(List<TCusBase> list)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                //var tran = db.Connection.BeginTransaction();
                try
                {
                    foreach (var item in list)
                    {
                        db.TCusBases.Delete(item);
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
        public bool UpadateEntity(TCusBase entity)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                int rows = db.TCusBases.Update(entity);
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
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        public bool ExistsEntity(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                bool status = db.TCusBases.Any(predicate);
                return status;
            }
        }

        //查询分页
        public List<TCusBase> GetListByPage(int pageIndex, int pageSize, Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusBases.ToList();
                return models;
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
        public IEnumerable<TCusBase> GetListBySql(string sql, dynamic namedParameters)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                return db.DbHelper.ExecuteDataTable(sql, namedParameters).ToList<TCusBase>();
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

        #region 手写的扩展函数 2014-08-21 14:58:50 By 唐有炜

        /// <summary>
        /// 使用where sql语句更改客户状态(只更改主表) 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="strSet">要更新的字段</param>
        /// <param name="strWhere">条件</param>
        /// <returns></returns>
        public bool UpdateCustomerStatusByWhere(string strSet, string strWhere)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append("UPDATE T_cus_base SET ");
                strSql.Append(strSet);
                strSql.Append(" WHERE ");
                strSql.Append(strWhere);
                LogHelper.Debug(strSql.ToString());
                try
                {
                    LogHelper.Debug("更新成功！");
                    db.DbHelper.ExecuteNonQuery(strSql.ToString());
                    return true;
                }
                catch (Exception ex)
                {
                    LogHelper.Error("更新失败！", ex);
                    return false;
                }
            }
        }

        /// <summary>
        /// 使用LINQ更改客户状态（只更改主表） 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="fields">要更新的字段</param>
        /// <param name="predicate">条件</param>
        /// <returns></returns>
        public bool UpdateCustomerStatusByLINQ(Dictionary<string, object> fields,
            Expression<Func<TCusBase, bool>> predicate)
        {
            var entity = GetEntity(predicate);
            foreach (var field in fields)
            {
                PropertyInfo[] propertyInfos = entity.GetType().GetProperties();
                foreach (var p in propertyInfos)
                {
                    if (p.Name == field.Key)
                    {
                        p.SetValue(entity, field.Value, null); //给对应属性赋值
                    }
                }
            }
            UpadateEntity(entity);
            return false;
        }

        #endregion
    }
}