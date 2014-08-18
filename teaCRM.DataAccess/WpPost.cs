using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("wp_posts")]
	public partial class WpPost 
	{
	
		[Id("ID",IsDbGenerated=true)]
		public Int64 Id { get;set; }
 
		[Column("post_author")]
		public Int64 PostAuthor { get;set; }
		[Column("post_date")]
		public DateTime PostDate { get;set; }
		[Column("post_date_gmt")]
		public DateTime PostDateGmt { get;set; }
		[Column("post_content")]
		public String PostContent { get;set; }
		[Column("post_title")]
		public String PostTitle { get;set; }
		[Column("post_excerpt")]
		public String PostExcerpt { get;set; }
		[Column("post_status")]
		public String PostStatus { get;set; }
		[Column("comment_status")]
		public String CommentStatus { get;set; }
		[Column("ping_status")]
		public String PingStatus { get;set; }
		[Column("post_password")]
		public String PostPassword { get;set; }
		[Column("post_name")]
		public String PostName { get;set; }
		[Column("to_ping")]
		public String ToPing { get;set; }
		[Column("pinged")]
		public String Pinged { get;set; }
		[Column("post_modified")]
		public DateTime PostModified { get;set; }
		[Column("post_modified_gmt")]
		public DateTime PostModifiedGmt { get;set; }
		[Column("post_content_filtered")]
		public String PostContentFiltered { get;set; }
		[Column("post_parent")]
		public Int64 PostParent { get;set; }
		[Column("guid")]
		public String Guid { get;set; }
		[Column("menu_order")]
		public Int32 MenuOrder { get;set; }
		[Column("post_type")]
		public String PostType { get;set; }
		[Column("post_mime_type")]
		public String PostMimeType { get;set; }
		[Column("comment_count")]
		public Int64 CommentCount { get;set; }
 
 
 
	}
}
