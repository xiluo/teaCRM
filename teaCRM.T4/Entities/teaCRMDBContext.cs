
/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：@Date
 * 文件名：@dbContextName
 * 版本：V1.0.0
 * 
 * 修改者：唐有炜           时间：@Date              
 * 修改说明：修改说明
 * ========================================================================
*/
using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
using teaCRM.Entity;
using NLite.Reflection;
namespace teaCRM.DBContext
{
	public partial class teaCRMDBContext:DbContext
	{
		//连接字符串名称：基于Config文件中连接字符串的配置
        const string connectionStringName = "teaCRMSqlServer";

        //构造dbConfiguration 对象
        static DbConfiguration dbConfiguration;

		static teaCRMDBContext()
		{
			 dbConfiguration = DbConfiguration
                  .Configure(connectionStringName)
                  .SetSqlLogger(() =>SqlLog.Debug)
				  .AddFromAssemblyOf<teaCRMDBContext>(t=>t.HasAttribute<TableAttribute>(false))
				  ;
		}

		public teaCRMDBContext():base(dbConfiguration){}
		
		public IDbSet<TConExpvalue> TConExpvalues { get; private set; }
		public IDbSet<TCusBase> TCusBases { get; private set; }
		public IDbSet<TCusCon> TCusCons { get; private set; }
		public IDbSet<TCusExpvalue> TCusExpvalues { get; private set; }
		public IDbSet<TCusExpvalue10000> TCusExpvalue10000s { get; private set; }
		public IDbSet<TCusExpvalue99999> TCusExpvalue99999s { get; private set; }
		public IDbSet<TCusLog> TCusLogs { get; private set; }
		public IDbSet<TFunApp> TFunApps { get; private set; }
		public IDbSet<TFunExpand> TFunExpands { get; private set; }
		public IDbSet<TFunFilter> TFunFilters { get; private set; }
		public IDbSet<TFunMyapp> TFunMyapps { get; private set; }
		public IDbSet<TFunOperating> TFunOperatings { get; private set; }
		public IDbSet<TFunTag> TFunTags { get; private set; }
		public IDbSet<TSysCompany> TSysCompanies { get; private set; }
		public IDbSet<TSysDepartment> TSysDepartments { get; private set; }
		public IDbSet<TSysLog> TSysLogs { get; private set; }
		public IDbSet<TSysPower> TSysPowers { get; private set; }
		public IDbSet<TSysRole> TSysRoles { get; private set; }
		public IDbSet<TSysUser> TSysUsers { get; private set; }
		public IDbSet<VCompanyUser> VCompanyUsers { get; private set; }
	}
	

  
}




