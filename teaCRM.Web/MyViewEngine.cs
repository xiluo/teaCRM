using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace teaCRM.Web
{
    public sealed class MyViewEngine : RazorViewEngine
    {
        public MyViewEngine()
        {
            ViewLocationFormats = new[]
            {
                "~/Views/{1}/{0}.cshtml",//默认视图
                "~/Views/Shared/{0}.cshtml",//共享视图
                "~/Views/Base/{1}/{0}.cshtml", //主项目视图
                "~/Views/Apps/{1}/{0}.cshtml", //Apps视图
                "~/Views/Apps/CRM/{1}/{0}.cshtml", //CRM视图
                "~/Views/Apps/Sale/{1}/{0}.cshtml", //Sale视图
                "~/Views/Apps/Product/{1}/{0}.cshtml", //产品视图
                "~/Views/Apps/Service/{1}/{0}.cshtml", //服务视图
                "~/Views/Apps/Settings/{1}/{0}.cshtml", //设置视图
            };
        }
    }
}