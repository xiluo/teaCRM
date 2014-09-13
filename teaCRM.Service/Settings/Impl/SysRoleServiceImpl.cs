using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using NLite.Data;
using teaCRM.Common;
using teaCRM.Dao;
using teaCRM.Entity;
using System.Linq.Dynamic;

namespace teaCRM.Service.Settings.Impl
{
    public class SysRoleServiceImpl : ISysRoleService
    {
        //角色注入
        public ITSysRoleDao SysRoleDao { set; get; }

        #region 获取角色信息列表 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取角色信息列表 2014-09-11 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        public IEnumerable<TSysRole> GetRoleLsit(string compNum, int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TSysRole, bool>> predicate)
        {
            IPagination<TSysRole> roles = null;
            try
            {
                roles = SysRoleDao.GetListByPage(pageIndex, pageSize, out rowCount, orders, predicate);
                LogHelper.Debug("获取角色列表成功。");
                return roles;
            }
            catch (Exception ex)
            {
                rowCount = 0;
                LogHelper.Error("获取角色列表失败：", ex);
                return null;
            }
        }

        #endregion


        #region 获取单个角色信息

        /// <summary>
        /// 获取单个角色信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">角色id</param>
        /// <returns></returns>
        public TSysRole GetRole(int id)
        {
            return SysRoleDao.GetEntity(r => r.Id == id);
        }

        #endregion



        #region  修改角色信息 2014-09-10 14:58:50 By 唐有炜

        /// <summary>
        /// 修改角色信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysRole"></param>
        /// <returns></returns>
        public bool UpdateRole(TSysRole sysRole)
        {
            return SysRoleDao.UpadateEntity(sysRole);
        }

        #endregion

        #region 添加角色信息 2014-09-07 14:58:50 By 唐有炜

        /// <summary>
        /// 添加角色信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysRole"></param>
        /// <returns></returns>
        public bool AddRole(TSysRole sysRole)
        {
            return SysRoleDao.InsertEntity(sysRole);
        }

        #endregion

        #region 删除角色信息 2014-09-07 14:58:50 By 唐有炜

        /// <summary>
        /// 删除角色信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">角色</param>
        /// <returns></returns>
        public bool DeleteRole(int id)
        {
            return SysRoleDao.DeleteEntity(d => d.Id == id);
        }

        #endregion
    }
}