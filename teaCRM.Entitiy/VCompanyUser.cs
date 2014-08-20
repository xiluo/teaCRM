
	using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Model
{
	
	[Table("V_company_user",Readonly=true)]
	public partial class VCompanyUser 
	{
		[Column("user_id")]
		public Int32 UserId { get;set; }
		[Column("company_id")]
		public Int32 CompanyId { get;set; }
		[Column("user_lname")]
		public String UserLname { get;set; }
		[Column("comp_name")]
		public String CompName { get;set; }
		[Column("user_password")]
		public String UserPassword { get;set; }
		[Column("user_tname")]
		public String UserTname { get;set; }
		[Column("user_sex")]
		public Int32 UserSex { get;set; }
		[Column("user_phone")]
		public String UserPhone { get;set; }
		[Column("user_email")]
		public String UserEmail { get;set; }
		[Column("user_tel")]
		public String UserTel { get;set; }
		[Column("user_qq")]
		public String UserQq { get;set; }
		[Column("dep_id")]
		public Int32 DepId { get;set; }
		[Column("user_position")]
		public String UserPosition { get;set; }
		[Column("user_jobstatus")]
		public Int32 UserJobstatus { get;set; }
		[Column("role_id")]
		public Int32 RoleId { get;set; }
		[Column("user_enable")]
		public Int32 UserEnable { get;set; }
 

	}

}

 
