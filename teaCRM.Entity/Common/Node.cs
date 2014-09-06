using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Entity
{
    public class Node : IZTree
    {
        #region IZTree 成员
        /// <summary>
        /// 节点ID
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 节点名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 父ID
        /// </summary>
        public int pId { get; set; }
        /// <summary>
        /// 是否有子节点
        /// </summary>
        public bool isParent { get; set; }

        #endregion
    }
}
