using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers.Apps.CRM
{
    public class PubController : Controller
    {
        #region 公海客户首页

        //
        // GET: /Apps/CRM/Pub/

        public ActionResult Index()
        {
            return View("CustomerPub");
        }

        #endregion

    }
}
