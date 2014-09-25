// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-13-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-21-2014
// ***********************************************************************
// <copyright file="LoadDataController.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Service;
using teaCRM.Service.CRM;
using teaCRM.Service.CRM.Impl;
using teaCRM.Web.Filters;

/// <summary>
/// The CRM namespace.
/// </summary>

namespace teaCRM.Web.Controllers.Apps.CRM
{
    /// <summary>
    /// Class LoadDataController.
    /// </summary>
    public class LoadDataController : Controller
    {
        //ICustomerService CustomerService = new CustomerServiceImpl();
        /// <summary>
        /// LoadDataController 注入Service依赖
        /// </summary>
        /// <value>The customer service.</value>
        public ICustomerService CustomerService { set; get; }

        /// <summary>
        /// Gets or sets the account service.
        /// </summary>
        /// <value>The account service.</value>
        public IAccountService AccountService { set; get; }

        #region 获取筛选器树形数据 2014-08-29 14:58:50 By 唐有炜

        // /Apps/CRM/LoadData/AsyncGetNodes/
        /// <summary>
        /// 得到指定ID的子节点列表，并序列化为JSON串
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        public ActionResult AsyncGetNodes(int? id)
        {
            var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            var nodes = CustomerService.AsyncGetNodes(compNum, id);
            return Json(nodes, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region 获取客户信息列表 2014-08-29 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/GetCustomerLsit/
        /// <summary>
        /// Gets the customer lsit.
        /// </summary>
        /// <param name="fc">The fc.</param>
        /// <returns>System.String.</returns>
        [UserAuthorize]
        [HttpPost]
        public string GetCustomerLsit(FormCollection fc)
        {
            string customerJson = "";
            try
            {
                //筛选
                string strWhere = String.Format("con_back=0 AND (user_id={0} OR con_is_pub=1)",
                    int.Parse(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString()));
                if (!String.IsNullOrEmpty(Request.QueryString["con_back"]))
                {
                    strWhere = String.Format("con_back={0}", Request.QueryString["con_back"]);
                }
                if (!String.IsNullOrEmpty(Request.QueryString["con_is_pub"]))
                {
                    strWhere = String.Format("con_is_pub={0}", Request.QueryString["con_is_pub"]);
                }
                //排序
                var sort = "id DESC";
                if (!String.IsNullOrEmpty(fc["sortname"]) && !String.IsNullOrEmpty(fc["sortorder"]))
                {
                    sort = String.Format("{0} {1}", fc["sortname"], fc["sortorder"]);
                }
                //总数
                var count = 0;

                var customerTable =
                    CustomerService.GetCustomerLsit(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(),
                        new string[0], int.Parse(fc["page"]),
                        int.Parse(fc["pagesize"]), strWhere, sort, out count);
                customerJson = JsonConvert.SerializeObject(new
                {
                    Rows = customerTable,
                    Total = count
                });

                LogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取客户信息成功。");
                return customerJson;
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                "的用户获取客户信息失败", ex);
                return "{\"Rows\":[],\"Total\":\"0\"}";
            }
        }

        #endregion

        #region 获取一条客户数据

        //
        // GET: /Apps/CRM/LoadData/GetCustomer/
        /// <summary>
        /// Gets the customer.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>System.String.</returns>
        public string GetCustomer(int id)
        {
            var count = 0;
            var customer = CustomerService.GetCustomerLsit(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(),
                new string[0], 1, 1, String.Format("id={0}", id), "id", out count);
            return JsonConvert.SerializeObject(customer);
        }

        #endregion

        #region 获取联系人信息列表 2014-09-01 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/GetContactList/
        /// <summary>
        /// Gets the contact list.
        /// </summary>
        /// <param name="cus_id">The cus_id.</param>
        /// <returns>System.String.</returns>
        [UserAuthorize]
        public string GetContactList(int? cus_id)
        {
            string customerJson = "";
            try
            {
                var count = 0;
                DataTable contactTable;

                contactTable =
                    CustomerService.GetContactLsit(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(),
                        new string[0], 1,
                        10, String.Format("cus_id={0} AND con_trash=0", cus_id), "id", out count);
                LogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                               "的用户获取联系人信息成功。");


                return JSONHelper.DataTableToLigerUIList(contactTable, count);
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                "的用户获取联系人信息失败", ex);
                return "{\"Rows\":[],\"Total\":\"0\"}";
            }
        }


