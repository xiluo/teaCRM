using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using teaCRM.Entity;

namespace teaCRM.Service.Settings
{
    /// <summary>
    /// 部门管理
    /// </summary>
   public interface ISysDepartmentService
   {
//       /// <summary>
//       /// 获取部门树形数据
//       /// </summary>
//       /// <returns></returns>
//        string GetTreeData(string compNum);
       /// <summary>
       /// 获取树形节点
       /// </summary>
       /// <param name="compNum"></param>
       /// <param name="id"></param>
       /// <returns></returns>
       List<Node> AsyncGetNodes(string compNum, int? id);

       /// <summary>
       /// 获取单个部门信息 2014-09-05 14:58:50 By 唐有炜
       /// </summary>
       /// <param name="predicate">筛选条件</param>
       /// <returns></returns>
       TSysDepartment GetDepartment(Expression<Func<TSysDepartment, bool>> predicate);


        /// <summary>
        /// 添加部门信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysDepartment"></param>
        /// <returns></returns>
         bool AddDepartment(TSysDepartment sysDepartment);



        /// <summary>
        /// 删除部门信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">部门</param>
        /// <returns></returns>
        bool DeleteDepartment(int? id);

   }
}
