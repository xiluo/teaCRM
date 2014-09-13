using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using teaCRM.Common;
using teaCRM.Dao;
using teaCRM.Dao.Settings;
using teaCRM.Entity;

namespace teaCRM.Service.Settings.Impl
{
    /// <summary>
    /// 部门管理
    /// </summary>
    public class SysDepartmentServiceImpl : ISysDepartmentService
    {
     

        public ITSysDepartmentDao SysDepartmentDao { set; get; }

        #region 获取部门树形数据  2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 获取树形节点
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Node> AsyncGetNodes(string compNum, int? id)
        {
            var departments =
                SysDepartmentDao.GetList(d => d.CompNum == compNum && d.ParentId == (id ?? 0)).OrderBy(d => d.DepOrder);
            var nodes = new List<Node>();
            //将departments转换为nodes
            foreach (var department in departments)
            {
                var node = new Node();
                node.id = department.Id;
                node.pId = department.ParentId;
                node.name = department.DepName;

                bool isHasChild = SysDepartmentDao.ExistsEntity(d => d.ParentId == node.id && d.CompNum == compNum);
                if (isHasChild)
                {
                    node.isParent = true;
                }

                nodes.Add(node);
            }
            return nodes;
        }

        #endregion

        #region 获取单个部门信息 2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 获取单个部门信息 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="predicate">筛选条件</param>
        /// <returns></returns>
        public VSysDepartment GetDepartment(Expression<Func<VSysDepartment, bool>> predicate)
        {
            return SysDepartmentDao.GetViewEntity(predicate);
        }

        #endregion

        #region  修改部门信息 2014-09-10 14:58:50 By 唐有炜

        /// <summary>
        /// 修改部门信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysDepartment"></param>
        /// <returns></returns>
        public bool UpdateDepartment(TSysDepartment sysDepartment)
        {
            return SysDepartmentDao.UpadateEntity(sysDepartment);
        }

        #endregion


        #region 添加部门信息 2014-09-07 14:58:50 By 唐有炜

        /// <summary>
        /// 添加部门信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="sysDepartment"></param>
        /// <returns></returns>
        public bool AddDepartment(TSysDepartment sysDepartment)
        {
            return SysDepartmentDao.InsertEntity(sysDepartment);
        }

        #endregion

        #region 删除部门信息 2014-09-07 14:58:50 By 唐有炜

        /// <summary>
        /// 删除部门信息 2014-09-07 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="id">部门</param>
        /// <returns></returns>
        public bool DeleteDepartment(int? id)
        {
            //有子类，禁止删除
            bool exist = SysDepartmentDao.ExistsEntity(d => d.ParentId == id);
            if (exist)
            {
                return false;
            }
            return SysDepartmentDao.DeleteEntity(d => d.Id == id);
        }

        #endregion


        #region  根据条件查询某些字段(LINQ 动态查询) 2014-09-10 14:58:50 By 唐有炜

        /// <summary>
        /// 根据条件查询某些字段(LINQ 动态查询)
        /// </summary>
        /// <param name="selector">要查询的字段（格式：new(ID,Name)）</param>
        /// <param name="predicate">筛选条件（u=>u.id==0）</param>
        /// <returns></returns>
        public IQueryable<Object> GetFields(string selector, string predicate)
        {
            return SysDepartmentDao.GetFields(selector, predicate);
        }

        #endregion

        #region 获取单个字段

        /// <summary>
        /// 获取单个字段
        /// </summary>
        /// <param name="predicate">筛选条件</param>
        /// <returns></returns>
        public object GetField(Expression<Func<VSysDepartment, bool>> predicate)
        {
            return SysDepartmentDao.GetViewEntity(predicate);
        }

        #endregion

     
    }
}