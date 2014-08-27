using Spring.Context;
using Spring.Context.Support;
using teaCRM.Dao.Manual.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Service.CRM.Impl;
using teaCRM.Entity;
using teaCRM.Dao.Manual.TreeHelpers;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for TFunFilterDaoManualImplTest and is intended
    ///to contain all TFunFilterDaoManualImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class TFunFilterDaoManualImplTest
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
        ///A test for TFunFilterDaoManualImpl Constructor
        ///</summary>
        [TestMethod()]
        public void TFunFilterDaoManualImplContextTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
            TFunFilterDaoManualImpl target = ctx.GetObject("funFilterDaoManual") as TFunFilterDaoManualImpl;

         //string str=   target.FilterTreeHelper.GetJson();
            string str = target.GetTreeData();
         Assert.AreNotEqual(str, "");

           // Assert.AreNotEqual(target, null);
        }

        /// <summary>
        ///A test for GetTreeData
        ///</summary>
        [TestMethod()]
        public void GetTreeDataTest()
        {
            TFunFilterDaoManualImpl target = new TFunFilterDaoManualImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTreeData();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for TFunFilterDaoManualImpl Constructor
        ///</summary>
        [TestMethod()]
        public void TFunFilterDaoManualImplConstructorTest()
        {
            TFunFilterDaoManualImpl target = new TFunFilterDaoManualImpl();
            Assert.Inconclusive("TODO: Implement code to verify target");
        }

        /// <summary>
        ///A test for GetTreeData
        ///</summary>
        [TestMethod()]
        public void GetTreeDataTest1()
        {
            TFunFilterDaoManualImpl target = new TFunFilterDaoManualImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTreeData();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for FilterTreeHelper
        ///</summary>
        [TestMethod()]
        public void FilterTreeHelperTest()
        {
            TFunFilterDaoManualImpl target = new TFunFilterDaoManualImpl(); // TODO: Initialize to an appropriate value
            ITreeHelper<FilterTree> expected = null; // TODO: Initialize to an appropriate value
            ITreeHelper<FilterTree> actual;
            target.FilterTreeHelper = expected;
            actual = target.FilterTreeHelper;
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for TFunFilterDaoManualImpl Constructor
        ///</summary>
        [TestMethod()]
        public void TFunFilterDaoManualImplConstructorTest1()
        {
            TFunFilterDaoManualImpl target = new TFunFilterDaoManualImpl();
            Assert.Inconclusive("TODO: Implement code to verify target");
        }

        /// <summary>
        ///A test for GetTreeData
        ///</summary>
        [TestMethod()]
        public void GetTreeDataTest2()
        {
            TFunFilterDaoManualImpl target = new TFunFilterDaoManualImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetTreeData();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for FilterTreeHelper
        ///</summary>
        [TestMethod()]
        public void FilterTreeHelperTest1()
        {
            TFunFilterDaoManualImpl target = new TFunFilterDaoManualImpl(); // TODO: Initialize to an appropriate value
            ITreeHelper<FilterTree> expected = null; // TODO: Initialize to an appropriate value
            ITreeHelper<FilterTree> actual;
            target.FilterTreeHelper = expected;
            actual = target.FilterTreeHelper;
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
