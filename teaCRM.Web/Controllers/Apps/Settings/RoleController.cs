using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Entity;
using teaCRM.Service.Settings;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers.Apps.Settings
{
    public class RoleController : Controller
    {
        //注入服务
        public ISysRoleService RoleService { set; get; }

        #region 角色首页 2014-09-07 14:58:50 By 唐有炜

        //
        // GET:/Apps/Settings/Role/
        ///
        [UserAuthorize]
        public ActionResult Index()
        {
            return View("RoleIndex");
        }

        #endregion

        #region 添加角色页面 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/Role/Add/
        public ActionResult Add(FormCollection fc)
        {
            if (fc.Count == 0) //默认返回页面
            {
                return View("RoleEdit");
            }
            else //数据添加
            {
                ResponseMessage rmsg = new ResponseMessage();
                return Json(rmsg);
            }
        }

        #endregion

        #region 修改角色页面 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/Role/Edit/
        public ActionResult Edit(FormCollection fc, int? id)
        {
            if (fc.Count == 0) //默认返回页面
            {
                if (null != id)
                {
                    ViewBag.Id = id;
                }
                return View("RoleEdit");
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