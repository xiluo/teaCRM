using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
	[Table("T_fun_app_company")]
	public partial class TFunAppCompany 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("comp_num")]
		public String CompNum { get;set; }
		[Column("app_id")]
		public Int32? AppId { get;set; }
		[Column("app_is_menu")]
		public Int32? AppIsMenu { get;set; }
		[Column("app_lastdate")]
		public DateTime? AppLastdate { get;set; }
 
 
 
	}
  
}




