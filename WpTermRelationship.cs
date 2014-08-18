using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace NLite.Data.CodeGenerationDemo
{
	[Table("wp_term_relationships")]
	public partial class WpTermRelationship 
	{
	
		[Id("object_id",IsDbGenerated=false)]
		public Int64 ObjectId { get;set; }
	
		[Id("term_taxonomy_id",IsDbGenerated=false)]
		public Int64 TermTaxonomyId { get;set; }
 
		[Column("term_order")]
		public Int32 TermOrder { get;set; }
 
 
 
	}
}
