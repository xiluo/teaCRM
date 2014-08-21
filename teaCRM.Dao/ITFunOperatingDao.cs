
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{
public  interface ITFunOperatingDao
    {
	    /// <summary>
        /// 获取所有的数据
	    /// </summary>
	    /// <returns>返回所有数据列表</returns>
         List<TFunOperating> GetList() ;
       
		/// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
         TFunOperating GetEntity(Expression<Func<TFunOperating, bool>> predicate) ;
       
		  /// <summary>
        /// 添加实体
        /// </summary>
        /// <param name="entity">实体对象</param>
         bool InsertEntity(TFunOperating entity);
       
       /// <summary>
        /// 删除实体
        /// </summary>
         /// <param name="predicate">Lamda表达式</param>
         bool DeleteEntity(Expression<Func<TFunOperating , bool>> predicate) ;
      
		
		/// <summary>
        /// 批量删除
        /// </summary>
        /// <param name="list">实体集合</param>
         bool DeletesEntity(List<TFunOperating> list) ;
       

         /// <summary>
        /// 修改实体
        /// </summary>
        /// <param name="entity">实体对象</param>
         bool UpadateEntity(TFunOperating entity);
    


        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
          bool ExistsEntity(Expression<Func<TFunOperating , bool>> predicate);
	 
		 //查询分页
      List<TFunOperating> GetListByPage(int pageIndex, int pageSize, Expression<Func<TFunOperating , bool>> predicate);
	 
	 
	  //以下是原生Sql方法==============================================================
	  //===========================================================================
	  /// <summary>
        /// 用SQL语句查询
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="namedParameters">sql参数</param>
        /// <returns>集合</returns>
         IEnumerable<TFunOperating> GetListBySql(string sql, dynamic namedParameters);
       	
		/// <summary>
	     /// 执行Sql
	     /// </summary>
	     /// <param name="sql">Sql语句</param>
	     /// <param name="namedParameters">查询字符串</param>
	     /// <returns></returns>
		 bool ExecuteSql(string sql, dynamic namedParameters = null);

	   }
	   }
