// ***********************************************************************
// 程序集         : teaCRM.Entity
// 作者作者           : Tangyouwei
// 创建时间          : 09-13-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-28-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="Node.cs" company="优创科技">
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
    /// Class Node.
    /// </summary>
    public class Node 
    {
        #region ZTree 成员
        /// <summary>
        /// 节点ID
        /// </summary>
        /// <value>The identifier.</value>
        public int id { get; set; }
        /// <summary>
        /// 节点名称
        /// </summary>
        /// <value>The name.</value>
        public string name { get; set; }
        /// <summary>
        /// 父ID
        /// </summary>
        /// <value>The p identifier.</value>
        public int pId { get; set; }
        /// <summary>
        /// 是否有子节点
        /// </summary>
        /// <value><c>true</c> if this instance is parent; otherwise, <c>false</c>.</value>
        public bool isParent { get; set; }
        /// <summary>
        /// 是否可以点击
        /// </summary>
        /// <value><c>true</c> if this instance is click; otherwise, <c>false</c>.</value>
        public bool click { set; get; }
        /// <summary>
        /// 节点内容
        /// </summary>
        /// <value>The content.</value>
        public string content { get; set; }

        /// <summary>
        /// Gets or sets the comp number.
        /// </summary>
        /// <value>The comp number.</value>
        public string compNum { get; set; }
        /// <summary>
        /// Gets or sets the application identifier.
        /// </summary>
        /// <value>The application identifier.</value>
        public int myappId { get; set; }

        #endregion
    }
}
