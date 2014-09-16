using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{
    public interface ITSysUserDao : ITableDao<TSysUser>
    {
        #region 手写的扩展函数 2014-08-21 14:58:50 By 唐有炜
          #region 用户名是否存在 14-09-12 By 唐有炜

        /// <summary>
        /// 检测该公司下的账号名是否重复
        /// </summary>
        /// <param name="UserLName"></param>
        /// <param name="compNum"></param>
        /// <returns></returns>
        bool ExistsUser(string UserLName, string compNum);

        #endregion

        #endregion
    }
}