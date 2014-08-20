using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_fun_tags")]
	public partial class TFunTag 
	{
	
		[Id("id",IsDbGenerated=false)]
		public Int32 Id { get;set; }
 
		[Column("myapp_id")]
		public Int32 MyappId { get;set; }
		[Column("tag_name")]
		public String TagName { get;set; }
		[Column("tag_value")]
		public String TagValue { get;set; }
		[Column("tag_color")]
		public Byte[] TagColor { get;set; }
 
		[ManyToOne(ThisKey="MyappId",OtherKey="Id")]
		public TFunMyapp Myapp { get;set; }
 
 
	}
  
}




