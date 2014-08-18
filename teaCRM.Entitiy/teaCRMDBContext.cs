
using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	using NLite.Reflection;

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
		public IDbSet<TCusLog> TCusLogs { get; private set; }
		public IDbSet<TFunApp> TFunApps { get; private set; }
		public IDbSet<TFunExpand> TFunExpands { get; private set; }
		public IDbSet<TFunFilter> TFunFilters { get; private set; }
		public IDbSet<TFunMyapp> TFunMyapps { get; private set; }
		public IDbSet<TFunOperating> TFunOperatings { get; private set; }
		public IDbSet<TFunTag> TFunTags { get; private set; }
		public IDbSet<TSysDepartment> TSysDepartments { get; private set; }
		public IDbSet<TSysLog> TSysLogs { get; private set; }
		public IDbSet<TSysPower> TSysPowers { get; private set; }
		public IDbSet<TSysRole> TSysRoles { get; private set; }
		public IDbSet<TSysUser> TSysUsers { get; private set; }
	}
	}
