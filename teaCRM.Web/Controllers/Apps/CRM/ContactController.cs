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
        // GET: /Apps/CRM/Contact/
        // /Apps/CRM/Contact/?cus_id=100
        public ActionResult Index(int? cus_id)
        {
            //客户id
            ViewBag.CustomerId = cus_id;
            return PartialView("ContactIndex");
        }


        #endregion


    }
}
