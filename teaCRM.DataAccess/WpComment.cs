using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("wp_comments")]
	public partial class WpComment 
	{
	
		[Id("comment_ID",IsDbGenerated=true)]
		public Int64 CommentId { get;set; }
 
		[Column("comment_post_ID")]
		public Int64 CommentPostId { get;set; }
		[Column("comment_author")]
		public String CommentAuthor { get;set; }
		[Column("comment_author_email")]
		public String CommentAuthorEmail { get;set; }
		[Column("comment_author_url")]
		public String CommentAuthorUrl { get;set; }
		[Column("comment_author_IP")]
		public String CommentAuthorIp { get;set; }
		[Column("comment_date")]
		public DateTime CommentDate { get;set; }
		[Column("comment_date_gmt")]
		public DateTime CommentDateGmt { get;set; }
		[Column("comment_content")]
		public String CommentContent { get;set; }
		[Column("comment_karma")]
		public Int32 CommentKarma { get;set; }
		[Column("comment_approved")]
		public String CommentApproved { get;set; }
		[Column("comment_agent")]
		public String CommentAgent { get;set; }
		[Column("comment_type")]
		public String CommentType { get;set; }
		[Column("comment_parent")]
		public Int64 CommentParent { get;set; }
		[Column("user_id")]
		public Int64 UserId { get;set; }
		[Column("comment_mail_notify")]
		public Byte CommentMailNotify { get;set; }
 
 
 
	}
}
