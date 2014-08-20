using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers
{
    public class WorkbenchController : Controller
    {
        #region 工作台首页

        //
        // GET: /Workbench/

        public ActionResult Index()
        {
            return View();
        }

        #endregion
    }
}