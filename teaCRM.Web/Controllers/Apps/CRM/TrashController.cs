using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Entity;
using teaCRM.Service;
using teaCRM.Service.CRM;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers.Apps.CRM
{
    public class TrashController : Controller
    {
        /// <summary>
        /// IndexController 注入Service依赖
        /// </summary>
        public ICustomerService CustomerService { set; get; }

        public IAccountService AccountService { set; get; }

        #region 全局字段定义 2014-08-29 14:58:50 By 唐有炜

        //扩展字段信息
        private List<TFunExpand> customerExpandFields = null;
        private List<TFunExpand> contactExpandFields = null;

        #endregion

        #region 初始化扩展字段

        /// <summary>
        /// 初始化扩展字段
        /// </summary>
        public void Init()
        {
            //获取客户扩展字段信息
            customerExpandFields =
                CustomerService.GetCustomerExpandFields(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString());
            //获取客户联系人扩展字段信息
            contactExpandFields =
                CustomerService.GetContactExpandFields(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString());
        }

        #endregion

        #region 回收站客户首页

        //
        // GET: /Apps/CRM/Trash/
        [UserAuthorize]
        public ActionResult Index()
        {
            Init();
            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                //扩展字段
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;

                return View("CustomerTrash");
            }
        }

        #endregion
    }
}