using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using teaCRM.Entity;

namespace teaCRM.Service.Settings
{
    public interface ISysUserService
    {

        /// <summary>
        /// 获取用户信息列表 2014-09-11 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        IEnumerable<TSysUser> GetUserLsit(string compNum, int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TSysUser, bool>> predicate);

        /// <summary>
        /// 检测该公司下的账号名是否重复
        /// </summary>
        /// <param name="UserLName"></param>
        /// <param name="compNum"></param>
        /// <returns></returns>
        bool ExistsUser(string UserLName,string compNum);

        /// <summary>
        /// 获取单个用户信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">用户id</param>
        /// <returns></returns>
        TSysUser GetUser(int id);

        /// <summary>
        /// 添加用户信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysUser"></param>
        /// <returns></returns>
        bool AddUser(TSysUser sysUser);


        /// <summary>
        /// 修改用户信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysUser"></param>
        /// <returns></returns>
        bool UpdateUser(TSysUser sysUser);


        /// <summary>
        /// 删除用户信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">用户</param>
        /// <returns></returns>
        bool DeleteUser(int? id);




    }
}
