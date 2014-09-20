using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Entity;
using teaCRM.Entity.Settings;
using teaCRM.Service.Settings;

namespace teaCRM.Web.Controllers.Apps.Settings
{
    public class PermissionController : Controller
    {


        //注入服务
        public ISysRoleService RoleService { set; get; }

        #region 功能权限管理 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/Permission/Index/15
        public ActionResult Function(int? id)
        {
            var compNum =Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            List<ZSysPermission> permissions = RoleService.GetAllPermissions(compNum);
            ViewBag.Role = RoleService.GetRole((int)id);
            return View("FunctionPermission", permissions);
         
        }
        #endregion

      

    }
}
