// ***********************************************************************
// 程序集         : teaCRM.Service
// 作者作者           : Tangyouwei
// 创建时间          : 09-28-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-28-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="FunFilterServiceImpl.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Dao;
using teaCRM.Entity;

/// <summary>
/// The Impl namespace.
/// </summary>
namespace teaCRM.Service.Impl
{
    /// <summary>
    /// Class FunFilterServiceImpl.
    /// </summary>
    public class FunFilterServiceImpl : IFunFilterService
    {
        /// <summary>
        /// Gets or sets the fun filter DAO.
        /// </summary>
        /// <value>The fun filter DAO.</value>
        public ITFunFilterDao FunFilterDao { set; get; }


        /// <summary>
        /// Asynchronouses the get nodes.
        /// </summary>
        /// <param name="compNum">The comp number.</param>
        /// <param name="myappId">The myapp identifier.</param>
        /// <param name="isClick">if set to <c>true</c> [is click].</param>
        /// <param name="id">The identifier.</param>
        /// <returns>List&lt;Node&gt;.</returns>
        public List<Node> AsyncGetNodes(string compNum, int myappId, bool? click, int? id)
        {
            var filters =
                FunFilterDao.GetList(
                    f => f.MyappId == myappId && (f.CompNum == compNum || f.FilIsSys == 1) && f.ParentId == (id ?? 0))
                    .OrderBy(f => f.FilOrder);
            var nodes = new List<Node>();
            //将filters转换为nodes
            foreach (var filter in filters)
            {
                var node = new Node();
                node.id = filter.Id;
                node.pId = (int) filter.ParentId;
                node.name = filter.FilName;
                node.content = filter.FilWhere;
                node.compNum = compNum;
                node.myappId = myappId;
                node.click = click ?? true;

                bool isHasChild =
                    FunFilterDao.ExistsEntity(
                        f => f.MyappId == myappId && f.ParentId == node.id && (f.CompNum == compNum || f.FilIsSys == 1));
                if (isHasChild)
                {
                    node.isParent = true;
                }

                nodes.Add(node);
            }
            return nodes;
        }
    }
}