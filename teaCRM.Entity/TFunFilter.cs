using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("t_fun_filters")]
	public partial class TFunFilter 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("parent_id")]
		public Int32? ParentId { get;set; }
		[Column("fil_name")]
		public String FilName { get;set; }
		[Column("myapp_id")]
		public Int32 MyappId { get;set; }
		[Column("fil_where")]
		public String FilWhere { get;set; }
 
		[ManyToOne(ThisKey="MyappId",OtherKey="Id")]
		public TFunMyapp Myapp { get;set; }
 
 
	}
  
}




