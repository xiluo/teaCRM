using teaCRM.Dao.TreeHelpers;

namespace teaCRM.Dao.Manual
{
    /// <summary>
    /// 继承自TSysDepartmentDaoImpl扩展Dao类。 2014-08-20 07:58:50 By 唐有炜
    /// </summary>
    public class SysDepartmentDao : TSysDepartmentDaoImpl
    {
      
        #region 获取树形数据

        public string GetTreeData()
        {
            return DepartmentTreeHelper.GetJson();
        }

        #endregion
    }
}