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
                       a.cus_lastid AS cus_lastname,
                       a.cus_tel,
                       a.cus_city,
                       a.cus_address,
                       a.cus_note,
                         (
                                 SELECT cc.con_name
                                 FROM   T_cus_con cc
                                 WHERE  id = a.con_id
                         )           AS con_name,
                       (SELECT u.user_tname FROM t_sys_user AS u WHERE u.id=a.user_id) as user_name,
                      (
SELECT     STUFF((SELECT ','+u2.user_tname FROM t_sys_user AS u2  WHERE CHARINDEX(CAST(u2.id as VARCHAR),a.con_team) >0 FOR XML PATH ('')),1,1,'')
)       
as con_team, 
                       a.con_is_pub,
                       a.con_back,
                       a.cus_createTime,
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
                    strSql.Append(" WHERE " + strWhere);
                }

                //查询总数Sql
                //counttingSql
                string counttingSql = PagingHelper.CreateCountingSql(strSql.ToString());
                LogHelper.Debug("customer counttingSql," + counttingSql);

                //查询分页Sql
                //pagingSql
                recordCount =
                        Convert.ToInt32(db.DbHelper.ExecuteScalar(counttingSql));
                dynamic namedParameters = null;
                string pagingSql = PagingHelper.CreatePagingSql(recordCount, pageSize, pageIndex, strSql.ToString(),
                    filedOrder);
                LogHelper.Debug("customer pagingSql," + pagingSql);


                try
                {
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
        public bool AddCustomer( ZCusInfo cusInfo, ZCusConInfo cusConInfo)
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
                    string strSqlCus = @"
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
    @cus_no,
    @comp_num,
    @cus_name,
    @cus_sname,
    @cus_lastid,
    @cus_tel,
    @cus_city,
    @cus_address,
    @cus_note,
    @con_id,
    @USER_ID,
    @con_team,
    @con_is_pub,
    @con_back
  )
; SELECT SCOPE_IDENTITY();";
                    LogHelper.Info("addCusBaseSql," + strSqlCus);
                    //添加参数
                    IDictionary<string, object> namedParametersCus = new Dictionary<string, object>();
                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_no", cusInfo.CusBase.CusNo));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@comp_num", cusInfo.CusBase.CompNum));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_name", cusInfo.CusBase.CusName));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_sname", cusInfo.CusBase.CusSname));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_lastid", cusInfo.CusBase.CusLastid));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_tel", cusInfo.CusBase.CusTel));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_city", cusInfo.CusBase.CusCity));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_address", cusInfo.CusBase.CusAddress));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_note", cusInfo.CusBase.CusNote));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@con_id", cusInfo.CusBase.ConId));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@USER_ID", cusInfo.CusBase.UserId));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@con_team", cusInfo.CusBase.ConTeam));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@con_is_pub", cusInfo.CusBase.ConIsPub));
                    namedParametersCus.Add(new KeyValuePair<string, object>("@con_back", cusInfo.CusBase.ConBack));

                    int indentity = Convert.ToInt32(db.DbHelper.ExecuteScalar(strSqlCus, namedParametersCus));
                    LogHelper.Info("刚插入的客户id为：" + indentity);

                    //客户扩展字段
                    StringBuilder strSqlCus2 = new StringBuilder();
                    //添加参数
                    IDictionary<string, object> namedParametersCus2 = new Dictionary<string, object>();
                    StringBuilder strFieldName = new StringBuilder(); //字段列表
                    StringBuilder strFieldVar = new StringBuilder(); //字段声明


                    strFieldName.Append("cus_id");
                    strFieldVar.Append("@cus_id");
                    namedParametersCus2.Add("@cus_id", indentity);
                    foreach (KeyValuePair<string, object> kvp in cusInfo.Fields)
                    {
                        strFieldName.Append("," + kvp.Key);
                        strFieldVar.Append(",@" + kvp.Key);
                        namedParametersCus2.Add("@" + kvp.Key, kvp.Value);
                    }


                    strSqlCus2.Append(String.Format("INSERT INTO T_cus_expvalue_{0}(",cusInfo.CusBase.CompNum));
                    strSqlCus2.Append(strFieldName.ToString() + ")");
                    strSqlCus2.Append(" VALUES (");
                    strSqlCus2.Append(strFieldVar.ToString() + ")");

                    LogHelper.Info("add T_cus_expvalue_" + cusInfo.CusBase.CompNum + " Sql," + strSqlCus2.ToString());
                    //插入扩展表
                   db.DbHelper.ExecuteNonQuery(strSqlCus2.ToString(), namedParametersCus2);

                    #endregion

                    #region 添加联系人信息
                    //添加主表数据，并返回id
                    string strSqlCon = @"
