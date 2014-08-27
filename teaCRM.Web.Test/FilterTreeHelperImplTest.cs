using Spring.Context;
using Spring.Context.Support;
using teaCRM.Dao.Impl;
using teaCRM.Dao.Manual.Impl;
using teaCRM.Dao.Manual.TreeHelpers.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Entity;
using System.Collections.Generic;
using teaCRM.Dao.Manual;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for FilterTreeHelperImplTest and is intended
    ///to contain all FilterTreeHelperImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class FilterTreeHelperImplTest
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
        ///A test for FilterTreeHelperImpl Constructor
        ///</summary>
        [TestMethod()]
        public void FilterTreeHelperImplContextTest()
        {
            IApplicationContext ctx = ContextRegistry.GetContext();
           FilterTreeHelperImpl target = ctx.GetObject("filterTreeHelper") as FilterTreeHelperImpl;

            string str = target.GetJson();
            Assert.AreNotEqual(str, "");

//            TFunFilterDaoImpl target = ctx.GetObject("funFilterDao") as TFunFilterDaoImpl;
//
//            int c = target.GetList().Count;
//            Assert.AreEqual(c, 1);

           // Assert.AreNotEqual(target, null);
        }

        /// <summary>
        ///A test for GetChild
        ///</summary>
        [TestMethod()]
        public void GetChildTest()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            int id = 0; // TODO: Initialize to an appropriate value
            IList<FilterTree> expected = null; // TODO: Initialize to an appropriate value
            IList<FilterTree> actual;
            actual = target.GetChild(id);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetJson
        ///</summary>
        [TestMethod()]
        public void GetJsonTest()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetJson();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetJsonByModel
        ///</summary>
        [TestMethod()]
        public void GetJsonByModelTest()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            FilterTree tree = null; // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetJsonByModel(tree);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for IsHaveChild
        ///</summary>
        [TestMethod()]
        public void IsHaveChildTest()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            int id = 0; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.IsHaveChild(id);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for ReturnParentTree
        ///</summary>
        [TestMethod()]
        public void ReturnParentTreeTest()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            IList<FilterTree> expected = null; // TODO: Initialize to an appropriate value
            IList<FilterTree> actual;
            actual = target.ReturnParentTree();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for FilterTreeHelperImpl Constructor
        ///</summary>
        [TestMethod()]
        public void FilterTreeHelperImplConstructorTest1()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl();
            Assert.Inconclusive("TODO: Implement code to verify target");
        }

        /// <summary>
        ///A test for GetChild
        ///</summary>
        [TestMethod()]
        public void GetChildTest1()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            int id = 0; // TODO: Initialize to an appropriate value
            IList<FilterTree> expected = null; // TODO: Initialize to an appropriate value
            IList<FilterTree> actual;
            actual = target.GetChild(id);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetJson
        ///</summary>
        [TestMethod()]
        public void GetJsonTest1()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetJson();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetJsonByModel
        ///</summary>
        [TestMethod()]
        public void GetJsonByModelTest1()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            FilterTree tree = null; // TODO: Initialize to an appropriate value
            string expected = string.Empty; // TODO: Initialize to an appropriate value
            string actual;
            actual = target.GetJsonByModel(tree);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for IsHaveChild
        ///</summary>
        [TestMethod()]
        public void IsHaveChildTest1()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            int id = 0; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.IsHaveChild(id);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for ReturnParentTree
        ///</summary>
        [TestMethod()]
        public void ReturnParentTreeTest1()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            IList<FilterTree> expected = null; // TODO: Initialize to an appropriate value
            IList<FilterTree> actual;
            actual = target.ReturnParentTree();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for FunFilterDaoManual
        ///</summary>
        [TestMethod()]
        public void FunFilterDaoManualTest()
        {
            FilterTreeHelperImpl target = new FilterTreeHelperImpl(); // TODO: Initialize to an appropriate value
            ITFunFilterDaoManual expected = null; // TODO: Initialize to an appropriate value
            ITFunFilterDaoManual actual;
            target.FunFilterDao = expected;
            actual = null;
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
