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
        public IVAppMyappDao AppMyappDao { set; get; }

        /// <summary>
        /// 获取当前公司应用信息列表 2014-09-16 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        public IEnumerable<VAppMyapp> GetAppLsit(string compNum, int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<VAppMyapp, bool>> predicate)
        {
            try
            {
                var apps = AppMyappDao.GetViewListByPage(pageIndex, pageSize, out rowCount, orders,
                    a => a.CompNum == compNum);
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
    }
}