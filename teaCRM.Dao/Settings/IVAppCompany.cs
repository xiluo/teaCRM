

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{
public  interface IVAppCompanyDao:IViewDao<VAppCompany>
    {
    #region 手写的接口

    /// <summary>
    /// 检测该应用是否安装过
    /// </summary>
    /// <param name="compNum">公司id</param>
    /// <param name="appId">应用id</param>
    /// <param name="appType">应用类型</param>
    /// <returns></returns>
    bool IsInstalled(string compNum, int appId, int appType);

    /// <summary>
    ///安装应用
    /// </summary>
    /// <param name="compNum">公司id</param>
    /// <param name="appId">应用id</param>
    /// <returns></returns>
    bool Install(string compNum, int appId);

    ///  <summary>
    /// 卸载应用
    ///  </summary>
    ///  <param name="compNum">公司id</param>
    ///  <param name="appIds">应用id</param>
    /// <param name="isClear">是否清空数据</param>
    /// <returns></returns>
    bool UnInstall(string compNum, string appIds, bool isClear);

    #endregion

    }
	   }
