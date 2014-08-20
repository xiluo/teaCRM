using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers
{
    public class AccountController : Controller
    {
        #region 登陆

        //
        // GET: /Account/Login
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        //
        // GET: /Account/Login
        [HttpPost]
        public ActionResult Login(FormCollection fc)
        {
            return View();
        }

        #endregion


        //
        // GET: /Account/Register

        public ActionResult Register()
        {
            return View();
        }

    }
}
