using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using teaCRM.Entity;
using teaCRM.Entity.Settings;

namespace teaCRM.Service.Settings
{
    public interface IAppMakerService
    {
        /// <summary>
        /// 获取当前公司应用信息列表 2014-09-16 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        IEnumerable<VAppCompany> GetAppLsit(string compNum,int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<VAppCompany, bool>> predicate);


        /// <summary>
        /// 当前公司某个模块的扩展字段列表 14-09-18 By 唐有炜
        /// </summary>
        /// <param name="compNumm"></param>
        /// <param name="myappId"></param>
        /// <returns></returns>
        DataTable GetAllMyAppFields(string compNumm,int myappId);


        /// <summary>
        /// 当前公司某个模块的视图列表 14-09-18 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
       /// <param name="myappId">模块id</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        IEnumerable<TFunFilter>
         GetAllMyAppViews(string compNum, int myappId, int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TFunFilter, bool>> predicate);


        /// <summary>
        /// 当前公司某个模块的操作列表 14-09-18 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="myappId">模块id</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        IEnumerable<TFunOperating>
         GetAllMyAppToolBars(string compNum, int myappId, int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TFunOperating, bool>> predicate);

      

        /// <summary>
        /// 获取当前公司某个应用的所有模块 14-09018 By 唐有炜
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        List<VMyappCompany> GetAllMyApps(string compNum, int appId);

        #region 获取操作

          TFunExpand GetField(int id);

        TFunFilter GetView(int id);



        TFunOperating GetOperating(int id);
 

        #endregion
     

        #region 添加操作

        bool AddField(TFunExpand field);
        bool AddFilter(TFunFilter filter);
        bool AddOperating(TFunOperating operating);
        #endregion

        #region 修改操作
        bool EditField(TFunExpand field);
        bool EditFilter(TFunFilter filter);
        bool EditOperating(TFunOperating operating);
        #endregion

        #region 删除操作
        bool DeleteField(int? ids);
        bool DeleteFilter(int? ids);
        bool DeleteOperating(int? ids);
        #endregion

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
        bool UnInstall(string compNum, string appIds,bool isClear);
    }
}
