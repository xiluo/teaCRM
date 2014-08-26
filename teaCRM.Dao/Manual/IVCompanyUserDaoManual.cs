using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Entity;

namespace teaCRM.Dao.Manual
{
    /// <summary>
    /// 继承自自动生成的接口IVCompanyUserDao 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
  public  interface IVCompanyUserDaoManual:IVCompanyUserDao
    {
        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="sysCompany"></param>
        /// <param name="sysUser"></param>
        bool InsertEntities(TSysCompany sysCompany, TSysUser sysUser);

    }
}
