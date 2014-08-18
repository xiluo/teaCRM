using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace NLite.Data.CodeGenerationDemo
{
	[Table("wp_downloads")]
	public partial class WpDownload 
	{
	
		[Id("file_id",IsDbGenerated=true)]
		public Int32 FileId { get;set; }
 
		[Column("file")]
		public String File { get;set; }
		[Column("file_name")]
		public String FileName { get;set; }
		[Column("file_des")]
		public String FileDes { get;set; }
		[Column("file_size")]
		public String FileSize { get;set; }
		[Column("file_category")]
		public Int32 FileCategory { get;set; }
		[Column("file_date")]
		public String FileDate { get;set; }
		[Column("file_updated_date")]
		public String FileUpdatedDate { get;set; }
		[Column("file_last_downloaded_date")]
		public String FileLastDownloadedDate { get;set; }
		[Column("file_hits")]
		public Int32 FileHits { get;set; }
		[Column("file_permission")]
		public Byte FilePermission { get;set; }
 
 
 
	}
}
