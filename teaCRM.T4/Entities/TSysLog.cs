using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_sys_log")]
	public partial class TSysLog 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("user_id")]
		public Int32 UserId { get;set; }
		[Column("user_lname")]
		public String UserLname { get;set; }
		[Column("log_action")]
		public String LogAction { get;set; }
		[Column("log_remark")]
		public String LogRemark { get;set; }
		[Column("log_ip")]
		public String LogIp { get;set; }
		[Column("log_place")]
		public String LogPlace { get;set; }
		[Column("log_time")]
		public DateTime? LogTime { get;set; }
 
 
 
	}
  
}




