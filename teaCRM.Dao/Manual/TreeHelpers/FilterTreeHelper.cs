using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Dao.Impl;
using teaCRM.Dao.Manual.Impl;
using teaCRM.Entity;

namespace teaCRM.Dao.Manual.TreeHelpers
{
    /// <summary>
    /// 筛选器树形帮助类。 2014-08-20 07:58:50 By 唐有炜
    /// </summary>
    public class FilterTreeHelper
    {
        private static ITFunFilterDaoManual funFilterDaoManual = new TFunFilterDaoManualImpl();

        #region 获取父类集合

        private static IList<FilterTree> returnParentTree()
        {
            List<FilterTree> trees;
            trees = funFilterDaoManual.GetList()
                .Where(f => f.ParentId == 0)
                .Select(f => new FilterTree() {ModuleID = f.Id, ParentID = (int) f.ParentId, ModuleName = f.FilName})
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
        public static bool IsHaveChild(int id)
        {
            bool flag = funFilterDaoManual.ExistsEntity(f => f.Id == id);
            return flag;
        }

        #endregion

        #region 根据id获取子类

        /// <summary>
        /// 根据id获取子类
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private static IList<FilterTree> GetChild(int id)
        {
            var childTrees = funFilterDaoManual.GetList()
                .Where(f => f.ParentId == id)
                .Select(f => new FilterTree() {ModuleID = f.Id, ParentID = (int) f.ParentId, ModuleName = f.FilName})
                .ToList();
            return childTrees;
        }

        #endregion

        #region 获取json

        /// <summary>
        /// 获取json
        /// </summary>
        /// <returns></returns>
        public static string GetJson()
        {
            string json = "[";
            IList<FilterTree> trees = returnParentTree();
            foreach (FilterTree tree in trees)
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
        public static string GetJsonByModel(FilterTree tree)
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
                IList<FilterTree> childTrees = GetChild(tree.ModuleID);

                json += "[";
                foreach (FilterTree childTree in childTrees)
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