        //
        // GET: /Apps/CRM/LoadData/GetBootContactList/?cus_id=44
        /// <summary>
        /// Gets the boot contact list.
        /// </summary>
        /// <param name="cus_id">The cus_id.</param>
        /// <returns>System.String.</returns>
        [UserAuthorize]
        public string GetBootContactList(int cus_id)
        {
            var current = 1;
            var rowCount = 10;

            try
            {
                var count = 0;
                DataTable contactTable =
                    CustomerService.GetContactLsit(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(),
                        new string[0], 1,
                        10, String.Format("cus_id={0} AND con_trash=0", cus_id), "id DESC", out count);
                LogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取联系人信息成功。");


                return JsonConvert.SerializeObject(new
                {
                    current = current,
                    rowCount = rowCount,
                    rows = contactTable,
                    total = count
                });
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                "的用户获取联系人信息失败", ex);
                return "{\"Rows\":[],\"Total\":\"0\"}";
            }
        }

        #endregion

        #region 获取一条联系人数据

        //
        // GET: /Apps/CRM/LoadData/GetContact/?con_id=18
        /// <summary>
        /// Gets the contact.
        /// </summary>
        /// <param name="con_id">The con_id.</param>
        /// <returns>System.String.</returns>
        [UserAuthorize]
        public string GetContact(int con_id)
        {
            var current = 1;
            var rowCount = 10;

            try
            {
                var count = 0;
                Dictionary<string, object> contact =
                    CustomerService.GetContact(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(), con_id);

                Newtonsoft.Json.Converters.IsoDateTimeConverter timeConverter =
                    new Newtonsoft.Json.Converters.IsoDateTimeConverter();
                //这里使用自定义日期格式，如果不使用的话，默认是ISO8601格式     
                timeConverter.DateTimeFormat = "yyyy-MM-dd";
                var contacts = JsonConvert.SerializeObject(contact, timeConverter); //quoOdrs 是对象集合
                //利用IsoDateTimeConverter这个类设置日期格式就可以了。
                return contacts;
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                "的用户获取联系人信息失败", ex);
                return "{\"Rows\":[],\"Total\":\"0\"}";
            }
        }

        #endregion

        #region 放入回收站 2014-09-05 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/ToTrash/
        /// <summary>
        /// To the trash.
        /// </summary>
        /// <param name="cus_ids">The cus_ids.</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        [HttpPost]
        // 1 在回收站 0正常
        public ActionResult ToTrash(string cus_ids)
        {
            ResponseMessage rmsg = new ResponseMessage();
            rmsg.Status = CustomerService.UpdateStatusMoreCustomer(cus_ids, 1, "con_back");
            return Json(rmsg);
        }

        #endregion

        #region 放入公海 2014-09-05 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/ToPub/
        /// <summary>
        /// To the pub.
        /// </summary>
        /// <param name="cus_ids">The cus_ids.</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        [HttpPost]
        // 1公海 0不是
        public ActionResult ToPub(string cus_ids)
        {
            ResponseMessage rmsg = new ResponseMessage();
            rmsg.Status = CustomerService.UpdateStatusMoreCustomer(cus_ids, 1, "con_is_pub");

            return Json(rmsg);
        }

        #endregion

        #region 异步验证 2014-09-01 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/ValidatePhone/
        /// <summary>
        /// Validates the phone.
        /// </summary>
        /// <param name="cus_tel">The cus_tel.</param>
        /// <returns>System.String.</returns>
        public string ValidatePhone(string cus_tel)
        {
            bool IsExist = CustomerService.ValidatePhone(cus_tel);
            return IsExist.ToString().ToLower();
        }

        #endregion
    }
}