using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_cus_con")]
	public partial class TCusCon 
	{
	
		[Id("id",IsDbGenerated=false)]
		public Int32 Id { get;set; }
 
		[Column("cus_id")]
		public Int32 CusId { get;set; }
		[Column("con_name")]
		public String ConName { get;set; }
		[Column("con_tel")]
		public String ConTel { get;set; }
		[Column("con_qq")]
		public String ConQq { get;set; }
		[Column("con_email")]
		public String ConEmail { get;set; }
		[Column("con_bir")]
		public DateTime? ConBir { get;set; }
		[Column("con_note")]
		public String ConNote { get;set; }
		[Column("con_is_main")]
		public Int32 ConIsMain { get;set; }
		[Column("user_id")]
		public Int32 UserId { get;set; }
 
		[ManyToOne(ThisKey="CusId",OtherKey="Id")]
		public TCusBase Cus { get;set; }
 
 
	}
  
}




