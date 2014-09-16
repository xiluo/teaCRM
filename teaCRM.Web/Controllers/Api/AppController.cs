using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using Spring.Context.Support;
using teaCRM.Entity;
using teaCRM.Service.Settings;

namespace teaCRM.Web.Controllers.Api
{
    public class AppController : ApiController
    {
        //spring 创建service依赖
        private IFunAppService AppService = (IFunAppService) ContextRegistry.GetContext().GetObject("funAppService");

        #region 应用列表 14-09-15 By 唐有炜

       // Get /api/app/GetAllApps
        //current 1
        //rowCount 10
        //sort[UserName]
        //searchPhrase 
         [HttpGet]
        public IEnumerable<TFunApp> GetAllApps()
        {
            HttpContextBase context = (HttpContextBase)Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            //排序
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders =
                new Dictionary<string, teaCRMEnums.OrderEmum>();
             orders.Add(new KeyValuePair<string, teaCRMEnums.OrderEmum>("id",teaCRMEnums.OrderEmum.Asc));
            var count = 0;
         return   AppService.GetAppLsit(1, 10, out count, orders, a=>a.Id>0);
        }

        #endregion
    }
}