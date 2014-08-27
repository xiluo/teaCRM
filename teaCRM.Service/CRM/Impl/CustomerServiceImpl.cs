using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【当前类文件的功能】
 *  
 *  
 * 作者：[中文姓名]   时间：2014/8/25 9:04:10
 * 文件名：CustomerServiceImpl
 * 版本：V1.0.0
 * 
 * 修改者：唐有炜           时间：2014/8/25 9:04:10               
 * 修改说明：修改说明
 * ========================================================================
*/
using teaCRM.Dao.Manual;
using teaCRM.Dao.Manual.Impl;

namespace teaCRM.Service.CRM.Impl
{
    public class CustomerServiceImpl : ICustomerService
    {
        /// <summary>
        /// CustomerServiceImpl注入dao依赖
        /// </summary>
        public ITFunFilterDaoManual FunFilterDaoManual { set; get; }

        #region 获取筛选器树形列表

        /// <summary>
        /// 获取筛选器树形列表
        /// </summary>
        /// <returns></returns>
        public string GetFilterTreeData()
        {
           
            var filterTreeData = FunFilterDaoManual.GetTreeData();
            return filterTreeData;
        }

        #endregion

        #region 获取客户信息列表

        /// <summary>
        /// 获取客户信息列表
        /// </summary>
        /// <returns></returns>
        public string GetCustomerLsit()
        {
            return
                System.IO.File.ReadAllText(
                    "D:\\学习资料\\开发参考资料\\优创科技\\项目\\工作项目\\优创CRM\\源码\\teaCRM\\teaCRM.Service\\CRM\\Impl\\temp1.txt");
        }

        #endregion

        #region 获取客户工具栏

        public string GetCustomerMenu()
        {
            return
                System.IO.File.ReadAllText(
                    "D:\\学习资料\\开发参考资料\\优创科技\\项目\\工作项目\\优创CRM\\源码\\teaCRM\\teaCRM.Service\\CRM\\Impl\\temp3.txt");
        }

        #endregion

        #region 获取跟进记录列表

        /// <summary>
        /// 获取跟进记录列表
        /// </summary>
        /// <returns></returns>
        public string GetTraceList()
        {
            return
                System.IO.File.ReadAllText(
                    "D:\\学习资料\\开发参考资料\\优创科技\\项目\\工作项目\\优创CRM\\源码\\teaCRM\\teaCRM.Service\\CRM\\Impl\\temp2.txt");
        }

        #endregion

        #region 获取跟进工具栏

        public string GetTraceMenu()
        {
            return
                System.IO.File.ReadAllText(
                    "D:\\学习资料\\开发参考资料\\优创科技\\项目\\工作项目\\优创CRM\\源码\\teaCRM\\teaCRM.Service\\CRM\\Impl\\temp4.txt");
        }

        #endregion
    }
}