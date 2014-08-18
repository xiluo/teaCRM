using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace NLite.Data.CodeGenerationDemo
{
	[Table("wp_commentmeta")]
	public partial class WpCommentmetum 
	{
	
		[Id("meta_id",IsDbGenerated=true)]
		public Int64 MetaId { get;set; }
 
		[Column("comment_id")]
		public Int64 CommentId { get;set; }
		[Column("meta_key")]
		public String MetaKey { get;set; }
		[Column("meta_value")]
		public String MetaValue { get;set; }
 
 
 
	}
}
