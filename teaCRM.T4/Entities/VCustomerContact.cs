
	using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	
	[Table("V_customer_contact",Readonly=true)]
	public partial class VCustomerContact 
	{
		[Column("id")]
		public Int32 Id { get;set; }

		 
		[Column("cus_no")]
		public String CusNo { get;set; }

		 
		[Column("comp_num")]
		public String CompNum { get;set; }

		 
		[Column("cus_name")]
		public String CusName { get;set; }

		 
		[Column("cus_sname")]
		public String CusSname { get;set; }

		 
		[Column("cus_lastid")]
		public Int32 CusLastid { get;set; }

		 
		[Column("cus_last_name")]
		public String CusLastName { get;set; }

		 
		[Column("cus_tel")]
		public String CusTel { get;set; }

		 
		[Column("cus_city")]
		public String CusCity { get;set; }

		 
		[Column("cus_industry")]
		public String CusIndustry { get;set; }

		 
		[Column("cus_address")]
		public String CusAddress { get;set; }

		 
		[Column("cus_note")]
		public String CusNote { get;set; }

		 
		[Column("con_id")]
		public Int32 ConId { get;set; }

		 
		[Column("user_id")]
		public Int32 UserId { get;set; }

		 
		[Column("con_team")]
		public String ConTeam { get;set; }

		 
		[Column("con_is_pub")]
		public Int32 ConIsPub { get;set; }

		 
		[Column("con_back")]
		public Int32 ConBack { get;set; }

		 
		[Column("cus_createTime")]
		public DateTime CusCreateTime { get;set; }

		 
		[Column("cus_fields")]
		public String CusFields { get;set; }

		 
		[Column("con_name")]
		public String ConName { get;set; }

		 
		[Column("con_tel")]
		public String ConTel { get;set; }

		 
		[Column("con_qq")]
		public String ConQq { get;set; }

		 
		[Column("con_email")]
		public String ConEmail { get;set; }

		 
		[Column("con_bir")]
		public DateTime ConBir { get;set; }

		 
		[Column("con_note")]
		public String ConNote { get;set; }

		 
		[Column("con_is_main")]
		public Int32 ConIsMain { get;set; }

		 
		[Column("con_fields")]
		public String ConFields { get;set; }

		 
  
     

		  }

}




