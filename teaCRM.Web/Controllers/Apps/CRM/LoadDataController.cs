using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Common;
using teaCRM.Entity;
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
        // /Apps/CRM/LoadData/AsyncGetNodes/
        /// <summary>
        /// 得到指定ID的子节点列表，并序列化为JSON串
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UserAuthorize]
        public ActionResult AsyncGetNodes(int? id)
        {
            var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            var nodes = CustomerService.AsyncGetNodes(compNum, id);
            return Json(nodes, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 获取客户信息列表 2014-08-29 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/GetCustomerLsit/
        [UserAuthorize]
        [HttpPost]
        public string GetCustomerLsit(FormCollection fc)
        {
            string customerJson = "";
            try
            {
                string strWhere = String.Format("con_back=0 AND (user_id={0} OR con_is_pub=1)", int.Parse(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString()));
                if (!String.IsNullOrEmpty(Request.QueryString["con_back"]))
                {
                    strWhere = String.Format("con_back={0}", Request.QueryString["con_back"]);
                }
                if (!String.IsNullOrEmpty(Request.QueryString["con_is_pub"]))
                {
                    strWhere = String.Format("con_is_pub={0}", Request.QueryString["con_is_pub"]);
                }

                customerJson =
                    CustomerService.GetCustomerLsit(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(),
                        new string[0], int.Parse(fc["page"]),
                        int.Parse(fc["pagesize"]), strWhere, "id");
                LogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取客户信息成功。");
                return customerJson;
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                "的用户获取客户信息失败", ex);
                return "{\"Rows\":[],\"Total\":\"0\"}";
            }
        }

        #endregion

        #region 获取联系人信息列表 2014-09-01 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/GetContactList/
        [UserAuthorize]
        public string GetContactList(int cus_id)
        {
            string customerJson = "";
            try
            {
                string contactJson =
                    CustomerService.GetContactLsit(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString(),
                        new string[0], 1,
                        10, String.Format("cus_id={0}", cus_id), "id");
                LogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取联系人信息成功。");
                return contactJson;
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() +
                                "的用户获取联系人信息失败", ex);
                return "{\"Rows\":[],\"Total\":\"0\"}";
            }
        }

        #endregion

//        #region 获取客户工具栏
//
//        //
//        // GET: /Apps/CRM/LoadData/GetCustomerMenu/
//        public string GetCustomerMenu()
//        {
//            return CustomerService.GetCustomerMenu();
//        }
//
//        #endregion

//        #region 获取跟进记录列表
//
//        //
//        // GET: /Apps/CRM/LoadData/GetFollowList/
//        public string GetFollowList(string CustomerNo)
//        {
//            if (String.IsNullOrEmpty(CustomerNo))
//            {
//                return "{\"Rows\":[],\"Total\":\"0\"}";
//            }
//            return CustomerService.GetFollowList();
//        }
//
//        #region 获取跟进记录工具栏
//
//        //
//        // GET: /Apps/CRM/LoadData/GetFollowMenu/
//        public string GetFollowMenu()
//        {
//            return CustomerService.GetFollowMenu();
//        }
//
//        #endregion
//
//        #endregion

        #region 放入回收站 2014-09-05 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/ToTrash/
        [UserAuthorize]
        [HttpPost]
        public ActionResult ToTrash(int cus_id)
        {
            ResponseMessage rmsg = new ResponseMessage();
            rmsg.Status = CustomerService.UpdateCustomerStatusByWhere("con_back=1", String.Format("id={0}", cus_id));
            return Json(rmsg);
        }

        #endregion

        #region 放入公海 2014-09-05 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/ToPub/
        [UserAuthorize]
        [HttpPost]
        public ActionResult ToPub(int cus_id)
        {
            ResponseMessage rmsg = new ResponseMessage();
            rmsg.Status = CustomerService.UpdateCustomerStatusByWhere("con_is_pub=1", String.Format("id={0}", cus_id));

            return Json(rmsg);
        }

        #endregion

        #region 异步验证 2014-09-01 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/LoadData/ValidatePhone/
        public string ValidatePhone(string cus_tel)
        {
            bool IsExist = CustomerService.ValidatePhone(cus_tel);
            return IsExist.ToString().ToLower();
        }

        #endregion
    }
}