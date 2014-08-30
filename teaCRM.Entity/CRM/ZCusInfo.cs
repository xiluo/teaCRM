using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Entity.CRM
{
    /// <summary>
    /// 属性包含TCusBase，便于扩展字段管理 2014-08-29 14:58:50 By 唐有炜
    /// </summary>
    public class ZCusInfo 
    {
        /// <summary>
        /// 主表字段
        /// </summary>
        public  TCusBase  CusBase { set; get; }

        /// <summary>
        /// 客户扩展字段 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        public IDictionary<string, object> Fields { set; get; }
    }
}