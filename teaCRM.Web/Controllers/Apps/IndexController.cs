using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers.Apps
{
    public class IndexController : Controller
    {
        #region 应用市场首页

        //
        // GET: /Apps/

        public ActionResult Index()
        {
            return View();
        }

        #endregion


    }
}
