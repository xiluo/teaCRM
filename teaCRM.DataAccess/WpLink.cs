using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("wp_links")]
	public partial class WpLink 
	{
	
		[Id("link_id",IsDbGenerated=true)]
		public Int64 LinkId { get;set; }
 
		[Column("link_url")]
		public String LinkUrl { get;set; }
		[Column("link_name")]
		public String LinkName { get;set; }
		[Column("link_image")]
		public String LinkImage { get;set; }
		[Column("link_target")]
		public String LinkTarget { get;set; }
		[Column("link_description")]
		public String LinkDescription { get;set; }
		[Column("link_visible")]
		public String LinkVisible { get;set; }
		[Column("link_owner")]
		public Int64 LinkOwner { get;set; }
		[Column("link_rating")]
		public Int32 LinkRating { get;set; }
		[Column("link_updated")]
		public DateTime LinkUpdated { get;set; }
		[Column("link_rel")]
		public String LinkRel { get;set; }
		[Column("link_notes")]
		public String LinkNotes { get;set; }
		[Column("link_rss")]
		public String LinkRss { get;set; }
 
 
 
	}
}
