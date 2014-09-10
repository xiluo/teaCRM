/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-10 08:00:55
 * 文件名：TSysPower.cs
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
	[Table("T_sys_power")]
	public partial class TSysPower 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("role_id")]
		public Int32? RoleId { get;set; }
		[Column("module")]
		public Int32 Module { get;set; }
		[Column("power_nav")]
		public String PowerNav { get;set; }
		[Column("power_action")]
		public String PowerAction { get;set; }
 
 
 
	}
  
}




