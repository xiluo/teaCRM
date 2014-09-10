/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-10 08:00:55
 * 文件名：TFunOperating.cs
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
	[Table("T_fun_operating")]
	public partial class TFunOperating 
	{
	
		[Id("id",IsDbGenerated=false)]
		public Int32 Id { get;set; }
 
		[Column("myapp_id")]
		public Int32 MyappId { get;set; }
		[Column("myapp_name")]
		public String MyappName { get;set; }
		[Column("ope_action")]
		public String OpeAction { get;set; }
		[Column("ope_is_sys")]
		public Int32 OpeIsSys { get;set; }
		[Column("ope_is_status")]
		public Int32 OpeIsStatus { get;set; }
		[Column("ope_is_fast")]
		public Int32 OpeIsFast { get;set; }
 
		[ManyToOne(ThisKey="MyappId",OtherKey="Id")]
		public TFunMyapp Myapp { get;set; }
 
 
	}
  
}




