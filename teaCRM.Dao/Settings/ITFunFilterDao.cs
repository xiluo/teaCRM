using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{
    public interface ITFunFilterDao : ITableDao<TFunFilter>
    {
        #region 手写的扩展函数 2014-08-21 14:58:50 By 唐有炜


        /// <summary>
        /// 获取视图（即筛选条件）信息列表 2014-09-19 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="myappId">模块id</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        IEnumerable<TFunFilter> GetFilterLsit(string compNum, int myappId, int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TFunFilter, bool>> predicate);







        bool DeleteMoreEntity(string ids);
        #endregion
    }
}