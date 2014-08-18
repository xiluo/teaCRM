using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace NLite.Data.CodeGenerationDemo
{
	[Table("wp_term_taxonomy")]
	public partial class WpTermTaxonomy 
	{
	
		[Id("term_taxonomy_id",IsDbGenerated=true)]
		public Int64 TermTaxonomyId { get;set; }
 
		[Column("term_id")]
		public Int64 TermId { get;set; }
		[Column("taxonomy")]
		public String Taxonomy { get;set; }
		[Column("description")]
		public String Description { get;set; }
		[Column("parent")]
		public Int64 Parent { get;set; }
		[Column("count")]
		public Int64 Count { get;set; }
 
 
 
	}
}
