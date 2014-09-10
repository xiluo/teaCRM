/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-10 08:00:55
 * 文件名：TCusConExpvalue99999.cs
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
	[Table("T_cus_con_expvalue_99999")]
	public partial class TCusConExpvalue99999 
	{
 
		[Column("con_id")]
		public Int32? ConId { get;set; }
		[Column("exp_con_salary")]
		public String ExpConSalary { get;set; }
 
 
 
	}
  
}




