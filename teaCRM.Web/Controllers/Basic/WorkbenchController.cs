using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers
{
    public class WorkbenchController : Controller
    {
        #region 工作台首页

        //
        // GET: /Workbench/
         [UserAuthorize]
        public ActionResult Index()
        {
            return View();
        }

        #endregion
    }
}