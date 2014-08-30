using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace teaCRM.Common
{
    /// <summary>
    /// 自动生成唯一键值
    /// </summary>
    public class RandomHelper
    {
        /// <summary>
        /// 生成唯一公司编号
        /// </summary>
        /// <returns></returns>
        public static string GetComoanyNumber()
        {
            Random rand = new Random(Guid.NewGuid().GetHashCode());
            string compNum = rand.Next(100000, 1000000000).ToString();
            return compNum;
        }


        /// <summary>
        /// 生成唯一客户编号
        /// </summary>
        /// <returns></returns>
        public static string GetCustomerNumber()
        {
            return Guid.NewGuid().ToString("D");
        }
    }
}