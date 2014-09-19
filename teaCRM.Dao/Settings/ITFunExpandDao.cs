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
    public interface ITFunExpandDao : ITableDao<TFunExpand>
    {
        #region 手写的扩展函数 2014-08-21 14:58:50 By 唐有炜

        /// <summary>
        /// 查询某个模块的扩展字段
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <param name="myappId">模块id</param>
        /// <returns></returns>
        DataTable GetExpandFields(string compNum,int myappId);




        #endregion
    }
}