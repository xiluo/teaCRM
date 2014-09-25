// ***********************************************************************
// 程序集         : teaCRM.Entity
// 作者作者           : Tangyouwei
// 创建时间          : 09-13-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-11-2014
// ***********************************************************************
// <copyright file="IZtree.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

/// <summary>
/// The Entity namespace.
/// </summary>
namespace teaCRM.Entity
{
    /// <summary>
    /// ZTree数据结构
    /// </summary>
    public interface IZTree
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        int id { get; set; }
        /// <summary>
        /// 节点名称
        /// </summary>
        /// <value>The name.</value>
        string name { get; set; }
        /// <summary>
        /// 父ID
        /// </summary>
        /// <value>The p identifier.</value>
        int pId { get; set; }
        /// <summary>
        /// 是否有子节点
        /// </summary>
        /// <value><c>true</c> if this instance is parent; otherwise, <c>false</c>.</value>
        bool isParent { get; set; }
        /// <summary>
        /// Gets or sets the content.
        /// </summary>
        /// <value>The content.</value>
        string content { get; set; }
    }
}
