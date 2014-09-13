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
        // GET: /Apps/Settings/Permission/Index/
        public ActionResult Index(FormCollection fc,int? id)
        {
            if (fc.Count == 0) //默认返回页面
            {
                return View("FunctionPermission");
            }
            else //数据修改
            {
                ResponseMessage rmsg = new ResponseMessage();
                return Json(rmsg);
            }
        }

        #endregion

      

    }
}
