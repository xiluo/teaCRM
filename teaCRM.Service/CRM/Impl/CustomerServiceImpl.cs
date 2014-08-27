using System;
using System.Collections.Generic;
using System.Data;
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
        public IZCusInfoDaoManual CusInfoDaoManual { set; get; }
        #region 获取筛选器树形列表

       /// <summary>
        /// 获取筛选器树形列表
       /// </summary>
       /// <param name="compNum">客户编号</param>
       /// <returns></returns>
        public string GetFilterTreeData(string compNum)
       {

           var filterTreeData = FunFilterDaoManual.GetTreeData(compNum);
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
            string json = GetPagerData(1, 1, "", "", "");
            return json;
//            return
//                System.IO.File.ReadAllText(
//                    "D:\\学习资料\\开发参考资料\\优创科技\\项目\\工作项目\\优创CRM\\源码\\teaCRM\\teaCRM.Service\\CRM\\Impl\\temp1.txt");
        }

        #region ligerUI分页处理
        /// /Plugins/Customer/Home/Index
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="page">页码</param>
        /// <param name="pagesize">每页显示数目</param>
        /// <param name="searchs">搜索关键字</param>
        /// <param name="tag_ids">标签id集合（1,2,3）</param>
        /// <param name="search_owner">搜索人</param>
        /// <returns>分页json数据</returns>
        public string GetPagerData(int page, int pagesize, string searchs, string tag_ids, string search_owner)
        {
            var count = 0;
            DataTable table = CusInfoDaoManual.GetCustomerLsit(1, 1, "", "", out count);

            string cus_data = "{\"Rows\": [";
            for (int i = 0; i < table.Rows.Count; i++)
            {
                var row = table.Rows[i];
                cus_data += "{";
                for (int j = 0; j < table.Columns.Count; j++)
                {
                    var col = table.Columns[j];
                    cus_data += "\"" + col.ColumnName + "\":" + "\"" + table.Rows[i][j].ToString() + "\",";
                }
                cus_data = cus_data.Substring(0, cus_data.Length - 1);
                cus_data += "},";
                //cus_data = cus_data.Substring(0, cus_data.Length - 1);
            }
            cus_data = cus_data.Substring(0, cus_data.Length - 1);

            cus_data += "],\"Total\":" + count;
            cus_data += "}";
            return cus_data;
        }

        #endregion

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