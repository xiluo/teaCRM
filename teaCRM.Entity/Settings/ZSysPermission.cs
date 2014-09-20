using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Entity.Settings
{
    /// <summary>
    /// 自定义的权限类 14-09-20 by 唐有炜
    /// </summary>
    public class ZSysPermission
    {
        public Int32 Id { get; set; }

        public Int32 AppId { get; set; }

        public Int32 AppType { get; set; }


        public String CompNum { get; set; }


        public String AppName { get; set; }


        public IEnumerable<ZFunMyApp> FunMyApp { set; get; }
    }


    public class ZFunMyApp
    {
        public Int32 Id { get; set; }
        public Int32 ParentId { get; set; }
        public String MyappName { get; set; }
        public String MyappNote { get; set; }

        public IEnumerable<TFunOperating> FunOperating { set; get; }
    }
}