
	using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	
	[Table("V_app_company",Readonly=true)]
	public partial class VAppCompany 
	{
		[Column("id")]
		public Int32 Id { get;set; }

		 
		[Column("app_id")]
		public Int32 AppId { get;set; }

		 
		[Column("app_type")]
		public Int32 AppType { get;set; }

		 
		[Column("comp_num")]
		public String CompNum { get;set; }

		 
		[Column("app_name")]
		public String AppName { get;set; }

		 
		[Column("app_author")]
		public String AppAuthor { get;set; }

		 
		[Column("app_des")]
		public String AppDes { get;set; }

		 
		[Column("app_adddate")]
		public DateTime AppAdddate { get;set; }

		 
		[Column("app_imgurl16")]
		public String AppImgurl16 { get;set; }

		 
		[Column("app_imgurl32")]
		public String AppImgurl32 { get;set; }

		 
		[Column("app_imgurl75")]
		public String AppImgurl75 { get;set; }

		 
		[Column("app_imgurl190")]
		public String AppImgurl190 { get;set; }

		 
		[Column("app_ver")]
		public Double AppVer { get;set; }

		 
		[Column("app_link")]
		public String AppLink { get;set; }

		 
		[Column("app_high")]
		public Double AppHigh { get;set; }

		 
		[Column("app_upnote")]
		public String AppUpnote { get;set; }

		 
		[Column("app_ind")]
		public String AppInd { get;set; }

		 
		[Column("app_is_hot")]
		public Int32 AppIsHot { get;set; }

		 
		[Column("app_is_red")]
		public Int32 AppIsRed { get;set; }

		 
		[Column("app_is_sys")]
		public Int32 AppIsSys { get;set; }

		 
		[Column("app_price")]
		public Double AppPrice { get;set; }

		 
		[Column("app_lastdate")]
		public DateTime AppLastdate { get;set; }

		 
		[Column("app_is_menu")]
		public Int32 AppIsMenu { get;set; }

		 
  
     

		  }

}




