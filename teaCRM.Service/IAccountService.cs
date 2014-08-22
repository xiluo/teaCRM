using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Entity;


namespace teaCRM.Service
{
 public   interface IAccountService
 {
     /// <summary>
     /// 账户验证  2014-08-21 07:58:50 By 唐有炜
     /// </summary>
     /// <param name="action">操作类型（login、register）</param>
     /// <param name="type">注册或登陆方式（normal,qrcode,usb,footprint）</param>
     /// <param name="accountType">账号类型（username,email,phone）</param>
     /// <param name="userName">用户名</param>
     /// <param name="userPassword">密码</param>
     /// <returns>ResponseMessage</returns>
     ResponseMessage ValidateAccount(string action, string type, string accountType, string userName,
         string userPassword);


     /// <summary>
     /// 登陆验证并写入登陆日志 2014-08-21 07:58:50 By 唐有炜
     /// </summary>
     /// <param name="type">注册或登陆方式（normal,qrcode,usb,footprint）</param>
     /// <param name="accountType">账号类型（username,email,phone）</param>
     /// <param name="userName">用户名</param>
     /// <param name="userPassword">密码</param>
     /// <param name="remember">记住密码</param>
     /// <param name="clientIp">客户端ip地址</param>
     /// <param name="clientPlace">客户端地址</param>
     /// <param name="clientTime">客户端登陆时间</param>
     /// <returns>ResponseMessage</returns>
     ResponseMessage Login(string type, string accountType, string userName, string userPassword,string remember, string clientIp, string clientPlace,string clientTime);

     /// <summary>
     /// 公司注册 2014-08-21 14:58:50 By 唐有炜
     /// </summary>
     /// <param name="accountType">账号类型（email,phone）</param>
     /// <param name="userName">用户名</param>
     /// <param name="userPassword">密码</param>
     /// <returns>ResponseMessage</returns>
     ResponseMessage Register(string accountType, string userName, string userPassword);
 }
}
