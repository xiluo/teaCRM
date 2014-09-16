using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Spring.Context.Support;
using teaCRM.Entity;
using teaCRM.Service.Settings;

namespace teaCRM.Web.Controllers.Api.Settings
{
    public class AppMakerController : ApiController
    {
        //spring 创建service依赖
        private IAppMakerService AppMakerService =
            (IAppMakerService) ContextRegistry.GetContext().GetObject("appMakerService");

        #region 当前公司应用信息列表 14-09-15 By 唐有炜

        // Get /api/settings/appMaker/getAllApps
        //current 1
        //rowCount 10
        //sort[UserName]
        //searchPhrase 
        [HttpPost]
        public string GetAllApps()
        {
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = request.Params.Get("compNum");
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
            //排序
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders =
                new Dictionary<string, teaCRMEnums.OrderEmum>();
            orders.Add(new KeyValuePair<string, teaCRMEnums.OrderEmum>("id", teaCRMEnums.OrderEmum.Asc));
            var total = 0;
            var apps = AppMakerService.GetAppLsit(compNum, current, rowCount, out total, orders, a => a.Id > 0);
            return JsonConvert.SerializeObject(new
            {
                current = current,
                rowCount = rowCount,
                rows = apps,
                total = total
            });
        }

        #endregion
    }
}