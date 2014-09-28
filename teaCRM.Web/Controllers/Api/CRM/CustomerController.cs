// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-21-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-28-2014

using NLite.Data.CodeGeneration;
using teaCRM.Service;
using teaCRM.Web.Helpers;
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="CustomerController.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using teaCRM.Entity.Common;
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
/// CRM客户模块Api接口 14-09-28 By 唐有炜   
/// </summary>

namespace teaCRM.Web.Controllers.Api.CRM
{
    /// <summary>
    /// CRM客户模块Api接口 14-09-28 By 唐有炜   
    /// </summary>
    public class CustomerController : ApiController
    {
        /// <summary>
        ///创建service依赖
        /// </summary>
        private ICustomerService CustomerService =
            (ICustomerService) ContextRegistry.GetContext().GetObject("customerService");

        private IFunFilterService FunFilterService =
            (IFunFilterService) ContextRegistry.GetContext().GetObject("funFilterService");

        #region 全局字段定义 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 当前模块对应的id（应用发布时确定）
        /// </summary>
        private readonly int CustomerMyappId = MyConfigHelper.GetMyAppId("customer");

        private readonly int ContactMyappId = MyConfigHelper.GetMyAppId("contact");

        /// <summary>
        /// 客户扩展字段信息
        /// </summary>
        private List<TFunExpand> customerExpandFields = null;

        /// <summary>
        /// 联系人扩展字段信息
        /// </summary>
        private List<TFunExpand> contactExpandFields = null;

        #endregion

        #region  获取客户Bootgrid列表

        /// <summary>
        /// 获取客户Bootgrid列表
        /// /api/crm/customer/getAllCustomers?current=1&rowCount=10&sort[cus_sname]=DESC&searchPhrase=&compNum=10000
        /// </summary>
        /// <returns>json</returns>
        [HttpPost]
        public String GetAllCustomers()
        {
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            //基本参数
            string compNum = request.Params.Get("compNum");

            //构造条件
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
            //string selector = "NEW(Id,CusNo,CompNum,CusName,CusSname,CusLastid,CusTel,CusCity,CusIndustry,CusAddress,CusNote,ConId,UserId,ConTeam,ConIsPub,ConBack,CusCreateTime,CusFields)"; //注意，查询时必须包含CusFields
            //string expSelector = "ExpIsMarry,ExpAddtime";
            //string expSelector = "ExpIsMarry";
            string selector = "";
            string expSelector = "";
            string expFields = "CusFields";
            string predicate = "CompNum=@0";
            string ordering = "Id DESC";
            object[] values = {"10000"};

            var total = 0;

            //获取数据
            List<Dictionary<string, object>> customers = CustomerService.GetCustomerLsit(current, rowCount,
                selector, expFields, expSelector,
                predicate, ordering, out total, values);

            //组装输出

            BootGrid bootGrid = new BootGrid
            {
                current = current,
                rowCount = rowCount,
                rows = customers,
                total = total
            };
            return JsonConvert.SerializeObject(bootGrid);
        }

        #endregion

        #region 获取一条客户列表 14-09-12 By 唐有炜

        /// <summary>
        /// 获取一条客户列表
        /// GET /api/crm/customer/getCustomer?compNum=10000&id=144
        /// </summary>
        /// <param name="id">客户id</param>
        /// <returns>json</returns>
        public string GetCustomer(string compNum, int id)
        {
            //string selector = "NEW(Id,CompNum,CusName,CusSname,CusFields)"; //注意，查询时必须包含CusFields
            string selector = ""; 
            string expSelector = "";
            string expFields = "CusFields";
            string predicate = "CompNum=@0 AND id=@1";
            object[] values = {compNum, id};

            var customer = CustomerService.GetCustomer(selector, expFields, expSelector, predicate, values);
            return JsonConvert.SerializeObject(customer);
        }

        #endregion

        #region 添加客户 14-09-11 By 唐有炜

