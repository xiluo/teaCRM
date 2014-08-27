using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Entity;

namespace teaCRM.Dao.Manual.TreeHelpers
{
    /// <summary>
    /// 树形帮助接口  2014-08-27 07:58:50 By 唐有炜
    /// </summary>
    public interface ITreeHelper<T>
    {

        /// <summary>
        /// 获取父类集合
        /// </summary>
        /// <returns></returns>
        IList<T> ReturnParentTree(string compNum);

        /// <summary>
        /// 判断分类是否有子类
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool IsHaveChild(int id,string compNum);

        /// <summary>
        /// 根据id获取子类
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        IList<T> GetChild(int id,string compNum);

        /// <summary>
        /// 获取json
        /// </summary>
        /// <returns></returns>
        string GetJson(string compNum);


        /// <summary>
        /// 根据模型生成json
        /// </summary>
        /// <param name="tree"></param>
        /// <returns></returns>
        string GetJsonByModel(T tree,string compNum);
    }
}