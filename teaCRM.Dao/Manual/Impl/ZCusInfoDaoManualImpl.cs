/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【当前类文件的功能】
 *  
 *  
 * 作者：[中文姓名]   时间：2014/8/21 16:17:15
 * 文件名：VCompanyUserDao
 * 版本：V1.0.0
 * 
 * 修改者：唐有炜           时间：2014/8/21 16:17:15               
 * 修改说明：修改说明
 * ========================================================================
*/

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao.Manual.Impl
{
    /// <summary>
    /// 手动写的客户操作实现类 2014-08-26 14:58:50 By 唐有炜
    /// </summary>
    public class ZCusInfoDaoManualImpl : IZCusInfoDaoManual
    {
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
                string sql = "SELECT * FROM t_cus_base AS cb INNER JOIN teacrm.t_cus_expvalue_10000 AS ce ON cb.id=ce.cus_id;";
                dynamic namedParameters = null;
                recordCount = 0;
                return db.DbHelper.ExecuteDataTable(sql, namedParameters);
            }
        }
    }
}