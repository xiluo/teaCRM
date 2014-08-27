using Spring.Context;
using Spring.Context.Support;
using teaCRM.Dao.Manual.TreeHelpers.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Entity;
using System.Collections.Generic;
using teaCRM.Service.CRM.Impl;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for DepartmentTreeHelperImplTest and is intended
    ///to contain all DepartmentTreeHelperImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class DepartmentTreeHelperImplTest
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
        ///A test for DepartmentTreeHelperImpl Constructor
        ///</summary>
        [TestMethod()]
        public void DepartmentTreeHelperImplContextTest()
        {
           
            IApplicationContext ctx = ContextRegistry.GetContext();
            DepartmentTreeHelperImpl target = ctx.GetObject("departmentTreeHelper") as DepartmentTreeHelperImpl;

            Assert.AreNotEqual(target,null);

        }

        /// <summary>
        ///A test for GetChild
        ///</summary>
        [TestMethod()]
        public void GetChildTest()
        {
            DepartmentTreeHelperImpl target = new DepartmentTreeHelperImpl(); // TODO: Initialize to an appropriate value
            int id = 0; // TODO: Initialize to an appropriate value
            IList<DepartmentTree> expected = null; // TODO: Initialize to an appropriate value
            IList<DepartmentTree> actual;
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
            DepartmentTreeHelperImpl target = new DepartmentTreeHelperImpl(); // TODO: Initialize to an appropriate value
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
            DepartmentTreeHelperImpl target = new DepartmentTreeHelperImpl(); // TODO: Initialize to an appropriate value
            DepartmentTree tree = null; // TODO: Initialize to an appropriate value
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
            DepartmentTreeHelperImpl target = new DepartmentTreeHelperImpl(); // TODO: Initialize to an appropriate value
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
            DepartmentTreeHelperImpl target = new DepartmentTreeHelperImpl(); // TODO: Initialize to an appropriate value
            IList<DepartmentTree> expected = null; // TODO: Initialize to an appropriate value
            IList<DepartmentTree> actual;
            actual = target.ReturnParentTree();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
