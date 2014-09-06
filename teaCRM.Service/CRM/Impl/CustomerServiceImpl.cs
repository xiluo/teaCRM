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

        public IZConInfoDao ConInfoDao { set; get; }
        public ITFunExpandDao FunExpandDao { set; get; }
        public ITCusBaseDao CusBaseDao { set; get; }

//        #region 获取筛选器树形列表
//
//        /// <summary>
//        /// 获取筛选器树形列表
//        /// </summary>
//        /// <param name="compNum">客户编号</param>
//        /// <returns></returns>
//        public string GetFilterTreeData(string compNum)
//        {
//            var filterTreeData = CusInfoDao.GetFilterTreeData(compNum);
//            return filterTreeData;
//        }
//
//        #endregion

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

            string cus_data = JSONHelper.DataTableToLigerUIList(table, count);
            return cus_data;
        }

        #endregion

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
        /// <returns>DataTable</returns>
        public string GetContactLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder)
        {
            var count = 0;
            DataTable table = ConInfoDao.GetContactLsit(compNum, selectFields, pageIndex, pageSize, strWhere,
                filedOrder, out count);
            string con_data = JSONHelper.DataTableToLigerUIList(table, count);
            return con_data;
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
            var customerExpandFields = FunExpandDao.GetList(e => e.CompNum == compNum && e.MyappId == 1);
            if (customerExpandFields.Count > 0)
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
            var contactExpandFields = FunExpandDao.GetList(e => e.CompNum == compNum && e.MyappId == 2);
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
        public bool AddCustomer(ZCusInfo cusInfo, ZCusConInfo cusConInfo)
        {
            return CusInfoDao.AddCustomer(cusInfo, cusConInfo);
        }

        #endregion

        #region 获取客户工具栏

        public string GetCustomerMenu()
        {
            return
                @"{Items:[{type: 'button',text: '查看',icon: 'images/icon/75.png',disable: true,click: function () {view(4)}},{type: 'button',text: '新增',icon: 'images/icon/11.png',disable: true,click: function () {add(4)}},{type: 'button',text: '修改',icon: 'images/icon/33.png',disable: true,click: function () {edit(4)}},{type: 'button',text: '删除',icon: 'images/icon/12.png',disable: true,click: function () {del(4)}}]}";
        }

        #endregion

        #region 获取跟进记录列表

        /// <summary>
        /// 获取跟进记录列表
        /// </summary>
        /// <returns></returns>
        public string GetFollowList()
        {
            return
                @"{'Rows':[{'id':4364,'Customer_id':61,'Customer_name':'长沙市雷立行电子科技有限公司','Follow':'直接挂电话了','Follow_date':'\/Date(1366871520000+0800)\/','Follow_Type_id':9,'Follow_Type':'电话跟进','department_id':2,'department_name':'优创科技','employee_id':2,'employee_name':'奇迹','isDelete':0,'Delete_time':null},{'id':4364,'Customer_id':61,'Customer_name':'长沙市雷立行电子科技有限公司','Follow':'约会去了','Follow_date':'\/Date(1366871520000+0800)\/','Follow_Type_id':9,'Follow_Type':'电话跟进','department_id':2,'department_name':'优创科技','employee_id':2,'employee_name':'奇迹','isDelete':0,'Delete_time':null},{'id':4364,'Customer_id':61,'Customer_name':'长沙市雷立行电子科技有限公司','Follow':'上厕所了','Follow_date':'\/Date(1366871520000+0800)\/','Follow_Type_id':9,'Follow_Type':'电话跟进','department_id':2,'department_name':'优创科技','employee_id':2,'employee_name':'奇迹','isDelete':0,'Delete_time':null},{'id':4364,'Customer_id':61,'Customer_name':'长沙市雷立行电子科技有限公司','Follow':'吃饭去了','Follow_date':'\/Date(1366871520000+0800)\/','Follow_Type_id':9,'Follow_Type':'电话跟进','department_id':2,'department_name':'优创科技','employee_id':2,'employee_name':'奇迹','isDelete':0,'Delete_time':null},{'id':4364,'Customer_id':61,'Customer_name':'长沙市雷立行电子科技有限公司','Follow':'吃饭去了','Follow_date':'\/Date(1366871520000+0800)\/','Follow_Type_id':9,'Follow_Type':'电话跟进','department_id':2,'department_name':'优创科技','employee_id':2,'employee_name':'奇迹','isDelete':0,'Delete_time':null},{'id':4364,'Customer_id':61,'Customer_name':'长沙市雷立行电子科技有限公司','Follow':'吃饭去了','Follow_date':'\/Date(1366871520000+0800)\/','Follow_Type_id':9,'Follow_Type':'电话跟进','department_id':2,'department_name':'优创科技','employee_id':2,'employee_name':'奇迹','isDelete':0,'Delete_time':null},{'id':4364,'Customer_id':61,'Customer_name':'长沙市雷立行电子科技有限公司','Follow':'吃饭去了','Follow_date':'\/Date(1366871520000+0800)\/','Follow_Type_id':9,'Follow_Type':'电话跟进','department_id':2,'department_name':'优创科技','employee_id':2,'employee_name':'奇迹','isDelete':0,'Delete_time':null}],'Total':'7'}"
                    .Replace("'", "\"");
        }

        #endregion

        #region 获取跟进工具栏

        public string GetFollowMenu()
        {
            return
                @"{Items:[{type: 'button',text: '新增跟进',icon: 'images/icon/11.png',disable: true,click: function () {addfollow(6)}},{type: 'button',text: '修改跟进',icon: 'images/icon/33.png',disable: true,click: function () {editfollow(6)}},{type: 'button',text: '删除跟进',icon: 'images/icon/12.png',disable: true,click: function () {delfollow(6)}}]}";
        }

        #endregion

        #region 验证手机号是否存在 2014-09-01 14:58:50 By 唐有炜

        /// <summary>
        /// 验证手机号是否存在 2014-09-01  14:58:50 By 唐有炜
        /// </summary>
        /// <param name="cus_tel">手机号</param>
        /// <returns></returns>
        public bool ValidatePhone(string cus_tel)
        {
            bool IsExist = CusBaseDao.ExistsEntity(b => b.CusTel == cus_tel);
            return !IsExist;
        }

        #endregion

        #region 更改客户状态 2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 使用where sql语句更改客户状态(只更改主表) 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="strSet">要更新的字段</param>
        /// <param name="strWhere">条件</param>
        /// <returns></returns>
        public bool UpdateCustomerStatusByWhere(string strSet, string strWhere)
        {
            if (String.IsNullOrEmpty(strSet) || String.IsNullOrEmpty(strWhere))
            {
                return false;
            }

            return CusBaseDao.UpdateCustomerStatusByWhere(strSet, strWhere);
        }

        /// <summary>
        /// 使用LINQ更改客户状态（只更改主表） 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="fields">要更新的字段</param>
        /// <param name="predicate">条件</param>
        /// <returns></returns>
        public bool UpdateCustomerStatusByLINQ(Dictionary<string, object> fields,
            Expression<Func<TCusBase, bool>> predicate)
        {
            if (null == fields || null == predicate)
            {
                return false;
            }
            return CusBaseDao.UpdateCustomerStatusByLINQ(fields, predicate);
        }

        #endregion
    }
}