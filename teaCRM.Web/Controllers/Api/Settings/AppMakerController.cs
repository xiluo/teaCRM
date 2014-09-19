using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Spring.Context.Support;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Service.Settings;
using teaCRM.Web.Helpers;

namespace teaCRM.Web.Controllers.Api.Settings
{
    public class AppMakerController : MyWebApiController
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
            string sort = request.Params.AllKeys.SingleOrDefault(a => a.Contains("sort"));
            //string sortName = sort.Split('[')[0];
            string sortField = sort.Split('[')[1].TrimEnd(']');
            string sortType = request.Params.GetValues(sort).SingleOrDefault();
            string searchPhrase = request.Params.Get("searchPhrase");

            var total = 0;
            IEnumerable<VAppCompany> apps = null;
            orders.Add(sortType == "desc"
                ? new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Desc)
                : new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Asc));
            //搜索
            if (!String.IsNullOrEmpty(searchPhrase))
            {
                apps = AppMakerService.GetAppLsit(compNum, current, rowCount, out total, orders,
                    a => a.CompNum == compNum && a.AppName.Contains(searchPhrase));
            }
            else
            {
                apps = AppMakerService.GetAppLsit(compNum, current, rowCount, out total, orders,
                    a => a.CompNum == compNum);
            }
            return JSONHelper.ToJson(new
            {
                current = current,
                rowCount = rowCount,
                rows = apps,
                total = total
            });
        }

        #endregion

        #region 获取当前公司某个应用的所有模块 14-09-18 By 唐有炜

        // Get /api/settings/appMaker/getAllMyApps?compNum=10000&appId=1
        //current 1
        //compNum 10000
        //appId 1
        [HttpGet]
        public string GetAllMyApps()
        {
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = request.Params.Get("compNum");
            int appId = int.Parse(request.Params.Get("appId"));
            var myApps = AppMakerService.GetAllMyApps(compNum, appId);
            return JSONHelper.ToJson(myApps);
        }

        #endregion

        #region 当前公司某个模块的扩展字段列表 14-09-15 By 唐有炜

        // Get /api/settings/appMaker/getAllMyAppFields
        //current 1
        //rowCount 10
        //sort[UserName]
        //searchPhrase 
        [HttpPost]
        //[HttpGet]
        public string GetAllMyAppFields()
        {
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = request.Params.Get("compNum");
            int myappId = int.Parse(request.Params.Get("myappId"));
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
            //排序
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders =
                new Dictionary<string, teaCRMEnums.OrderEmum>();
            orders.Add(new KeyValuePair<string, teaCRMEnums.OrderEmum>("id", teaCRMEnums.OrderEmum.Asc));
            string sort = request.Params.AllKeys.SingleOrDefault(a => a.Contains("sort"));
            //string sortName = sort.Split('[')[0];
            string sortField = sort.Split('[')[1].TrimEnd(']');
            string sortType = request.Params.GetValues(sort).SingleOrDefault();
            string searchPhrase = request.Params.Get("searchPhrase");

            var total = 0;
            DataTable fields = null;
            orders.Add(sortType == "desc"
                ? new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Desc)
                : new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Asc));
            //搜索
            if (!String.IsNullOrEmpty(searchPhrase))
            {
                fields = AppMakerService.GetAllMyAppFields(compNum, myappId);
            }
            else
            {
                fields = AppMakerService.GetAllMyAppFields(compNum, myappId);
            }
            fields.TableName = "fields"; //这个一定要放在得到数据过后。否则报错：无法序列化 DataTable。未设置 DataTable 名称。
            LogHelper.Info("获取到的字段个数：" + fields.Rows.Count);
            return JsonConvert.SerializeObject(new
            {
                current = current,
                rowCount = rowCount,
                rows = fields,
                total = total
            });
        }

        #endregion

        #region 当前公司某个模块的视图列表 14-09-15 By 唐有炜

        // Get /api/settings/appMaker/getAllMyAppViews
        //current 1
        //rowCount 10
        //sort[UserName]
        //searchPhrase 
        //[HttpPost]
        [HttpGet]
        public string GetAllMyAppViews()
        {
            HttpContextBase context = (HttpContextBase)Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = request.Params.Get("compNum");
            int myappId = int.Parse(request.Params.Get("myappId"));
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
            //排序
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders =
                new Dictionary<string, teaCRMEnums.OrderEmum>();
            orders.Add(new KeyValuePair<string, teaCRMEnums.OrderEmum>("id", teaCRMEnums.OrderEmum.Asc));
            string sort = request.Params.AllKeys.SingleOrDefault(a => a.Contains("sort"));
            //string sortName = sort.Split('[')[0];
            string sortField = sort.Split('[')[1].TrimEnd(']');
            string sortType = request.Params.GetValues(sort).SingleOrDefault();
            string searchPhrase = request.Params.Get("searchPhrase");

            var total = 0;
            DataTable views = null;
            orders.Add(sortType == "desc"
                ? new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Desc)
                : new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Asc));
            //搜索
            if (!String.IsNullOrEmpty(searchPhrase))
            {
                views = AppMakerService.GetAllMyAppViews(compNum, myappId);
            }
            else
            {
                views = AppMakerService.GetAllMyAppViews(compNum, myappId);
            }
            views.TableName = "views"; //这个一定要放在得到数据过后。否则报错：无法序列化 DataTable。未设置 DataTable 名称。
            LogHelper.Info("获取到的字段个数：" + views.Rows.Count);
            return JsonConvert.SerializeObject(new
            {
                current = current,
                rowCount = rowCount,
                rows = views,
                total = total
            });
        }

        #endregion

        #region 当前公司某个模块的操作列表 14-09-15 By 唐有炜

        // Get /api/settings/appMaker/getAllMyAppToolBars
        //current 1
        //rowCount 10
        //sort[UserName]
        //searchPhrase 
        //[HttpPost]
        [HttpGet]
        public string GetAllMyAppToolBars()
        {
            HttpContextBase context = (HttpContextBase)Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = request.Params.Get("compNum");
            int myappId = int.Parse(request.Params.Get("myappId"));
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
            //排序
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders =
                new Dictionary<string, teaCRMEnums.OrderEmum>();
            orders.Add(new KeyValuePair<string, teaCRMEnums.OrderEmum>("id", teaCRMEnums.OrderEmum.Asc));
            string sort = request.Params.AllKeys.SingleOrDefault(a => a.Contains("sort"));
            //string sortName = sort.Split('[')[0];
            string sortField = sort.Split('[')[1].TrimEnd(']');
            string sortType = request.Params.GetValues(sort).SingleOrDefault();
            string searchPhrase = request.Params.Get("searchPhrase");

            var total = 0;
            DataTable toolbar = null;
            orders.Add(sortType == "desc"
                ? new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Desc)
                : new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Asc));
            //搜索
            if (!String.IsNullOrEmpty(searchPhrase))
            {
                toolbar = AppMakerService.GetAllMyAppToolBars(compNum, myappId);
            }
            else
            {
                toolbar = AppMakerService.GetAllMyAppToolBars(compNum, myappId);
            }
            toolbar.TableName = "toolbar"; //这个一定要放在得到数据过后。否则报错：无法序列化 DataTable。未设置 DataTable 名称。
            LogHelper.Info("获取到的字段个数：" + toolbar.Rows.Count);
            return JsonConvert.SerializeObject(new
            {
                current = current,
                rowCount = rowCount,
                rows = toolbar,
                total = total
            });
        }

        #endregion

        #region 检测该应用是否安装过

        // /api/settings/appMaker/isInstalled?id=2&compNum=10000&appType=1
        [HttpGet]
        public ResponseMessage IsInstalled()
        {
            ResponseMessage rmsg = new ResponseMessage();
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            int appId = int.Parse(request.Params.Get("id"));
            string compNum = request.Params.Get("compNum");
            int appType = int.Parse(request.Params.Get("appType"));
            bool status = AppMakerService.IsInstalled(compNum, appId, appType);
            if (status)
            {
                rmsg.Status = true;
            }
            else
            {
                rmsg.Status = false;
            }
            return rmsg;
        }

        #endregion

        #region 安装应用

        // /api/settings/appMaker/Install?id=2&compNum=10000
        [HttpGet]
        public ResponseMessage Install()
        {
            ResponseMessage rmsg = new ResponseMessage();
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            int appId = int.Parse(request.Params.Get("id"));
            string compNum = request.Params.Get("compNum");

            bool status = AppMakerService.Install(compNum, appId);
            if (status)
            {
                rmsg.Status = true;
            }
            else
            {
                rmsg.Status = false;
            }
            return rmsg;
        }

        #endregion

        #region 安装应用

        // /api/settings/appMaker/unIstall?id=2&compNum=10000
        [HttpGet]
        public ResponseMessage UnInstall()
        {
            ResponseMessage rmsg = new ResponseMessage();
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string appIds = request.Params.Get("ids");
            string compNum = request.Params.Get("compNum");
            bool isClear = bool.Parse(request.Params.Get("isClear"));
            bool status = AppMakerService.UnInstall(compNum, appIds, isClear);
            if (status)
            {
                rmsg.Status = true;
            }
            else
            {
                rmsg.Status = false;
            }
            return rmsg;
        }

        #endregion
    }
}