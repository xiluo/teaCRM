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
        // GET: /Apps/CRM/Index/?ConBack=0&ConIsPub=0
        [UserAuthorize]
        public ActionResult Index(int? ConBack, int? ConIsPub)
        {
            Init();
            if (contactExpandFields == null || customerExpandFields == null)
            {
                ViewBag.ErrorMessage = "客户扩展字段信息或者联系人扩展字段信息失败。";
                return View("_Error");
            }
            else
            {
                //扩展字段
                ViewBag.CustomerExpandFields = customerExpandFields;
                ViewBag.ContactExpandFields = contactExpandFields;

                ViewBag.ConBack = ConBack;
                ViewBag.ConIsPub = ConIsPub;
                return View("CustomerIndex");
            }
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
            //客户赋值==============================================
            var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            var userId = int.Parse(Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString());
            ZCusInfo cusInfo = new ZCusInfo();
            //基本字段
            cusInfo.CusBase = new TCusBase()
            {
                CusNo = RandomHelper.GetCustomerNumber(),
                CompNum = compNum,
                CusName = fc["cus_name"].TrimEnd(','),
                CusSname = fc["cus_sname"],
                CusLastid = 0,//默认无上级客户
                CusTel = fc["cus_tel"],
                CusCity = String.Format("{0},{1},{2}", fc["cus_province"].ToString(), fc["cus_city"], fc["cus_region"]),
                CusAddress = fc["cus_address"],
                CusNote = fc["cus_note"],
                //ConId = 1,//在Dao层处理
                UserId = userId,//负责人
                ConTeam = "17,21",
                ConIsPub =0,
                ConBack = 0
                //创建时间有数据库默认指定
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
            //========================================================================

            //主联系人赋值 
            ZCusConInfo cusConInfo = new ZCusConInfo();
            var conBir = fc["con_bir"];
            if (String.IsNullOrEmpty(fc["con_bir"]))
            {
                conBir = DateTime.Now.ToString();
            }
            cusConInfo.CusCon = new TCusCon()
            {
                ConName = fc["con_name"],
                ConTel = fc["con_tel"],
                ConQq = fc["con_qq"],
                ConEmail = fc["con_email"],
                ConBir = DateTime.Parse(conBir),
                ConNote = fc["con_note"],
                ConIsMain = 1,
                UserId = userId
            };
            cusConInfo.Fields = new Dictionary<string, object>();
            for (int i = 0; i < fc.Count; i++)
            {
                var field_con = fc.GetKey(i);
                var value_con = fc.Get(field_con);
                foreach (var field_con2 in contactExpandFields)
                {
                    if (field_con == field_con2.ExpName)
                    {
                        //LogHelper.Debug("联系人扩展字段："+field_con);
                        cusConInfo.Fields.Add(new KeyValuePair<string, object>(field_con, value_con));
                    }
                }
            }
            //==============================================================

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