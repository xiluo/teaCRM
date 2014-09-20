using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Spring.Context.Support;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Service.CRM;
using teaCRM.Service.Settings;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers.Api.CRM
{
    public class CustomerController : ApiController
    {
        //spring 创建service依赖
        private ICustomerService CustomerService =
            (ICustomerService) ContextRegistry.GetContext().GetObject("customerService");

        //
        // GET: /api/crm/customer/getCustomerLsit/
        [HttpGet]
        public string GetCustomerLsit()
        {

            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = "10000";
            int user_id = 3;
            int page = int.Parse(request.QueryString["page"]);
            int pagesize = int.Parse(request.QueryString["pagesize"]);

            string strWhere = String.Format("con_back=0 AND (user_id={0} OR con_is_pub=1)", user_id);
            if (!String.IsNullOrEmpty(request.QueryString["con_back"]))
            {
                strWhere = String.Format("con_back={0}", request.QueryString["con_back"]);
            }
            if (!String.IsNullOrEmpty(request.QueryString["con_is_pub"]))
            {
                strWhere = String.Format("con_is_pub={0}", request.QueryString["con_is_pub"]);
            }

            var rowCount = 0;
            DataTable customers = CustomerService.GetCustomerLsit(compNum, new string[0], page, pagesize, strWhere, "id",
                out rowCount);

              return JsonConvert.SerializeObject(new
            {
                Rows = customers,
                Total = rowCount
            });
          
        }
    }
}