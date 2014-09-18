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
    public class FunAppServiceImpl : IFunAppService
    {
        //dao注入
        public ITFunAppDao FunAppDao { set; get; }

        /// <summary>
        /// 获取应用信息列表 2014-09-16 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="rowCount">总数</param>
        /// <param name="orders">排序</param>
        /// <param name="predicate">条件</param>
        public IEnumerable<TFunApp> GetAppLsit(int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TFunApp, bool>> predicate)
        {
            try
            {
                LogHelper.Debug("应用市场获取成功。");
                return FunAppDao.GetListByPage(pageIndex, pageSize, out rowCount, orders, predicate);
            }
            catch (Exception ex)
            {
                rowCount = 0;
                LogHelper.Error("应用市场获取失败：", ex);
                return null;
            }
        }


        /// <summary>
        /// 发布应用 14-09-17 By 唐有炜
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        public bool AddApp(TFunApp app)
        {
            try
            {
                FunAppDao.InsertEntity(app);
                LogHelper.Debug("应用发布成功。");
                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Error("应用发布失败：", ex);
                return false;
            }
        }
    }
}