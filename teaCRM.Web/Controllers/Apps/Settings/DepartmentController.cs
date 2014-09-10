using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
        // GET: /Apps/Settings/Department/
        [UserAuthorize]
        public ActionResult Index()
        {
            return View("DepartmentIndex");
        }

        #endregion

        #region 添加部门 2014-08-27 14:58:50 By 唐有炜

        // /Apps/Settings/Department/Add/
        public ActionResult Add(FormCollection fc)
        {
            if (fc.Count == 0)
            {
                return View("DepartmentEdit");
            }
            ResponseMessage rmsg = new ResponseMessage();
            var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            var depNum = 0;
            var depOrder = 0;
            if (!String.IsNullOrEmpty(fc["DepNum"]))
            {
                depNum = int.Parse(fc["DepNum"]);
            }
            if (!String.IsNullOrEmpty(fc["depOrder"]))
            {
                depNum = int.Parse(fc["depOrder"]);
            }

            TSysDepartment sysDepartment = new TSysDepartment()
            {
                DepName = fc["DepName"],
                ParentId = int.Parse(fc["HiddenParentId"].ToString()),
                CompNum = compNum,
                DepNum = depNum,
                DepOrder = depOrder,
                CreateDate = DateTime.Now,
                DepGoal = fc["DepGoal"],
                DepRespon = fc["DepRespon"],
                DepSkills = fc["DepSkills"],
                DepCourse = fc["DepCourse"],
                DepNote = fc["DepNote"]
            };
            bool status = SysDepartmentService.AddDepartment(sysDepartment);
            if (status)
            {
                rmsg.Status = true;
                rmsg.Msg = "部门添加成功！";
            }
            else
            {
                rmsg.Status = false;
                rmsg.Msg = "部门添加失败！";
            }
            return Json(rmsg);
        }

        #endregion

        #region 修改数据 2014-08-27 14:58:50 By 唐有炜

        public ActionResult Edit(FormCollection fc, int id)
        {
            //首次访问

            if (fc.Count == 0)
            {
                var vdepartment = SysDepartmentService.GetDepartment(d => d.Id == id);
                ViewBag.Department = vdepartment;
                return View("DepartmentEdit");
            }
            //修改提交
            ResponseMessage rmsg = new ResponseMessage();

            try
            {
                var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
                var depNum = 0;
                var depOrder = 0;
                if (!String.IsNullOrEmpty(fc["DepNum"]))
                {
                    depNum = int.Parse(fc["DepNum"]);
                }
                if (!String.IsNullOrEmpty(fc["depOrder"]))
                {
                    depNum = int.Parse(fc["depOrder"]);
                }
                TSysDepartment department = new TSysDepartment
                {
                    Id = id,
                    DepName = fc["DepName"],
                    ParentId = int.Parse(fc["HiddenParentId"].ToString()),
                    CompNum = compNum,
                    DepNum = depNum,
                    DepOrder = depOrder,
                    CreateDate = DateTime.Now,
                    DepGoal = fc["DepGoal"],
                    DepRespon = fc["DepRespon"],
                    DepSkills = fc["DepSkills"],
                    DepCourse = fc["DepCourse"],
                    DepNote = fc["DepNote"]
                };
                bool status = SysDepartmentService.UpdateDepartment(department);
                if (status)
                {
                    rmsg.Status = true;
                }
                else
                {
                    rmsg.Status = false;
                }
                LogHelper.Debug("部门" + department.DepName + "修改成功！");
            }
            catch (Exception ex)
            {
                LogHelper.Error("部门修改失败！", ex);
                rmsg.Status = false;
            }
            return Json(rmsg);
        }

        #endregion

        #region 删除数据 2014-08-27 14:58:50 By 唐有炜

        public ActionResult Delete(int id)
        {
            ResponseMessage rmsg = new ResponseMessage();
            try
            {
                bool status = SysDepartmentService.DeleteDepartment(id);
                if (status)
                {
                    rmsg.Status = true;
                }
                else
                {
                    rmsg.Status = false;
                }
                LogHelper.Debug("部门删除成功！");
            }
            catch (Exception ex)
            {
                LogHelper.Error("部门删除失败！", ex);
                rmsg.Status = false;
            }

            return Json(rmsg);
        }

        #endregion

        #region 异步获取部门属性数据 2014-08-27 14:58:50 By 唐有炜

        // /Apps/Settings/Department/AsyncGetNodes/
        /// <summary>
        /// 得到指定ID的子节点列表，并序列化为JSON串
        /// </summary>
        /// <param name="id">节点父id</param>
        /// <param name="type">类型（默认：show，select:添加一个根节点）</param>
        /// <returns></returns>
        [UserAuthorize]
        public ActionResult AsyncGetNodes(int? id, string type)
        {
            var compNum = Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_NUM].ToString();
            var nodes = SysDepartmentService.AsyncGetNodes(compNum, id);
            //加入根节点
            if (type == "select")
            {
                Node node = new Node()
                {
                    id = 0,
                    isParent = false,
                    name = "顶级分类",
                    pId = -1
                };
                nodes.Insert(0, node);
            }
            return Json(nodes);
        }

        #endregion

        #region 获取一条部门数据

        //
        // GET /Settings/Department/GetDepartment/1/
        /// <summary>
        /// 获取一条部门数据  2014-09-5 14:58:50 By 唐有炜
        /// </summary>
        /// <returns></returns>
        //[HttpPost]
        public ActionResult GetDepartment(int id)
        {
            var department = SysDepartmentService.GetDepartment(d => d.Id == id);
            return Json(department);
        }

        #endregion
    }
}