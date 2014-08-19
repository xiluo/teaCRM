using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Newtonsoft.Json;
using NLite.Collections;
using teaCRM.Dao.TreeHelpers;
using teaCRM.Model;

namespace teaCRM.Dao.Impl
{
    public class SysDepartmentDao : ISysDepartmentDao
    {
        #region 是否存在该记录

        public bool Exists(int id)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                return db.TSysDepartments.Exists();
            }
        }

        #endregion

        #region 查询单个

//        public IQueryable GetModel(int id, teaCRMEntities db)
//        {
//            return db.T_sys_department.Where(d => d.id == id);
//        }

        public TSysDepartment GetModel(int id)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                return db.TSysDepartments.FirstOrDefault(d => d.Id == id);
            }
        }

        #endregion

        #region 查询所有部门

        public IQueryable<TSysDepartment> GetModelList(teaCRMDBContext db)
        {
            return db.TSysDepartments;
        }

        public List<TSysDepartment> GetModelList()
        {
            throw new NotImplementedException();
        }

        #endregion

        #region 获取树形数据

        public string GetTreeData()
        {
            return DepartmentTreeHelper.GetJson();
        }

        #endregion
    }
}