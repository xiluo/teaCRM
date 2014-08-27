using teaCRM.Dao.Impl;
using teaCRM.Dao.Manual.TreeHelpers;
using teaCRM.Dao.Manual.TreeHelpers.Impl;
using teaCRM.Entity;

namespace teaCRM.Dao.Manual.Impl
{
    /// <summary>
    /// 继承自自动生成的dao类TSysDepartmentDaoImpl，实现自手动的接口ITSysDepartmentDaoManual，达到扩展的目的 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
    public class TSysDepartmentDaoManualImpl : TSysDepartmentDaoImpl, ITSysDepartmentDaoManual
    {
        //public ITreeHelper<DepartmentTree> DepartmentTreeHelper = new DepartmentTreeHelperImpl();
        /// <summary>
        /// 依赖注入 2014-08-26 14:58:50 By 唐有炜
        /// </summary>
        public ITreeHelper<DepartmentTree> DepartmentTreeHelper { set; get; }

        #region 获取树形数据

        /// <summary>
        /// 获取树形数据
        /// </summary>
        /// <returns></returns>
        public string GetTreeData()
        {
            return DepartmentTreeHelper.GetJson();
        }

        #endregion
    }
}