        /// <summary>
        /// 添加客户
        /// /api/crm/customer/addCustomer
        /// </summary>
        /// <param name="customer">The customer.</param>
        /// <returns>ResponseMessage.</returns>
        [HttpPost]
        public ResponseMessage AddCustomer([FromBody] string value)
        {
            ResponseMessage rmsg = new ResponseMessage();
            HttpContextBase context = (HttpContextBase)Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象

            //基本参数
            string compNum = request.Params.Get("CompNum");
            var userId = int.Parse(request.Params.Get("UserId"));
          
            //获取客户扩展字段信息
            customerExpandFields = CustomerService.GetCustomerExpandFields(compNum, CustomerMyappId);
            //获取联系人扩展字段信息
            contactExpandFields =
                CustomerService.GetContactExpandFields(compNum, ContactMyappId);

            //客户赋值==============================================
            //基本字段
            TCusBase CusBase = new TCusBase();
            CusBase.CusNo = RandomHelper.GetCustomerNumber();
            CusBase.CompNum = compNum;
            CusBase.CusName = request.Params.Get("CusName");
            CusBase.CusSname = request.Params.Get("CusSname") ?? "";
            CusBase.CusLastid = 0;
            CusBase.CusTel = request.Params.Get("CusTel") ?? "";
            CusBase.CusCity = String.Format("{0},{1},{2}", request.Params.Get("cus_province") ?? "0",
                request.Params.Get("cus_city") ?? "0", request.Params.Get("cus_region") ?? "0");
            CusBase.CusAddress = request.Params.Get("CusAddress") ?? "";
            CusBase.CusNote = request.Params.Get("CusNote") ?? "";
            CusBase.ConId = int.Parse(request.Params.Get("con_id") ?? "0");
            CusBase.UserId = userId;
            CusBase.ConTeam = "17,21";
            CusBase.ConIsPub = 0;
            CusBase.ConBack = 0;
            //扩展字段
            Dictionary<string, object> cusFields = new Dictionary<string, object>();
            for (int i = 0; i < request.Params.Count; i++)
            {
                var field = request.Params.GetKey(i);
                var fvalue = request.Params.Get(field);
                foreach (var field2 in customerExpandFields)
                {
                    if (field2.ExpIsSys == 0) //不是内置字段
                    {
                        if (field == NamingConversion.Default.PropertyName(field2.ExpName))
                        {
                            cusFields.Add(field, fvalue);
                        }
                    }
                }
            }
            //存储扩展字段的值
            CusBase.CusFields = JsonConvert.SerializeObject(cusFields);


            //========================================================================

            //主联系人赋值 
            var conBir = request.Params.Get("ConBir");
            if (String.IsNullOrEmpty(request.Params.Get("ConBir")))
            {
                conBir = DateTime.Now.ToString();
            }
            TCusCon CusCon = new TCusCon()
            {
                CompNum = compNum,
                ConName = request.Params.Get("ConName") ?? "",
                ConTel = request.Params.Get("ConTel") ?? "",
                ConQq = request.Params.Get("ConQq") ?? "",
                ConEmail = request.Params.Get("ConEmail") ?? "",
                ConBir = DateTime.Parse(conBir),
                ConNote = request.Params.Get("ConNote") ?? "",
                ConIsMain = 1,
                UserId = userId
            };
            Dictionary<string, object> conFields = new Dictionary<string, object>();
            for (int i = 0; i < request.Params.Count; i++)
            {
                var field_con = request.Params.GetKey(i);
                var value_con = request.Params.Get(field_con);
                foreach (var field_con2 in contactExpandFields)
                {
                    if (field_con2.ExpIsSys == 0) //不是内置字段
                    {
                        if (field_con == NamingConversion.Default.PropertyName(field_con2.ExpName))
                        {
                            //LogHelper.Debug("联系人扩展字段："+field_con);
                            conFields.Add(field_con, value_con);
                        }
                    }
                }
            }
            //存储扩展字段的值
            CusCon.ConFields = JsonConvert.SerializeObject(conFields);
            //==============================================================
            //
            //添加提交
            bool add_status = false;
            add_status = CustomerService.AddCustomer(CusBase, CusCon);
            if (add_status)
            {
                rmsg.Status = add_status;
                rmsg.Msg = "客户添加成功！";
            }
            else
            {
                rmsg.Status = add_status;
                rmsg.Msg = "客户添加失败！";
            }

            return rmsg;
        }

        #endregion

        #region 修改客户 14-09-11 By 唐有炜

