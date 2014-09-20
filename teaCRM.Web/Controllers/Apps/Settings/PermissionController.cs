using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Entity;

namespace teaCRM.Web.Controllers.Apps.Settings
{
    public class PermissionController : Controller
    {
        #region 功能权限管理 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/Permission/Index/15
        public ActionResult Function(int? id)
        {
              return View("FunctionPermission");
         
        }
        #endregion

      

    }
}
