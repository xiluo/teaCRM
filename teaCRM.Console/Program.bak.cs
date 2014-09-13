using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Common;

namespace teaCRM.Console
{
    class Program
    {
        static void Main(string[] args)
        {
//            //随机编号
           //Random rand = new Random(Guid.NewGuid().GetHashCode()); 
            //System.Console.WriteLine(rand.Next(100000,1000000000));


            //密码
            //123456 4A84124C9B60B3B9
            string pwd = System.Console.ReadLine();
            //System.Console.WriteLine(DESEncrypt.Encrypt(pwd));
            System.Console.WriteLine(DESEncrypt.Decrypt(pwd));

            System.Console.ReadKey();
        }
    }
}
