using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Dao.TreeHelpers;
using teaCRM.Entity;

namespace teaCRM.Dao.Settings.Impl
{
    /// <summary>
    /// 手动写的设置操作实现类 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
    public class ZSettingsDaoImpl : IZSettingsDao
    {
        /// <summary>
        /// 依赖注入 2014-08-26 14:58:50 By 唐有炜
        /// </summary>
        public ITreeHelper<DepartmentTree> DepartmentTreeHelper { set; get; }

        #region 获取树形数据

        /// <summary>
        /// 获取树形数据
        /// </summary>
        /// <returns></returns>
        public string GetDepartmentTreeData(string compNum)
        {
            return DepartmentTreeHelper.GetJson(compNum);
        }

        #endregion
    }
}