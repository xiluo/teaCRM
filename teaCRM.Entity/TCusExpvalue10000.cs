using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_cus_expvalue_10000")]
	public partial class TCusExpvalue10000 
	{
	
		[Id("cus_id",IsDbGenerated=true)]
		public Int32 CusId { get;set; }
 
		[Column("exp_g_leibie")]
		public String ExpGLeibie { get;set; }
 
 
 
	}
  
}




