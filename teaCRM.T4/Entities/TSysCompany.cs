/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-09 03:14:54
 * 文件名：TSysCompany.cs
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
	[Table("T_sys_company")]
	public partial class TSysCompany 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
	
		[Id("comp_num",IsDbGenerated=false)]
		public String CompNum { get;set; }
 
		[Column("comp_tname")]
		public String CompTname { get;set; }
 
 
 
	}
  
}




