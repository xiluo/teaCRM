using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers.Admin
{
    public class AppController : Controller
    {
//        //
//        // GET: /Admin/App/
//
//        public ActionResult Index()
//        {
//            return View("");
//        }



        public ActionResult Add()
        {
            return View("AppAdd");
        }

    }
}
