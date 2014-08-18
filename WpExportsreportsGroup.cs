using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace NLite.Data.CodeGenerationDemo
{
	[Table("wp_exportsreports_groups")]
	public partial class WpExportsreportsGroup 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("name")]
		public String Name { get;set; }
		[Column("disabled")]
		public Int32 Disabled { get;set; }
		[Column("role_access")]
		public String RoleAccess { get;set; }
		[Column("weight")]
		public Int32 Weight { get;set; }
		[Column("created")]
		public DateTime Created { get;set; }
		[Column("updated")]
		public DateTime Updated { get;set; }
 
 
 
	}
}
