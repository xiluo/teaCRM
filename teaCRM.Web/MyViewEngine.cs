using System.Web.Mvc;

namespace teaCRM.Web
{
    public sealed class MyViewEngine : RazorViewEngine
    {
        public MyViewEngine()
        {
            ViewLocationFormats = new[]
            {
                "~/Plugins/Customer/Views/{1}/{0}.cshtml",
                "~/Plugins/Customer/Views/{0}.cshtml"
            };
        }

        public override ViewEngineResult FindView(ControllerContext controllerContext, string viewName,
            string masterName, bool useCache)
        {
            return base.FindView(controllerContext, viewName, masterName, useCache);
        }
    }
}