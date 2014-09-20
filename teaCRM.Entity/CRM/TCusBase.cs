using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
    [Table("T_cus_base")]
    public partial class TCusBase
    {

        [Id("id", IsDbGenerated = true)]
        public Int32 Id { get; set; }

        [Column("cus_no")]
        public String CusNo { get; set; }
        [Column("comp_num")]
        public String CompNum { get; set; }
        [Column("cus_name")]
        public String CusName { get; set; }
        [Column("cus_sname")]
        public String CusSname { get; set; }
        [Column("cus_lastid")]
        public Int32? CusLastid { get; set; }
        [Column("cus_tel")]
        public String CusTel { get; set; }
        [Column("cus_city")]
        public String CusCity { get; set; }
        [Column("cus_address")]
        public String CusAddress { get; set; }
        [Column("cus_note")]
        public String CusNote { get; set; }
        [Column("con_id")]
        public Int32 ConId { get; set; }
        [Column("user_id")]
        public Int32 UserId { get; set; }
        [Column("con_team")]
        public String ConTeam { get; set; }
        [Column("con_is_pub")]
        public Int32 ConIsPub { get; set; }
        [Column("con_back")]
        public Int32 ConBack { get; set; }
        [Column("cus_createTime")]
        public DateTime? CusCreateTime { get; set; }
        [Column("cus_fields")]
        public String CusFields { get; set; }


        [OneToMany(ThisKey = "Id", OtherKey = "CusId")]
        public IList<TCusCon> TCusCons { get; set; }

    }

}




