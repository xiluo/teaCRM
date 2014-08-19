using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("T_sys_company")]
	public partial class TSysCompany 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("comp_name")]
		public String CompName { get;set; }
 
 
		[OneToMany(ThisKey="Id",OtherKey="CompId")]
		public IList<TSysUser> TSysUsers { get;set; }
 
	}
}
