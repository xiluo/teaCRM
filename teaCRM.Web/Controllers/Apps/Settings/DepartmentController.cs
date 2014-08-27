using System.Web.Mvc;
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
      public  ISysDepartmentService SysDepartmentService { set; get; }
        

        #region 组织架构首页

        //
        // GET: /Settings/Department/
         [UserAuthorize]
        public ActionResult Index()
        {
            return View("Index");
        }

        #endregion

        #region 添加数据

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

        #region 修改数据

        public ActionResult Edit()
        {
            return View();
        }

        #endregion

        #region 删除数据

        public ActionResult Delete()
        {
            return View();
        }

        #endregion

        #region 获取树形数据

        //
        // GET: /Apps/Settings/Department/GetDepartmentTreeData
        
        public string GetDepartmentTreeData()
        {
              string treeData = SysDepartmentService.GetTreeData();
            return treeData;
        }

        #endregion
    }
}