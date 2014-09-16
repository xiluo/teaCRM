using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using NLite.Data;
using teaCRM.Common;
using teaCRM.Dao;
using teaCRM.Entity;

namespace teaCRM.Service.Settings.Impl
{
    public class SysUserServiceImpl:ISysUserService
    {
        //用户注入
        public ITSysUserDao SysUserDao { set; get; }

        #region 获取用户信息列表 2014-08-29 14:58:50 By 唐有炜

        public IEnumerable<TSysUser> GetUserLsit(string compNum, int pageIndex, int pageSize, out int rowCount, IDictionary<string, teaCRMEnums.OrderEmum> orders,
              Expression<Func<TSysUser, bool>> predicate)
        {

            IPagination<TSysUser> users = null;
            try
            {
                users = SysUserDao.GetListByPage(pageIndex, pageSize, out rowCount, orders, predicate);
                LogHelper.Debug("获取用户列表成功。");
                return users;
            }
            catch (Exception ex)
            {
                rowCount = 0;
                LogHelper.Error("获取用户列表失败：", ex);
                return null;
            }

        }
        #endregion


        #region 检测该公司下的账号名是否重复

        /// <summary>
        /// 检测该公司下的账号名是否重复
        /// </summary>
        /// <param name="UserLName"></param>
        /// <param name="compNum"></param>
        /// <returns></returns>
    public    bool ExistsUser(string UserLName, string compNum)
        {
            return SysUserDao.ExistsUser(UserLName, compNum);
             
        }
        #endregion



        #region 获取单个用户信息 2014-09-07 14:58:50 By 唐有炜

       
        /// <summary>
        /// 获取单个用户信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">角色id</param>
        /// <returns></returns>
        public TSysUser GetUser(int id)
        {
            return SysUserDao.GetEntity(u => u.Id == id);
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
            try
            {
                SysUserDao.InsertEntity(sysUser);
                LogHelper.Debug("用户添加成功！");
                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Error("用户添加失败！",ex);
                return false;
            }
           
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