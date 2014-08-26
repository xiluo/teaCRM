using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Service.CRM
{
    /// <summary>
    /// 客户操作接口
    /// </summary>
  public  interface ICustomerService
    {
      /// <summary>
      /// 获取筛选器树形列表
      /// </summary>
      /// <returns></returns>
        string GetFilterTreeData();

      /// <summary>
      /// 获取客户信息列表
      /// </summary>
      /// <returns></returns>
        string GetCustomerLsit();

        /// <summary>
        /// 获取客户工具栏
        /// </summary>
        /// <returns></returns>
        string GetCustomerMenu();

      /// <summary>
      /// 获取跟进记录列表
      /// </summary>
      /// <returns></returns>
        string GetTraceList();

        /// <summary>
        /// 获取跟进工具栏
        /// </summary>
        /// <returns></returns>
        string GetTraceMenu();
    }
}
