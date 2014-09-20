using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Web.Mvc;
using teaCRM.Entity;


namespace teaCRM.Service.CRM
{
    /// <summary>
    /// 客户操作接口
    /// </summary>
    public interface ICustomerService
    {
//        /// <summary>
//        /// 获取筛选器树形列表 014-08-25 14:58:50 By 唐有炜
//        /// </summary>
//        /// <param name="compNum">公司编号</param>
//        /// <returns></returns>
//        string GetFilterTreeData(string compNum);

        /// <summary>
        /// 获取树形节点
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        List<Node> AsyncGetNodes(string compNum, int? id);

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
         DataTable GetCustomerLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder, out int recordCount);


        /// <summary>
        /// 获取一条客户信息
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="customerId"></param>
        /// <returns></returns>
        Dictionary<string,object> GetCustomer(string compNum, int customerId);

        /// <summary>
        /// 获取联系人信息列表 2014-09-01 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="selectFields">选择的字段（格式：new string[]{"id,cus_sname"}，id必须要有）</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="strWhere">筛选条件（字段名="值",字段名 in (值1,值2)）</param>
        /// <param name="filedOrder">排序字段（字段名）</param>
        /// <param name="recordCount"></param>
        /// <returns>DataTable</returns>
        DataTable GetContactLsit(string compNum,  string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder,out int recordCount);


        /// <summary>
        /// 获取一条联系人信息
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="conId">联系人id</param>
        /// <returns></returns>
        Dictionary<string, object> GetMainContact(string compNum, int conId);


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
        /// 获取客户操作 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        List<TFunOperating> GetCustomerOperating(string compNum);

        /// <summary>
        /// 添加客户信息 2014-08-30 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="cusInfo">客户信息</param>
        /// <param name="cusCon">主联系人信息</param>
        /// <returns></returns>
        bool AddCustomer( TCusBase cusInfo, TCusCon cusCon);

//        /// <summary>
//        /// 获取客户工具栏
//        /// </summary>
//        /// <returns></returns>
//        string GetCustomerMenu();

//        /// <summary>
//        /// 获取跟进记录列表
//        /// </summary>
//        /// <returns></returns>
//        string GetFollowList();
//
//        /// <summary>
//        /// 获取跟进工具栏
//        /// </summary>
//        /// <returns></returns>
//        string GetFollowMenu();


        /// <summary>
        /// 验证手机号是否存在
        /// </summary>
        /// <param name="cus_tel">手机号</param>
        /// <returns></returns>
        bool ValidatePhone(string cus_tel);

        /// <summary>
        /// 使用where sql语句更改客户状态(只更改主表) 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="strSet">要更新的字段</param>
        /// <param name="strWhere">条件</param>
        /// <returns></returns>
        bool UpdateCustomerStatusByWhere(string strSet,string strWhere);

        /// <summary>
        /// 使用LINQ更改客户状态（只更改主表） 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="fields">要更新的字段</param>
        /// <param name="predicate">条件</param>
        /// <returns></returns>
        bool UpdateCustomerStatusByLINQ(Dictionary<string,object> fields, Expression<Func<TCusBase, bool>> predicate);
    }
}