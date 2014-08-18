using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("wp_exportsreports_log")]
	public partial class WpExportsreportsLog 
	{
	
		[Id("id",IsDbGenerated=true)]
		public Int32 Id { get;set; }
 
		[Column("report_id")]
		public Int32 ReportId { get;set; }
		[Column("filename")]
		public String Filename { get;set; }
		[Column("created")]
		public DateTime Created { get;set; }
		[Column("updated")]
		public DateTime Updated { get;set; }
 
 
 
	}
}
