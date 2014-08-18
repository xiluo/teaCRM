using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("wp_postmeta")]
	public partial class WpPostmetum 
	{
	
		[Id("meta_id",IsDbGenerated=true)]
		public Int64 MetaId { get;set; }
 
		[Column("post_id")]
		public Int64 PostId { get;set; }
		[Column("meta_key")]
		public String MetaKey { get;set; }
		[Column("meta_value")]
		public String MetaValue { get;set; }
 
 
 
	}
}
