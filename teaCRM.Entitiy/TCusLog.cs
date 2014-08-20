using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("T_cus_log")]
	public partial class TCusLog 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("cus_id")]
		public Int32 CusId { get;set; }
		[Column("cus_type")]
		public String CusType { get;set; }
		[Column("cus_info")]
		public String CusInfo { get;set; }
		[Column("user_id")]
		public Int32? UserId { get;set; }
		[Column("cus_addtime")]
		public DateTime CusAddtime { get;set; }
 
 
 
	}
  
}

 
