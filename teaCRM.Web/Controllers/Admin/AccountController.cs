using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers.Admin
{
    public class AccountController : Controller
    {
        //
        // GET: /Admin/Account/

        public ActionResult Login()
        {
            return View("AdminLogin");
        }

    }
}
