// ***********************************************************************
// 程序集         : teaCRM.Service
// 作者作者           : Tangyouwei
// 创建时间          : 09-13-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-26-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="CustomerServiceImpl.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
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
using teaCRM.Entity;


/// <summary>
/// The Impl namespace.
/// </summary>

namespace teaCRM.Service.CRM.Impl
{
    /// <summary>
    /// Class CustomerServiceImpl.
    /// </summary>
    public class CustomerServiceImpl : ICustomerService
    {
        #region 注入dao依赖

        /// <summary>
        /// Gets or sets the fun expand DAO.
        /// </summary>
        /// <value>The fun expand DAO.</value>
        public ITFunExpandDao FunExpandDao { set; get; }

        /// <summary>
        /// Gets or sets the cus base DAO.
        /// </summary>
        /// <value>The cus base DAO.</value>
        public ITCusBaseDao CusBaseDao { set; get; }

        /// <summary>
        /// Gets or sets the cus con DAO.
        /// </summary>
        /// <value>The cus con DAO.</value>
        public ITCusConDao CusConDao { set; get; }

        /// <summary>
        /// Gets or sets the fun filter DAO.
        /// </summary>
        /// <value>The fun filter DAO.</value>
        public ITFunFilterDao FunFilterDao { set; get; }

        /// <summary>
        /// Gets or sets the fun operating DAO.
        /// </summary>
        /// <value>The fun operating DAO.</value>
        public ITFunOperatingDao FunOperatingDao { set; get; }

        #endregion



        #region 客户

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
        /// <param name="recordCount">总数</param>
        /// <returns>DataTable</returns>
        public DataTable GetCustomerLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder, out int recordCount)
        {
            DataTable table = CusBaseDao.GetCustomerLsit(compNum, selectFields, pageIndex, pageSize, strWhere,
                filedOrder, out recordCount);

            return table;
        }

        /// <summary>
        /// 获取客户信息列表 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="selector">要查询的字段</param>
        /// <param name="expFields">存储扩展字段值的字段</param>
        /// <param name="expSelector">要查询的扩展字段</param>
        /// <param name="predicate">查询条件</param>
        /// <param name="ordering">排序</param>
        /// <param name="recordCount">记录结果数</param>
        /// <param name="values">参数</param>
        /// <returns>客户信息列表</returns>
        public List<Dictionary<string, object>> GetCustomerLsit(int pageIndex, int pageSize, string selector,
            string expFields, string expSelector,
            string predicate, string ordering,
            out int recordCount, params object[] values)
        {
            var customers = CusBaseDao.GetCustomerLsit(pageIndex, pageSize, selector, expFields, expSelector, predicate,
                ordering,
                out recordCount, values);
            return customers;
        }

        #endregion

        #region 获取一条客户信息

        /// <summary>
        /// 获取一条客户信息
        /// </summary>
        /// <param name="compNum">The comp number.</param>
        /// <param name="customerId">The customer identifier.</param>
        /// <returns>Dictionary&lt;System.String, System.Object&gt;.</returns>
        public Dictionary<string, object> GetCustomer(string selector, string expFields, string expSelector,
            string predicate,
            params object[] values)
        {
            var customer = CusBaseDao.GetCustomer(selector, expFields, expSelector, predicate, values);

            return customer;
        }

        #endregion

        #region 获取客户扩展字段信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户扩展字段信息(MyappId==1代表客户扩展字段) 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <param name="myAppId">模块id</param>
        /// <returns>客户模块扩展字段列表</returns>
        public List<TFunExpand> GetCustomerExpandFields(string compNum, int myAppId)
        {
            var customerExpandFields =
                FunExpandDao.GetList(
                    e => (e.CompNum == compNum || e.ExpIsSys == 1) && e.MyappId == myAppId && e.ExpIsShow == 1)
                    .OrderBy(e => e.ExpOrder)
                    .ToList();
            if (customerExpandFields.Count() > 0)
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

        #region 获取客户操作列表

        /// <summary>
        /// 获取客户操作列表 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns>List&lt;TFunOperating&gt;.</returns>
        public List<TFunOperating> GetCustomerOperating(string compNum,int myappId)
        {
            return FunOperatingDao.GetList(o => o.OpeIsStatus == 1 && o.MyappId == myappId);
        }

        #endregion

        #region 更改客户状态 2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 使用where sql语句更改客户状态(只更改主表) 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="strSet">要更新的字段</param>
        /// <param name="strWhere">条件</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool UpdateCustomerStatusByWhere(string strSet, string strWhere)
        {
            if (String.IsNullOrEmpty(strSet) || String.IsNullOrEmpty(strWhere))
            {
                return false;
            }

            return CusBaseDao.UpdateCustomerStatusByWhere(strSet, strWhere);
        }


        /// <summary>
        /// 批量改状态
        /// </summary>
        /// <param name="cus_ids">id集合</param>
        /// <param name="op">操作（0 1）</param>
        /// <param name="field">字段</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool UpdateStatusMoreCustomer(string cus_ids, int op, string field)
        {
            return CusBaseDao.UpdateStatusMoreCustomer(cus_ids, op, field);
        }


        /// <summary>
        /// 批量改状态
        /// </summary>
        /// <param name="cus_ids">id集合</param>
        /// <param name="op">操作（0 1）</param>
        /// <param name="field">字段</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool UpdateStatusMoreContact(string cus_ids, int op, string field)
        {
            return CusConDao.UpdateStatusMoreContact(cus_ids, op, field);
        }


        /// <summary>
        /// 使用LINQ更改客户状态（只更改主表） 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="fields">要更新的字段</param>
        /// <param name="predicate">条件</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool UpdateCustomerStatusByLINQ(Dictionary<string, object> fields,
            Expression<Func<TCusBase, bool>> predicate)
        {
            if (null == fields || null == predicate)
            {
                return false;
            }
            return CusBaseDao.UpdateTCusBaseStatusByLINQ(fields, predicate);
        }

