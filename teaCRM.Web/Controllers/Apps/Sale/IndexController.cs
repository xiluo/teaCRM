using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers.Apps.Sale
{
    public class IndexController : Controller
    {
        //
        // GET: /Index/

        public ActionResult Index()
        {
            return View("SaleIndex");
        }


        #region 添加客户

        //
        // GET: /Apps/CRM/Index/Add/

        public ActionResult Add()
        {
            return View("SaleAdd");
        }

        #endregion
    }
}
