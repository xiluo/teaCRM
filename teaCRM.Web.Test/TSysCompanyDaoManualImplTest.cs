using Spring.Context;
using Spring.Context.Support;
using teaCRM.Dao.Manual;
using teaCRM.Dao.Manual.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for TSysCompanyDaoManualImplTest and is intended
    ///to contain all TSysCompanyDaoManualImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class TSysCompanyDaoManualImplTest
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
        ///TSysCompanyDaoManualImpl注入测试
        ///</summary>
        [TestMethod()]
        public void TSysCompanyDaoManualImplContextTest()
        {
             IApplicationContext ctx = ContextRegistry.GetContext();
             ITSysCompanyDaoManual target = ctx.GetObject("sysCompanyDaoManual") as ITSysCompanyDaoManual;

            Assert.AreNotEqual(target, null);
        }
    }
}
