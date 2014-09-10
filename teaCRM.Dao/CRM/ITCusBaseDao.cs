using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{
    public interface ITCusBaseDao : ITableDao<TCusBase>, IViewDao<TCusBase>
    {
        #region 手写的扩展函数 2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 使用where sql语句更改客户状态(只更改主表) 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="strSet">要更新的字段</param>
        /// <param name="strWhere">条件</param>
        /// <returns></returns>
        bool UpdateCustomerStatusByWhere(string strSet, string strWhere);

        /// <summary>
        /// 使用LINQ更改客户状态（只更改主表） 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="fields">要更新的字段</param>
        /// <param name="predicate">条件</param>
        /// <returns></returns>
        bool UpdateCustomerStatusByLINQ(Dictionary<string, object> fields,
            Expression<Func<TCusBase, bool>> predicate);

        #endregion
    }
}