using Spring.Context;
using Spring.Context.Support;
using teaCRM.Service;
using teaCRM.Service.CRM;
using teaCRM.Service.CRM.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for CustomerServiceImplTest and is intended
    ///to contain all CustomerServiceImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class CustomerServiceImplTest
    {


        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
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
        ///A test for CustomerServiceImpl Constructor
        ///</summary>
        [TestMethod()]
        public void CustomerServiceImplConstructorTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            ICustomerService target = ctx.GetObject("customerService") as ICustomerService;
            Assert.AreNotEqual(target, null);
        }

        /// <summary>
        ///A test for ValidatePhone
        ///</summary>
        [TestMethod()]
        public void ValidatePhoneTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            ICustomerService target = ctx.GetObject("customerService") as ICustomerService;
            string cus_tel = "15225062328";
           
            bool expected = true; 
            bool actual;
            actual = target.ValidatePhone(cus_tel);
           
            Assert.AreEqual(expected, actual);
        }
    }
}
