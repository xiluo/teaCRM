// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-13-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-26-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="ContactController.cs" company="优创科技">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Entity;
using teaCRM.Service;
using teaCRM.Service.CRM;
using teaCRM.Web.Filters;

/// <summary>
/// 联系人模块
/// </summary>

namespace teaCRM.Web.Controllers.Apps.CRM
{
    /// <summary>
    /// 联系人控制器
    /// </summary>
    public class ContactController : Controller
    {
        #region  Service注入  14-09-26 By 唐有炜

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

        #endregion

        #region 全局字段定义 14-09-26 By 唐有炜

        /// <summary>
        ///联系人扩展字段信息
        /// </summary>
        private List<TFunExpand> contactExpandFields = null;

        /// <summary>
        /// 当前应用的类别id，（对应/Themes/default/base/js/category.js里面的code和T_fun_app表里面的app_id） 14-09-21 By 唐有炜
        /// </summary>
        private int AppId = 2;

        #endregion

        #region 初始化扩展字段、操作和权限

        /// <summary>
        /// 初始化扩展字段
        /// </summary>
        [UserAuthorize]
        public void Init()
        {
            //获取客户联系人扩展字段信息
            contactExpandFields =
                CustomerService.GetContactExpandFields(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString());
        }

        #endregion

        #region 联系人首页 14-09-24 By 唐有炜

        /// <summary>
        /// GET: /Apps/CRM/Contact/PartialIndex
        /// /Apps/CRM/Contact/?cus_id=100
        /// </summary>
        /// <param name="cus_id">客户id</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        public ActionResult PartialIndex (int? cus_id)
        {
            //客户id
            ViewBag.CustomerId = cus_id;
            return PartialView("_ContactPartial");
        }

        /// <summary>
        /// GET: /Apps/CRM/Contact/
        /// /Apps/CRM/Contact/?cus_id=100
        /// </summary>
        /// <param name="cus_id">客户id</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        public ActionResult Index(int? cus_id)
        {
            //客户id
            ViewBag.CustomerId = cus_id;
            return View("ContactIndex");
        }

        #endregion

        #region 添加联系人页面  2014-08-29 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Contact/Add/
        /// <summary>
        /// Adds this instance.
        /// </summary>
        /// <param name="cus_id">The cus_id.</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        [HttpGet]
        public ActionResult Add(int? cus_id)
        {
            //初始化
            Init();

            if (contactExpandFields == null)
            {
                ViewBag.ErrorMessage = "联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                //客户id
                ViewBag.CustomerId = cus_id;
                ViewBag.ContactExpandFields = contactExpandFields;
                return View("ContactEdit");
            }
        }

        #endregion

        #region   修改联系人页面  2014-08-30 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Index/Edit/
        /// <summary>
        /// Edits the specified fc.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        public ActionResult Edit(int id)
        {
            //初始化
            Init();
            ViewBag.Id = id;
            ViewBag.ContactExpandFields = contactExpandFields;
            return View("ContactEdit");
        }

        #endregion
    }
}