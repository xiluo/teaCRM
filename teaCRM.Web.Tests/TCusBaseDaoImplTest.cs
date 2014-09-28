using Spring.Context.Support;
using teaCRM.Dao;
using teaCRM.Dao.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;

namespace teaCRM.Web.Tests
{
    
    
    /// <summary>
    ///This is a test class for TCusBaseDaoImplTest and is intended
    ///to contain all TCusBaseDaoImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class TCusBaseDaoImplTest
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
        ///A test for GetCustomerLsit
        ///</summary>
        [TestMethod()]
        public void GetCustomerLsitTest()
        {
//            ITCusBaseDao target = ContextRegistry.GetContext().GetObject<ITCusBaseDao>("cusBaseDao");
//            int pageIndex = 1; 
//            int pageSize = 10; 
//            string selector = "NEW(Id,CusName)"; 
//            string predicate ="Id>@0"; 
//            string ordering = "Id DESC";
//            object[] values = {6};
//
//
//            int recordCount = 0; 
//            int recordCountExpected = 0; // TODO: Initialize to an appropriate value
//           
//            List<Dictionary<string, object>> expected = null; // TODO: Initialize to an appropriate value
//            List<Dictionary<string, object>> actual;
//            actual = target.GetCustomerLsit(pageIndex, pageSize, selector, predicate, ordering, out recordCount, values);
//            //Assert.AreEqual(recordCountExpected, recordCount);
//            Assert.AreNotEqual(expected, actual);
          
        }
    }
}
