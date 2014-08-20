using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using teaCRM.Entitiy;

namespace teaCRM.Service
{
 public   interface IAccountService
 {
     /// <summary>
     /// 用户名验证
     /// </summary>
     /// <param name="userLName">用户名</param>
     /// <returns>(true:存在,false:不存在)</returns>
     ResponseMessage ValidateUserLName(string userLName);

     /// <summary>
     /// 企业用户名验证
     /// </summary>
     /// <param name="compLName">企业用户名</param>
     /// <returns>(true:存在,false:不存在)</returns>
     ResponseMessage ValidateCompLName(string compLName);

     /// <summary>
     /// 登陆验证并写入登陆日志
     /// </summary>
     /// <param name="userLName">用户名</param>
     /// <param name="compLName">企业用户名</param>
     /// <param name="userPassword">密码</param>
     /// <param name="clientTime">客户端登陆时间</param>
     /// <returns>（success:成功,disable:禁用,error:失败）</returns>
     ResponseMessage Login(string userLName,string compLName,string userPassword,string clientTime);

    
 }
}
