using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
    [Table("T_fun_operating")]
    public partial class TFunOperating
    {

        [Id("id", IsDbGenerated = true)]
        public Int32 Id { get; set; }

        [Column("comp_num")]
        public String CompNum { get; set; }
        [Column("myapp_id")]
        public Int32 MyappId { get; set; }
        [Column("ope_action")]
        public String OpeAction { get; set; }
        [Column("ope_type")]
        public Int32? OpeType { get; set; }
        [Column("ope_function")]
        public String OpeFunction { get; set; }
        [Column("ope_is_sys")]
        public Int32 OpeIsSys { get; set; }
        [Column("ope_is_status")]
        public Int32 OpeIsStatus { get; set; }
        [Column("ope_is_fast")]
        public Int32 OpeIsFast { get; set; }

        [ManyToOne(ThisKey = "MyappId", OtherKey = "Id")]
        public TFunMyapp Myapp { get; set; }


    }

}




