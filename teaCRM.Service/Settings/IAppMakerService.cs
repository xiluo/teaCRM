using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using teaCRM.Entity;

namespace teaCRM.Service.Settings
{
    public interface IAppMakerService
    {
        /// <summary>
        /// 获取当前公司应用信息列表 2014-09-16 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        IEnumerable<VAppMyapp> GetAppLsit(string compNum,int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<VAppMyapp, bool>> predicate);
    }
}
