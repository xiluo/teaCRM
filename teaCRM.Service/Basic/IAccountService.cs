using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using teaCRM.Entity;


namespace teaCRM.Service
{
    /// <summary>
    /// 账户操作接口。
    /// </summary>
 public   interface IAccountService
 {
     /// <summary>
     /// 账户验证  2014-08-21 07:58:50 By 唐有炜
     /// </summary>
     /// <param name="action">操作类型（login、register）</param>
     /// <param name="type">注册或登录方式（normal,qrcode,usb,footprint）</param>
     /// <param name="accountType">账号类型（username,email,phone）</param>
     /// <param name="userName">用户名</param>
     /// <param name="userPassword">密码</param>
     /// <returns>ResponseMessage</returns>
     ResponseMessage ValidateAccount(string action, string type, string accountType, string userName,
         string userPassword);


        /// <summary>
        /// 登录验证并写入登录日志 2014-08-21 07:58:50 By 唐有炜
        /// </summary>
        /// <param name="httpContext">HttpContext</param>
        /// <param name="type">注册或登录方式（normal,qrcode,usb,footprint）</param>
        /// <param name="accountType">账号类型（username,email,phone）</param>
        /// <param name="userName">用户名</param>
        /// <param name="userPassword">密码</param>
        /// <param name="remember">记住密码</param>
        /// <param name="clientIp">客户端ip地址</param>
        /// <param name="clientPlace">客户端地址</param>
        /// <param name="clientTime">客户端登录时间</param>
        /// <returns>ResponseMessage</returns>
        ResponseMessage Login(HttpContext httpContext, string type, string accountType, string userName, string userPassword, string remember, string clientIp, string clientPlace, string clientTime);

        /// <summary>
        /// 公司注册 2014-08-21 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="httpContext">HttpContext</param>
        /// <param name="accountType">账号类型（email,phone）</param>
        /// <param name="userName">用户名</param>
        /// <param name="userPassword">密码</param>
        /// <returns>ResponseMessage</returns>
        ResponseMessage Register(HttpContext httpContext, string accountType, string userName, string userPassword);

        /// <summary>
        /// 公共注册 2014-08-24 14:58:50 By 唐有炜
        /// </summary>
     /// <param name="httpContext">HttpContext</param>
        /// <param name="userName">用户名</param>
        /// <param name="phone">手机号</param>
        /// <param name="userPassword">密码</param>
        /// <param name="userTname">真实姓名</param>
        /// <returns>ResponseMessage</returns>
        ResponseMessage PublicRegister(HttpContext httpContext,string userName, string phone, string userPassword,
         string userTname = null);

        /// <summary>
        /// 获取当前登录的企业用户信息 2014-08-25 14:58:50 By 唐有炜
        /// </summary>
         /// <param name="userId"></param>
        /// <returns>VCompanyUser</returns>
        VCompanyUser GetCurrentCompanyUser(int userId);
 }
}
