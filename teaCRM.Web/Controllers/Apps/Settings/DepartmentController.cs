using System.Web.Mvc;
using teaCRM.Service;
using teaCRM.Service.Impl;
using teaCRM.Web.Filters;

namespace teaCRM.Web.Controllers.Apps.Settings
{
    public class DepartmentController : Controller
    {
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
            ISysDepartmentService service = new SysDepartmentServiceImpl();
            string treeData = service.GetTreeData();
            return treeData;
        }

        #endregion
    }
}