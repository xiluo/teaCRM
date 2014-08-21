using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【当前类文件的功能】
 *  
 *  
 * 作者：[中文姓名]   时间：2014/8/21 9:04:10
 * 文件名：AccountServiceImpl
 * 版本：V1.0.0
 * 
 * 修改者：唐有炜           时间：2014/8/21 9:04:10               
 * 修改说明：修改说明
 * ========================================================================
*/
using System.Web;
using teaCRM.Common;
using teaCRM.Dao;
using teaCRM.Dao.Impl;
using teaCRM.Dao.Manual;
using teaCRM.Entity;

namespace teaCRM.Service.Impl
{
    public class AccountServiceImpl : IAccountService
    {
        #region 用户名验证

        /// <summary>
        /// 用户名验证 2014/8/21 9:04:10   By 唐有炜
        /// </summary>
        /// <param name="action">操作类型（login、register）</param>
        /// <param name="type">注册或登陆方式（normal,qrcode,usb,footprint）</param>
        /// <param name="accountType">账号类型（username,email,phone）</param>
        /// <param name="userName">用户名</param>
        /// <param name="userPassword">密码</param>
        /// <returns>ResponseMessage</returns>
        public ResponseMessage ValidateLogin(string action, string type, string accountType, string userName,
            string userPassword)
        {
            ResponseMessage rmsg = new ResponseMessage();

            switch (action)
            {
                case "login":
                    switch (type)
                    {
                        case "normal": //正常
                            if (UserNameExists(accountType, userName))
                            {
                                rmsg.Status = true;
                                rmsg.Msg = "用户名输入正确";
                            }
                            else
                            {
                                rmsg.Status = false;
                                rmsg.Msg = "该用户名不存在";
                                return rmsg;
                            }

                            if (UserPasswordExists(accountType, userName, userPassword))
                            {
                                rmsg.Status = true;
                                rmsg.Msg = "密码输入正确";
                            }
                            else
                            {
                                rmsg.Status = false;
                                rmsg.Msg = "密码错误";
                                return rmsg;
                            }
                            return rmsg;
                            break;
                        default:
                            rmsg.Status = false;
                            rmsg.Msg = "该登陆方式尚未开通";
                            return rmsg;
                            break;
                    }

                    break;
                case "register":
                    if (UserNameExists(accountType, userName))
                    {
                        rmsg.Status = false;
                        rmsg.Msg = "对不起，该用户名已存在";
                        return rmsg;
                    }
                    else
                    {
                        rmsg.Status = false;
                        rmsg.Msg = "恭喜您，该用户名可以使用";
                    }
                    if (UserPasswordExists(accountType, userName, userPassword))
                    {
                        rmsg.Status = false;
                        rmsg.Msg = "密码输入正确";
                    }
                    else
                    {
                        rmsg.Status = false;
                        rmsg.Msg = "密码错误";
                    }
                    return rmsg;
                    break;
                default:
                    return rmsg;
                    break;
            }
        }

        /// <summary>
        /// 验证用户名是否存在 2014/8/21 9:04:10   By 唐有炜
        /// </summary>
        /// <param name="accountType">账号类型（username,email,phone）</param>
        /// <param name="userName">用户名</param>
        /// <returns></returns>
        public bool UserNameExists(string accountType, string userName)
        {
            ITSysUserDao sysUserDao = new TSysUserDaoImpl();
            ITSysCompanyDao sysCompanyDao = new TSysCompanyDaoImpl();

            switch (accountType)
            {
                case "username":
                    if (!userName.Contains("@"))
                    {
                        return false;
                    }
                    string[] userComp = userName.Split('@').ToArray();
                    if (!Utils.IsNum(userComp[1]))
                    {
                        return false;
                    }
                    string userLName = userComp[0];
                    string compNum = userComp[1];

                    bool userExists = sysUserDao.ExistsEntity(u => u.UserLname == userLName);
                    bool compExists = sysCompanyDao.ExistsEntity(c => c.CompNum == compNum);
                    if (userExists && compExists)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case "email":
                    bool emailExists = sysUserDao.ExistsEntity(u => u.UserEmail == userName);
                    if (emailExists)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case "phone":
                    bool phoneExists = sysUserDao.ExistsEntity(u => u.UserPhone == userName);
                    if (phoneExists)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                default:
                    return false;
                    break;
            }
        }


        /// <summary>
        /// 验证用户名是否存在 2014/8/21 9:04:10   By 唐有炜
        /// </summary>
        /// <param name="accountType">账号类型（username,email,phone）</param>
        /// <param name="userName">用户名</param>
        /// <param name="userPassword">密码</param>
        /// <returns></returns>
        public bool UserPasswordExists(string accountType, string userName, string userPassword)
        {
            IVCompanyUserDao companyUserDao = new VCompanyUserDaoImpl();
            bool passwordExists = false;
            //解密
            userPassword = DESEncrypt.Encrypt(userPassword);

            switch (accountType)
            {
                case "username":
                    if (!userName.Contains("@"))
                    {
                        return false;
                    }
                    string[] userComp = userName.Split('@').ToArray();
                    if (!Utils.IsNum(userComp[1]))
                    {
                        return false;
                    }
                    string userLName = userComp[0];
                    string compNum = userComp[1];

                    passwordExists =
                        companyUserDao.ExistsEntity(
                            cu => cu.UserLname == userLName && cu.CompNum == compNum && cu.UserPassword == userPassword);
                    if (passwordExists)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case "email":
                    passwordExists =
                        companyUserDao.ExistsEntity(
                            cu => cu.UserEmail == userName && cu.UserPassword == userPassword);
                    if (passwordExists)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                case "phone":
                    passwordExists =
                        companyUserDao.ExistsEntity(
                            cu => cu.UserPhone == userName && cu.UserPassword == userPassword);
                    if (passwordExists)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    break;
                default:
                    return false;
                    break;
            }
        }


