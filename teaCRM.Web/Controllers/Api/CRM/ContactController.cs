// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-21-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-24-2014
// ***********************************************************************
// <copyright file="ContactController.cs" company="优创科技">
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

        //联系人扩展字段信息
        private List<TFunExpand> contactExpandFields = null;

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
                if (!String.IsNullOrEmpty(searchPhrase))
                {
                    contactTable =
                    CustomerService.GetContactLsit(compNum,
                        new string[0], current,
                        rowCount, String.Format("con_trash=0 AND con_name like '%{0}%'",searchPhrase.Trim()), "id DESC", out count);
                }
                else
                {
                    contactTable =
                    CustomerService.GetContactLsit(compNum,
                        new string[0], current,
                        rowCount, "con_trash=0", "id DESC", out count);
                }
            }
            else
            {
                if (!String.IsNullOrEmpty(searchPhrase))
                {
                    contactTable =
                    CustomerService.GetContactLsit(compNum,
                        new string[0], current,
                        rowCount, String.Format("cus_id={0} AND con_trash=0 AND con_name like '%{1}%'", cus_id, searchPhrase.Trim()), "id DESC", out count);
                }
                else
                {

                    contactTable =
                        CustomerService.GetContactLsit(compNum,
                            new string[0], current,
                            rowCount, String.Format("cus_id={0} AND con_trash=0", cus_id), "id DESC", out count);
                }




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
        /// <summary>
        /// Gets the contact.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>TCusCon.</returns>
        public TCusCon GetContact(int id)
        {
            return null;
            // return CustomerService.GetContact(id);
        }

        #endregion

        #region 添加联系人 14-09-11 By 唐有炜

        // POST api/crm/contact/addContact
        /// <summary>
        /// 添加联系人 14-09-25 By 唐有炜
        /// </summary>
        /// <param name="value">参数</param>
        /// <returns>添加状态</returns>
        [HttpPost]
        //public ResponseMessage AddContact([FromBody] TCusCon contact)
        public ResponseMessage AddContact([FromBody] string value)
        {
            ResponseMessage rmsg = new ResponseMessage();

            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象

            //联系人赋值 
            var compNum = request.Params.Get("CompNum");
            var cusId = request.Params.Get("cus_id");
            var conBir = request.Params.Get("con_bir");
            if (String.IsNullOrEmpty(conBir))
            {
                conBir = DateTime.Now.ToString();
            }
            if (String.IsNullOrEmpty(cusId))
            {
                cusId = "0";
            }
            TCusCon CusCon = new TCusCon
            {
                CusId = int.Parse(cusId),
                CompNum = compNum,
                ConName = request.Params.Get("con_name"),
                ConTel = request.Params.Get("con_tel"),
                ConQq = request.Params.Get("con_qq"),
                ConEmail = request.Params.Get("con_email"),
                ConBir = DateTime.Parse(conBir),
                ConNote = request.Params.Get("con_note"),
                ConIsMain = 1,
                UserId = int.Parse(request.Params.Get("user_id")),
                ConTrash = 0
            };

            //联系人扩展字段
            contactExpandFields =
                CustomerService.GetContactExpandFields(compNum);
            Dictionary<string, object> conFields = new Dictionary<string, object>();
            for (int i = 0; i < request.Params.Count; i++)
            {
                var field_con = request.Params.GetKey(i);
                var value_con = request.Params.Get(field_con);
                foreach (var field_con2 in contactExpandFields)
                {
                    if (field_con == field_con2.ExpName)
                    {
                        conFields.Add(field_con, value_con);
                    }
                }
            }
            //存储扩展字段的值
            CusCon.ConFields = JsonConvert.SerializeObject(conFields);

            if (CustomerService.AddContact(CusCon))
            {
                rmsg.Status = true;
                rmsg.Msg = "联系人添加成功！";
            }
            else
            {
                rmsg.Status = false;
                rmsg.Msg = "联系人添加失败！";
            }

            return rmsg;
        }

        #endregion

        #region 修改联系人 14-09-11 By 唐有炜

        //
        // POST /api/settings/Contact/editContact/
        // TSysContact Contact
        /// <summary>
        /// Edits the contact.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>ResponseMessage.</returns>
        [HttpPost]
        public ResponseMessage EditContact([FromBody] string value)
        {
            ResponseMessage rmsg = new ResponseMessage();

            HttpContextBase context = (HttpContextBase)Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象

            //联系人赋值 

            var compNum = request.Params.Get("CompNum");
            var cusId = request.Params.Get("cus_id");
            var conBir = request.Params.Get("con_bir");
            if (String.IsNullOrEmpty(conBir))
            {
                conBir = DateTime.Now.ToString();
            }
            if (String.IsNullOrEmpty(cusId))
            {
                cusId = "0";
            }
            TCusCon CusCon = new TCusCon
            {
                Id = int.Parse(request.Params.Get("id")),
                CusId = int.Parse(cusId),
                CompNum = compNum,
                ConName = request.Params.Get("con_name"),
                ConTel = request.Params.Get("con_tel"),
                ConQq = request.Params.Get("con_qq"),
                ConEmail = request.Params.Get("con_email"),
                ConBir = DateTime.Parse(conBir),
                ConNote = request.Params.Get("con_note"),
                ConIsMain = 1,
                UserId = int.Parse(request.Params.Get("user_id")),
                ConTrash = 0
            };

            //联系人扩展字段
            contactExpandFields =
                CustomerService.GetContactExpandFields(compNum);
            Dictionary<string, object> conFields = new Dictionary<string, object>();
            for (int i = 0; i < request.Params.Count; i++)
            {
                var field_con = request.Params.GetKey(i);
                var value_con = request.Params.Get(field_con);
                foreach (var field_con2 in contactExpandFields)
                {
                    if (field_con == field_con2.ExpName)
                    {
                        conFields.Add(field_con, value_con);
                    }
                }
            }
            //存储扩展字段的值
            CusCon.ConFields = JsonConvert.SerializeObject(conFields);

            if (CustomerService.EditContact(CusCon))
            {
                rmsg.Status = true;
                rmsg.Msg = "联系人修改成功！";
            }
            else
            {
                rmsg.Status = false;
                rmsg.Msg = "联系人修改失败！";
            }


            return rmsg;
        }

        #endregion

        #region 删除联系人 14-09-11 By 唐有炜

        /// <summary>
        /// 删除联系人
        /// /api/crm/contact/toTrash?ids=18
        /// /api/crm/contact/toTrash?ids=18,19
        /// </summary>
        /// <param name="ids">联系人id集合</param>
        /// <returns>删除状态</returns>
        [HttpGet]
        public ResponseMessage ToTrash(string ids)
        {
            ResponseMessage rmsg = new ResponseMessage();
            if (CustomerService.UpdateContactStatus(ids, 1, "con_trash"))
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