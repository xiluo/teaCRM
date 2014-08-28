
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Dao.Settings
{
    /// <summary>
    /// 手动写的设置操作接口IZSettingsDao 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
    public interface  IZSettingsDao
    {
        /// <summary>
        /// 获取组织架构树形数据 2014-08-26 14:58:50 By 唐有炜
        /// </summary>
        /// <returns></returns>
        string GetDepartmentTreeData(string compNum);
    }
}
