using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("T_cus_expvalue")]
	public partial class TCusExpvalue 
	{
	
		[Id("cus_id",IsDbGenerated=true)]
		public Int32 CusId { get;set; }
 
		[Column("exp_g_leibie")]
		public String ExpGLeibie { get;set; }
 
 
 
	}
}
