// ***********************************************************************
// Assembly         : teaCRM.Web
// Author           : Tangyouwei
// Created          : 09-21-2014
//
// Last Modified By : Tangyouwei
// Last Modified On : 09-24-2014
// ***********************************************************************
// <copyright file="ContactController.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

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
using teaCRM.Entity;
using teaCRM.Service.CRM;

/// <summary>
/// The CRM namespace.
/// </summary>

namespace teaCRM.Web.Controllers.Api.CRM
{
    /// <summary>
    /// 联系人APi
    /// </summary>
    public class ContactController : ApiController
    {
        //spring 创建service依赖
        /// <summary>
        /// The customer service
        /// </summary>
        private ICustomerService CustomerService =
            ContextRegistry.GetContext().GetObject("customerService") as ICustomerService;

        #region 所有联系人列表 14-09-11 By 唐有炜

        /// <summary>
        /// ghgh
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>System.String.</returns>
        [HttpPost] // /api/crm/contact/GetAllContacts
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

        #region 获取联系人 14-09-12 By 唐有炜

        // GET /api/settings/Contact/getContact/1
        //id 1
        public TCusCon GetContact(int id)
        {
            return null;
            // return CustomerService.GetContact(id);
        }

        #endregion

        #region 添加联系人 14-09-11 By 唐有炜

        // POST //api/settings/Contact/addContact
        /// <summary>
        /// Adds the contact.
        /// </summary>
        /// <param name="Contact">The contact.</param>
        /// <returns>ResponseMessage.</returns>
        [HttpPost]
        public ResponseMessage AddContact([FromBody] TCusCon Contact)
        {
            ResponseMessage rmsg = new ResponseMessage();
//            if (ContactService.AddContact(Contact))
//            {
//                rmsg.Status = true;
//            }
//            else
//            {
//                rmsg.Status = false;
//            }


            return rmsg;
        }

        #endregion

        #region 修改联系人 14-09-11 By 唐有炜

        //
        // POST /api/settings/Contact/editContact/
        // TSysContact Contact
        [HttpPost]
        public ResponseMessage EditContact([FromBody] TCusCon Contact)
        {
            ResponseMessage rmsg = new ResponseMessage();
//            if (ContactService.UpdateContact(Contact))
//            {
//                rmsg.Status = true;
//            }
//            else
//            {
//                rmsg.Status = false;
//            }


            return rmsg;
        }

        #endregion

        #region 删除联系人 14-09-11 By 唐有炜
        /// <summary>
        /// 删除联系人 
        /// api/crm/contact/toTrash?ids=18
        /// /api/crm/contact/toTrash?ids=18,19
        /// </summary>
        /// <param name="ids">联系人id集合</param>
        /// <returns>ResponseMessage.</returns>
        [HttpGet]
        public ResponseMessage ToTrash(string ids)
        {
            ResponseMessage rmsg = new ResponseMessage();
            if (CustomerService.UpdateContactStatus(ids, 1, "ConTrash"))
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