
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{

    /// <summary>
    /// 自动生成的实现ITCusExpvalueDao接口的Dao类。 2014-08-20 07:58:50 By 唐有炜
    /// </summary>
 public class TCusExpvalueDaoImpl:ITCusExpvalueDao
    {
	    /// <summary>
        /// 获取所有的数据
	    /// </summary>
	    /// <returns>返回所有数据列表</returns>
        public List<TCusExpvalue> GetList() 
        {
          using (teaCRMDBContext db=new teaCRMDBContext())
            {
             var models= db.TCusExpvalues.ToList();
			 return models;
            }
        }

		/// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
        public TCusExpvalue GetEntity(Expression<Func<TCusExpvalue, bool>> predicate) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                var model =db.TCusExpvalues.Where<TCusExpvalue>(predicate).SingleOrDefault();
                return model;
		    }
        }

		 /// <summary>
        /// 用SQL语句查询
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="namedParameters">sql参数</param>
        /// <returns>集合</returns>
        public IEnumerable<TCusExpvalue> GetListBySql(string sql, dynamic namedParameters)
        {
          using (teaCRMDBContext db=new teaCRMDBContext())
            {
               return db.DbHelper.ExecuteDataTable(sql,namedParameters).ToList<TCusExpvalue>();
            }
          
        }

		  /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool InsertEntity(TCusExpvalue entity)
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
              int rows=  db.TCusExpvalues.Insert(entity);
				 if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
       /// <summary>
        /// 删除实体
        /// </summary>
         /// <param name="predicate">Lamda表达式</param>
        public bool DeleteEntity(Expression<Func<TCusExpvalue , bool>> predicate) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                TCusExpvalue  entity = db.TCusExpvalues.Where(predicate).First();
                int rows=db.TCusExpvalues.Delete(entity);
				 if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
		
		/// <summary>
        /// 批量删除
        /// </summary>
        /// <param name="list">实体集合</param>
        public bool DeletesEntity(List<TCusExpvalue> list) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                var tran = db.Connection.BeginTransaction();
                try
                {
                    foreach (var item in list)
                    {
                        db.TCusExpvalues.Delete(item);
                    }
                    tran.Commit();
					return true;
                }
                catch (Exception ex)
                {
                    tran.Rollback();
					return false;
                    throw new Exception(ex.Message);
                }
            }
        }

         /// <summary>
        /// 修改实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool UpadateEntity(TCusExpvalue entity)
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
               int rows= db.TCusExpvalues.Update(entity);
			   if (rows > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }


        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
       public   bool ExistsEntity(Expression<Func<TCusExpvalue , bool>> predicate)
	   {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
               bool status= db.TCusExpvalues.Any(predicate);
               return status;
            }
        }

		 //查询分页
    public  List<TCusExpvalue> GetListByPage(int pageIndex, int pageSize, Expression<Func<TCusExpvalue , bool>> predicate)
	  {
	   using (teaCRMDBContext db=new teaCRMDBContext())
            {
             var models= db.TCusExpvalues.ToList();
			 return models;
            }
	  }
	   }
	   }
