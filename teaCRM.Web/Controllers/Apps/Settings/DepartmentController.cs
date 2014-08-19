using System.Web.Mvc;
using teaCRM.Service.Impl;

namespace teaCRM.Web.Controllers.Apps.Settings
{
    public class DepartmentController : Controller
    {
        #region 组织架构首页

        //
        // GET: /Settings/Department/

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
        // GET: /Settings/Department/GetDepartmentTreeData
        public string GetDepartmentTreeData()
        {
            SysDepartmentService service = new SysDepartmentService();
            string treeData = service.GetTreeData();
            return treeData;
        }

        #endregion
    }
}