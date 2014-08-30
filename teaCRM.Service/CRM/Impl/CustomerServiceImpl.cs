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
using teaCRM.Common;
using teaCRM.Dao;
using teaCRM.Dao.CRM;
using teaCRM.Entity;
using teaCRM.Entity.CRM;

namespace teaCRM.Service.CRM.Impl
{
    public class CustomerServiceImpl : ICustomerService
    {
        /// <summary>
        /// CustomerServiceImpl注入dao依赖
        /// </summary>
        public IZCusInfoDao CusInfoDao { set; get; }

        public ITFunExpandDao FunExpandDao { set; get; }

        #region 获取筛选器树形列表

        /// <summary>
        /// 获取筛选器树形列表
        /// </summary>
        /// <param name="compNum">客户编号</param>
        /// <returns></returns>
        public string GetFilterTreeData(string compNum)
        {
            var filterTreeData = CusInfoDao.GetFilterTreeData(compNum);
            return filterTreeData;
        }

        #endregion

        #region 获取客户信息列表,ligerUI分页处理 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户信息列表 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="selectFields">选择的字段（格式：new string[]{"id,cus_sname"}，id必须要有）</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="strWhere">筛选条件（字段名="值",字段名 in (值1,值2)）</param>
        /// <param name="filedOrder">排序字段（字段名）</param>
        /// <returns>DataTable</returns>
        public string GetCustomerLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder)
        {
            var count = 0;
            DataTable table = CusInfoDao.GetCustomerLsit(compNum, selectFields, pageIndex, pageSize, strWhere,
                filedOrder, out count);

            string cus_data = "{\"Rows\": [";
            for (int i = 0; i < table.Rows.Count; i++)
            {
                cus_data += "{";
                for (int j = 0; j < table.Columns.Count; j++)
                {
                    var col = table.Columns[j];
                    cus_data += "\"" + col.ColumnName + "\":" + "\"" + table.Rows[i][j].ToString() + "\",";
                }
                cus_data = cus_data.TrimEnd(',');
                cus_data += "},";
            }
            cus_data = cus_data.TrimEnd(',');

            cus_data += "],\"Total\":" + count;
            cus_data += "}";
            return cus_data;
        }

        #endregion

        #region 获取客户扩展字段信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户扩展字段信息(MyappId==1代表客户扩展字段) 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        public List<TFunExpand> GetCustomerExpandFields(string compNum)
        {
            //MyappId==1代表客户扩展字段
            var customerExpandFields =FunExpandDao.GetList(e => e.CompNum == compNum && e.MyappId == 1);
            if (customerExpandFields.Count>0)
            {
                LogHelper.Info("客户扩展字段获取成功，共" + customerExpandFields.Count + "个字段。");
            }
            else
            {
                LogHelper.Error("客户扩展字段为空。");
            }
            return customerExpandFields;
        }

        #endregion

        #region 获取客户联系人扩展字段信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户联系人扩展字段信息(MyappId==2代表联系人扩展字段) 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        public List<TFunExpand> GetContactExpandFields(string compNum)
        {
            //MyappId==2代表联系人扩展字段
          var contactExpandFields =FunExpandDao.GetList(e => e.CompNum == compNum && e.MyappId == 2);
          if (contactExpandFields.Count > 0)
          {
              LogHelper.Info("联系人扩展字段获取成功,共" + contactExpandFields.Count + "个字段。");
          }
          else
          {
              LogHelper.Error("联系人扩展字段为空。");
          }
            return contactExpandFields;
        }

        #endregion

        #region 添加客户信息 2014-08-29 14:58:50 By 唐有炜

          /// <summary>
        /// 添加客户信息 2014-08-30 14:58:50 By 唐有炜
     /// </summary>
     /// <param name="cusInfo">客户信息</param>
     /// <param name="cusConInfo">主联系人信息</param>
     /// <returns></returns>
    public    bool AddCustomer(ZCusInfo cusInfo,ZCusConInfo cusConInfo)
        {
            return CusInfoDao.AddCustomer(cusInfo,cusConInfo);
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