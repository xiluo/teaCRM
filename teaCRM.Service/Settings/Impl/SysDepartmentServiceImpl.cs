using teaCRM.Dao;
using teaCRM.Dao.Settings;

namespace teaCRM.Service.Settings.Impl
{
    /// <summary>
    /// 部门管理
    /// </summary>
    public class SysDepartmentServiceImpl : ISysDepartmentService
    {
        /// <summary>
        /// 依赖注入 2014-08-27 14:58:50 By 唐有炜
        /// </summary>
        public IZSettingsDao SettingsDao { set; get; }

        /// <summary>
        /// 获取部门树形数据
        /// </summary>
        /// <returns></returns>
        public string GetTreeData(string compNum)
        {
            return SettingsDao.GetDepartmentTreeData(compNum);
        }
    }
}