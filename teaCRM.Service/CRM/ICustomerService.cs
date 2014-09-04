using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using teaCRM.Entity;
using teaCRM.Entity.CRM;

namespace teaCRM.Service.CRM
{
    /// <summary>
    /// 客户操作接口
    /// </summary>
    public interface ICustomerService
    {
        /// <summary>
        /// 获取筛选器树形列表 014-08-25 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        string GetFilterTreeData(string compNum);

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
        string GetCustomerLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder);


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
         string GetContactLsit(string compNum,  string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder);

        /// <summary>
        /// 获取客户扩展字段信息 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        List<TFunExpand> GetCustomerExpandFields(string compNum);

        /// <summary>
        /// 获取客户联系人扩展字段信息 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        List<TFunExpand> GetContactExpandFields(string compNum);


        /// <summary>
        /// 添加客户信息 2014-08-30 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="cusInfo">客户信息</param>
        /// <param name="cusConInfo">主联系人信息</param>
        /// <returns></returns>
        bool AddCustomer( ZCusInfo cusInfo, ZCusConInfo cusConInfo);

        /// <summary>
        /// 获取客户工具栏
        /// </summary>
        /// <returns></returns>
        string GetCustomerMenu();

        /// <summary>
        /// 获取跟进记录列表
        /// </summary>
        /// <returns></returns>
        string GetFollowList();

        /// <summary>
        /// 获取跟进工具栏
        /// </summary>
        /// <returns></returns>
        string GetFollowMenu();


        /// <summary>
        /// 验证手机号是否存在
        /// </summary>
        /// <param name="cus_tel">手机号</param>
        /// <returns></returns>
        bool ValidatePhone(string cus_tel);
    }
}