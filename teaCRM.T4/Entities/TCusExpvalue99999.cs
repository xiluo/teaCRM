/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-09 03:14:54
 * 文件名：TCusExpvalue99999.cs
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
	[Table("t_cus_expvalue_99999")]
	public partial class TCusExpvalue99999 
	{
 
		[Column("cus_id")]
		public Int32 CusId { get;set; }
		[Column("exp_url")]
		public String ExpUrl { get;set; }
		[Column("exp_nimabi")]
		public String ExpNimabi { get;set; }
		[Column("exp_sex")]
		public String ExpSex { get;set; }
		[Column("exp_attach")]
		public String ExpAttach { get;set; }
		[Column("exp_addtime")]
		public DateTime? ExpAddtime { get;set; }
 
 
 
	}
  
}




