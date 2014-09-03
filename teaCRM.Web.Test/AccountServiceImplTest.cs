using Spring.Context;
using Spring.Context.Support;
using teaCRM.Service;
using teaCRM.Service.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Entity;

namespace teaCRM.Web.Test
{
    /// <summary>
    ///This is a test class for AccountServiceImplTest and is intended
    ///to contain all AccountServiceImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class AccountServiceImplTest
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
        ///A test for AccountServiceImpl Constructor
        ///</summary>
        [TestMethod()]
        public void AccountServiceImplContextTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            IAccountService target = ctx.GetObject("accountService") as IAccountService;
            Assert.AreNotEqual(target, null);
        }

        /// <summary>
        ///A test for ValidateAccount
        ///</summary>
        [TestMethod()]
        public void ValidateAccountTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            IAccountService target = ctx.GetObject("accountService") as IAccountService;
            string action = "login";
            string type = "normal";
            string userName = "admin%4010000"; 
            string userPassword = null; 

            string expected = null; // TODO: Initialize to an appropriate value
            string  actual;
            ResponseMessage result = target.ValidateAccount(action, type, userName, userPassword);
            actual = result.Action + " " + result.Status + " " + result.Msg;
            
            Assert.AreEqual(expected, actual);
        }

    }
}