        #endregion

        #region 添加客户信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 添加客户信息 2014-08-30 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="cusBase">客户信息</param>
        /// <param name="cusCon">主联系人信息</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool AddCustomer(TCusBase cusBase, TCusCon cusCon)
        {
            return CusBaseDao.AddCustomer(cusBase, cusCon);
        }

        #endregion

        #region 修改客户信息 2014-09-21 14:58:50 By 唐有炜

        /// <summary>
        /// 修改客户信息 2014-09-21 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="customerId">客户id</param>
        /// <param name="cusBase">客户信息</param>
        /// <param name="cusCon">主联系人信息</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool EditCustomer(int customerId, TCusBase cusBase, TCusCon cusCon)
        {
            return CusBaseDao.EditCustomer(customerId, cusBase, cusCon);
        }

        #endregion

        #endregion

        #region 联系人

        #region 获取联系人信息列表 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取联系人信息列表 2014-09-01 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="selectFields">选择的字段（格式：new string[]{"id,cus_sname"}，id必须要有）</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="strWhere">筛选条件（字段名="值",字段名 in (值1,值2)）</param>
        /// <param name="filedOrder">排序字段（字段名）</param>
        /// <param name="recordCount">The record count.</param>
        /// <returns>DataTable</returns>
        public DataTable GetContactLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder, out int recordCount)
        {
            DataTable table = CusConDao.GetContactLsit(compNum, selectFields, pageIndex, pageSize, strWhere,
                filedOrder, out recordCount);
            return table;
        }

        #endregion

        #region 获取一条联系人信息

        /// <summary>
        /// 获取一条联系人信息
        /// </summary>
        /// <param name="compNum">The comp number.</param>
        /// <param name="conId">联系人id</param>
        /// <returns>Dictionary&lt;System.String, System.Object&gt;.</returns>
        public Dictionary<string, object> GetContact(string compNum, int conId)
        {
            var count = 0;
            var conTable = CusConDao.GetContactLsit(compNum, new string[0], 1, 1,
                String.Format("id={0}", conId),
                "id", out count);

            return DataTableHelper.DataTableToListDictory(conTable).FirstOrDefault();
        }

        #region 获取客户联系人扩展字段信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户联系人扩展字段信息(MyappId==2代表联系人扩展字段) 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns>List&lt;TFunExpand&gt;.</returns>
        public List<TFunExpand> GetContactExpandFields(string compNum,int myappId)
        {
            //MyappId==2代表联系人扩展字段
            var contactExpandFields = FunExpandDao.GetList(e => e.CompNum == compNum && e.MyappId == myappId);
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

        #endregion

        #region 添加联系人

        /// <summary>
        /// Adds the contact.
        /// </summary>
        /// <param name="cusCon">The cus con.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool AddContact(TCusCon cusCon)
        {
            return CusConDao.InsertEntity(cusCon);
        }

        #endregion

        #region 修改联系人

        /// <summary>
        /// 修改联系人  14-09-24 By 唐有炜
        /// </summary>
        /// <param name="cusCon">The cus con.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool EditContact(TCusCon cusCon)
        {
            return CusConDao.UpadateEntity(cusCon);
        }

        #endregion

        #region 更改联系人状态 2014-09-24 14:58:50 By 唐有炜

        /// <summary>
        /// 更改联系人状态 2014-09-24 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="ids">id集合（1,2,3）</param>
        /// <param name="status">状态（0）或者（1）</param>
        /// <param name="field">要更新的字段（ConTrash）</param>
        /// <returns>更新状态</returns>
        public bool UpdateContactStatus(string ids, int status, string field)

        {
//            var fields = new List<KeyValuePair<string, object>>();
//            var predicates = new List<Expression<Func<TCusCon, bool>>>();
//
//            var idValues = Utils.StringToIntArray(ids, ',');
//            foreach (var idValue in idValues)
//            {
//                fields.Add(new KeyValuePair<string, object>(field, status));
//                Expression<Func<TCusCon, bool>> predicate = c => c.Id == idValue;
//                predicates.Add(predicate);
//            }
//            var uodataStatus = CusConDao.UpdateTCusConFieldsByLINQ(fields, predicates);
//            return uodataStatus;
            return CusConDao.UpdateStatusMoreContact(ids, status, field);
        }

        #endregion

        #endregion

        #region 回收站

        /// <summary>
        /// 获取回收站模块操作
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <param name="myappId">模块id</param>
        /// <returns>操作列表</returns>
        public List<TFunOperating> GetTrashOperating(string compNum, int myappId)
        {
            var ops = FunOperatingDao.GetList(o => o.CompNum == compNum && o.MyappId == myappId);
            return ops;
        }


        /// <summary>
        /// 彻底删除客户
        /// </summary>
        /// <param name="ids">客户id集合</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool Delete(int ids)
        {
            return false;
        }

        #endregion

        #region 验证

        #region 验证手机号是否存在 2014-09-01 14:58:50 By 唐有炜

        /// <summary>
        /// 验证手机号是否存在 2014-09-01  14:58:50 By 唐有炜
        /// </summary>
        /// <param name="cus_tel">手机号</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool ValidatePhone(string cus_tel)
        {
            bool IsExist = CusBaseDao.ExistsEntity(b => b.CusTel == cus_tel);
            return !IsExist;
        }

        #endregion

        #endregion
    }
}