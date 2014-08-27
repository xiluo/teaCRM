using Spring.Context;
using Spring.Context.Support;
using teaCRM.Service.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Dao.Manual;
using teaCRM.Service.Settings.Impl;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for SysDepartmentServiceImplTest and is intended
    ///to contain all SysDepartmentServiceImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class SysDepartmentServiceImplTest
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
        ///A test for SysDepartmentServiceImpl Constructor
        ///</summary>
        [TestMethod()]
        public void SysDepartmentServiceImplContextTest()
        {
             IApplicationContext ctx = ContextRegistry.GetContext();
             SysDepartmentServiceImpl target = ctx.GetObject("sysDepartmentService") as SysDepartmentServiceImpl;

            Assert.AreNotEqual(target,null);
        }

        /// <summary>
        ///A test for GetTreeData
        ///</summary>
        [TestMethod()]
        public void GetTreeDataTest()
        {
            SysDepartmentServiceImpl target = new SysDepartmentServiceImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTreeData();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for SysDepartmentDaoManual
        ///</summary>
        [TestMethod()]
        public void SysDepartmentDaoManualTest()
        {
            SysDepartmentServiceImpl target = new SysDepartmentServiceImpl(); // TODO: Initialize to an appropriate value
            ITSysDepartmentDaoManual expected = null; // TODO: Initialize to an appropriate value
            ITSysDepartmentDaoManual actual;
            target.SysDepartmentDaoManual = expected;
            actual = target.SysDepartmentDaoManual;
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
