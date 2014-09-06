using System;
using System.Collections.Generic;
using System.Linq.Expressions;
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
        /// <summary>
        /// 依赖注入 2014-08-27 14:58:50 By 唐有炜
        /// </summary>
        public IZSettingsDao SettingsDao { set; get; }

        public ITSysDepartmentDao SysDepartmentDao { set; get; }

        #region 获取部门树形数据  2014-09-05 14:58:50 By 唐有炜

//        /// <summary>
//        /// 获取部门树形数据(LigerUI) 2014-09-05 14:58:50 By 唐有炜
//        /// </summary>
//        /// <returns></returns>
//        public string GetTreeData(string compNum)
//        {
//            return SettingsDao.GetDepartmentTreeData(compNum);
//        }

        /// <summary>
        /// 获取树形节点
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Node> AsyncGetNodes(string compNum, int? id)
        {
            var departments = SysDepartmentDao.GetList(d => d.CompNum == compNum && d.ParentId == (id ?? 0));
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
        public TSysDepartment GetDepartment(Expression<Func<TSysDepartment, bool>> predicate)
        {
            return SysDepartmentDao.GetEntity(predicate);
        }

        #endregion
    }
}