using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Common;
using teaCRM.Service;
using teaCRM.Service.CRM;
using teaCRM.Service.CRM.Impl;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers.Apps.CRM
{
    public class LoadDataController : Controller
    {
        //ICustomerService CustomerService = new CustomerServiceImpl();
        /// <summary>
        /// LoadDataController 注入Service依赖
        /// </summary>
        public ICustomerService CustomerService { set; get; }

        public IAccountService AccountService { set; get; }

        #region 获取筛选器树形数据 2014-08-29 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/GetFilterTreeData/
        [UserAuthorize]
        public string GetFilterTreeData()
        {
            string filterTreeData = "";
            try
            {
                var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
                filterTreeData = CustomerService.GetFilterTreeData(compNum);
                LogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                 "的用户获取筛选器树形列表成功。");
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                  "的用户获取筛选器树形列表失败，" + ex.Message);
            }
            return filterTreeData;
        }

        #endregion

        #region 获取客户信息列表 2014-08-29 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/GetCustomerLsit/
        [UserAuthorize]
        public string GetCustomerLsit()
        {
            string customerJson = "";
            try
            {
                customerJson =
                    CustomerService.GetCustomerLsit(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(), new string[0], 1,
                        10,"","id");
                LogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取客户信息成功。");
                return customerJson;
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                  "的用户获取客户信息失败",ex);
                return "";
            }
           
        }

        #endregion

        #region 获取客户工具栏

        //
        // GET: /Apps/CRM/LoadData/GetCustomerMenu/
        public string GetCustomerMenu()
        {
            return CustomerService.GetCustomerMenu();
        }

        #endregion

        #region 获取跟进记录列表

        //
        // GET: /Apps/CRM/LoadData/GetTraceList/
        public string GetTraceList()
        {
            return CustomerService.GetTraceList();
        }

        #region 获取跟进记录工具栏

        //
        // GET: /Apps/CRM/LoadData/GetTraceMenu/
        public string GetTraceMenu()
        {
            return CustomerService.GetTraceMenu();
        }

        #endregion

        #endregion
    }
}