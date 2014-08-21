using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
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
using teaCRM.Dao.Impl;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao.Manual
{
    public class VCompanyUserDao : VCompanyUserDaoImpl
    {
        /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="sysCompany"></param>
        /// <param name="sysUser"></param>
        public bool InsertEntities(TSysCompany sysCompany, TSysUser sysUser)
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
                    db.TSysCompanies.Insert(sysCompany);
                    db.TSysUsers.Insert(sysUser);
                    tran.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    return false;
                    throw new Exception(ex.Message); 
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
    }
}