using System.Collections.Generic;
using System.Linq;
using teaCRM.Dao.Impl;
using teaCRM.Dao.Manual.Impl;
using teaCRM.Entity;

namespace teaCRM.Dao.Manual.TreeHelpers.Impl
{
    /// <summary>
    /// 部门树形帮助类。 2014-08-20 07:58:50 By 唐有炜
    /// </summary>
    public class DepartmentTreeHelperImpl : ITreeHelper<DepartmentTree>
    {
        public ITSysDepartmentDao SysDepartmentDao = new TSysDepartmentDaoImpl();

        #region 获取父类集合

        /// <summary>
        /// 获取父类集合
        /// </summary>
        /// <returns></returns>
        public IList<DepartmentTree> ReturnParentTree()
        {
            List<DepartmentTree> trees;
            trees = SysDepartmentDao.GetList()
                .Where(d => d.ParentId == 0)
                .Select(d => new DepartmentTree() {ModuleID = d.Id, ParentID = d.ParentId, ModuleName = d.DepName})
                .ToList();
            return trees;
        }

        #endregion

        #region 判断分类是否有子类

        /// <summary>
        /// 判断分类是否有子类
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool IsHaveChild(int id)
        {
            bool flag = SysDepartmentDao.ExistsEntity(d => d.Id == id);
            return flag;
        }

        #endregion

        #region 根据id获取子类

        /// <summary>
        /// 根据id获取子类
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IList<DepartmentTree> GetChild(int id)
        {
            var childTrees = SysDepartmentDao.GetList()
                .Where(d => d.ParentId == id)
                .Select(d => new DepartmentTree() {ModuleID = d.Id, ParentID = d.ParentId, ModuleName = d.DepName})
                .ToList();
            return childTrees;
        }

        #endregion

        #region 获取json

        /// <summary>
        /// 获取json
        /// </summary>
        /// <returns></returns>
        public string GetJson()
        {
            string json = "[";
            IList<DepartmentTree> trees = ReturnParentTree();
            foreach (DepartmentTree tree in trees)
            {
                if (tree != trees[trees.Count - 1])
                {
                    json += GetJsonByModel(tree) + ",";
                }
                else
                {
                    json += GetJsonByModel(tree);
                }
            }
            json += "]";
            //去除空子树
            json = json.Replace(",\"children\":[]", "");
            return json;
        }

        #endregion

        #region 根据模型生成json

        /// <summary>
        /// 根据模型生成json
        /// </summary>
        /// <param name="tree"></param>
        /// <returns></returns>
        public string GetJsonByModel(DepartmentTree tree)
        {
            string json = "";
            bool flag = IsHaveChild(tree.ModuleID);
            json = "{"
                   + "\"id\":\"" + tree.ModuleID + "\","
                   + "\"pid\":\"" + tree.ParentID + "\","
                //+ "\"path\":\"" + tree.ModulePath + "\","
                   + "\"text\":\"" + tree.ModuleName + "\",";

            if (flag)
            {
                json += "\"children\":";
                IList<DepartmentTree> childTrees = GetChild(tree.ModuleID);

                json += "[";
                foreach (DepartmentTree childTree in childTrees)
                {
                    if (tree != childTrees[childTrees.Count - 1])
                    {
                        json += GetJsonByModel(childTree) + ",";
                    }
                    else
                    {
                        json += GetJsonByModel(childTree);
                    }
                }
                if (json.EndsWith(","))
                {
                    json = json.TrimEnd(',');
                }
                json += "]";
            }
            else
            {
                json = json.Substring(0, json.Length - 1);
            }
            json += "}";


            return json;
        }

        #endregion
    }
}