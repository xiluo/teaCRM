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

namespace teaCRM.Dao.Impl
{
    /// <summary>
    /// 自动生成的实现IVAppCompanyDao接口的Dao类。 2014-09-17 06:52:51 By 唐有炜
    /// </summary>
    public class VAppCompanyDaoImpl : IVAppCompanyDao
    {
        #region 读操作

        /// <summary>
        /// 获取数据总数
        /// </summary>
        /// <returns>返回所有数据总数</returns>
        public int GetViewCount()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.VAppCompanies;
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
        public int GetViewCount(Expression<Func<VAppCompany, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.VAppCompanies.Where<VAppCompany>(predicate);
                var sqlText = models.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return models.Count();
            }
        }


        /// <summary>
        /// 获取所有的数据
        /// </summary>
        /// <returns>返回所有数据列表</returns>
        public List<VAppCompany> GetViewList()
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.VAppCompanies;
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
        public List<VAppCompany> GetViewList(Expression<Func<VAppCompany, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var models = db.VAppCompanies.Where<VAppCompany>(predicate);
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
        public VAppCompany GetViewEntity(Expression<Func<VAppCompany, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var model = db.VAppCompanies.Where<VAppCompany>(predicate);
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
        public IQueryable<Object> GetViewFields(string selector, string predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var model = db.VAppCompanies.Where(predicate).Select(selector);
                var sqlText = model.GetProperty("SqlText");
                LogHelper.Debug(sqlText.ToString());
                return (IQueryable<object>) model;
            }
        }


        /// <summary>
        /// 是否存在该记录
        /// </summary>
        /// <returns></returns>
        public bool ExistsViewEntity(Expression<Func<VAppCompany, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                bool status = db.VAppCompanies.Any(predicate);
                return status;
            }
        }


        //查询分页
        public IPagination<VAppCompany> GetViewListByPage(int pageIndex, int pageSize, out int rowCount,
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders,
            Expression<Func<VAppCompany, bool>> predicate)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var roles = db.VAppCompanies.Where(predicate);
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
        public IEnumerable<VAppCompany> GetViewListBySql(string sql, dynamic namedParameters)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                return db.DbHelper.ExecuteDataTable(sql, namedParameters).ToList<VAppCompany>();
            }
        }

        #endregion

        #region 手写的

        /// <summary>
        /// 检测该应用是否安装过
        /// </summary>
        /// <param name="compNum">公司id</param>
        /// <param name="appId">应用id</param>
        /// <param name="appType">应用类型</param>
        /// <returns></returns>
        public bool IsInstalled(string compNum, int appId, int appType)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                var dbType =
                    db.VAppCompanies.Where(a => a.CompNum == compNum && a.AppType == appType).Select(a => a.AppType);
                var SqlText = dbType.GetProperty("SqlText");
                LogHelper.Debug("检测是否安装过：" + SqlText.ToString());
                if (appType == dbType.SingleOrDefault())
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }


        /// <summary>
        ///安装应用
        /// </summary>
        /// <param name="compNum">公司id</param>
        /// <param name="appId">应用id</param>
        /// <returns></returns>
        public bool Install(string compNum, int appId)
        {
            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                if (db.Connection.State != ConnectionState.Open)
                {
                    db.Connection.Open();
                }
                var tran = db.Connection.BeginTransaction();
                try
                {
                    //添加应用映射
                    db.TFunAppCompanies.Insert(new TFunAppCompany()
                    {
                        CompNum = compNum,
                        AppId = appId,
                        AppLastdate = DateTime.Now
                    });
                    //添加模块映射
                    //先查询模块，再循环模块添加映射
                    var myappIds = db.TFunMyapps.Where(m => m.ParentId == appId).Select(m => m.Id).ToList();
                    foreach (var myappId in myappIds)
                    {
                        db.TFunMyappCompanies.Insert(new TFunMyappCompany()
                        {
                            CompNum = compNum,
                            MyappId = myappId
                        });
                    }
                    LogHelper.Debug("安装应用事务执行成功！");
                    tran.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    LogHelper.Error("安装应用事务执行失败：", ex);
                    return false;
                }
                finally
                {
                    if (db.Connection.State != ConnectionState.Closed)
                    {
                        db.Connection.Close();
                    }
                }
            }
        }

        ///  <summary>
        /// 卸载应用
        ///  </summary>
        ///  <param name="compNum">公司id</param>
        ///  <param name="appIds">应用id</param>
        /// <param name="isClear">是否清空数据</param>
        /// <returns></returns>
        public bool UnInstall(string compNum, string appIds, bool isClear)
        {
//            if (isClear)
//            {
//                return false;
//            }
//            else
//            {
//                return true;
//            }


            using (teaCRMDBContext db = new teaCRMDBContext())
            {
                if (db.Connection.State != ConnectionState.Open)
                {
                    db.Connection.Open();
                }
                var tran = db.Connection.BeginTransaction();
                try
                {
                    int[] appIdArray = Utils.StringToIntArray(appIds, ',');
                    foreach (var appId in appIdArray)
                    {
                        //删除应用映射
                        var funAppCompany = db.TFunAppCompanies.SingleOrDefault(a =>a.CompNum==compNum&& a.AppId == appId);
                        db.TFunAppCompanies.Delete(funAppCompany);
                        //删除模块映射
                        var myappIds = db.TFunMyapps.Where(m => m.ParentId == appId).Select(m => m.Id).ToList();
                        foreach (var myappId in myappIds)
                        {
                            var myappCompany =
                                db.TFunMyappCompanies.SingleOrDefault(m => m.CompNum == compNum && m.MyappId == myappId);
                            db.TFunMyappCompanies.Delete(myappCompany);
                        }
                    }
                    LogHelper.Debug("卸载应用事务执行成功！");
                    tran.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    LogHelper.Error("卸载应用事务执行失败：", ex);
                    return false;
                }
                finally
                {
                    if (db.Connection.State != ConnectionState.Closed)
                    {
                        db.Connection.Close();
                    }
                }
            }
        }

        #endregion
    }
}