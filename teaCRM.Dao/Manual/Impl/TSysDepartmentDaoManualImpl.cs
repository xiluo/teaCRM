using teaCRM.Dao.Impl;
using teaCRM.Dao.Manual.TreeHelpers;

namespace teaCRM.Dao.Manual.Impl
{
    /// <summary>
    /// 继承自自动生成的dao类TSysDepartmentDaoImpl，实现自手动的接口ITSysDepartmentDaoManual，达到扩展的目的 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
    public class TSysDepartmentDaoManualImpl : TSysDepartmentDaoImpl, ITSysDepartmentDaoManual
    {

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
