using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Entity.CRM
{

    /// <summary>
    /// 属性包含TCusCon，便于联系人扩展字段管理 2014-08-29 14:58:50 By 唐有炜
    /// </summary>
    public class ZCusConInfo
    {
        /// <summary>
        /// 联系人主表字段
        /// </summary>
        public TCusCon CusCon { set; get; }

        /// <summary>
        /// 联系人扩展字段 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        public IDictionary<string, object> Fields { set; get; }
    }
}
