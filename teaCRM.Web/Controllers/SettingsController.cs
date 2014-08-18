using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Service.Impl;

namespace teaCRM.Web.Controllers
{
    public class SettingsController : Controller
    {
        #region 组织架构
        //代码已移动
        #endregion

        //
        // GET: /Settings/Permission

        public ActionResult Permission()
        {
            return View();
        }


        //
        // GET: /Settings/Users

        public ActionResult Users()
        {
            return View();
        }


        //
        // GET: /Settings/Users

        public ActionResult DatabaseBackup()
        {
            return View();
        }

        //
        // GET: /Settings/ExpandoField
        public ActionResult ExpandoField()
        {
            return View();
        }
    }
}