using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Entity;

namespace teaCRM.Web.Controllers.Apps.Settings
{
    public class AppMakerController : Controller
    {
        #region 自定义字段首页 2014-09-07 14:58:50 By 唐有炜

        //
        // GET:/Apps/Settings/ExpandoField/

        public ActionResult Index()
        {
            return View("AppMakerIndex");
        }

        #endregion

        #region 添加自定义字段 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/ExpandoField/Add/
        public ActionResult Add(FormCollection fc)
        {
            if (fc.Count == 0) //默认返回页面
            {
                return View("ExpandoFieldEdit");
            }
            else //数据添加
            {
                ResponseMessage rmsg = new ResponseMessage();
                return Json(rmsg);
            }
        }

        #endregion

        #region 修改自定义字段 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/ExpandoField/Edit/
        public ActionResult Edit(FormCollection fc)
        {
            if (fc.Count == 0) //默认返回页面
            {
                return View("ExpandoFieldEdit");
            }
            else //数据修改
            {
                ResponseMessage rmsg = new ResponseMessage();
                return Json(rmsg);
            }
        }

        #endregion

        #region 删除自定义字段 2014-09-07 14:58:50 By 唐有炜

        //
        // GET: /Apps/Settings/ExpandoField/Delete/1/
        public ActionResult Delete(int id)
        {
            ResponseMessage rmsg = new ResponseMessage();
            return Json(rmsg);
        }

        #endregion
    }
}