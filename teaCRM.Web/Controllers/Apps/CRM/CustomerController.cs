// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-13-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-26-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="IndexController.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Service;
using teaCRM.Service.CRM;
using teaCRM.Service.Settings;
using teaCRM.Web.Filters;
/// <summary>
/// The CRM namespace.
/// </summary>
using teaCRM.Web.Helpers;

namespace teaCRM.Web.Controllers.Apps.CRM
{
    /// <summary>
    /// Class IndexController.
    /// </summary>
    public class CustomerController : Controller
    {
        //客户IndexController 注入Service依赖
        /// <summary>
        /// Gets or sets the customer service.
        /// </summary>
        /// <value>The customer service.</value>
        public ICustomerService CustomerService { set; get; }

        /// <summary>
        /// Gets or sets the account service.
        /// </summary>
        /// <value>The account service.</value>
        public IAccountService AccountService { set; get; }

        /// <summary>
        /// Gets or sets the application maker service.
        /// </summary>
        /// <value>The application maker service.</value>
        public IAppMakerService AppMakerService { set; get; }

        #region 全局字段定义 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 当前公司编号
        /// </summary>
        private string CompNum;

        /// <summary>
        /// 当前登录用户id
        /// </summary>
        private string UserId;

        /// <summary>
        /// 当前应用的类别id，（对应/Themes/default/base/js/category.js里面的code和T_fun_app表里面的app_id） 14-09-21 By 唐有炜
        /// </summary>
        private readonly int AppId = MyConfigHelper.GetAppId("crm");

        /// <summary>
        /// 当前模块对应的id（应用发布时确定）
        /// </summary>
        private readonly int CustomerMyappId = MyConfigHelper.GetMyAppId("customer");

        private readonly int ContactMyappId = MyConfigHelper.GetMyAppId("contact");

        /// <summary>
        /// 客户扩展字段信息
        /// </summary>
        private List<TFunExpand> customerExpandFields = null;

        /// <summary>
        /// 联系人扩展字段信息
        /// </summary>
        private List<TFunExpand> contactExpandFields = null;

        /// <summary>
        /// 客户操作
        /// </summary>
        private List<TFunOperating> customerOperatings = null;

        /// <summary>
        /// 应用列表
        /// </summary>
        public List<VMyappCompany> myApps = null;

        #endregion

        #region 初始化扩展字段、操作和模块

        /// <summary>
        /// 初始化扩展字段
        /// </summary>
        public void Init()
        {
            CompNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            UserId = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString();
            //获取客户扩展字段信息
            customerExpandFields = CustomerService.GetCustomerExpandFields(CompNum, CustomerMyappId);
            //获取联系人扩展字段信息
            contactExpandFields =
                CustomerService.GetContactExpandFields(CompNum, ContactMyappId);
            //获取操作
            customerOperatings =
                CustomerService.GetCustomerOperating(CompNum, CustomerMyappId);
            //获取模块
            myApps = AppMakerService.GetAllMyApps(CompNum, AppId);
        }

        #endregion

        #region CRM首页

        //
        // GET: /Apps/CRM/Index/?ConBack=0&ConIsPub=0
        /// <summary>
        /// Indexes the specified con back.
        /// </summary>
        /// <param name="ConBack">The con back.</param>
        /// <param name="ConIsPub">The con is pub.</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        public ActionResult Index(int? ConBack, int? ConIsPub)
        {
            Init();
            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewData["Msg"] = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Msg");
            }
            else
            {
                //扩展字段
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;

                //操作
                ViewBag.CustomerOperatings = customerOperatings;

                //字段
                ViewBag.CompNum = CompNum;
                ViewBag.CustomerMyappId = CustomerMyappId;
                ViewBag.ConBack = ConBack;
                ViewBag.ConIsPub = ConIsPub;
                return View("CustomerIndex");
            }
        }

        #endregion

        #region 添加客户页面  2014-08-29 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Index/Add/
        /// <summary>
        /// Adds this instance.
        /// </summary>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        [HttpGet]
        public ActionResult Add()
        {
            //初始化扩展字段
            Init();

            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;
                return View("CustomerEdit");
            }
        }


        #endregion

        #region   查看客户页面  2014-08-30 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Index/Show/
        /// <summary>
        /// Shows the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        [HttpGet]
        public ActionResult Show(int id)
        {
            //初始化扩展字段
            Init();

            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;
                Dictionary<string, object> cus = new Dictionary<string, object>(); 
                //CustomerService.GetCustomer(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(), id);
                ViewBag.Customer = cus;
                object con_id = null;
                cus.TryGetValue("con_id", out con_id);
                ViewBag.MainContact =new Dictionary<string, object>(); 
                    //CustomerService.GetContact(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(),
                     //   (int) con_id);
                ViewBag.MyApps = myApps;
                return View("CustomerShow");
            }
        }

        #endregion

        #region   修改客户页面  2014-08-30 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Index/Edit/
        /// <summary>
        /// Edits the specified fc.
        /// </summary>
        /// <param name="fc">The fc.</param>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        public ActionResult Edit(int id)
        {
            Init();
            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewData["Msg"] = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;
                ViewBag.CustomerId = id;
                return View("CustomerEdit");
            }
        }

        #endregion
    }
}