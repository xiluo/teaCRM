using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Service
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
