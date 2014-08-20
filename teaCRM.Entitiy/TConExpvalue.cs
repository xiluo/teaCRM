using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("T_con_expvalue")]
	public partial class TConExpvalue 
	{
	
		[Id("con_id",IsDbGenerated=true)]
		public Int32 ConId { get;set; }
 
		[Column("exp_g_leibie")]
		public String ExpGLeibie { get;set; }
 
 
 
	}
  
}

 
