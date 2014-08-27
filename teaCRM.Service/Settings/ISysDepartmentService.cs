namespace teaCRM.Service.Settings
{
    /// <summary>
    /// 部门管理
    /// </summary>
   public interface ISysDepartmentService
   {
       /// <summary>
       /// 获取部门树形数据
       /// </summary>
       /// <returns></returns>
        string GetTreeData();
    }
}