        /// <summary>
        /// 根据账户类型和用户名获取Model
        /// </summary>
        /// <param name="accountType">账号类型（username,email,phone）</param>
        /// <param name="userName">用户名</param>
        /// <returns></returns>
        public VCompanyUser GetVCompanyUserByAccountTypeAndUserName(string accountType, string userName)
        {
            IVCompanyUserDao companyUserDao = new VCompanyUserDaoImpl();
            VCompanyUser model = null;
            switch (accountType)
            {
                case "username":
                    if (!userName.Contains("@"))
                    {
                        return null;
                    }
                    string[] userComp = userName.Split('@').ToArray();
                    if (!Utils.IsNum(userComp[1]))
                    {
                        return null;
                    }
                    string userLName = userComp[0];
                    string compNum = userComp[1];
                    model = companyUserDao.GetEntity(cu => cu.UserLname == userLName && cu.CompNum == compNum);
                    return model;
                    break;
                case "email":
                    model = companyUserDao.GetEntity(cu => cu.UserEmail == userName);
                    return model;
                    break;
                case "phone":
                    model = companyUserDao.GetEntity(cu => cu.UserPhone == userName);
                    return model;
                    break;
                default:
                    return null;
                    break;
            }
        }

        /// <summary>
        /// 判断用户是否已经登录(解决Session超时问题) 2014/8/21 13:42:10   By 唐有炜
        /// </summary>
        /// <param name="accountType">账号类型（username,email,phone）</param>
        /// <returns></returns>
        public bool IsUserLogin(string accountType)
        {
            //如果Session为Null
            if (HttpContext.Current.Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID] != null)
            {
                return true;
            }
            else
            {
                //检查Cookies
                string userName = Utils.GetCookie(teaCRMKeys.COOKIE_USER_COMPANY_NAME_REMEMBER, "teaCRM");
                //根据账户类型和用户名获取Model
                var model = GetVCompanyUserByAccountTypeAndUserName(accountType, userName);
                if (model != null)
                {
                    HttpContext.Current.Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID] = model.UserId;
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// 根据账户类型获取Model
        /// </summary>
        /// <param name="accountType">账号类型（username,email,phone）</param>
        /// <returns></returns>
        public VCompanyUser GetVCompanyUserByAccountType(string accountType)
        {
            IVCompanyUserDao companyUserDao = new VCompanyUserDaoImpl();
            if (IsUserLogin(accountType))
            {
                int userId = (int) HttpContext.Current.Session[teaCRMKeys.SESSION_USER_COMPANY_INFO_ID];

                //为了能查询到最新的用户信息，必须查询最新的用户资料
                var model = companyUserDao.GetEntity(cu => cu.UserId == userId);
                if (model != null)
                {
                    return model;
                }
                else
                {
                    return null;
                }
            }
            return null;
        }

        #endregion

        #region 登陆提交

        /// <summary>
        /// 登陆验证并写入登陆日志 2014-08-21 07:58:50 By 唐有炜
        /// </summary>
        /// <param name="type">注册或登陆方式（normal,qrcode,usb,footprint）</param>
        /// <param name="accountType">账号类型（username,email,phone）</param>
        /// <param name="userName">用户名</param>
        /// <param name="userPassword">密码</param>
        /// <param name="clientIp">客户端ip地址</param>
        /// <param name="clientTime">客户端登陆时间</param>
        /// <returns>ResponseMessage</returns>
        public ResponseMessage Login(string type, string accountType, string userName,
            string userPassword, string clientIp, string clientTime)
        {
            ResponseMessage rmsg = ValidateLogin("login", type, accountType, userName, userPassword);
            if (rmsg.Status) //登陆成功
            {
                var compUser = GetVCompanyUserByAccountTypeAndUserName(accountType, userName);

                //写日志
                ITSysLogDao sysLogDao = new TSysLogDaoImpl();
                TSysLog sysLog = new TSysLog()
                {
                    UserId = compUser.UserId,
                    UserLname = compUser.UserLname,
                    LogAction = teaCRMEnums.LogActionEnum.Login.ToString(),
                    LogRemark = compUser.UserTname + "登陆了系统。",
                    LogIp = clientIp,
                    LogTime = DateTime.Parse(clientTime)
                };
                sysLogDao.InsertEntity(sysLog);
            }

            return rmsg;
        }

        #endregion

        #region 公司注册

        /// <summary>
        /// 公司注册 2014-08-21 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="accountType">账号类型（email,phone）</param>
        /// <param name="userName">用户名</param>
        /// <param name="userPassword">密码</param>
        /// <returns>ResponseMessage</returns>
        public ResponseMessage Register(string accountType, string userName, string userPassword)
        {
            ResponseMessage rmsg = new ResponseMessage();
            VCompanyUserDao companyUserDao = new VCompanyUserDao();
            //随机编号
            Random rand = new Random(Guid.NewGuid().GetHashCode());
            string compNum = rand.Next(100000, 1000000000).ToString();
            TSysCompany sysCompany = new TSysCompany()
            {
                CompNum = compNum
            };

            userPassword = DESEncrypt.Encrypt(userPassword);
            TSysUser sysUser = new TSysUser()
            {
                CompNum = compNum,
                UserLname = userName,
                UserPassword = userPassword,
                RoleId = 1,//默认角色
                DepId = 1//默认部门
            };

            if (companyUserDao.InsertEntities(sysCompany, sysUser))
            {
                rmsg.Status = true;
                rmsg.Msg = "注册成功";
            }
            else
            {
                rmsg.Status = false;
                rmsg.Msg = "注册失败";
            }

            return rmsg;
        }

        #endregion
    }
}