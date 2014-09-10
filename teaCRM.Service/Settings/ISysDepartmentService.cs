using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using teaCRM.Entity;

namespace teaCRM.Service.Settings
{
    /// <summary>
    /// 部门管理
    /// </summary>
   public interface ISysDepartmentService
   {
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
       VSysDepartment GetDepartment(Expression<Func<VSysDepartment, bool>> predicate);


        /// <summary>
        /// 根据条件查询某些字段(LINQ 动态查询)
        /// </summary>
        /// <param name="selector">要查询的字段（格式：new(ID,Name)）</param>
        /// <param name="predicate">筛选条件（u=>u.id==0）</param>
        /// <returns></returns>
       IQueryable<Object> GetFields(string selector, string predicate);


        /// <summary>
        /// 添加部门信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysDepartment"></param>
        /// <returns></returns>
         bool AddDepartment(TSysDepartment sysDepartment);


         /// <summary>
         /// 修改部门信息 2014-09-07 14:58:50 By 唐有炜
         /// </summary>
         /// <param name="sysDepartment"></param>
         /// <returns></returns>
         bool UpdateDepartment(TSysDepartment sysDepartment);


        /// <summary>
        /// 删除部门信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">部门</param>
        /// <returns></returns>
        bool DeleteDepartment(int? id);

   }
}
