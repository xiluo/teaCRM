using System;
using System.Collections.Generic;
using System.Linq;
using NLite.Data;
namespace teaCRM.Entity
{
    [Table("T_fun_myapp_company")]
    public partial class TFunMyappCompany
    {

        [Id("id", IsDbGenerated = true)]
        public Int32 Id { get; set; }

        [Column("comp_num")]
        public String CompNum { get; set; }
        [Column("myapp_id")]
        public Int32 MyappId { get; set; }



    }

}




