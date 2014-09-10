
using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	
	[Table("V_sys_department",Readonly=true)]
	public partial class VSysDepartment 
	{
		[Column("id")]
		public Int32 Id { get;set; }
		[Column("parent_id")]
		public Int32 ParentId { get;set; }
		[Column("parent_name")]
		public String ParentName { get;set; }
		[Column("comp_num")]
		public String CompNum { get;set; }
		[Column("dep_name")]
		public String DepName { get;set; }
		[Column("dep_num")]
		public Int32 DepNum { get;set; }
		[Column("create_date")]
		public DateTime CreateDate { get;set; }
		[Column("dep_order")]
		public Int32 DepOrder { get;set; }
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
 

	}

}




