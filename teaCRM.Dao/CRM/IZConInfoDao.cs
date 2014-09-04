using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace teaCRM.Dao.CRM
{
    /// <summary>
    /// 手动写的联系人操作接口IZConInfoDao 2014-09-04 14:58:50 By 唐有炜
    /// </summary>
   public interface IZConInfoDao
    {
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
        DataTable GetContactLsit(string compNum,string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder, out int recordCount);
    }
}
