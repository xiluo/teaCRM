
	using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	
	[Table("V_myapp_company",Readonly=true)]
	public partial class VMyappCompany 
	{
		[Column("id")]
		public Int32 Id { get;set; }

		 
		[Column("comp_num")]
		public String CompNum { get;set; }

		 
		[Column("app_id")]
		public Int32 AppId { get;set; }

		 
		[Column("myapp_name")]
		public String MyappName { get;set; }

		 
		[Column("myapp_link")]
		public String MyappLink { get;set; }

		 
		[Column("myapp_note")]
		public String MyappNote { get;set; }

		 
		[Column("myapp_action")]
		public String MyappAction { get;set; }

		 
		[Column("myapp_date")]
		public String MyappDate { get;set; }

		 
		[Column("myapp_is_nav")]
		public Int32 MyappIsNav { get;set; }

		 
		[Column("myapp_is_sys")]
		public Int32 MyappIsSys { get;set; }

		 
		[Column("myapp_base_table")]
		public String MyappBaseTable { get;set; }

		 
		[Column("myapp_is_show")]
		public Int32 MyappIsShow { get;set; }

		 
  
     

		  }

}




