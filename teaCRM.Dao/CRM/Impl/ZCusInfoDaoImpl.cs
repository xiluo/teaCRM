using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using NLite.Data.Common;
using teaCRM.Common;
using teaCRM.Dao.TreeHelpers;
using teaCRM.DBContext;
using teaCRM.Entity;
using teaCRM.Entity.CRM;

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

        #region 获取客户信息列表  2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户信息列表 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="selectFields">选择的字段</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="strWhere">筛选条件</param>
        /// <param name="filedOrder">排序字段</param>
        /// <param name="recordCount">记录结果</param>
        /// <returns>DataTable</returns>
        public DataTable GetCustomerLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder,
            out int recordCount)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append("SELECT ");
                string select = @"
                       a.id,
                       a.cus_no,
                       a.cus_name,
                       a.cus_sname,
                       a.cus_lastid,
                       a.cus_tel,
                       a.cus_city,
                       a.cus_address,
                       a.cus_note,
                       a.con_id,
                       a.user_id,
                       a.con_team,
                       a.con_is_pub,
                       a.con_back,
                       b.*";

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
FROM   T_cus_base AS a
INNER JOIN T_cus_expvalue_" + compNum + @" AS b ON  a.id = b.cus_id";
                strSql.Append(fromJoin);
                if (strWhere.Trim() != "")
                {
                    strSql.Append(" where " + strWhere);
                }

                //查询总数Sql
                //counttingSql
                string counttingSql = PagingHelper.CreateCountingSql(strSql.ToString());
                LogHelper.Debug("counttingSql," + counttingSql);

                //查询分页Sql
                //pagingSql
                recordCount = 0;
                dynamic namedParameters = null;
                string pagingSql = PagingHelper.CreatePagingSql(recordCount, pageSize, pageIndex, strSql.ToString(),
                    filedOrder);
                LogHelper.Debug("pagingSql," + pagingSql);


                try
                {
                    recordCount =
                        Convert.ToInt32(db.DbHelper.ExecuteScalar(counttingSql));

                    DataTable customers =
                        db.DbHelper.ExecuteDataTable(pagingSql, namedParameters);

                    return customers;
                }
                catch
                {
                    recordCount = 0;
                    return null;
                }
            }
        }

        #endregion

        #region   添加客户信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 添加客户信息 2014-08-30 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="cusInfo">客户信息</param>
        /// <param name="cusConInfo">主联系人信息</param>
        /// <returns></returns>
        public bool AddCustomer(ZCusInfo cusInfo, ZCusConInfo cusConInfo)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                if (db.Connection.State != ConnectionState.Open)
                {
                    db.Connection.Open();
                }
                var tran = db.Connection.BeginTransaction();
                try
                {
                    //数据库操作
                    LogHelper.Info("添加客户事务开始...");

                    #region 添加客户信息

                    //添加主表数据，并返回id
                    string strSql = @"
INSERT INTO teacrm.dbo.t_cus_base
  (
    cus_no,
    comp_num,
    cus_name,
    cus_sname,
    cus_lastid,
    cus_tel,
    cus_city,
    cus_address,
    cus_note,
    con_id,
    USER_ID,
    con_team,
    con_is_pub,
    con_back
  )
VALUES
  (
    @CusNo,
    @CompNum,
    @CusName,
    @CusSName,
    @CusLastid,
    @CusTel,
    @CusCity,
    @CusAddress,
    @CusNote,
    @ConId,
    @USERID,
    @ConTeam,
    @conIsPub,
    @conBack
  )
; SELECT SCOPE_IDENTITY();";
                    LogHelper.Info("addCusBaseSql," + strSql);
                    //添加参数
                    IDictionary<string, object> namedParameters = new Dictionary<string, object>();
                    namedParameters.Add(new KeyValuePair<string, object>("CusNo", cusInfo.CusBase.CusNo));
                    namedParameters.Add(new KeyValuePair<string, object>("@CompNum", cusInfo.CusBase.CompNum));
                    namedParameters.Add(new KeyValuePair<string, object>("@CusName", cusInfo.CusBase.CusName));
                    namedParameters.Add(new KeyValuePair<string, object>("@CusSName", cusInfo.CusBase.CusSname));
                    namedParameters.Add(new KeyValuePair<string, object>("@CusLastid", cusInfo.CusBase.CusLastid));
                    namedParameters.Add(new KeyValuePair<string, object>("@CusTel", cusInfo.CusBase.CusTel));
                    namedParameters.Add(new KeyValuePair<string, object>("@CusCity", cusInfo.CusBase.CusCity));
                    namedParameters.Add(new KeyValuePair<string, object>("@CusAddress", cusInfo.CusBase.CusAddress));
                    namedParameters.Add(new KeyValuePair<string, object>("@CusNote", cusInfo.CusBase.CusNote));
                    namedParameters.Add(new KeyValuePair<string, object>("@ConId", cusInfo.CusBase.ConId));
                    namedParameters.Add(new KeyValuePair<string, object>("@USERID", cusInfo.CusBase.UserId));
                    namedParameters.Add(new KeyValuePair<string, object>("@ConTeam", cusInfo.CusBase.ConTeam));
                    namedParameters.Add(new KeyValuePair<string, object>("@conIsPub", cusInfo.CusBase.ConIsPub));
                    namedParameters.Add(new KeyValuePair<string, object>("@conBack", cusInfo.CusBase.ConBack));

                    int indentity = Convert.ToInt32(db.DbHelper.ExecuteScalar(strSql, namedParameters));
                    LogHelper.Info("刚插入的客户id为：" + indentity);

                    //客户扩展字段
//                    string strSql2 = "";
//                    //添加参数
//                    IDictionary<string, object> namedParameters2 = new Dictionary<string, object>();
//                    int indentity2 = Convert.ToInt32(db.DbHelper.ExecuteScalar(strSql2, namedParameters2));

                    #endregion

                    #region 添加联系人信息

                    #endregion

                    tran.Commit();
                    //数据库操作
                    LogHelper.Info("添加客户事务结束...");
                    return true;
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    LogHelper.Error("客户事务执行失败，", ex);
                    return false;
                }
                finally
                {
                    if (db.Connection.State != ConnectionState.Closed)
                    {
                        db.Connection.Close();
                    }
                }
            }
        }

        #endregion
    }
}