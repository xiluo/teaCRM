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

        #region 获取筛选器树形数据

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
                MyLogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取筛选器树形列表成功。");
            }
            catch (Exception ex)
            {
                MyLogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取筛选器树形列表失败，" + ex.Message);
            }
            return filterTreeData;
        }

        #endregion

        #region 获取客户信息列表

        //
        // GET: /Apps/CRM/LoadData/GetCustomerLsit/
        public string GetCustomerLsit()
        {
            string customerJson = "";
            try
            {
                customerJson = CustomerService.GetCustomerLsit();
                MyLogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取客户信息成功。");
            }
            catch (Exception ex)
            {
                MyLogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                  "的用户获取客户信息失败，" + ex.Message);
            }
            return customerJson;
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