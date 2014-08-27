using Spring.Context;
using Spring.Context.Support;
using teaCRM.Dao.Manual.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Data;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for ZCusInfoDaoManualImplTest and is intended
    ///to contain all ZCusInfoDaoManualImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class ZCusInfoDaoManualImplTest
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
        ///A test for ZCusInfoDaoManualImpl Context
        ///</summary>
        [TestMethod()]
        public void ZCusInfoDaoManualImplContextTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            ZCusInfoDaoManualImpl target = ctx.GetObject("cusInfoDaoManual") as ZCusInfoDaoManualImpl;

            Assert.AreNotEqual(target, null);
        }

        /// <summary>
        ///A test for GetCustomerLsit
        ///</summary>
        [TestMethod()]
        public void GetCustomerLsitTest()
        {
            ZCusInfoDaoManualImpl target = new ZCusInfoDaoManualImpl(); // TODO: Initialize to an appropriate value
            int pageSize = 0; // TODO: Initialize to an appropriate value
            int pageIndex = 0; // TODO: Initialize to an appropriate value
            string strWhere = string.Empty; // TODO: Initialize to an appropriate value
            string filedOrder = string.Empty; // TODO: Initialize to an appropriate value
            int recordCount = 0; // TODO: Initialize to an appropriate value
            int recordCountExpected = 0; // TODO: Initialize to an appropriate value
            DataTable expected = null; // TODO: Initialize to an appropriate value
            DataTable actual;
            actual = target.GetCustomerLsit(pageSize, pageIndex, strWhere, filedOrder, out recordCount);
            Assert.AreEqual(recordCountExpected, recordCount);
            Assert.AreNotEqual(expected, actual);
         }

  
    }
}