        //
        // POST /api/crm/customer/editCustomer
        /// <summary>
        /// Edits the customer.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>ResponseMessage.</returns>
        [HttpPost]
        public ResponseMessage EditCustomer([FromBody] string value)
        {
            ResponseMessage rmsg = new ResponseMessage();
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象

            //基本参数
            string compNum = request.Params.Get("CompNum");
            var userId = int.Parse(request.Params.Get("UserId"));
            int customerId = int.Parse(request.Params.Get("CustomerId"));

            //获取客户扩展字段信息
            customerExpandFields = CustomerService.GetCustomerExpandFields(compNum, CustomerMyappId);
            //获取联系人扩展字段信息
            contactExpandFields =
                CustomerService.GetContactExpandFields(compNum, ContactMyappId);

            //客户赋值==============================================
            //基本字段
            TCusBase CusBase = new TCusBase();
            CusBase.Id = customerId;
            CusBase.CusNo = request.Params.Get("CusNo");
            CusBase.CusName = request.Params.Get("CusName");
            CusBase.CusSname = request.Params.Get("CusSname") ?? "";
            CusBase.CusLastid = 0;
            CusBase.CusTel = request.Params.Get("CusTel") ?? "";
            CusBase.CusCity = String.Format("{0},{1},{2}", request.Params.Get("cus_province") ?? "0",
                request.Params.Get("cus_city") ?? "0", request.Params.Get("cus_region") ?? "0");
            CusBase.CusAddress = request.Params.Get("CusAddress") ?? "";
            CusBase.CusNote = request.Params.Get("CusNote") ?? "";
            CusBase.ConId = int.Parse(request.Params.Get("con_id") ?? "0");
            CusBase.UserId = userId;
            CusBase.ConTeam = "17,21";
            CusBase.ConIsPub = 0;
            CusBase.ConBack = 0;
            //扩展字段
            Dictionary<string, object> cusFields = new Dictionary<string, object>();
            for (int i = 0; i < request.Params.Count; i++)
            {
                var field = request.Params.GetKey(i);
                var fvalue = request.Params.Get(field);
                foreach (var field2 in customerExpandFields)
                {
                    if (field2.ExpIsSys == 0) //不是内置字段
                    {
                        if (field == NamingConversion.Default.PropertyName(field2.ExpName))
                        {
                            cusFields.Add(field, fvalue);
                        }
                    }
                }
            }
            //存储扩展字段的值
            CusBase.CusFields = JsonConvert.SerializeObject(cusFields);


            //========================================================================

            //主联系人赋值 
            var conBir = request.Params.Get("ConBir");
            if (String.IsNullOrEmpty(request.Params.Get("ConBir")))
            {
                conBir = DateTime.Now.ToString();
            }
            TCusCon CusCon = new TCusCon()
            {
                CompNum = compNum,
                ConName = request.Params.Get("ConName") ?? "",
                ConTel = request.Params.Get("ConTel") ?? "",
                ConQq = request.Params.Get("ConQq") ?? "",
                ConEmail = request.Params.Get("ConEmail") ?? "",
                ConBir = DateTime.Parse(conBir),
                ConNote = request.Params.Get("ConNote") ?? "",
                ConIsMain = 1,
                UserId = userId
            };
            Dictionary<string, object> conFields = new Dictionary<string, object>();
            for (int i = 0; i < request.Params.Count; i++)
            {
                var field_con = request.Params.GetKey(i);
                var value_con = request.Params.Get(field_con);
                foreach (var field_con2 in contactExpandFields)
                {
                    if (field_con2.ExpIsSys == 0) //不是内置字段
                    {
                        if (field_con == NamingConversion.Default.PropertyName(field_con2.ExpName))
                        {
                            //LogHelper.Debug("联系人扩展字段："+field_con);
                            conFields.Add(field_con, value_con);
                        }
                    }
                }
            }
            //存储扩展字段的值
            CusCon.ConFields = JsonConvert.SerializeObject(conFields);
            //==============================================================
            //
            //修改提交
            bool edit_status = false;
            edit_status = CustomerService.EditCustomer(customerId, CusBase, CusCon);
            if (edit_status)
            {
                rmsg.Status = edit_status;
                rmsg.Msg = "客户修改成功！";
            }
            else
            {
                rmsg.Status = edit_status;
                rmsg.Msg = "客户修改失败！";
            }

            return rmsg;
        }

        #endregion

        #region 修改客户状态 14-09-11 By 唐有炜

        // GET /api/settings/role/deleteRole/5
        /// <summary>
        /// Deletes the role.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ResponseMessage.</returns>
        [HttpGet]
        public ResponseMessage UpdateCustomerStatus(int id)
        {
            ResponseMessage rmsg = new ResponseMessage();
            //            if (RoleService.DeleteRole(id))
            //            {
            //                rmsg.Status = true;
            //            }
            //            else
            //            {
            //                rmsg.Status = false;
            //            }
            //
            //
            return rmsg;
        }

        #endregion

        #region 删除客户 14-09-11 By 唐有炜

        // GET /api/settings/role/deleteRole/5
        /// <summary>
        /// Deletes the role.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>ResponseMessage.</returns>
        [HttpGet]
        public ResponseMessage DeleteCustomer(int id)
        {
            ResponseMessage rmsg = new ResponseMessage();
//            if (RoleService.DeleteRole(id))
//            {
//                rmsg.Status = true;
//            }
//            else
//            {
//                rmsg.Status = false;
//            }
//
//
            return rmsg;
        }

        #endregion

        #region 筛选器树

        #region 获取筛选器树形列表

        /// <summary>
        /// 获取树形节点 /api/crm/customer/asyncGetNodes?compNum=&myappId=&id=
        /// </summary>
        /// <param name="compNum">The comp number.</param>
        /// <param name="myappId">The myapp identifier.</param>
        /// <param name="id">The identifier.</param>
        /// <returns>List&lt;Node&gt;.</returns>
        [HttpPost]
        public List<Node> AsyncGetNodes()
        {
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象

            var compNum = request.Params.Get("compNum");
            var myappId = int.Parse(request.Params.Get("myappId"));
            var id = int.Parse(request.Params.Get("id"));
            bool? click = bool.Parse(request.Params.Get("click"));

            var nodes = FunFilterService.AsyncGetNodes(compNum, myappId, click, id);
            //return JsonConvert.SerializeObject(nodes);
            return nodes;
        }

        #endregion

        #endregion
    }
}