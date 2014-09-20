
using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using NLite.Reflection;
using teaCRM.Common;
using teaCRM.DBContext;
using teaCRM.Entity;
using System.Linq.Dynamic;

namespace  teaCRM.Dao.Impl
{

    /// <summary>
    /// 自动生成的实现ITFunAppDao接口的Dao类。 2014-09-21 07:42:44 By 唐有炜
    /// </summary>
 public class TFunAppDaoImpl:ITFunAppDao
    {

	  #region 读操作


	   /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <returns>返回所有数据总数</returns>
        public int GetCount() 
        {
          using (teaCRMDBContext db=new teaCRMDBContext())
            {
             var models= db.TFunApps;
			 var sqlText = models.GetProperty("SqlText");
             LogHelper.Debug(sqlText.ToString());
			 return models.Count();
            }
        }

		
             /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据总数</returns>
       public int GetCount(Expression<Func<TFunApp, bool>> predicate)
        {
             using (teaCRMDBContext db=new teaCRMDBContext())
            {
             var models= db.TFunApps.Where<TFunApp>(predicate);
			 var sqlText = models.GetProperty("SqlText");
             LogHelper.Debug(sqlText.ToString());
			 return models.Count();
            }
        }




	    /// <summary>
        /// 获取所有的数据
	    /// </summary>
	    /// <returns>返回所有数据列表</returns>
        public List<TFunApp> GetList() 
        {
          using (teaCRMDBContext db=new teaCRMDBContext())
            {
             var models= db.TFunApps;
			  var sqlText = models.GetProperty("SqlText");
             LogHelper.Debug(sqlText.ToString());
			 return models.ToList();
            }
        }

		
        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>返回所有数据列表</returns>
       public List<TFunApp> GetList(Expression<Func<TFunApp, bool>> predicate)
        {
             using (teaCRMDBContext db=new teaCRMDBContext())
            {
             var models= db.TFunApps.Where<TFunApp>(predicate);
			   var sqlText = models.GetProperty("SqlText");
             LogHelper.Debug(sqlText.ToString());
			 return models.ToList();
            }
        }

		/// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
        public TFunApp GetEntity(Expression<Func<TFunApp, bool>> predicate) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                var model =db.TFunApps.Where<TFunApp>(predicate);
			    var sqlText = model.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return model.SingleOrDefault();
		    }
        }

		
		
        /// <summary>
        /// 根据条件查询某些字段(LINQ 动态查询)
        /// </summary>
        /// <param name="selector">要查询的字段（格式：new(ID,Name)）</param>
        /// <param name="predicate">筛选条件（id=0）</param>
        /// <returns></returns>
        public IQueryable<Object> GetFields(string selector, string predicate)
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                var model = db.TFunApps.Where(predicate).Select(selector);
                var sqlText = model.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return (IQueryable<object>) model;
            }
        }


		   /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
       public   bool ExistsEntity(Expression<Func<TFunApp , bool>> predicate)
	   {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
               bool status= db.TFunApps.Any(predicate);
               return status;
            }
        }

		

		
	   //查询分页
        public IPagination<TFunApp> GetListByPage(int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<TFunApp, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var roles = db.TFunApps.Where(predicate);
                rowCount = roles.Count();
                var prevCount = (pageIndex - 1)*pageSize;
                var models = roles
                    .Skip(prevCount)
                    .Take(pageSize);
                foreach (var order in orders)
                {
                    models = models.OrderBy(String.Format("{0} {1}", order.Key, order.Value));
                }
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug("ELINQ Paging:<br/>" + sqlText.ToString());
                return models.ToPagination(pageSize, pageSize, rowCount);
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
        public IEnumerable<TFunApp> GetListBySql(string sql, dynamic namedParameters)
        {
          using (teaCRMDBContext db=new teaCRMDBContext())
            {
               return db.DbHelper.ExecuteDataTable(sql,namedParameters).ToList<TFunApp>();
            }
          
        }
  #endregion


   #region 写操作
		  /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
        public bool InsertEntity(TFunApp entity)
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
              int rows=  db.TFunApps.Insert(entity);
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
        public bool DeleteEntity(Expression<Func<TFunApp , bool>> predicate) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                TFunApp  entity = db.TFunApps.Where(predicate).First();
                int rows=db.TFunApps.Delete(entity);
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
        public bool DeletesEntity(List<TFunApp> list) 
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
                //var tran = db.Connection.BeginTransaction();
                try
                {
                    foreach (var item in list)
                    {
                        db.TFunApps.Delete(item);
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
        public bool UpadateEntity(TFunApp entity)
        {
            using (teaCRMDBContext db=new teaCRMDBContext())
            {
               int rows= db.TFunApps.Update(entity);
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

		  #endregion


	   }
	   }
