using System.Text.RegularExpressions;

namespace teaCRM.Common
{
    public class StringHelper
    { //------//搜索字符串(参数1：目标字符串，参数2：之前字符串，参数3：之后字符串)----(获取两个字符串中间的字符串)  
        public static string SearchString(string s, string s1, string s2)  //获取搜索到的数目  
        {
            int n1, n2;
            n1 = s.IndexOf(s1, 0) + s1.Length;   //开始位置  
            n2 = s.IndexOf(s2, n1);               //结束位置  
            return s.Substring(n1, n2 - n1);   //取搜索的条数，用结束的位置-开始的位置,并返回  
        }
        //-----------------------------------------------------------------------  


        /// <summary>
        /// 获取字符中指定标签的值
        /// </summary>
        /// <param name="str">字符串</param>
        /// <param name="title">标签</param>
        /// <param name="attrib">属性名</param>
        /// <returns>属性</returns>
        public static string GetTitleContent(string str, string title, string attrib)
        {

            string tmpStr = string.Format("<{0}[^>]*?{1}=(['\"\"]?)(?<url>[^'\"\"\\s>]+)\\1[^>]*>", title, attrib); //获取<title>之间内容

            Match TitleMatch = Regex.Match(str, tmpStr, RegexOptions.IgnoreCase);

            string result = TitleMatch.Groups["url"].Value;
            return result;
        }

        /// <summary>
        /// 获取字符中指定标签的值
        /// </summary>
        /// <param name="str">字符串</param>
        /// <param name="title">标签</param>
        /// <returns>值</returns>
        public static string GetTitleContent(string str, string title)
        {
            string tmpStr = string.Format("<{0}[^>]*?>(?<Text>[^<]*)</{1}>", title, title); //获取<title>之间内容

            Match TitleMatch = Regex.Match(str, tmpStr, RegexOptions.IgnoreCase);

            string result = TitleMatch.Groups["Text"].Value;
            return result;
        }
    
    
    }


  

}