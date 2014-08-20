using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using teaCRM.Model;

namespace teaCRM.Dao
{
    public interface ISysDepartmentDao
    {
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        bool Exists(int id);
//      // 添加
//      bool Add(T_sys_department sysDepartment);
//      //修改
//      bool Update(T_sys_department sysDepartment);
//      //删除
//      bool Delete(int id);
        /// <summary>
        /// 查询所有
        /// </summary>
        /// <param name="db">数据库操作上下文</param>
        /// <returns></returns>
        //IQueryable<TSysDepartment> GetModelList(teaCRMDBContext db);
        //List<TSysDepartment> GetModelList(); 
        //查询单个
        //IQueryable GetModel(int id, teaCRMEntities db);
        TSysDepartment GetModel(int id);
//      //查询分页
//      List<T_cus_base> QueryByPage(int pageIndex, int pageSize, IQueryable<T_sys_department> queryWhere);
        //查询树形结果
        //string GetTreeData();
    }
}