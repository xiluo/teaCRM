using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Service.Impl;

namespace teaCRM.Web.Controllers
{
    public class IndexController : Controller
    {
        //
        // GET: /Index/

        public ActionResult Index()
        {
            ViewBag.Test = new SysDepartmentService().Test();
              return View();
        }

    }
}
