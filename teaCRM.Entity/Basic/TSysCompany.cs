using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_sys_company")]
	public partial class TSysCompany 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
	
		[Id("comp_num",IsDbGenerated=false)]
		public String CompNum { get;set; }
 
		[Column("comp_tname")]
		public String CompTname { get;set; }
 
 
 
	}
  
}




