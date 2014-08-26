using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace teaCRM.Common
{
    /// <summary>
    /// DES加密/解密类。
    /// </summary>
    public class DESEncrypt
    {
        #region MD5加密算法

        /*MD5是message-digest algorithm 5（信息-摘要算法）的缩写，
         * 被广泛用于加密和解密技术上，它可以说是文件的“数字指纹”。
         * 任何一个文件，无论是可执行程序、图像文件、临时文件或者其他任何类型的文件，
         * 也不管它体积多大，都有且只有一个独一无二的MD5信息值，并且如果这个文件被修改过，
         * 它的MD5值也将随之改变。因此，我们可以通过对比同一文件的MD5值，
         * 来校验这个文件是否被“篡改”过。*/

        /// <summary>
        /// MD5加密函数
        /// </summary>
        /// <param name="str">要加密的字符串</param>
        /// <returns>加密后的字符串</returns>
        public static string Md5Encode(string str)
        {
            MD5 m = new MD5CryptoServiceProvider();
            byte[] data = Encoding.Default.GetBytes(str);
            byte[] result = m.ComputeHash(data);
            string ret1 = "";
            try
            {
                for (int j = 0; j < result.Length; j++)
                {
                    ret1 += result[j].ToString("x").PadLeft(2, '0');
                }
                return ret1;
            }
            catch
            {
                return str;
            }
        }

        #endregion

        #region 加密解密入口

        /// <summary>
        /// 加密
        /// </summary>
        /// <param name="str">要加密的字符串</param>
        /// <returns>返回加密后的字符串</returns>
        /// 
        public static string Encrypt(string str)
        {
            string key = "passkeys";
            return SymmetryEncode(key, str);
        }


        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="str">要解密的字符串</param>
        /// <returns>返回解密后的字符串</returns>
        /// 
        public static string Decrypt(string str)
        {
            string key = "passkeys";
            return SymmetryDecode(key, str);
        }

        #endregion

        #region ========简单加密解密========

        /// <summary>
        /// 简单加密函数
        /// </summary>
        /// <param name="str">要加密的字符串</param>
        /// <returns>返回加密后的字符串</returns>
        /// 
        public static string SimpleEncode(string str)
        {
            string s = "";
            try
            {
                for (int i = 0; i < str.Length; i++)
                {
                    s += (char) (str[i] + 10 - 1*2);
                }
                return s;
            }
            catch
            {
                return str;
            }
        }

        /// <summary>
        /// 简单解密函数
        /// </summary>
        /// <param name="str">要解密的字符串</param>
        /// <returns>返回解密后的字符串</returns>
        /// 
        public static string SimpleDecode(string str)
        {
            string s = "";
            try
            {
                for (int i = 0; i < str.Length; i++)
                {
                    s += (char) (str[i] - 10 + 1*2);
                }
                return s;
            }
            catch
            {
                return str;
            }
        }

        #endregion

        #region ========对称加密解密========

        //默认密钥向量
        private static byte[] Keys = {0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF};

        /// <summary>
        /// 对称加密法加密函数
        /// </summary>
        /// <param name="encryptString">待加密的字符串</param>
        /// <param name="encryptKey">加密密钥,要求为8位</param>
        /// <returns>加密成功返回加密后的字符串，失败返回源串</returns>
        public static string SymmetryEncode(string encryptKey, string encryptString)
        {
            try
            {
                byte[] rgbKey = Encoding.UTF8.GetBytes(encryptKey.Substring(0, 8));
                byte[] rgbIV = Keys;
                byte[] inputByteArray = Encoding.UTF8.GetBytes(encryptString);
                DESCryptoServiceProvider dCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, dCSP.CreateEncryptor(rgbKey, rgbIV),
                    CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                string result = Convert.ToBase64String(mStream.ToArray());
                return Base64.StringToBase64String(result);
            }
            catch
            {
                return encryptString;
            }
        }

        /// <summary>
        /// 对称加密法解密函数
        /// </summary>
        /// <param name="decryptString">待解密的字符串</param>
        /// <param name="decryptKey">解密密钥,要求为8位,和加密密钥相同</param>
        /// <returns>解密成功返回解密后的字符串，失败返源串</returns>
        public static string SymmetryDecode(string decryptKey, string decryptString)
        {

            try
            {
                decryptString = Base64.Base64StringToString(decryptString);

                byte[] rgbKey = Encoding.UTF8.GetBytes(decryptKey);
                byte[] rgbIV = Keys;
                byte[] inputByteArray = Convert.FromBase64String(decryptString);
                DESCryptoServiceProvider DCSP = new DESCryptoServiceProvider();
                MemoryStream mStream = new MemoryStream();
                CryptoStream cStream = new CryptoStream(mStream, DCSP.CreateDecryptor(rgbKey, rgbIV),
                    CryptoStreamMode.Write);
                cStream.Write(inputByteArray, 0, inputByteArray.Length);
                cStream.FlushFinalBlock();
                return Encoding.UTF8.GetString(mStream.ToArray());
            }
            catch
            {
                return decryptString;
            }
        }

        #endregion
    }
}