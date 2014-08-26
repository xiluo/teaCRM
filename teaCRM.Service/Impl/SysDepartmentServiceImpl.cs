using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Dao.Manual;

namespace teaCRM.Service.Impl
{
    /// <summary>
    /// 部门管理
    /// </summary>
    public class SysDepartmentServiceImpl : ISysDepartmentService
    {

        /// <summary>
        /// 获取部门树形数据
        /// </summary>
        /// <returns></returns>
        public string GetTreeData()
            {
               return new TSysDepartmentDao().GetTreeData();
            }



    }
}
