using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers.Apps.Service
{
    public class IndexController : Controller
    {
        //
        // GET: /Index/
         [UserAuthorize]
        public ActionResult Index()
        {
            return View("ServiceIndex");
        }

    }
}
