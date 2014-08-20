using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_sys_company")]
	public partial class TSysCompany 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("comp_lname")]
		public String CompLname { get;set; }
		[Column("comp_nname")]
		public String CompNname { get;set; }
 
 
		[OneToMany(ThisKey="Id",OtherKey="CompId")]
		public IList<TSysUser> TSysUsers { get;set; }
 
	}
  
}




