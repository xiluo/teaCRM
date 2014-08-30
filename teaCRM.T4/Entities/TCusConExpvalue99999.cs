using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_cus_con_expvalue_99999")]
	public partial class TCusConExpvalue99999 
	{
 
		[Column("cus_id")]
		public Int32? CusId { get;set; }
		[Column("exp_con_salary")]
		public String ExpConSalary { get;set; }
 
 
 
	}
  
}




