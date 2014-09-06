using System;
using System.Web.Mvc;
using teaCRM.Common;
using teaCRM.Entity;
using teaCRM.Service;
using teaCRM.Service.Impl;
using teaCRM.Service.Settings;
using teaCRM.Service.Settings.Impl;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers.Apps.Settings
{
    public class DepartmentController : Controller
    {
        /// <summary>
        /// 依赖注入 2014-08-27 14:58:50 By 唐有炜
        /// </summary>
        public ISysDepartmentService SysDepartmentService { set; get; }

        #region 组织架构首页 2014-08-27 14:58:50 By 唐有炜

        //
        // GET: /Settings/Department/
        [UserAuthorize]
        public ActionResult Index()
        {
            return View("DepartmentIndex");
        }

        #endregion

        #region 添加数据 2014-08-27 14:58:50 By 唐有炜

        public ActionResult Add(FormCollection fc)
        {
            if (fc.Count == 0)
            {
                return View("Add");
            }
            else
            {
                return Json(new {id = 2});
            }
        }

        #endregion

        #region 修改数据 2014-08-27 14:58:50 By 唐有炜

        public ActionResult Edit()
        {
            return View();
        }

        #endregion

        #region 删除数据 2014-08-27 14:58:50 By 唐有炜

        public ActionResult Delete()
        {
            return View();
        }

        #endregion

        #region 获取树形数据 2014-08-27 14:58:50 By 唐有炜

//        //
//        // GET: /Apps/Settings/Department/GetDepartmentTreeData
//        [UserAuthorize]
//        public string GetDepartmentTreeData()
//        {
//            string treeData = "";
//            try
//            {
//                var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
//                treeData = SysDepartmentService.GetTreeData(compNum);
//                LogHelper.Info("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取部门树形列表成功。");
//            }
//            catch (Exception ex)
//            {
//                LogHelper.Error("用户id为" + Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID].ToString() + "的用户获取部门树形列表失败，" +
//                                ex.Message);
//            }
//            return treeData;
//        }

        // /Apps/Settings/Department/AsyncGetNodes/
        /// <summary>
        /// 得到指定ID的子节点列表，并序列化为JSON串
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UserAuthorize]
        public ActionResult AsyncGetNodes(int? id)
        {
            var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            var nodes = SysDepartmentService.AsyncGetNodes(compNum, id);
            return Json(nodes,JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region 获取一条部门数据

        //
        // GET /Settings/Department/GetDepartment/1/
        /// <summary>
        /// 获取一条部门数据  2014-09-5 14:58:50 By 唐有炜
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult GetDepartment(int id)
        {
            var department = SysDepartmentService.GetDepartment(d => d.Id == id);
            return Json(department);
        }

        #endregion
    }
}