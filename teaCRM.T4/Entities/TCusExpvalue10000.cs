/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-09 03:14:54
 * 文件名：TCusExpvalue10000.cs
 * 版本：V1.0.0
 * 
 * 修改者：唐有炜           时间：2014-09-09 03:14:54           
 * 修改说明：修改说明
 * ========================================================================
*/
using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_cus_expvalue_10000")]
	public partial class TCusExpvalue10000 
	{
 
		[Column("cus_id")]
		public Int32 CusId { get;set; }
		[Column("exp_is_marry")]
		public String ExpIsMarry { get;set; }
		[Column("exp_evaluate")]
		public String ExpEvaluate { get;set; }
		[Column("exp_nation")]
		public String ExpNation { get;set; }
		[Column("exp_email")]
		public String ExpEmail { get;set; }
		[Column("exp_age")]
		public Int32? ExpAge { get;set; }
 
 
 
	}
  
}