INSERT INTO teacrm.dbo.t_cus_con
           (cus_id
           ,con_name
           ,con_tel
           ,con_qq
           ,con_email
           ,con_bir
           ,con_note
           ,con_is_main
           ,user_id
)
     VALUES
           (
            @cus_id
           ,@con_name
           ,@con_tel
           ,@con_qq
           ,@con_email
           ,@con_bir
           ,@con_note
           ,@con_is_main
           ,@user_id
)
; SELECT SCOPE_IDENTITY();
";
                    LogHelper.Info("addCusConSql," + strSqlCon);
                    //添加参数
                    IDictionary<string, object> namedParametersCon = new Dictionary<string, object>();
                    namedParametersCon.Add("@cus_id", indentity);
                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_name", cusConInfo.CusCon.ConName));
                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_tel", cusConInfo.CusCon.ConTel));
                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_qq", cusConInfo.CusCon.ConQq));
                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_email", cusConInfo.CusCon.ConEmail));
                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_bir", cusConInfo.CusCon.ConBir));
                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_note", cusConInfo.CusCon.ConNote));
                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_is_main", cusConInfo.CusCon.ConIsMain));
                    namedParametersCon.Add(new KeyValuePair<string, object>("@user_id", cusConInfo.CusCon.UserId));

                   int indentityCon= int.Parse(db.DbHelper.ExecuteScalar(strSqlCon, namedParametersCon).ToString());
                    LogHelper.Info("主联系人主表已插入。该联系人的id："+indentityCon);

                    //联系人扩展字段
                    StringBuilder strSqlCon2 = new StringBuilder();
                    //添加参数
                    IDictionary<string, object> namedParametersCon2 = new Dictionary<string, object>();
                    StringBuilder strFieldNameCon = new StringBuilder(); //字段列表
                    StringBuilder strFieldVarCon = new StringBuilder(); //字段声明


                    strFieldNameCon.Append("con_id");
                    strFieldVarCon.Append("@con_id");
                    namedParametersCon2.Add("@con_id", indentityCon);
                    foreach (KeyValuePair<string, object> kvp in cusConInfo.Fields)
                    {
                        strFieldNameCon.Append("," + kvp.Key);
                        strFieldVarCon.Append(",@" + kvp.Key);
                        namedParametersCon2.Add("@" + kvp.Key, kvp.Value);
                    }


                    strSqlCon2.Append(String.Format("INSERT INTO T_cus_con_expvalue_{0}(", cusInfo.CusBase.CompNum));
                    strSqlCon2.Append(strFieldNameCon.ToString() + ")");
                    strSqlCon2.Append(" VALUES (");
                    strSqlCon2.Append(strFieldVarCon.ToString() + ")");

                    LogHelper.Info("add T_cus_con_expvalue_" + cusInfo.CusBase.CompNum + " Sql," + strSqlCon2.ToString());
                    //插入扩展表
                    db.DbHelper.ExecuteNonQuery(strSqlCon2.ToString(), namedParametersCon2);

                    #endregion

                    #region 更新主联系人

                    string strSqlCusConUpdate = @"UPDATE T_cus_base SET con_id=@con_id
WHERE id=@id";
                    LogHelper.Debug("update T_cus_base Sql," + strSqlCusConUpdate.ToString());
                    //添加参数
                    IDictionary<string, object> namedParametersCusConUpdate = new Dictionary<string, object>();
                    namedParametersCusConUpdate.Add(new KeyValuePair<string, object>("@con_id", indentityCon));
                    namedParametersCusConUpdate.Add(new KeyValuePair<string, object>("@id", indentity));
                    db.DbHelper.ExecuteNonQuery(strSqlCusConUpdate, namedParametersCusConUpdate);
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