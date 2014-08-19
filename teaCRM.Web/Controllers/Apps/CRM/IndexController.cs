using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers.Apps.CRM
{
    public class IndexController : Controller
    {
        #region CRM首页

        //
        // GET: /Apps/CRM/

        public ActionResult Index()
        {
            return View("CustomerIndex");
        }

        #endregion

        #region 添加客户

        //
        // GET: /Apps/CRM/Index/Add/

        public ActionResult Add()
        {
            return View("CustomerAdd");
        }

        #endregion
    }
}