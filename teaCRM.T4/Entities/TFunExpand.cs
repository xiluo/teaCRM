/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-10 08:00:55
 * 文件名：TFunExpand.cs
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
	[Table("T_fun_expand")]
	public partial class TFunExpand 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("myapp_id")]
		public Int32 MyappId { get;set; }
		[Column("comp_num")]
		public String CompNum { get;set; }
		[Column("exp_name")]
		public String ExpName { get;set; }
		[Column("exp_title")]
		public String ExpTitle { get;set; }
		[Column("exp_ctype")]
		public String ExpCtype { get;set; }
		[Column("exp_dtype")]
		public String ExpDtype { get;set; }
		[Column("exp_length")]
		public Int32? ExpLength { get;set; }
		[Column("exp_place")]
		public String ExpPlace { get;set; }
		[Column("exp_option")]
		public String ExpOption { get;set; }
		[Column("exp_default")]
		public String ExpDefault { get;set; }
		[Column("exp_is_null")]
		public Int32 ExpIsNull { get;set; }
		[Column("exp_is_pw")]
		public Int32 ExpIsPw { get;set; }
		[Column("exp_is_html")]
		public Int32 ExpIsHtml { get;set; }
		[Column("exp_etype")]
		public Int32? ExpEtype { get;set; }
		[Column("exp_tipmsg")]
		public String ExpTipmsg { get;set; }
		[Column("exp_errmsg")]
		public String ExpErrmsg { get;set; }
		[Column("exp_pattern")]
		public String ExpPattern { get;set; }
		[Column("exp_sortid")]
		public String ExpSortid { get;set; }
		[Column("exp_css")]
		public String ExpCss { get;set; }
		[Column("exp_is_sys")]
		public Int32 ExpIsSys { get;set; }
 
		[ManyToOne(ThisKey="MyappId",OtherKey="Id")]
		public TFunMyapp Myapp { get;set; }
 
 
	}
  
}




