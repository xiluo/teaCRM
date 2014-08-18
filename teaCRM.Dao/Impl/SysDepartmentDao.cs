using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Newtonsoft.Json;
using teaCRM.Dao.TreeHelpers;
using teaCRM.Model;

namespace teaCRM.Dao.Impl
{
    public class SysDepartmentDao : ISysDepartmentDao
    {
        #region 是否存在该记录

        public bool Exists(int id)
        {
            using (teaCRMEntities db = new teaCRMEntities())
            {
                return db.T_sys_department.Any(d => d.id == id);
            }
        }

        #endregion

        #region 查询单个

        public IQueryable GetModel(int id, teaCRMEntities db)
        {
            return db.T_sys_department.Where(d => d.id == id);
        }

        public T_sys_department GetModel(int id)
        {
            using (teaCRMEntities db = new teaCRMEntities())
            {
                return db.T_sys_department.Where(d => d.id == id).FirstOrDefault();
            }
        }

        #endregion

        #region 查询所有部门

        public IQueryable<T_sys_department> GetModelList(teaCRMEntities db)
        {
            return db.T_sys_department;
        }

        public List<T_sys_department> GetModelList()
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