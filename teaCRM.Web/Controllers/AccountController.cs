using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Service;
using teaCRM.Service.Impl;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers
{


    public class AccountController : Controller
    {
        #region 登陆

        //
        // GET: /Account/Login 默认登陆页面
        [HttpGet]
        [AutoLogin]
        public ActionResult Login()
        {
            return View();
        }

        //
        // GET: /Account/Login 登陆提交
        [HttpPost]
        public ActionResult Login(FormCollection fc)
        {
            IAccountService accountService = new AccountServiceImpl();
            ResponseMessage rmsg = accountService.Login(fc["type"].ToString(),
                fc["accountType"].ToString(), fc["userName"].ToString(), fc["userPassword"].ToString(), fc["remember"].ToString(),
                fc["clientIp"].ToString(), HttpUtility.UrlDecode(fc["clientPlace"].ToString()), fc["clientTime"].ToString());
            return Json(rmsg);
        }

//        //
//        // GET: /Account/ValidateLogin 自动登陆检测
//        [HttpPost]
//        public ActionResult ValidateLogin(FormCollection fc)
//        {
//            IAccountService accountService = new AccountServiceImpl();
//            ResponseMessage rmsg = accountService.ValidateAccount("login", fc["type"].ToString(),
//                fc["accountType"].ToString(), fc["userName"].ToString(), fc["userPassword"].ToString());
//            return Json(rmsg);
//        }

        #endregion

        #region 注册

        //
        // GET: /Account/Register

        public ActionResult Register()
        {
            return View();
        }

        #endregion

        #region 退出

        public ActionResult Logout()
        {
            Session.Remove(teaCRMKeys.SESSION_USER_COMPANY_INFO_ID);
            return View("Login");
        }

        #endregion

    }
}