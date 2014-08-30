
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace  teaCRM.Dao.Impl
{

    /// <summary>
    /// 自动生成的实现ITCusConDao接口的Dao类。 2014-08-28 05:06:48 By 唐有炜
    /// </summary>
 public class TCusConDaoImpl:ITCusConDao
    {
	    /// <summary>
        /// 获取所有的数据
	    /// </summary>
	    /// <returns>返回所有数据列表</returns>
        public List<TCusCon> GetList() 
        {
          using (teaCRMDBContext db=new teaCRMDBContext())
            {
             var models= db.TCusCons.ToList();
			 return models;
            }
        }


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据列表</returns>
        public List<TCusCon> GetList(Expression<Func<TCusCon, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.TCusCons.Where<TCusCon>(predicate).ToList();
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
        public TCusCon GetEntity(Expression<Func<TCusCon, bool>> predicate) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                var model =db.TCusCons.Where<TCusCon>(predicate).SingleOrDefault();
                return model;
		    }
        }

		
		  /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool InsertEntity(TCusCon entity)
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
              int rows=  db.TCusCons.Insert(entity);
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
        public bool DeleteEntity(Expression<Func<TCusCon , bool>> predicate) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                TCusCon  entity = db.TCusCons.Where(predicate).First();
                int rows=db.TCusCons.Delete(entity);
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
        public bool DeletesEntity(List<TCusCon> list) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                //var tran = db.Connection.BeginTransaction();
                try
                {
                    foreach (var item in list)
                    {
                        db.TCusCons.Delete(item);
                    }
                    //tran.Commit();
					return true;
                }
                catch (Exception ex)
                {
                    //tran.Rollback();
					return false;
                    throw new Exception(ex.Message);
                }
            }
        }

         /// <summary>
        /// 修改实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool UpadateEntity(TCusCon entity)
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
               int rows= db.TCusCons.Update(entity);
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
       public   bool ExistsEntity(Expression<Func<TCusCon , bool>> predicate)
	   {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
               bool status= db.TCusCons.Any(predicate);
               return status;
            }
        }

		 //查询分页
    public  List<TCusCon> GetListByPage(int pageIndex, int pageSize, Expression<Func<TCusCon , bool>> predicate)
	  {
	   using (teaCRMDBContext db=new teaCRMDBContext())
            {
             var models= db.TCusCons.ToList();
			 return models;
            }
	  }


	  

	  //以下是原生Sql方法==============================================================
	  //===========================================================================
	   /// <summary>
        /// 用SQL语句查询
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="namedParameters">sql参数</param>
        /// <returns>集合</returns>
        public IEnumerable<TCusCon> GetListBySql(string sql, dynamic namedParameters)
        {
          using (teaCRMDBContext db=new teaCRMDBContext())
            {
               return db.DbHelper.ExecuteDataTable(sql,namedParameters).ToList<TCusCon>();
            }
          
        }
		
		/// <summary>
	     /// 执行Sql
	     /// </summary>
	     /// <param name="sql">Sql语句</param>
	     /// <param name="namedParameters">查询字符串</param>
	     /// <returns></returns>
		public bool ExecuteSql(string sql, dynamic namedParameters = null)
		{
	         using (teaCRMDBContext db = new teaCRMDBContext())
	         {
	             var rows = db.DbHelper.ExecuteNonQuery(sql, namedParameters);
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




	   }
	   }
