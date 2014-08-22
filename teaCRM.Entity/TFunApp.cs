using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_fun_app")]
	public partial class TFunApp 
	{
	
		[Id("id",IsDbGenerated=false)]
		public Int32 Id { get;set; }
 
		[Column("app_name")]
		public String AppName { get;set; }
		[Column("app_author")]
		public String AppAuthor { get;set; }
		[Column("app_adddate")]
		public DateTime? AppAdddate { get;set; }
		[Column("app_imgurl")]
		public String AppImgurl { get;set; }
		[Column("app_ver")]
		public Single AppVer { get;set; }
		[Column("app_link")]
		public String AppLink { get;set; }
		[Column("app_high")]
		public Single AppHigh { get;set; }
		[Column("app_upnote")]
		public String AppUpnote { get;set; }
		[Column("app_lastdate")]
		public DateTime? AppLastdate { get;set; }
		[Column("app_ind")]
		public Int32 AppInd { get;set; }
		[Column("app_is_hot")]
		public Int32 AppIsHot { get;set; }
		[Column("app_is_red")]
		public Int32 AppIsRed { get;set; }
		[Column("app_is_my")]
		public Int32 AppIsMy { get;set; }
		[Column("app_is_sys")]
		public Int32 AppIsSys { get;set; }
		[Column("app_price")]
		public Single AppPrice { get;set; }
 
 
 
	}
  
}




