/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-10 08:00:55
 * 文件名：TFunApp.cs
 * 版本：V1.0.0
 * 
 * 修改者：唐有炜           时间：2014-09-10 08:00:55           
 * 修改说明：修改说明
 * ========================================================================
*/
using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_fun_app")]
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
		public Double AppVer { get;set; }
		[Column("app_link")]
		public String AppLink { get;set; }
		[Column("app_high")]
		public Double AppHigh { get;set; }
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
		public Double AppPrice { get;set; }
 
 
 
	}
  
}




