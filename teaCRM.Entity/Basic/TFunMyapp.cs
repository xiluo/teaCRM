/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-09 03:06:21
 * 文件名：TFunMyapp.cs
 * 版本：V1.0.0
 * 
 * 修改者：唐有炜           时间：2014-09-09 03:06:21           
 * 修改说明：修改说明
 * ========================================================================
*/
using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_fun_myapp")]
	public partial class TFunMyapp 
	{
	
		[Id("id",IsDbGenerated=false)]
		public Int32 Id { get;set; }
 
		[Column("parent_id")]
		public Int32 ParentId { get;set; }
		[Column("comp_num")]
		public String CompNum { get;set; }
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
 
 
		[OneToMany(ThisKey="Id",OtherKey="MyappId")]
		public IList<TFunFilter> TFunFilters { get;set; }
		[OneToMany(ThisKey="Id",OtherKey="MyappId")]
		public IList<TFunTag> TFunTags { get;set; }
		[OneToMany(ThisKey="Id",OtherKey="MyappId")]
		public IList<TFunOperating> TFunOperatings { get;set; }
		[OneToMany(ThisKey="Id",OtherKey="MyappId")]
		public IList<TFunExpand> TFunExpands { get;set; }
 
	}
  
}




