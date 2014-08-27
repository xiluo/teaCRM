using Spring.Context;
using Spring.Context.Support;
using teaCRM.Service.CRM.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Web.Controllers.Apps.CRM;
using teaCRM.Dao.Manual;

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
        public void CustomerServiceImplContextTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            CustomerServiceImpl target = ctx.GetObject("customerService") as CustomerServiceImpl;
          
            Assert.AreNotEqual(target, null);
        }

        /// <summary>
        ///A test for GetCustomerLsit
        ///</summary>
        [TestMethod()]
        public void GetCustomerLsitTest()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetCustomerLsit();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetCustomerMenu
        ///</summary>
        [TestMethod()]
        public void GetCustomerMenuTest()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetCustomerMenu();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

      

        /// <summary>
        ///A test for GetTraceList
        ///</summary>
        [TestMethod()]
        public void GetTraceListTest()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTraceList();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetTraceMenu
        ///</summary>
        [TestMethod()]
        public void GetTraceMenuTest()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTraceMenu();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for CustomerServiceImpl Constructor
        ///</summary>
        [TestMethod()]
        public void CustomerServiceImplConstructorTest()
        {
            CustomerServiceImpl target = new CustomerServiceImpl();
            Assert.Inconclusive("TODO: Implement code to verify target");
        }

        /// <summary>
        ///A test for GetCustomerLsit
        ///</summary>
        [TestMethod()]
        public void GetCustomerLsitTest1()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetCustomerLsit();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetCustomerMenu
        ///</summary>
        [TestMethod()]
        public void GetCustomerMenuTest1()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetCustomerMenu();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }


        /// <summary>
        ///A test for GetTraceList
        ///</summary>
        [TestMethod()]
        public void GetTraceListTest1()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTraceList();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetTraceMenu
        ///</summary>
        [TestMethod()]
        public void GetTraceMenuTest1()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTraceMenu();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for FunFilterDaoManual
        ///</summary>
        [TestMethod()]
        public void FunFilterDaoManualTest()
        {
            CustomerServiceImpl target = new CustomerServiceImpl(); // TODO: Initialize to an appropriate value
            ITFunFilterDaoManual expected = null; // TODO: Initialize to an appropriate value
            ITFunFilterDaoManual actual;
            target.FunFilterDaoManual = expected;
            actual = target.FunFilterDaoManual;
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetPagerData
        ///</summary>
        [TestMethod()]
        public void GetPagerDataTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            CustomerServiceImpl target = ctx.GetObject("customerService") as CustomerServiceImpl;


            int page = 0; // TODO: Initialize to an appropriate value
            int pagesize = 0; // TODO: Initialize to an appropriate value
            string searchs = string.Empty; // TODO: Initialize to an appropriate value
            string tag_ids = string.Empty; // TODO: Initialize to an appropriate value
            string search_owner = string.Empty; // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetPagerData(page, pagesize, searchs, tag_ids, search_owner);
            Assert.AreEqual(expected, actual);
        }
    }
}
