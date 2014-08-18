using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("wp_terms")]
	public partial class WpTerm 
	{
	
		[Id("term_id",IsDbGenerated=true)]
		public Int64 TermId { get;set; }
 
		[Column("name")]
		public String Name { get;set; }
		[Column("slug")]
		public String Slug { get;set; }
		[Column("term_group")]
		public Int64 TermGroup { get;set; }
 
 
 
	}
}
