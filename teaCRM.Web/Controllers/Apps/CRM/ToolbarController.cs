using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers.Apps.CRM
{
    public class ToolbarController : Controller
    {
        #region 添加筛选条件

        //
        // GET: /Filter/

        public ActionResult FilterEdit()
        {
            return View("FilterEdit");
        }

        #endregion

   

    }
}
