using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using teaCRM.Entity;
using teaCRM.Entity.CRM;

namespace teaCRM.Dao.CRM
{
    /// <summary>
    /// 手动写的客户操作接口IZCusInfoDao 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
 public   interface IZCusInfoDao
    {
//        /// <summary>
//        /// 获取树形数据
//        /// </summary>
//        /// <param name="compNum">客户编号</param>
//        /// <returns></returns>
//        string GetFilterTreeData(string compNum);

      


         /// <summary>
         /// 添加客户信息 2014-08-30 14:58:50 By 唐有炜
         /// </summary>
         /// <param name="cusInfo">客户信息</param>
         /// <param name="cusConInfo">主联系人信息</param>
         /// <returns></returns>
         bool AddCustomer( ZCusInfo cusInfo, ZCusConInfo cusConInfo);

    }
}
