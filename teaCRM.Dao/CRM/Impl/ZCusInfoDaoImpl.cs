using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using teaCRM.Dao.TreeHelpers;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao.CRM.Impl
{
    /// <summary>
    /// 手动写的客户操作实现类 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
    public class ZCusInfoDaoImpl : IZCusInfoDao
    {
        public ITreeHelper<FilterTree> FilterTreeHelper { set; get; }

        #region 获取客户筛选条件树形数据

        /// <summary>
        ///  获取树形数据
        /// </summary>
        /// <param name="compNum"></param>
        /// <returns></returns>
        public string GetFilterTreeData(string compNum)
        {
            return FilterTreeHelper.GetJson(compNum);
        }

        #endregion

        #region 获取客户信息列表

        /// <summary>
        /// 获取客户信息列表
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageIndex"></param>
        /// <param name="strWhere"></param>
        /// <param name="filedOrder"></param>
        /// <param name="recordCount"></param>
        /// <returns></returns>
        public DataTable GetCustomerLsit(int pageIndex, int pageSize, string strWhere, string filedOrder,
            out int recordCount)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                string sql =
                    "SELECT * FROM t_cus_base AS cb INNER JOIN t_cus_expvalue_10000 AS ce ON cb.id=ce.cus_id;";
                dynamic namedParameters = null;
                recordCount = 0;
                return db.DbHelper.ExecuteDataTable(sql, namedParameters);
            }
        }

        #endregion
    }
}