using System.Collections.Generic;
using System.Net.Mail;

namespace teaCRM.Common
{
    /// <summary> 
    /// 发送邮件的类 
    /// </summary> 
    public class MailHelper
    {
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="emailstmp">SMTP服务器地址</param>
        /// <param name="emailport">SMTP的SSL端口</param>
        /// <param name="emailfrom">发件人</param>
        /// <param name="emailusername">用户名</param>
        /// <param name="emailpassword">密码</param>
        /// <param name="emailnickname">发信昵称</param>
        /// <param name="tos">接收人集合</param>
        /// <param name="copyTos">抄送人集合</param>
        /// <param name="isHtml">是否支持html</param>
        /// <param name="title">邮件标题</param>
        /// <param name="content">邮件正文</param>
        /// <returns></returns>
        public static bool SendMail(string emailstmp, int emailport, string emailfrom, string emailusername,
            string emailpassword, string emailnickname, List<string> tos, List<string> copyTos, bool isHtml,
            string title, string content)
        {
            System.Net.Mail.MailMessage msg = new System.Net.Mail.MailMessage();

            //收件人
            if (null != tos)
            {
                foreach (var toUser in tos)
                {
                    msg.To.Add(toUser);
                }
            }

            //抄送人
            if (null != copyTos)
            {
                foreach (var copyUser in copyTos)
                {
                    msg.CC.Add(copyUser);
                }
            }


            msg.From = new MailAddress(emailfrom, emailnickname, System.Text.Encoding.UTF8);
            /**/ /* 上面3个参数分别是发件人地址（可以随便写），发件人姓名，编码*/
            msg.Subject = title; //邮件标题   
            msg.SubjectEncoding = System.Text.Encoding.UTF8; //邮件标题编码   
            msg.Body = content; //邮件内容   
            msg.BodyEncoding = System.Text.Encoding.UTF8; //邮件内容编码   
            msg.IsBodyHtml = isHtml; //是否是HTML邮件   
            msg.Priority = System.Net.Mail.MailPriority.High; //邮件优先级   

            SmtpClient client = new SmtpClient();
            client.Credentials = new System.Net.NetworkCredential(emailusername, emailpassword);
            //上述写你的GMail邮箱和密码   
            //client.Port = 587; //Gmail使用的端口   
            client.Port = emailport; //Gmail使用的端口  
            //client.Host = "smtp.gmail.com";
            client.Host = emailstmp;
            client.EnableSsl = true; //经过ssl加密   
            object userState = msg;
            try
            {
                client.SendAsync(msg, userState);
                //简单一点儿可以client.Send(msg);   
                return true;
            }
            catch //(System.Net.Mail.SmtpException ex)
            {
                return false;
            }
        }
    }
}