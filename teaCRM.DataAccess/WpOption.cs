using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	[Table("wp_options")]
	public partial class WpOption 
	{
	
		[Id("option_id",IsDbGenerated=true)]
		public Int64 OptionId { get;set; }
 
		[Column("option_name")]
		public String OptionName { get;set; }
		[Column("option_value")]
		public String OptionValue { get;set; }
		[Column("autoload")]
		public String Autoload { get;set; }
 
 
 
	}
}
