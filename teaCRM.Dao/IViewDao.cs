using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

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
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        bool ExistsEntity(Expression<Func<T, bool>> predicate);

        //查询分页
        List<T> GetListByPage(int pageIndex, int pageSize, Expression<Func<T, bool>> predicate);


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
