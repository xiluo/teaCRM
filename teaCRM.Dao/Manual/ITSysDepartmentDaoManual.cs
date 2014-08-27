using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Dao.Manual
{
    /// <summary>
    /// 继承自自动生成的接口ITFunFilterDao 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
    public interface ITSysDepartmentDaoManual : ITSysDepartmentDao
    {
        /// <summary>
        /// 获取树形数据 2014-08-26 14:58:50 By 唐有炜
        /// </summary>
        /// <returns></returns>
        string GetTreeData(string compNum);
    }
}
