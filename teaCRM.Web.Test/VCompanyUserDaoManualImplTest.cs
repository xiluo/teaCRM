using Spring.Context;
using Spring.Context.Support;
using teaCRM.Dao.Manual;
using teaCRM.Dao.Manual.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Entity;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for VCompanyUserDaoManualImplTest and is intended
    ///to contain all VCompanyUserDaoManualImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class VCompanyUserDaoManualImplTest
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
        ///VCompanyUserDaoManualImpl注入测试
        ///</summary>
        [TestMethod()]
        public void VCompanyUserDaoManualImplContextTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            IVCompanyUserDaoManual target = ctx.GetObject("companyUserDaoManual") as IVCompanyUserDaoManual;

            Assert.AreNotEqual(target, null);
        }

        /// <summary>
        ///A test for InsertEntities
        ///</summary>
        [TestMethod()]
        public void InsertEntitiesTest()
        {
            VCompanyUserDaoManualImpl target = new VCompanyUserDaoManualImpl(); // TODO: Initialize to an appropriate value
            TSysCompany sysCompany = null; // TODO: Initialize to an appropriate value
            TSysUser sysUser = null; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.InsertEntities(sysCompany, sysUser);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
