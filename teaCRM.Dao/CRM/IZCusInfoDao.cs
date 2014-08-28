using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace teaCRM.Dao.CRM
{
    /// <summary>
    /// 手动写的客户操作接口ICusInfoDaoManual 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
 public   interface IZCusInfoDao
    {
        /// <summary>
        /// 获取树形数据
        /// </summary>
        /// <param name="compNum">客户编号</param>
        /// <returns></returns>
        string GetFilterTreeData(string compNum);

        /// <summary>
        /// 获取客户信息列表
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="strWhere"></param>
        /// <param name="filedOrder"></param>
        /// <param name="recordCount"></param>
        /// <returns></returns>
        DataTable GetCustomerLsit(int pageIndex, int pageSize, string strWhere, string filedOrder, out int recordCount);


    }
}
