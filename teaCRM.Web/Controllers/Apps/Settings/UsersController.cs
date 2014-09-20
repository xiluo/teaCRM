using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Entity;
using teaCRM.Service.Settings;

namespace teaCRM.Web.Controllers.Apps.Settings
{
    public class UsersController : Controller
    {

        //用户注入
        public ISysUserService UserService { set; get; }



        #region 用户首页 2014-09-07 14:58:50 By 唐有炜

        //
        // GET:/Apps/Settings/Users/

        public ActionResult Index()
        {
            return View("UserIndex");
        }

        #endregion

        #region 添加用户页面 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/Users/Add/
        public ActionResult Add(FormCollection fc)
        {
            if (fc.Count == 0) //默认返回页面
            {
                return View("UserEdit");
            }
            else //数据添加
            {
                ResponseMessage rmsg = new ResponseMessage();
                return Json(rmsg);
            }
        }

        #endregion

        #region 修改用户页面 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/Users/Edit/
        public ActionResult Edit(FormCollection fc,int?id)
        {
            if (fc.Count == 0) //默认返回页面
            {
                if (null!=id)
                {
                    ViewBag.Id = id;
                }
                //ViewBag
                return View("UserEdit");
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