using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using NLite.Data;

namespace teaCRM.Dao
{
    /// <summary>
    /// Dao层View接口 2014-08-28 04:10:51 By 唐有炜
    /// </summary>
 public   interface IViewDao<T>
    {
        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <returns>返回所有数据列表</returns>
        List<T> GetList();


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据列表</returns>
        List<T> GetList(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
        T GetEntity(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// 根据条件查询某些字段(LINQ 动态查询)
        /// </summary>
        /// <param name="selector">要查询的字段（格式：new(ID,Name)）</param>
        /// <param name="predicate">筛选条件（u=>u.id==0）</param>
        /// <returns></returns>
        IQueryable<Object> GetFields(string selector, string predicate);

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        bool ExistsEntity(Expression<Func<T, bool>> predicate);

        //查询分页
        IPagination<T> GetListByPage(int pageIndex, int pageSize, int rowCount, Expression<Func<T, bool>> predicate);



        //以下是原生Sql方法==============================================================
        //===========================================================================
        /// <summary>
        /// 用SQL语句查询
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="namedParameters">sql参数</param>
        /// <returns>集合</returns>
        IEnumerable<T> GetListBySql(string sql, dynamic namedParameters);

    }
}
