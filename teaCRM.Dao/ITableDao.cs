using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using NLite.Data;
using NLite.Reflection;
using teaCRM.Entity;

namespace teaCRM.Dao
{
    /// <summary>
    /// Dao层Table接口 2014-09-10 04:10:51 By 唐有炜
    /// </summary>
    public interface ITableDao<T>
    {
        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        bool InsertEntity(T entity);

        /// <summary>
        /// 删除实体
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        bool DeleteEntity(Expression<Func<T, bool>> predicate);


        /// <summary>
        /// 批量删除
        /// </summary>
        /// <param name="list">实体集合</param>
        bool DeletesEntity(List<T> list);


        /// <summary>
        /// 修改实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        bool UpadateEntity(T entity);

        /// <summary>
        /// 执行Sql
        /// </summary>
        /// <param name="sql">Sql语句</param>
        /// <param name="namedParameters">查询字符串</param>
        /// <returns></returns>
        bool ExecuteSql(string sql, dynamic namedParameters = null);
    }
}