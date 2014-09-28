// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-21-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-28-2014

using teaCRM.Service;
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

        #region  获取客户Bootgrid列表

        /// <summary>
        /// 获取客户Bootgrid列表
        /// /api/crm/customer/getAllCustomers?current=1&rowCount=10&sort[cus_sname]=DESC&searchPhrase=&compNum=10000
        /// </summary>
        /// <returns>json</returns>
        [HttpGet]
        public String GetAllCustomers()
        {
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            //基本参数
            string compNum = request.Params.Get("compNum");

            //构造条件
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
            string selector = "NEW(Id,CompNum,CusFields)"; //注意，查询时必须包含CusFields
            //string expSelector = "ExpIsMarry,ExpAddtime";
            //string expSelector = "ExpIsMarry";
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

        #region 获取客户 14-09-12 By 唐有炜

        /// <summary>
        /// 获取一条客户列表
        /// GET /api/crm/customer/getCustomer?compNum=10000&id=144
        /// </summary>
        /// <param name="id">客户id</param>
        /// <returns>json</returns>
        public string GetCustomer(string compNum, int id)
        {
            string selector = "NEW(Id,CompNum,CusFields)"; //注意，查询时必须包含CusFields
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
        /// 
        /// </summary>
        /// <param name="customer">The customer.</param>
        /// <returns>ResponseMessage.</returns>
        [HttpPost]
        public ResponseMessage AddCustomer([FromBody] TCusBase customer)
        {
            ResponseMessage rmsg = new ResponseMessage();
            var contact = new TCusCon();
            if (CustomerService.AddCustomer(customer, contact))
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

        #region 修改客户 14-09-11 By 唐有炜

        //
        // POST /api/settings/role/editRole/
        // TSysRole role
        /// <summary>
        /// Edits the role.
        /// </summary>
        /// <param name="customer">The customer.</param>
        /// <returns>ResponseMessage.</returns>
        [HttpPost]
        public ResponseMessage EditCustomer([FromBody] TCusBase customer)
        {
            ResponseMessage rmsg = new ResponseMessage();
//            if (RoleService.UpdateRole(role))
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
            bool? click= bool.Parse(request.Params.Get("click"));

            var nodes = FunFilterService.AsyncGetNodes(compNum, myappId,click, id);
            //return JsonConvert.SerializeObject(nodes);
            return nodes;
        }

        #endregion

        #endregion
    }
}