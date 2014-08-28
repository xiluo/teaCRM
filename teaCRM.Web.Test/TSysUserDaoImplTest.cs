using teaCRM.Dao.Impl;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using teaCRM.Entity;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace teaCRM.Web.Test
{
    
    
    /// <summary>
    ///This is a test class for TSysUserDaoImplTest and is intended
    ///to contain all TSysUserDaoImplTest Unit Tests
    ///</summary>
    [TestClass()]
    public class TSysUserDaoImplTest
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
        ///A test for GetList
        ///</summary>
        [TestMethod()]
        public void GetListTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            List<TSysUser> expected = null; // TODO: Initialize to an appropriate value
            List<TSysUser> actual;
            actual = target.GetList();
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for TSysUserDaoImpl Constructor
        ///</summary>
        [TestMethod()]
        public void TSysUserDaoImplConstructorTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl();
            Assert.Inconclusive("TODO: Implement code to verify target");
        }

        /// <summary>
        ///A test for DeleteEntity
        ///</summary>
        [TestMethod()]
        public void DeleteEntityTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            Expression<Func<TSysUser, bool>> predicate = null; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.DeleteEntity(predicate);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for DeletesEntity
        ///</summary>
        [TestMethod()]
        public void DeletesEntityTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            List<TSysUser> list = null; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.DeletesEntity(list);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for ExecuteSql
        ///</summary>
        [TestMethod()]
        public void ExecuteSqlTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            string sql = string.Empty; // TODO: Initialize to an appropriate value
            object namedParameters = null; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.ExecuteSql(sql, namedParameters);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for ExistsEntity
        ///</summary>
        [TestMethod()]
        public void ExistsEntityTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            Expression<Func<TSysUser, bool>> predicate = null; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.ExistsEntity(predicate);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetEntity
        ///</summary>
        [TestMethod()]
        public void GetEntityTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            Expression<Func<TSysUser, bool>> predicate = null; // TODO: Initialize to an appropriate value
            TSysUser expected = null; // TODO: Initialize to an appropriate value
            TSysUser actual;
            actual = target.GetEntity(predicate);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetListByPage
        ///</summary>
        [TestMethod()]
        public void GetListByPageTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            int pageIndex = 0; // TODO: Initialize to an appropriate value
            int pageSize = 0; // TODO: Initialize to an appropriate value
            Expression<Func<TSysUser, bool>> predicate = null; // TODO: Initialize to an appropriate value
            List<TSysUser> expected = null; // TODO: Initialize to an appropriate value
            List<TSysUser> actual;
            actual = target.GetListByPage(pageIndex, pageSize, predicate);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for GetListBySql
        ///</summary>
        [TestMethod()]
        public void GetListBySqlTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            string sql = string.Empty; // TODO: Initialize to an appropriate value
            object namedParameters = null; // TODO: Initialize to an appropriate value
            IEnumerable<TSysUser> expected = null; // TODO: Initialize to an appropriate value
            IEnumerable<TSysUser> actual;
            actual = target.GetListBySql(sql, namedParameters);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for InsertEntity
        ///</summary>
        [TestMethod()]
        public void InsertEntityTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            TSysUser entity = null; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.InsertEntity(entity);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }

        /// <summary>
        ///A test for UpadateEntity
        ///</summary>
        [TestMethod()]
        public void UpadateEntityTest()
        {
            TSysUserDaoImpl target = new TSysUserDaoImpl(); // TODO: Initialize to an appropriate value
            TSysUser entity = null; // TODO: Initialize to an appropriate value
            bool expected = false; // TODO: Initialize to an appropriate value
            bool actual;
            actual = target.UpadateEntity(entity);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("Verify the correctness of this test method.");
        }
    }
}
