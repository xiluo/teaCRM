using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Entity
{
    /// <summary>
    /// ZTree数据结构
    /// </summary>
    public interface IZTree
    {
        /// <summary>
        /// 节点ID
        /// </summar
        int id { get; set; }
        /// <summary>
        /// 节点名称
        /// </summary>
        string name { get; set; }
        /// <summary>
        /// 父ID
        /// </summary>
        int pId { get; set; }
        /// <summary>
        /// 是否有子节点
        /// </summary>
        bool isParent { get; set; }
    }
}
