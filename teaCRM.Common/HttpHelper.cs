using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;

namespace teaCRM.Common
{
    public class HttpHelper
    {
        #region 传递header，用get方式获取CooKie

        /// <summary>
        /// 传递header，用get方式获取CooKie
        /// </summary>
        /// <param name="loginUrl"></param>
        /// <param name="header"></param>
        /// <returns></returns>
        public static CookieContainer GetCooKie(string loginUrl, HttpHeader header)
        {
            HttpWebRequest request = null;
            HttpWebResponse response = null;
            try
            {
                CookieContainer cc = new CookieContainer();
                request = (HttpWebRequest) WebRequest.Create(loginUrl);
                request.Method = header.method;
                request.ContentType = header.contentType;

                request.AllowAutoRedirect = false;
                request.CookieContainer = cc;
                request.KeepAlive = true;
                request.Timeout = header.maxTry;


                //接收响应
                response = (HttpWebResponse) request.GetResponse();
                response.Cookies = request.CookieContainer.GetCookies(request.RequestUri);

                CookieCollection cook = response.Cookies;
                cc.Add(cook);
                //Cookie字符串格式
                //string strcrook = request.CookieContainer.GetCookieHeader(request.RequestUri);

                return cc;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region 传递header，同时post数据到服务器，发送Cookie获取CooKie

        /// <summary>
        /// 传递header，同时post数据到服务器，发送Cookie获取CooKie
        /// </summary>
        /// <param name="loginUrl"></param>
        /// <param name="postdata"></param>
        /// <param name="header"></param>
        /// <returns></returns>
        public static CookieContainer GetCooKie(string loginUrl, string postdata, CookieContainer cc, HttpHeader header)
        {
            HttpWebRequest request = null;
            HttpWebResponse response = null;
            try
            {
                request = (HttpWebRequest) WebRequest.Create(loginUrl);
                request.Method = header.method;
                request.ContentType = header.contentType;

                byte[] postdatabyte = Encoding.UTF8.GetBytes(postdata);
                request.ContentLength = postdatabyte.Length;
                request.AllowAutoRedirect = false;
                request.CookieContainer = cc;
                request.KeepAlive = true;
                request.Timeout = header.maxTry;

                //提交请求
                Stream stream;
                stream = request.GetRequestStream();
                stream.Write(postdatabyte, 0, postdatabyte.Length);
                stream.Close();

                //接收响应
                response = (HttpWebResponse) request.GetResponse();
                response.Cookies = request.CookieContainer.GetCookies(request.RequestUri);

                CookieCollection cook = response.Cookies;

                CookieContainer resCook = new CookieContainer();
                resCook.Add(cook);

                //Cookie字符串格式
                //string strcrook = request.CookieContainer.GetCookieHeader(request.RequestUri);

                return resCook;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region 传递cookie和header获取html

        /// <summary>
        /// 获取html
        /// </summary>
        /// <param name="getUrl"></param>
        /// <param name="cookieContainer"></param>
        /// <param name="header"></param>
        /// <returns></returns>
        public static string GetHtml(string getUrl, CookieContainer cookieContainer, HttpHeader header)
        {
            Thread.Sleep(1000);
            HttpWebRequest httpWebRequest = null;
            HttpWebResponse httpWebResponse = null;
            try
            {
                //设置属性并发送http请求
                httpWebRequest = (HttpWebRequest) HttpWebRequest.Create(getUrl);

                httpWebRequest.CookieContainer = cookieContainer;
                httpWebRequest.ContentType = header.contentType;
                httpWebRequest.ServicePoint.ConnectionLimit = header.maxTry;
                httpWebRequest.Referer = header.referer;
                httpWebRequest.Accept = header.accept;
                httpWebRequest.UserAgent = header.userAgent;
                httpWebRequest.Method = header.method;
                httpWebRequest.Timeout = header.maxTry;

                //建立http返回对象
                httpWebResponse = (HttpWebResponse) httpWebRequest.GetResponse();

                Stream responseStream = httpWebResponse.GetResponseStream();
                StreamReader streamReader = new StreamReader(responseStream, header.encoding);
                string html = streamReader.ReadToEnd();
                streamReader.Close();
                responseStream.Close();
                httpWebRequest.Abort();
                httpWebResponse.Close();
                return html;
            }
            catch (Exception e)
            {
                if (httpWebRequest != null) httpWebRequest.Abort();
                if (httpWebResponse != null) httpWebResponse.Close();
                return e.Message;
            }
        }

        #endregion

        #region 传递cookie和header，同时发送post数据，获取html

        /// <summary>
        /// 传递cookie和header，同时发送post数据，获取html
        /// </summary>
        /// <param name="getUrl"></param>
        /// <param name="postData"></param>
        /// <param name="cookieContainer"></param>
        /// <param name="header"></param>
        /// <returns></returns>
        public static string GetHtml(string getUrl, string postData, CookieContainer cookieContainer, HttpHeader header)

        {
            Thread.Sleep(1000);
            HttpWebRequest httpWebRequest = null;
            HttpWebResponse httpWebResponse = null;
            try
            {
                //并发送http请求
                httpWebRequest = (HttpWebRequest) HttpWebRequest.Create(getUrl);
                //设置属性
                httpWebRequest.CookieContainer = cookieContainer;
                httpWebRequest.ContentType = header.contentType;
                httpWebRequest.ServicePoint.ConnectionLimit = header.maxTry;
                httpWebRequest.Referer = header.referer;
                httpWebRequest.Accept = header.accept;
                httpWebRequest.UserAgent = header.userAgent;
                httpWebRequest.Method = "POST";
                httpWebRequest.Timeout = header.maxTry;


                //写入post数据
                byte[] arrB = header.encoding.GetBytes(postData);
                httpWebRequest.ContentLength = arrB.Length;
                Stream outStream = httpWebRequest.GetRequestStream();
                outStream.Write(arrB, 0, arrB.Length);
                outStream.Close();

                //建立http返回对象
                httpWebResponse = (HttpWebResponse) httpWebRequest.GetResponse();
                //通过流读取返回的字符串
                Stream responseStream = httpWebResponse.GetResponseStream();
                StreamReader streamReader = new StreamReader(responseStream, header.encoding);
                string html = streamReader.ReadToEnd();
                //关闭对象
                streamReader.Close();
                responseStream.Close();
                httpWebRequest.Abort();
                httpWebResponse.Close();
                return html;
            }
            catch (Exception e)
            {
                if (httpWebRequest != null) httpWebRequest.Abort();
                if (httpWebResponse != null) httpWebResponse.Close();
                return e.Message;
            }
        }

        #endregion

        #region 传递cookie获取验证码

        /// <summary>
        /// 下载验证码图片并保存到本地
        /// </summary>
        /// <param name="Url">验证码URL</param>
        /// <param name="cookCon">Cookies值</param>
        /// <param name="savePath">保存位置/文件名</param>
        public static bool DowloadCheckImg(string Url, CookieContainer cookCon, string savePath)
        {
            bool bol = true;
            HttpWebRequest webRequest = (HttpWebRequest) WebRequest.Create(Url);
            //属性配置
            webRequest.AllowWriteStreamBuffering = true;
            webRequest.Credentials = System.Net.CredentialCache.DefaultCredentials;
            webRequest.MaximumResponseHeadersLength = -1;
            webRequest.Accept =
                "image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*";
            webRequest.UserAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; Maxthon; .NET CLR 1.1.4322)";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            webRequest.Method = "GET";
            webRequest.Headers.Add("Accept-Language", "zh-cn");
            webRequest.Headers.Add("Accept-Encoding", "gzip,deflate");
            webRequest.KeepAlive = true;
            webRequest.CookieContainer = cookCon;
            try
            {
                //获取服务器返回的资源
                using (HttpWebResponse webResponse = (HttpWebResponse) webRequest.GetResponse())
                {
                    using (Stream sream = webResponse.GetResponseStream())
                    {
                        List<byte> list = new List<byte>();
                        while (true)
                        {
                            int data = sream.ReadByte();
                            if (data == -1)
                                break;
                            list.Add((byte) data);
                        }
                        File.WriteAllBytes(savePath, list.ToArray());
                    }
                }
            }
            catch
            {
                bol = false;
            }

            return bol;
        }

        #endregion

        #region 不用Cookie发送get请求,10秒超时

        /// <summary>
        /// 不用Cookie发送get请求，带参数
        /// </summary>
        /// <param name="Url"></param>
        /// <param name="postDataStr"></param>
        /// <returns></returns>
        public static string Get(string Url, string postDataStr)
        {
            HttpWebRequest request =
                (HttpWebRequest) WebRequest.Create(Url + (postDataStr == "" ? "" : "?") + postDataStr);
            request.Method = "GET";
            request.ContentType = "text/html;charset=UTF-8";
            HttpWebResponse response = (HttpWebResponse) request.GetResponse();
            Stream myResponseStream = response.GetResponseStream();
            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
            string retString = myStreamReader.ReadToEnd();
            myStreamReader.Close();
            myResponseStream.Close();
            return retString;
        }

        /// <summary>
        /// 不用Cookie发送get请求,不带参数
        /// </summary>
        /// <param name="Url"></param>
        /// <returns></returns>
        public static string Get(string Url)
        {
            return Get(Url, "");
        }

        #endregion

        #region 不用Cookie发送post请求,10秒超时

        /// <summary>
        /// 不用Cookie发送post请求
        /// </summary>
        /// <param name="strUrl"></param>
        /// <param name="strParm"></param>
        /// <param name="encode">编码</param>
        /// <returns></returns>
        public static string Post(string strUrl, string strParm, Encoding encode)
        {
            byte[] arrB = encode.GetBytes(strParm);
            HttpWebRequest myReq = (HttpWebRequest) WebRequest.Create(strUrl);
            myReq.Method = "POST";
            myReq.ContentType = "application/x-www-form-urlencoded";
            myReq.Timeout = 10000;

            myReq.ContentLength = arrB.Length;
            Stream outStream = myReq.GetRequestStream();
            outStream.Write(arrB, 0, arrB.Length);
            outStream.Close();
            WebResponse myResp = null;
            try
            {
                //接收HTTP做出的响应
                myResp = myReq.GetResponse();
            }
            catch (Exception e)
            {
                throw e;
            }
            Stream ReceiveStream = myResp.GetResponseStream();
            StreamReader readStream = new StreamReader(ReceiveStream, encode);
            Char[] read = new Char[256];
            int count = readStream.Read(read, 0, 256);
            string str = null;
            while (count > 0)
            {
                str += new String(read, 0, count);
                count = readStream.Read(read, 0, 256);
            }
            readStream.Close();
            myResp.Close();
            return str;
        }
    }

    #endregion

    #region HttpHeader辅助类

    public class HttpHeader
    {
        public string contentType { get; set; }

        public string accept { get; set; }
        public Encoding encoding { get; set; }
        public string referer { get; set; }

        public string userAgent { get; set; }

        public string method { get; set; }

        public int maxTry { get; set; }
    }

    #endregion
}