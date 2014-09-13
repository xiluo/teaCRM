using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_fun_operating")]
	public partial class TFunOperating 
	{
	
		[Id("id",IsDbGenerated=false)]
		public Int32 Id { get;set; }
 
		[Column("myapp_id")]
		public Int32 MyappId { get;set; }
		[Column("myapp_name")]
		public String MyappName { get;set; }
		[Column("ope_action")]
		public String OpeAction { get;set; }
		[Column("ope_is_sys")]
		public Int32 OpeIsSys { get;set; }
		[Column("ope_is_status")]
		public Int32 OpeIsStatus { get;set; }
		[Column("ope_is_fast")]
		public Int32 OpeIsFast { get;set; }
 
		[ManyToOne(ThisKey="MyappId",OtherKey="Id")]
		public TFunMyapp Myapp { get;set; }
 
 
	}
  
}




