using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using teaCRM.Common;
using teaCRM.DBContext;

namespace teaCRM.Dao.CRM.Impl
{
    /// <summary>
    /// 手动写的联系人操作实现类 2014-09-04 14:58:50 By 唐有炜
    /// </summary>
    public class ZConInfoDaoImpl : IZConInfoDao
    {
        #region 获取联系人信息列表

        /// <summary>
        /// 获取联系人信息列表
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="selectFields">选择的字段</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="strWhere">筛选条件</param>
        /// <param name="filedOrder">排序字段</param>
        /// <param name="recordCount">记录总数</param>
        /// <returns>DataTable</returns>
        public DataTable GetContactLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder, out int recordCount)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append("SELECT ");
                string select = @"id
      ,cus_id
      ,con_name
      ,con_tel
      ,con_qq
      ,con_email
      ,con_bir
      ,con_note
      ,con_is_main
      , 
(SELECT ISNULL(u.user_tname,u.user_lname) FROM t_sys_user  AS u WHERE id=a.[user_id]) AS user_name,
b.*
";

                //选择字段
                if (selectFields.Length > 0)
                {
                    select = "";
                    foreach (var selectField in selectFields)
                    {
                        if (!selectField.Contains("exp"))
                        {
                            select += " a." + selectField + ",";
                        }
                        else
                        {
                            select += " b." + selectField + ",";
                        }
                    }
                    select = select.TrimEnd(',');
                }

                strSql.Append(select);


                //表处理
                string fromJoin = @"
FROM   T_cus_con AS a
INNER JOIN T_cus_con_expvalue_" + compNum + @" AS b ON  a.id = b.con_id";
                strSql.Append(fromJoin);

                if (strWhere.Trim() != "")
                {
                    strSql.Append(" WHERE " + strWhere);
                }

                //查询总数Sql
                //counttingSql
                string counttingSql = PagingHelper.CreateCountingSql(strSql.ToString());
                LogHelper.Debug("contact counttingSql," + counttingSql);

                //查询分页Sql
                //pagingSql
                recordCount =
                    Convert.ToInt32(db.DbHelper.ExecuteScalar(counttingSql));
                dynamic namedParameters = null;
                string pagingSql = PagingHelper.CreatePagingSql(recordCount, pageSize, pageIndex, strSql.ToString(),
                    filedOrder);
                LogHelper.Debug("contact pagingSql," + pagingSql);


                try
                {
                    DataTable contacts =
                        db.DbHelper.ExecuteDataTable(pagingSql, namedParameters);

                    return contacts;
                }
                catch
                {
                    recordCount = 0;
                    return null;
                }
                return null;
            }
        }

        #endregion
    }
}