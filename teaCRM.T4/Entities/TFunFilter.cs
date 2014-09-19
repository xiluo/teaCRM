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
		[Column("comp_num")]
		public String CompNum { get;set; }
		[Column("myapp_id")]
		public Int32 MyappId { get;set; }
		[Column("fil_name")]
		public String FilName { get;set; }
		[Column("fil_where")]
		public String FilWhere { get;set; }
		[Column("fil_order")]
		public Int32? FilOrder { get;set; }
		[Column("fil_is_show")]
		public Int32? FilIsShow { get;set; }
		[Column("fil_is_sys")]
		public Int32? FilIsSys { get;set; }
 
		[ManyToOne(ThisKey="MyappId",OtherKey="Id")]
		public TFunMyapp Myapp { get;set; }
 
 
	}
  
}




