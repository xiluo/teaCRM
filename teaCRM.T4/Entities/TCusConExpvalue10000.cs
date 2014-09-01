using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_cus_con_expvalue_10000")]
	public partial class TCusConExpvalue10000 
	{
 
		[Column("con_id")]
		public Int32? ConId { get;set; }
		[Column("exp_con_duty")]
		public String ExpConDuty { get;set; }
 
 
 
	}
  
}




