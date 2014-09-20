using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLite.Data;
using NLite.Reflection;
using teaCRM.Common;
using teaCRM.DBContext;
using teaCRM.Entity;
using System.Linq.Dynamic;

namespace teaCRM.Dao.Impl
{
    /// <summary>
    //实现ITCusBaseDao接口的Dao类。 2014-08-28 05:06:48 By 唐有炜
    /// </summary>
    public class TCusBaseDaoImpl : ITCusBaseDao
    {
        #region T4自动生成的函数 2014-09-05 14:58:50 By 唐有炜

        #region 读操作

        /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <returns>返回所有数据总数</returns>
        public int GetCount()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusBases;
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.Count();
            }
        }


        /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据总数</returns>
        public int GetCount(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusBases.Where<TCusBase>(predicate);
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.Count();
            }
        }


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <returns>返回所有数据列表</returns>
        public List<TCusBase> GetList()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusBases;
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.ToList();
            }
        }


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据列表</returns>
        public List<TCusBase> GetList(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusBases.Where<TCusBase>(predicate);
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.ToList();
            }
        }

        /// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
        public TCusBase GetEntity(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var model = db.TCusBases.Where<TCusBase>(predicate);
                var sqlText = model.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return model.SingleOrDefault();
            }
        }


        /// <summary>
        /// 根据条件查询某些字段(LINQ 动态查询)
        /// </summary>
        /// <param name="selector">要查询的字段（格式：new(ID,Name)）</param>
        /// <param name="predicate">筛选条件（id=0）</param>
        /// <returns></returns>
        public IQueryable<Object> GetFields(string selector, string predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var model = db.TCusBases.Where(predicate).Select(selector);
                var sqlText = model.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return (IQueryable<object>) model;
            }
        }


        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        public bool ExistsEntity(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                bool status = db.TCusBases.Any(predicate);
                return status;
            }
        }


        //查询分页
        public IPagination<TCusBase> GetListByPage(int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var roles = db.TCusBases;
                rowCount = roles.Count();
                var prevCount = (pageIndex - 1)*pageSize;
                var models = roles
                    .Skip(prevCount)
                    .Take(pageSize)
                    .Where(predicate);
                foreach (var order in orders)
                {
                    models = models.OrderBy(String.Format("{0} {1}", order.Key, order.Value));
                }
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug("ELINQ Paging:<br/>" + sqlText.ToString());
                return models.ToPagination(pageSize, pageSize, rowCount);
            }
        }


        //以下是原生Sql方法==============================================================
        //===========================================================================
        /// <summary>
        /// 用SQL语句查询
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="namedParameters">sql参数</param>
        /// <returns>集合</returns>
        public IEnumerable<TCusBase> GetListBySql(string sql, dynamic namedParameters)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                return db.DbHelper.ExecuteDataTable(sql, namedParameters).ToList<TCusBase>();
            }
        }

        #endregion

        #region 写操作

        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool InsertEntity(TCusBase entity)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                int rows = db.TCusBases.Insert(entity);
                if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// 删除实体
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        public bool DeleteEntity(Expression<Func<TCusBase, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                TCusBase entity = db.TCusBases.Where(predicate).First();
                int rows = db.TCusBases.Delete(entity);
                if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// 批量删除
        /// </summary>
        /// <param name="list">实体集合</param>
        public bool DeletesEntity(List<TCusBase> list)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                //var tran = db.Connection.BeginTransaction();
                try
                {
                    foreach (var item in list)
                    {
                        db.TCusBases.Delete(item);
                    }
                    //tran.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    //tran.Rollback();
                    return false;
                    throw new Exception(ex.Message);
                }
            }
        }

        /// <summary>
        /// 修改实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool UpadateEntity(TCusBase entity)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                int rows = db.TCusBases.Update(entity);
                if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }


        /// <summary>
        /// 执行Sql
        /// </summary>
        /// <param name="sql">Sql语句</param>
        /// <param name="namedParameters">查询字符串</param>
        /// <returns></returns>
        public bool ExecuteSql(string sql, dynamic namedParameters = null)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var rows = db.DbHelper.ExecuteNonQuery(sql, namedParameters);
                if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        #endregion

        #endregion

        #region 手写的扩展函数 2014-08-21 14:58:50 By 唐有炜

        #region 使用where sql语句更改客户状态(只更改主表) 2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 使用where sql语句更改客户状态(只更改主表) 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="strSet">要更新的字段</param>
        /// <param name="strWhere">条件</param>
        /// <returns></returns>
        public bool UpdateCustomerStatusByWhere(string strSet, string strWhere)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append("UPDATE T_cus_base SET ");
                strSql.Append(strSet);
                strSql.Append(" WHERE ");
                strSql.Append(strWhere);
                LogHelper.Debug(strSql.ToString());
                try
                {
                    LogHelper.Debug("更新成功！");
                    db.DbHelper.ExecuteNonQuery(strSql.ToString());
                    return true;
                }
                catch (Exception ex)
                {
                    LogHelper.Error("更新失败！", ex);
                    return false;
                }
            }
        }

        #endregion

        #region 使用LINQ更改客户状态（只更改主表） 2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 使用LINQ更改客户状态（只更改主表） 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="fields">要更新的字段</param>
        /// <param name="predicate">条件</param>
        /// <returns></returns>
        public bool UpdateCustomerStatusByLINQ(Dictionary<string, object> fields,
            Expression<Func<TCusBase, bool>> predicate)
        {
            var entity = GetEntity(predicate);
            foreach (var field in fields)
            {
                PropertyInfo[] propertyInfos = entity.GetType().GetProperties();
                foreach (var p in propertyInfos)
                {
                    if (p.Name == field.Key)
                    {
                        p.SetValue(entity, field.Value, null); //给对应属性赋值
                    }
                }
            }
            UpadateEntity(entity);
            return false;
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
                                       a.con_id,
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
                                       a.cus_fields
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
                        else //如果是扩展字段，把整个数据读出来
                        {
                            select = " a.cus_fields,";
                            break;
                        }
                    }
                    select = select.TrimEnd(',');
                }

                strSql.Append(select);

                //表处理
                string from = "FROM   T_cus_base AS a";
                strSql.Append(from);

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
                //LogHelper.Debug("customer pagingSql," + pagingSql);


                try
                {
                    DataTable cusTable =
                        db.DbHelper.ExecuteDataTable(pagingSql, namedParameters);
                    for (int i = 0; i < cusTable.Rows.Count; i++)
                    {
                        for (int j = 0; j < cusTable.Columns.Count; j++)
                        {
                            if (cusTable.Columns[j].ColumnName == "cus_fields")
                            {
                                DataColumn fieldColumn = cusTable.Columns[j];
                                //转换字段
                                string fieldString = cusTable.Rows[i][j].ToString();
                                IDictionary<string, JToken> fieldsDictionary =
                                    (JObject) JsonConvert.DeserializeObject(fieldString);

                                LogHelper.Debug(cusTable.Rows[i][j].ToString());
                                //循环添加新字段
                                foreach (var f in fieldsDictionary)
                                {
                                    DataColumn newColumn = new DataColumn();
                                    newColumn.ColumnName = f.Key;
                                    newColumn.DefaultValue = f.Value;
                                    cusTable.Columns.Add(newColumn);
                                }
                                //删除此字段
                                cusTable.Columns.Remove(fieldColumn);
                            }
                        }
                    }

                    return cusTable;
                }
                catch (Exception ex)
                {
                    recordCount = 0;
                    LogHelper.Error("序列化出差：", ex);
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
        public bool AddCustomer(TCusBase cusInfo, TCusCon cusConInfo)
        {
//            using (teaCRMDBContext db = new teaCRMDBContext())
//            {
//                if (db.Connection.State != ConnectionState.Open)
//                {
//                    db.Connection.Open();
//                }
//                var tran = db.Connection.BeginTransaction();
//                try
//                {
//                    //数据库操作
//                    LogHelper.Info("添加客户事务开始...");
//
//                    #region 添加客户信息
//
//                    //添加主表数据，并返回id
//                    string strSqlCus = @"
//INSERT INTO teacrm.dbo.t_cus_base
//  (
//    cus_no,
//    comp_num,
//    cus_name,
//    cus_sname,
//    cus_lastid,
//    cus_tel,
//    cus_city,
//    cus_address,
//    cus_note,
//    con_id,
//    USER_ID,
//    con_team,
//    con_is_pub,
//    con_back
//  )
//VALUES
//  (
//    @cus_no,
//    @comp_num,
//    @cus_name,
//    @cus_sname,
//    @cus_lastid,
//    @cus_tel,
//    @cus_city,
//    @cus_address,
//    @cus_note,
//    @con_id,
//    @USER_ID,
//    @con_team,
//    @con_is_pub,
//    @con_back
//  )
//; SELECT SCOPE_IDENTITY();";
//                    LogHelper.Info("addCusBaseSql," + strSqlCus);
//                    //添加参数
//                    IDictionary<string, object> namedParametersCus = new Dictionary<string, object>();
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_no", cusInfo.CusBase.CusNo));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@comp_num", cusInfo.CusBase.CompNum));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_name", cusInfo.CusBase.CusName));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_sname", cusInfo.CusBase.CusSname));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_lastid", cusInfo.CusBase.CusLastid));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_tel", cusInfo.CusBase.CusTel));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_city", cusInfo.CusBase.CusCity));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_address", cusInfo.CusBase.CusAddress));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@cus_note", cusInfo.CusBase.CusNote));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@con_id", cusInfo.CusBase.ConId));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@USER_ID", cusInfo.CusBase.UserId));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@con_team", cusInfo.CusBase.ConTeam));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@con_is_pub", cusInfo.CusBase.ConIsPub));
//                    namedParametersCus.Add(new KeyValuePair<string, object>("@con_back", cusInfo.CusBase.ConBack));
//
//                    int indentity = Convert.ToInt32(db.DbHelper.ExecuteScalar(strSqlCus, namedParametersCus));
//                    LogHelper.Info("刚插入的客户id为：" + indentity);
//
//                    //客户扩展字段
//                    StringBuilder strSqlCus2 = new StringBuilder();
//                    //添加参数
//                    IDictionary<string, object> namedParametersCus2 = new Dictionary<string, object>();
//                    StringBuilder strFieldName = new StringBuilder(); //字段列表
//                    StringBuilder strFieldVar = new StringBuilder(); //字段声明
//
//
//                    strFieldName.Append("cus_id");
//                    strFieldVar.Append("@cus_id");
//                    namedParametersCus2.Add("@cus_id", indentity);
//                    foreach (KeyValuePair<string, object> kvp in cusInfo.Fields)
//                    {
//                        strFieldName.Append("," + kvp.Key);
//                        strFieldVar.Append(",@" + kvp.Key);
//                        namedParametersCus2.Add("@" + kvp.Key, kvp.Value);
//                    }
//
//
//                    strSqlCus2.Append(String.Format("INSERT INTO T_cus_expvalue_{0}(", cusInfo.CusBase.CompNum));
//                    strSqlCus2.Append(strFieldName.ToString() + ")");
//                    strSqlCus2.Append(" VALUES (");
//                    strSqlCus2.Append(strFieldVar.ToString() + ")");
//
//                    LogHelper.Info("add T_cus_expvalue_" + cusInfo.CusBase.CompNum + " Sql," + strSqlCus2.ToString());
//                    //插入扩展表
//                    db.DbHelper.ExecuteNonQuery(strSqlCus2.ToString(), namedParametersCus2);
//
//                    #endregion
//
//                    #region 添加联系人信息
//                    //添加主表数据，并返回id
//                    string strSqlCon = @"
//INSERT INTO teacrm.dbo.t_cus_con
//           (cus_id
//           ,con_name
//           ,con_tel
//           ,con_qq
//           ,con_email
//           ,con_bir
//           ,con_note
//           ,con_is_main
//           ,user_id
//)
//     VALUES
//           (
//            @cus_id
//           ,@con_name
//           ,@con_tel
//           ,@con_qq
//           ,@con_email
//           ,@con_bir
//           ,@con_note
//           ,@con_is_main
//           ,@user_id
//)
//; SELECT SCOPE_IDENTITY();
//";
//                    LogHelper.Info("addCusConSql," + strSqlCon);
//                    //添加参数
//                    IDictionary<string, object> namedParametersCon = new Dictionary<string, object>();
//                    namedParametersCon.Add("@cus_id", indentity);
//                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_name", cusConInfo.CusCon.ConName));
//                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_tel", cusConInfo.CusCon.ConTel));
//                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_qq", cusConInfo.CusCon.ConQq));
//                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_email", cusConInfo.CusCon.ConEmail));
//                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_bir", cusConInfo.CusCon.ConBir));
//                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_note", cusConInfo.CusCon.ConNote));
//                    namedParametersCon.Add(new KeyValuePair<string, object>("@con_is_main", cusConInfo.CusCon.ConIsMain));
//                    namedParametersCon.Add(new KeyValuePair<string, object>("@user_id", cusConInfo.CusCon.UserId));
//
//                    int indentityCon = int.Parse(db.DbHelper.ExecuteScalar(strSqlCon, namedParametersCon).ToString());
//                    LogHelper.Info("主联系人主表已插入。该联系人的id：" + indentityCon);
//
//                    //联系人扩展字段
//                    StringBuilder strSqlCon2 = new StringBuilder();
//                    //添加参数
//                    IDictionary<string, object> namedParametersCon2 = new Dictionary<string, object>();
//                    StringBuilder strFieldNameCon = new StringBuilder(); //字段列表
//                    StringBuilder strFieldVarCon = new StringBuilder(); //字段声明
//
//
//                    strFieldNameCon.Append("con_id");
//                    strFieldVarCon.Append("@con_id");
//                    namedParametersCon2.Add("@con_id", indentityCon);
//                    foreach (KeyValuePair<string, object> kvp in cusConInfo.Fields)
//                    {
//                        strFieldNameCon.Append("," + kvp.Key);
//                        strFieldVarCon.Append(",@" + kvp.Key);
//                        namedParametersCon2.Add("@" + kvp.Key, kvp.Value);
//                    }
//
//
//                    strSqlCon2.Append(String.Format("INSERT INTO T_cus_con_expvalue_{0}(", cusInfo.CusBase.CompNum));
//                    strSqlCon2.Append(strFieldNameCon.ToString() + ")");
//                    strSqlCon2.Append(" VALUES (");
//                    strSqlCon2.Append(strFieldVarCon.ToString() + ")");
//
//                    LogHelper.Info("add T_cus_con_expvalue_" + cusInfo.CusBase.CompNum + " Sql," + strSqlCon2.ToString());
//                    //插入扩展表
//                    db.DbHelper.ExecuteNonQuery(strSqlCon2.ToString(), namedParametersCon2);
//
//                    #endregion
//
//                    #region 更新主联系人
//
//                    string strSqlCusConUpdate = @"UPDATE T_cus_base SET con_id=@con_id
//WHERE id=@id";
//                    LogHelper.Debug("update T_cus_base Sql," + strSqlCusConUpdate.ToString());
//                    //添加参数
//                    IDictionary<string, object> namedParametersCusConUpdate = new Dictionary<string, object>();
//                    namedParametersCusConUpdate.Add(new KeyValuePair<string, object>("@con_id", indentityCon));
//                    namedParametersCusConUpdate.Add(new KeyValuePair<string, object>("@id", indentity));
//                    db.DbHelper.ExecuteNonQuery(strSqlCusConUpdate, namedParametersCusConUpdate);
//                    #endregion
//
//
//                    tran.Commit();
//                    //数据库操作
//                    LogHelper.Info("添加客户事务结束...");
//                    return true;
//                }
//                catch (Exception ex)
//                {
//                    tran.Rollback();
//                    LogHelper.Error("客户事务执行失败，", ex);
//                    return false;
//                }
//                finally
//                {
//                    if (db.Connection.State != ConnectionState.Closed)
//                    {
//                        db.Connection.Close();
//                    }
//                }
//            }
            return false;
        }

        #endregion


        #endregion
    }
}