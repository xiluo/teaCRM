// ***********************************************************************
// 程序集         : teaCRM.Service
// 作者作者           : Tangyouwei
// 创建时间          : 09-28-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-28-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="IFunFilterService.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Entity;

/// <summary>
/// The Service namespace.
/// </summary>
namespace teaCRM.Service
{
    /// <summary>
    /// Interface IFunFilterService
    /// </summary>
  public  interface IFunFilterService
  {
      /// <summary>
      /// Asynchronouses the get nodes.
      /// </summary>
      /// <param name="compNum">The comp number.</param>
      /// <param name="myappId">The myapp identifier.</param>
      /// <param name="isClick">if set to <c>true</c> [is click].</param>
      /// <param name="id">The identifier.</param>
      /// <returns>List&lt;Node&gt;.</returns>
      List<Node> AsyncGetNodes(string compNum, int myappId, bool? click, int? id);
  }
}
