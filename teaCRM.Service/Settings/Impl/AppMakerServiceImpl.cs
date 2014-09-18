using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using teaCRM.Common;
using teaCRM.Dao;
using teaCRM.Entity;

namespace teaCRM.Service.Settings.Impl
{
    public class AppMakerServiceImpl : IAppMakerService
    {
        public IVAppCompanyDao AppCompany { set; get; }

        /// <summary>
        /// 获取当前公司应用信息列表 2014-09-16 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        public IEnumerable<VAppCompany> GetAppLsit(string compNum, int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<VAppCompany, bool>> predicate)
        {
            try
            {
                var apps = AppCompany.GetViewListByPage(pageIndex, pageSize, out rowCount, orders,
                    predicate);
                LogHelper.Debug("公司id为" + "的公司获取应用列表成功。");
                return apps;
            }
            catch (Exception ex)
            {
                rowCount = 0;
                LogHelper.Error("公司id为" + "的公司获取应用列表失败。", ex);
                return null;
            }
        }


       /// <summary>
    /// 检测该应用是否安装过
    /// </summary>
    /// <param name="compNum">公司id</param>
    /// <param name="appId">应用id</param>
    /// <param name="appType">应用类型</param>
    /// <returns></returns>
   public  bool IsInstalled(string compNum, int appId, int appType)
        {
            return AppCompany.IsInstalled(compNum, appId,appType);
            
        }


        /// <summary>
        ///安装应用
        /// </summary>
        /// <param name="compNum">公司id</param>
        /// <param name="appId">应用id</param>
        /// <returns></returns>
       public bool Install(string compNum, int appId)
        {
            return AppCompany.Install(compNum, appId);
        }
        ///  <summary>
        /// 卸载应用
        ///  </summary>
        ///  <param name="compNum">公司id</param>
        ///  <param name="appIds">应用id</param>
        /// <param name="isClear">是否清空数据</param>
        /// <returns></returns>
       public bool UnInstall(string compNum, string appIds,bool isClear)
       {
           return AppCompany.UnInstall(compNum, appIds,isClear);
       }
    }
}