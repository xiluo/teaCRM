using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Entity.CRM;
using teaCRM.Service;
using teaCRM.Service.CRM;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers.Apps.CRM
{
    public class IndexController : Controller
    {
        /// <summary>
        /// IndexController 注入Service依赖
        /// </summary>
        public ICustomerService CustomerService { set; get; }

        public IAccountService AccountService { set; get; }

        #region 全局字段定义 2014-08-29 14:58:50 By 唐有炜

        //扩展字段信息
        private List<TFunExpand> customerExpandFields = null;
        private List<TFunExpand> contactExpandFields = null;

        #endregion

        #region 初始化扩展字段

        /// <summary>
        /// 初始化扩展字段
        /// </summary>
        public void Init()
        {
            //获取客户扩展字段信息
            customerExpandFields =
                CustomerService.GetCustomerExpandFields(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString());
            //获取客户联系人扩展字段信息
            contactExpandFields =
                CustomerService.GetContactExpandFields(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString());
        }

        #endregion

        #region CRM首页

        //
        // GET: /Apps/CRM/
        [UserAuthorize]
        public ActionResult Index()
        {
            return View("CustomerIndex");
        }

        #endregion

        #region 添加客户页面  2014-08-29 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Index/Add/
        [UserAuthorize]
        [HttpGet]
        public ActionResult Add()
        {
            //初始化扩展字段
            Init();

            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;
                return View("CustomerAdd");
            }
        }


        //
        // GET: /Apps/CRM/Index/Add/ 2014-08-29 14:58:50 By 唐有炜
        [UserAuthorize]
        [HttpPost]
        public ActionResult Add(FormCollection fc)
        {
            //初始化扩展字段
            Init();

            ResponseMessage rmsg = new ResponseMessage();
            //添加逻辑==============================================
            ZCusInfo cusInfo = new ZCusInfo();
            //基本字段
            cusInfo.CusBase = new TCusBase()
            {
                CusNo = RandomHelper.GetCustomerNumber(),
                CompNum = "10000",
                CusName = "唐有炜的公司",
                CusSname = "唐",
                CusLastid = 0,
                CusTel = "15225062328",
                CusCity = "河南",
                CusAddress = "郑州",
                CusNote = "备注",
                ConId = 1,
                UserId = 1,
                ConTeam = "1,2",
                ConIsPub = 1,
                ConBack = 1
            };
            //扩展字段
            cusInfo.Fields = new Dictionary<string, object>();
            for (int i = 0; i < fc.Count; i++)
            {
                var field = fc.GetKey(i);
                var value = fc.Get(field);
                foreach (var field2 in customerExpandFields)
                {
                    if (field == field2.ExpName)
                    {
                        cusInfo.Fields.Add(new KeyValuePair<string, object>(field, value));
                    }
                }
            }

            //联系人添加
            ZCusConInfo cusConInfo = new ZCusConInfo();


            //添加提交
            bool add_status = CustomerService.AddCustomer(cusInfo, cusConInfo);
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
            return Json(rmsg);
        }

        #endregion

        #region   查看客户页面  2014-08-30 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Index/Show/
        [UserAuthorize]
        [HttpGet]
        public ActionResult Show()
        {
            //初始化扩展字段
            Init();

            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;
                return View("CustomerShow");
            }
        }

        #endregion

        #region   修改客户页面  2014-08-30 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Index/Edit/
        [UserAuthorize]
        [HttpGet]
        public ActionResult Edit()
        {
            //初始化扩展字段
            Init();

            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;
                return View("CustomerEdit");
            }
        }

        #endregion

        #region   修改联系人页面  2014-08-30 14:58:50 By 唐有炜

        //
        // GET: /Apps/CRM/Index/ContactEdit/
        [UserAuthorize]
        [HttpGet]
        public ActionResult ContactEdit()
        {
            //初始化扩展字段
            Init();

            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;
                return View("CustomerEdit");
            }
        }

        #endregion
    }
}