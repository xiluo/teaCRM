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
		[Column("dep_order")]
		public Int32? DepOrder { get;set; }
		[Column("dep_name")]
		public String DepName { get;set; }
		[Column("dep_num")]
		public Int32? DepNum { get;set; }
		[Column("dep_respon")]
		public String DepRespon { get;set; }
		[Column("dep_skills")]
		public String DepSkills { get;set; }
		[Column("dep_note")]
		public String DepNote { get;set; }
 
 
		[OneToMany(ThisKey="Id",OtherKey="DepId")]
		public IList<TSysUser> TSysUsers { get;set; }
 
	}
  
}




