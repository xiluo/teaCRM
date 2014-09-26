// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-13-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-11-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="TrashController.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using teaCRM.Web.Helpers;
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="TrashController.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
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
/// 回收站模块
/// </summary>
namespace teaCRM.Web.Controllers.Apps.CRM
{
    /// <summary>
    /// 回收站模块
    /// </summary>
    public class TrashController : Controller
    {
        #region  Service注入  14-09-26 By 唐有炜

        /// <summary>
        /// CustomerService
        /// </summary>
        /// <value>CustomerService</value>
        public ICustomerService CustomerService { set; get; }

        /// <summary>
        ///AccountService
        /// </summary>
        /// <value>AccountService</value>
        public IAccountService AccountService { set; get; }

        #endregion


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
        private  int AppId;

        /// <summary>
        /// 当前模块
        /// </summary>
        private int MyAppId;

        /// <summary>
        /// 回收站操作
        /// </summary>
        private List<TFunOperating> trashOperatings = null;
     
        //权限

        #endregion

        #region 初始化扩展字段、操作和权限

        /// <summary>
        /// 初始化扩展字段
        /// </summary>
        [UserAuthorize]
        public void Init()
        {
            CompNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            UserId = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            AppId = MyConfigHelper.GetAppId("crm");
          
            }

        #endregion

        #region 回收站客户首页

        //
        // GET: /Apps/CRM/Trash/
        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>ActionResult.</returns>
        [UserAuthorize]
        public ActionResult Index()
        {
            Init();
//            if ( customerExpandFields == null)
//            {
//                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
//                return View("_Error");
//            }
//            else
//            {
//                //扩展字段
//                ViewBag.CustomerExpandFields = customerExpandFields;
//                ViewBag.ContactExpandFields = contactExpandFields;
//
//                return View("CustomerTrash");
//            }
            return null;
        }

        #endregion
    }
}