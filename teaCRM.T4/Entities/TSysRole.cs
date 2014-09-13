using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_sys_role")]
	public partial class TSysRole 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("comp_num")]
		public String CompNum { get;set; }
		[Column("role_name")]
		public String RoleName { get;set; }
		[Column("role_type")]
		public Int32 RoleType { get;set; }
		[Column("role_issys")]
		public Int32 RoleIssys { get;set; }
		[Column("role_order")]
		public Int32? RoleOrder { get;set; }
		[Column("role_desc")]
		public String RoleDesc { get;set; }
 
 
 
	}
  
}




