using Spring.Context;
using Spring.Context.Support;
using teaCRM.Dao.Manual;
using teaCRM.Dao.Manual.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for TSysLogDaoManualImplTest and is intended
    ///to contain all TSysLogDaoManualImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class TSysLogDaoManualImplTest
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
        ///TSysLogDaoManualImpl注入测试
        ///</summary>
        [TestMethod()]
        public void TSysLogDaoManualImplContextTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            ITSysLogDaoManual target = ctx.GetObject("sysLogDaoManual") as ITSysLogDaoManual;

            Assert.AreNotEqual(target, null);
        }
    }
}
