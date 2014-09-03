using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Controllers
{
    public class AdminController : Controller
    {
        #region 日志查看

        //
        // GET: /Admin/LogView

        public ActionResult LogView()
        {
            DirectoryInfo TheFolder = new DirectoryInfo(Server.MapPath("~/Log"));
            //遍历文件夹
            ViewBag.FileInfo = TheFolder.GetFiles();
            return View();
        }

        #endregion

        #region 日志删除

        // GET: /Admin/LogDelete/
        public bool LogDelete(string filename)
        {
            string filepath = Server.MapPath("~/Log/" + filename);
            try
            {
                if (System.IO.File.Exists(filepath))
                {
                    System.IO.File.Delete(filepath);
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        #endregion

    }
}