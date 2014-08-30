using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_cus_expvalue_99999")]
	public partial class TCusExpvalue99999 
	{
 
		[Column("cus_id")]
		public Int32 CusId { get;set; }
		[Column("exp_url")]
		public String ExpUrl { get;set; }
		[Column("exp_nimabi")]
		public String ExpNimabi { get;set; }
		[Column("exp_sex")]
		public String ExpSex { get;set; }
		[Column("exp_attach")]
		public String ExpAttach { get;set; }
		[Column("exp_addtime")]
		public DateTime? ExpAddtime { get;set; }
 
 
 
	}
  
}




