using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace NLite.Data.CodeGenerationDemo
{
	[Table("wp_exportsreports_reports")]
	public partial class WpExportsreportsReport 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("name")]
		public String Name { get;set; }
		[Column("group")]
		public Int32 Group { get;set; }
		[Column("disabled")]
		public Int32 Disabled { get;set; }
		[Column("disable_export")]
		public Int32 DisableExport { get;set; }
		[Column("default_none")]
		public Int32 DefaultNone { get;set; }
		[Column("role_access")]
		public String RoleAccess { get;set; }
		[Column("sql_query")]
		public String SqlQuery { get;set; }
		[Column("sql_query_count")]
		public String SqlQueryCount { get;set; }
		[Column("field_data")]
		public String FieldData { get;set; }
		[Column("weight")]
		public Int32 Weight { get;set; }
		[Column("created")]
		public DateTime Created { get;set; }
		[Column("updated")]
		public DateTime Updated { get;set; }
 
 
 
	}
}
