using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_sys_role")]
	public partial class TSysRole 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("role_name")]
		public String RoleName { get;set; }
		[Column("role_type")]
		public Int32 RoleType { get;set; }
		[Column("pow_id")]
		public Int32 PowId { get;set; }
		[Column("role_date")]
		public String RoleDate { get;set; }
		[Column("role_issys")]
		public Int32 RoleIssys { get;set; }
 
		[ManyToOne(ThisKey="PowId",OtherKey="Id")]
		public TSysPower Pow { get;set; }
 
		[OneToMany(ThisKey="Id",OtherKey="RoleId")]
		public IList<TSysUser> TSysUsers { get;set; }
 
	}
  
}




