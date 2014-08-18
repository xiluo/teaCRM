
using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	using NLite.Reflection;

	public partial class teaCRMDBContex:DbContext
	{
		//连接字符串名称：基于Config文件中连接字符串的配置
        const string connectionStringName = "teaCRMMySql";

        //构造dbConfiguration 对象
        static DbConfiguration dbConfiguration;

		static teaCRMDBContex()
		{
			 dbConfiguration = DbConfiguration
                  .Configure(connectionStringName)
                  .SetSqlLogger(() =>SqlLog.Debug)
				  .AddFromAssemblyOf<teaCRMDBContex>(t=>t.HasAttribute<TableAttribute>(false))
				  ;
		}

		public teaCRMDBContex():base(dbConfiguration){}
		
		public IDbSet<WpCommentmetum> WpCommentmetas { get; private set; }
		public IDbSet<WpComment> WpComments { get; private set; }
		public IDbSet<WpDownload> WpDownloads { get; private set; }
		public IDbSet<WpExportsreportsGroup> WpExportsreportsGroups { get; private set; }
		public IDbSet<WpExportsreportsLog> WpExportsreportsLogs { get; private set; }
		public IDbSet<WpExportsreportsReport> WpExportsreportsReports { get; private set; }
		public IDbSet<WpLink> WpLinks { get; private set; }
		public IDbSet<WpOption> WpOptions { get; private set; }
		public IDbSet<WpPostmetum> WpPostmetas { get; private set; }
		public IDbSet<WpPost> WpPosts { get; private set; }
		public IDbSet<WpTermRelationship> WpTermRelationships { get; private set; }
		public IDbSet<WpTermTaxonomy> WpTermTaxonomies { get; private set; }
		public IDbSet<WpTerm> WpTerms { get; private set; }
		public IDbSet<WpUsermetum> WpUsermetas { get; private set; }
		public IDbSet<WpUser> WpUsers { get; private set; }
	}
	}
