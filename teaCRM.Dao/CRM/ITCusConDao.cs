using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{
    public interface ITCusConDao : ITableDao<TCusCon>
    {
        #region 手写的扩展函数 2014-08-21 14:58:50 By 唐有炜

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
        DataTable GetContactLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder, out int recordCount);


        /// <summary>
        /// 使用LINQ批量更改TCusCon字段 2014-09-05 14:58:50 By 唐有炜：注意，字段与条件要一一对应
        /// </summary>
        /// <param name="fields">要更新的字段（支持批量更新）</param>
        /// <param name="predicates">条件集合</param>
        /// <returns><c>true</c>更新状态</returns>
        bool UpdateTCusConFieldsByLINQ(List<KeyValuePair<string, object>> fields,
            List<Expression<Func<TCusCon, bool>>> predicates);

        #endregion
    }
}