using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using teaCRM.Entity;
using teaCRM.Entity.Settings;

namespace teaCRM.Service.Settings
{
    /// <summary>
    /// 角色管理
    /// </summary>
    public interface ISysRoleService
    {
        /// <summary>
        /// 获取角色信息列表 2014-09-11 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        IEnumerable<TSysRole> GetRoleLsit(string compNum, int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TSysRole, bool>> predicate);


        /// <summary>
        /// 获取权限列表
        /// </summary>
        /// <param name="compNum"></param>
        /// <returns></returns>
        List<ZSysPermission> GetAllPermissions(string compNum);



        /// <summary>
        /// 获取单个角色信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">角色id</param>
        /// <returns></returns>
        TSysRole GetRole(int id);


        /// <summary>
        /// 添加角色信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysRole"></param>
        /// <returns></returns>
        bool AddRole(TSysRole sysRole);


        /// <summary>
        /// 修改角色信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysRole"></param>
        /// <returns></returns>
        bool UpdateRole(TSysRole sysRole);


        /// <summary>
        /// 删除角色信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">角色id</param>
        /// <returns></returns>
        bool DeleteRole(int id);



    }
}