using teaCRM.Service.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Entity;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///这是 AccountServiceImplTest 的测试类，旨在
    ///包含所有 AccountServiceImplTest 单元测试
    ///</summary>
    [TestClass()]
    public class AccountServiceImplTest
    {


        private TestContext testContextInstance;

        /// <summary>
        ///获取或设置测试上下文，上下文提供
        ///有关当前测试运行及其功能的信息。
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region 附加测试特性
        // 
        //编写测试时，还可使用以下特性:
        //
        //使用 ClassInitialize 在运行类中的第一个测试前先运行代码
        //[ClassInitialize()]
        //public static void MyClassInitialize(TestContext testContext)
        //{
        //}
        //
        //使用 ClassCleanup 在运行完类中的所有测试后再运行代码
        //[ClassCleanup()]
        //public static void MyClassCleanup()
        //{
        //}
        //
        //使用 TestInitialize 在运行每个测试前先运行代码
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{
        //}
        //
        //使用 TestCleanup 在运行完每个测试后运行代码
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{
        //}
        //
        #endregion




        /// <summary>
        ///ValidateUserLName 的测试
        ///</summary>
        [TestMethod()]
        public void ValidateAccountTest()
        {
            AccountServiceImpl target = new AccountServiceImpl(); // TODO: 初始化为适当的值
          
            string action ="login"; // TODO: 初始化为适当的值
            string type = "normal"; // TODO: 初始"为适当的值
            //string type = "usb"; // TODO: 初始"为适当的值
            //string accountType = "username"; // TODO: 初始化为适当的值
            //string userName = "admin@32210500"; // TODO: 初始化为适当的值
            //string accountType = "phone"; // TODO: 初始化为适当的值
            //string userName = "15225062328"; // TODO: 初始化为适当的值
            string accountType = "email"; // TODO: 初始化为适当的值
            string userName = "cyutyw@126.com"; // TODO: 初始化为适当的值
            string userPassword = "123456"; // TODO: 初始化为适当的值

//               string action ="register"; // TODO: 初始化为适当的值
//               string type = "normal"; // TODO: 初始"为适当的值
//               string accountType = "username"; // TODO: 初始化为适当的值
//               string userName = "admin@32210500"; // TODO: 初始化为适当的值
//               string userPassword = "4A84124C9B60B3B9"; // TODO: 初始化为适当的值

            string expected = "True 密码输入正确"; // TODO: 初始化为适当的值
            string actual;
            ResponseMessage result = target.ValidateAccount(action, type, accountType, userName,userPassword);
            actual = result.Status + " " + result.Msg;

            Assert.AreEqual(expected, actual);


        }

        /// <summary>
        ///Login 的测试
        ///</summary>
        [TestMethod()]
        public void LoginTest()
        {
            AccountServiceImpl target = new AccountServiceImpl(); // TODO: 初始化为适当的值

            string type = "normal"; // TODO: 初始化为适当的值
            string accountType = "username"; // TODO: 初始化为适当的值
            string userName = "admin@32210500"; // TODO: 初始化为适当的值
            string userPassword = "123456"; // TODO: 初始化为适当的值
            string clientIp = "123.14.252.55"; // TODO: 初始化为适当的值
            string clientTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"); // TODO: 初始化为适当的值


            string expected = "True 密码输入正确"; // TODO: 初始化为适当的值
            string actual;
            ResponseMessage result = target.Login(type, accountType, userName, userPassword, clientIp, clientTime);
            actual = result.Status + " " + result.Msg;

            Assert.AreEqual(expected, actual);
        }

        /// <summary>
        ///Register 的测试
        ///</summary>
        [TestMethod()]
        public void RegisterTest()
        {
            AccountServiceImpl target = new AccountServiceImpl(); // TODO: 初始化为适当的值

//            string accountType = "phone"; // TODO: 初始化为适当的值
//            string userName = "15225062328"; // TODO: 初始化为适当的值
//            string userPassword = "123456"; // TODO: 初始化为适当的值

            string accountType = "email"; // TODO: 初始化为适当的值
            string userName = "cyutyw@126.com"; // TODO: 初始化为适当的值
            string userPassword ="123456"; // TODO: 初始化为适当的值

          

            string expected = "True 注册成功"; // TODO: 初始化为适当的值
            string actual;
            ResponseMessage result = target.Register(accountType, userName, userPassword);
            actual = result.Status + " " + result.Msg;
          
            Assert.AreEqual(expected, actual);
    
        }
    }
}
