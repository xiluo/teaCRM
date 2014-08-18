using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("wp_usermeta")]
	public partial class WpUsermetum 
	{
	
		[Id("umeta_id",IsDbGenerated=true)]
		public Int64 UmetaId { get;set; }
 
		[Column("user_id")]
		public Int64 UserId { get;set; }
		[Column("meta_key")]
		public String MetaKey { get;set; }
		[Column("meta_value")]
		public String MetaValue { get;set; }
 
 
 
	}
}
