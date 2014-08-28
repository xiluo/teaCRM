

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using NLite.Data;
using teaCRM.DBContext;
using teaCRM.Entity;

namespace teaCRM.Dao
{
public  interface IVCompanyUserDao
    {
	    /// <summary>
        /// 获取所有的数据
	    /// </summary>
	    /// <returns>返回所有数据列表</returns>
         List<VCompanyUser> GetList() ;
       
		/// <summary>
        /// 获取指定的单个实体
        /// 如果不存在则返回null
        /// 如果存在多个则抛异常
        /// </summary>
        /// <param name="predicate">Lamda表达式</param>
        /// <returns>Entity</returns>
         VCompanyUser GetEntity(Expression<Func<VCompanyUser, bool>> predicate) ;
       
		
		
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
          bool ExistsEntity(Expression<Func<VCompanyUser , bool>> predicate);
	 
		 //查询分页
      List<VCompanyUser> GetListByPage(int pageIndex, int pageSize, Expression<Func<VCompanyUser , bool>> predicate);
	 
	 
	  //以下是原生Sql方法==============================================================
	  //===========================================================================
	  /// <summary>
        /// 用SQL语句查询
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="namedParameters">sql参数</param>
        /// <returns>集合</returns>
         IEnumerable<VCompanyUser> GetListBySql(string sql, dynamic namedParameters);

	   }
	   }
