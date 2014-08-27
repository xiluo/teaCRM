using Spring.Context;
using Spring.Context.Support;
using teaCRM.Dao.Manual.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Dao.Manual.TreeHelpers.Impl;
using teaCRM.Entity;
using teaCRM.Dao.Manual.TreeHelpers;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for TSysDepartmentDaoManualImplTest and is intended
    ///to contain all TSysDepartmentDaoManualImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class TSysDepartmentDaoManualImplTest
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
        ///A test for TSysDepartmentDaoManualImpl Constructor
        ///</summary>
        [TestMethod()]
        public void TSysDepartmentDaoManualImplContextTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            TSysDepartmentDaoManualImpl target = ctx.GetObject("sysDepartmentDaoManual") as TSysDepartmentDaoManualImpl;
            Assert.AreNotEqual(target,null);
        }

        /// <summary>
        ///A test for GetTreeData
        ///</summary>
        [TestMethod()]
        public void GetTreeDataTest()
        {
            TSysDepartmentDaoManualImpl target = new TSysDepartmentDaoManualImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTreeData();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for DepartmentTreeHelper
        ///</summary>
        [TestMethod()]
        public void DepartmentTreeHelperTest()
        {
            TSysDepartmentDaoManualImpl target = new TSysDepartmentDaoManualImpl(); // TODO: Initialize to an appropriate value
            ITreeHelper<DepartmentTree> expected = null; // TODO: Initialize to an appropriate value
            ITreeHelper<DepartmentTree> actual;
            target.DepartmentTreeHelper = expected;
            actual = target.DepartmentTreeHelper;
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
