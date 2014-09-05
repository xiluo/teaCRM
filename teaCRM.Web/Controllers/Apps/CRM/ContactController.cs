using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers.Apps.CRM
{
    public class ContactController : Controller
    {
        #region 联系人首页

        //
        // GET: /Contact/

        public ActionResult Index()
        {
            return View("ContactIndex");
        }

        #endregion


    }
}
