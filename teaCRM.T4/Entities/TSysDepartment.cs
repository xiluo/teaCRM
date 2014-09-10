/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【teaCRM数据库操作上下文】
 *  
 *  
 * 作者：唐有炜   时间：2014-09-10 08:00:55
 * 文件名：TSysDepartment.cs
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
	[Table("T_sys_department")]
	public partial class TSysDepartment 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("parent_id")]
		public Int32 ParentId { get;set; }
		[Column("comp_num")]
		public String CompNum { get;set; }
		[Column("dep_name")]
		public String DepName { get;set; }
		[Column("dep_num")]
		public Int32? DepNum { get;set; }
		[Column("create_date")]
		public DateTime? CreateDate { get;set; }
		[Column("dep_order")]
		public Int32? DepOrder { get;set; }
		[Column("dep_goal")]
		public String DepGoal { get;set; }
		[Column("dep_respon")]
		public String DepRespon { get;set; }
		[Column("dep_skills")]
		public String DepSkills { get;set; }
		[Column("dep_course")]
		public String DepCourse { get;set; }
		[Column("dep_note")]
		public String DepNote { get;set; }
 
 
		[OneToMany(ThisKey="Id",OtherKey="DepId")]
		public IList<TSysUser> TSysUsers { get;set; }
 
	}
  
}




