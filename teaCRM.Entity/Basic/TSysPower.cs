using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_sys_power")]
	public partial class TSysPower 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("module")]
		public Int32 Module { get;set; }
		[Column("power_nav")]
		public String PowerNav { get;set; }
		[Column("power_action")]
		public String PowerAction { get;set; }
 
 
		[OneToMany(ThisKey="Id",OtherKey="PowId")]
		public IList<TSysRole> TSysRoles { get;set; }
 
	}
  
}




