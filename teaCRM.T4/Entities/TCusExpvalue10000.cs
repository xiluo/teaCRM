using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_cus_expvalue_10000")]
	public partial class TCusExpvalue10000 
	{
 
		[Column("cus_id")]
		public Int32 CusId { get;set; }
		[Column("exp_is_marry")]
		public String ExpIsMarry { get;set; }
		[Column("exp_evaluate")]
		public String ExpEvaluate { get;set; }
		[Column("exp_nation")]
		public String ExpNation { get;set; }
		[Column("exp_email")]
		public String ExpEmail { get;set; }
		[Column("exp_age")]
		public Int32? ExpAge { get;set; }
 
 
 
	}
  
}




