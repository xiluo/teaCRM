/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-10 08:00:55
 * 文件名：TFunFilter.cs
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
	[Table("T_fun_filters")]
	public partial class TFunFilter 
	{
	
		[Id("id",IsDbGenerated=false)]
		public Int32 Id { get;set; }
 
		[Column("parent_id")]
		public Int32? ParentId { get;set; }
		[Column("fil_order")]
		public Int32? FilOrder { get;set; }
		[Column("comp_num")]
		public String CompNum { get;set; }
		[Column("fil_name")]
		public String FilName { get;set; }
		[Column("myapp_id")]
		public Int32 MyappId { get;set; }
		[Column("fil_where")]
		public String FilWhere { get;set; }
 
		[ManyToOne(ThisKey="MyappId",OtherKey="Id")]
		public TFunMyapp Myapp { get;set; }
 
 
	}
  
}




