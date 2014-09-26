// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-21-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-21-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="CustomerController.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
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

/// <summary>
/// The CRM namespace.
/// </summary>
namespace teaCRM.Web.Controllers.Api.CRM
{
    /// <summary>
    /// Class CustomerController.
    /// </summary>
    public class CustomerController : ApiController
    {
        //spring 创建service依赖
        /// <summary>
        /// The customer service
        /// </summary>
        private ICustomerService CustomerService =
            (ICustomerService) ContextRegistry.GetContext().GetObject("customerService");

        //
        // GET: /api/crm/customer/getAllCustomers/
        /// <summary>
        /// Gets the customer lsit.
        /// </summary>
        /// <returns>System.String.</returns>
        [HttpPost]
        public string GetAllCustomers()
        {

            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = request.Params.Get("compNum");
            int user_id = 3;
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
       
            string strWhere = String.Format("con_back=0 AND (user_id={0} OR con_is_pub=1)", user_id);
            if (!String.IsNullOrEmpty(request.QueryString["con_back"]))
            {
                strWhere = String.Format("con_back={0}", request.QueryString["con_back"]);
            }
            if (!String.IsNullOrEmpty(request.QueryString["con_is_pub"]))
            {
                strWhere = String.Format("con_is_pub={0}", request.QueryString["con_is_pub"]);
            }

            var total = 0;
            DataTable customers = CustomerService.GetCustomerLsit(compNum, new string[0], current, rowCount, strWhere, "id",
                out total);

            return JsonConvert.SerializeObject(new
            {
                current = current,
                rowCount = rowCount,
                rows = customers,
                total = rowCount
            });
          
        }
    }
}