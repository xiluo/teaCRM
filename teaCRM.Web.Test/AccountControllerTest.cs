using Spring.Context;
using Spring.Context.Support;
using teaCRM.Service.Impl;
using teaCRM.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting.Web;
using System.Web.Mvc;

namespace teaCRM.Web.Test
{
    /// <summary>
    ///This is a test class for AccountControllerTest and is intended
    ///to contain all AccountControllerTest Unit Tests
    ///</summary>
    [TestClass()]
    public class AccountControllerTest
    {
        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get { return testContextInstance; }
            set { testContextInstance = value; }
        }

        #region Additional test attributes

        // 
        //You can use the following additional attributes as you write your tests:
        //
        //Use ClassInitialize to run code before running the first test in the class
        //[ClassInitialize()]
        //public static void MyClassInitialize(TestContext testContext)
        //{
        //}
        //
        //Use ClassCleanup to run code after all tests in a class have run
        //[ClassCleanup()]
        //public static void MyClassCleanup()
        //{
        //}
        //
        //Use TestInitialize to run code before running each test
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{
        //}
        //
        //Use TestCleanup to run code after each test has run
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{
        //}
        //

        #endregion

        /// <summary>
        /// AccountController注入测试
        /// </summary>
        [TestMethod()]
        [HostType("ASP.NET")]
        [AspNetDevelopmentServerHost("D:\\学习资料\\开发参考资料\\优创科技\\项目\\工作项目\\优创CRM\\源码\\teaCRM\\teaCRM.Web", "/")]
        [UrlToTest("http://localhost:20649/")]
        public void AccountControllerContextTest()
        {
            // AccountController target = new AccountController(); // TODO: Initialize to an appropriate value
            IApplicationContext ctx = ContextRegistry.GetContext();
            AccountController target = ctx.GetObject("accountController") as AccountController;

            Assert.AreNotEqual(target, null);
        }

        /// <summary>
        ///A test for Login
        ///</summary>
        // TODO: Ensure that the UrlToTest attribute specifies a URL to an ASP.NET page (for example,
        // http://.../Default.aspx). This is necessary for the unit test to be executed on the web server,
        // whether you are testing a page, web service, or a WCF service.
        [TestMethod()]
        [HostType("ASP.NET")]
        [AspNetDevelopmentServerHost("D:\\学习资料\\开发参考资料\\优创科技\\项目\\工作项目\\优创CRM\\源码\\teaCRM\\teaCRM.Web", "/")]
        [UrlToTest("http://localhost:20649/")]
        public void LoginTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            AccountController target = ctx.GetObject("accountController") as AccountController;
//
            FormCollection fc = new FormCollection(); // TODO: Initialize to an appropriate value
            fc["type"] = "normal";
            fc["accountType"] = "username";
            fc["userName"] = "admin@10000";
            fc["userPassword"] = "123456";
            fc["remember"] = "true";
            fc["clientIp"] = "127.0.0.1";
            fc["clientPlace"] = "henan";
            fc["clientTime"] = "2014-01-01";

            ActionResult expected = target.Login(fc);
            ActionResult actual = null;

            Assert.AreEqual(expected, actual);
        }
    }
}