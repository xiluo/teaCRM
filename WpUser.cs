using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace NLite.Data.CodeGenerationDemo
{
	[Table("wp_users")]
	public partial class WpUser 
	{
	
		[Id("ID",IsDbGenerated=true)]
		public Int64 Id { get;set; }
 
		[Column("user_login")]
		public String UserLogin { get;set; }
		[Column("user_pass")]
		public String UserPass { get;set; }
		[Column("user_nicename")]
		public String UserNicename { get;set; }
		[Column("user_email")]
		public String UserEmail { get;set; }
		[Column("user_url")]
		public String UserUrl { get;set; }
		[Column("user_registered")]
		public DateTime UserRegistered { get;set; }
		[Column("user_activation_key")]
		public String UserActivationKey { get;set; }
		[Column("user_status")]
		public Int32 UserStatus { get;set; }
		[Column("display_name")]
		public String DisplayName { get;set; }
 
 
 
	}
}
