using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using NLite.Data;
using teaCRM.Entity;

namespace teaCRM.Dao
{
    /// <summary>
    /// Dao层View接口 2014-08-28 04:10:51 By 唐有炜
    /// </summary>
    public interface IViewDao<T>
    {

        /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <returns>返回所有数据总数</returns>
        int GetViewCount();

        /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据总数</returns>
        int GetViewCount(Expression<Func<T, bool>> predicate);


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <returns>返回所有数据列表</returns>
        List<T> GetViewList();

        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据列表</returns>
        List<T> GetViewList(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
        T GetViewEntity(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// 根据条件查询某些字段(LINQ 动态查询)
        /// </summary>
        /// <param name="selector">要查询的字段（格式：new(ID,Name)）</param>
        /// <param name="predicate">筛选条件（u=>u.id==0）</param>
        /// <returns></returns>
        IQueryable<Object> GetViewFields(string selector, string predicate);

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        bool ExistsViewEntity(Expression<Func<T, bool>> predicate);

        //查询分页
        /// <summary>
        /// 查询分页 2014-09-12 By 唐有炜
        /// </summary>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页得得数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序字段，可以有多个</param>
        /// <param name="predicate">查询条件</param>
        /// <returns></returns>
        IPagination<T> GetViewListByPage(int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<T, bool>> predicate);


        //以下是原生Sql方法==============================================================
        //===========================================================================
        /// <summary>
        /// 用SQL语句查询
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="namedParameters">sql参数</param>
        /// <returns>集合</returns>
        IEnumerable<T> GetViewListBySql(string sql, dynamic namedParameters);
    }
}