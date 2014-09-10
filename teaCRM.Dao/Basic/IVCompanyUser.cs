using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{

    public interface IVCompanyUserDao : IViewDao<VCompanyUser>
    {
        #region 手写的扩展函数 2014-08-21 14:58:50 By 唐有炜

        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="sysCompany"></param>
        /// <param name="sysUser"></param>
        bool InsertEntities(TSysCompany sysCompany, TSysUser sysUser);

        #endregion
    }
}