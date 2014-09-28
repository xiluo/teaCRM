// ***********************************************************************
// 程序集         : teaCRM.Web
// 作者作者           : Tangyouwei
// 创建时间          : 09-26-2014
//
// 最后修改人: Tangyouwei
// 最后修改时间 : 09-26-2014
// ReSharper disable All 禁止ReSharper显示警告
// ***********************************************************************
// <copyright file="MyConfigHelper.cs" company="优创科技">
//     Copyright (c) 优创科技. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 配置文件帮助类
/// </summary>

namespace teaCRM.Web.Helpers
{
    /// <summary>
    /// 获取系统配置信息
    /// </summary>
    public class MyConfigHelper
    {
        /// <summary>
        /// 根据App名称获取AppId
        /// </summary>
        /// <param name="appName">Name of the application.</param>
        /// <returns>System.Int32.</returns>
        public static int GetAppId(string appName)
        {
            string catConfig = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/Themes/default/base/js/category.js"));
            //category.js解析 暂未实现
            switch (appName)
            {
                case "crm":
                    return 1;
                default:
                    return 1;
            }
        }


        /// <summary>
        /// 根据MyApp名称获取myappName
        /// </summary>
        /// <param name="myappName">Name of the myapp.</param>
        /// <returns>System.Int32.</returns>
        public static int GetMyAppId(string myappName)
        {
            switch (myappName)
            {
                case "customer":
                    return 1;
                case "contact":
                    return 2;
                default:
                    return 1;     
            }
        }



    }
}