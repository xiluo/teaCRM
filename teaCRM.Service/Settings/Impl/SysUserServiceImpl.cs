using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using teaCRM.Dao;
using teaCRM.Entity;

namespace teaCRM.Service.Settings.Impl
{
   public class SysUserServiceImpl
    {

        //用户注入
        public ITSysUserDao SysUserDao { set; get; }


        #region 获取用户信息列表 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取用户信息列表 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="predicate">条件</param>
        public IEnumerable<TSysUser> GetUserLsit(string compNum, int pageIndex, int pageSize, out int rowCount,
            Expression<Func<TSysUser, bool>> predicate)
        {
            var count = SysUserDao.GetList().Count;
            rowCount = count;
            return SysUserDao.GetListByPage(pageIndex, pageSize, out count,null, predicate);


        }

        #endregion



        #region  修改用户信息 2014-09-10 14:58:50 By 唐有炜

        /// <summary>
        /// 修改用户信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysUser"></param>
        /// <returns></returns>
        public bool UpdateUser(TSysUser sysUser)
        {
            return SysUserDao.UpadateEntity(sysUser);
        }

        #endregion


        #region 添加用户信息 2014-09-07 14:58:50 By 唐有炜

        /// <summary>
        /// 添加用户信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysUser"></param>
        /// <returns></returns>
        public bool AddUser(TSysUser sysUser)
        {
            return SysUserDao.InsertEntity(sysUser);
        }

        #endregion

        #region 删除用户信息 2014-09-07 14:58:50 By 唐有炜

        /// <summary>
        /// 删除用户信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">用户</param>
        /// <returns></returns>
        public bool DeleteUser(int? id)
        {
            return SysUserDao.DeleteEntity(d => d.Id == id);
        }

        #endregion
    }
}
