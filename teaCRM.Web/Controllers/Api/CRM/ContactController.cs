using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Spring.Context.Support;
using teaCRM.Service.CRM;

namespace teaCRM.Web.Controllers.Api.CRM
{
    public class ContactController : ApiController
    {
        //spring 创建service依赖
        private ICustomerService CustomerService =
            ContextRegistry.GetContext().GetObject("customerService") as ICustomerService;

        #region 所有联系人列表 14-09-11 By 唐有炜

        [HttpPost] // POST /api/crm/contact/GetAllContacts
        //compNum 10000
        //current 1
        //rowCount 10
        //sort[FieldName]
        //searchPhrase 
        public string GetAllContacts([FromBody] string value)
        {
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = request.Params.Get("compNum");
            var cus_id = request.Params.Get("cus_id");
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
            string sort = request.Params.AllKeys.SingleOrDefault(a => a.Contains("sort"));
            //string sortName = sort.Split('[')[0];
            string sortField = sort.Split('[')[1].TrimEnd(']');
            string sortType = request.Params.GetValues(sort).SingleOrDefault();
            string searchPhrase = request.Params.Get("searchPhrase");

            var count = 0;
            DataTable contactTable;
            if (String.IsNullOrEmpty(cus_id)) //全部联系人,LigerUI分页
            {
                contactTable =
                    CustomerService.GetContactLsit(compNum,
                        new string[0], current,
                        rowCount, "", "id", out count);
            }
            else
            {
                contactTable =
                    CustomerService.GetContactLsit(compNum,
                        new string[0], current,
                        rowCount, String.Format("cus_id={0}", cus_id), "id", out count);
            }
            return JsonConvert.SerializeObject(new
            {
                current = current,
                rowCount = rowCount,
                rows = contactTable,
                total = rowCount
            });
        }

        #endregion
    }
}