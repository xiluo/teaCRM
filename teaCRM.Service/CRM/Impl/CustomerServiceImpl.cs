using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
/*
 * ========================================================================
 * Copyright(c) 2013-2014 郑州优创科技有限公司, All Rights Reserved.
 * ========================================================================
 *  
 * 【当前类文件的功能】
 *  
 *  
 * 作者：[中文姓名]   时间：2014/8/25 9:04:10
 * 文件名：CustomerServiceImpl
 * 版本：V1.0.0
 * 
 * 修改者：唐有炜           时间：2014/8/25 9:04:10               
 * 修改说明：修改说明
 * ========================================================================
*/
using teaCRM.Common;
using teaCRM.Dao;
using teaCRM.Entity;


namespace teaCRM.Service.CRM.Impl
{
    public class CustomerServiceImpl : ICustomerService
    {
        //CustomerServiceImpl注入dao依赖
        public ITFunExpandDao FunExpandDao { set; get; }
        public ITCusBaseDao CusBaseDao { set; get; }
        public ITCusConDao CusConDao { set; get; }
        public ITFunFilterDao FunFilterDao { set; get; }
        public ITFunOperatingDao FunOperatingDao { set; get; }


        #region 筛选器

        #region 获取筛选器树形列表

        /// <summary>
        /// 获取树形节点
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Node> AsyncGetNodes(string compNum, int? id)
        {
            var filters =
                FunFilterDao.GetList(f => f.MyappId == 1 && f.CompNum == compNum && f.ParentId == (id ?? 0))
                    .OrderBy(f => f.FilOrder);
            var nodes = new List<Node>();
            //将filters转换为nodes
            foreach (var filter in filters)
            {
                var node = new Node();
                node.id = filter.Id;
                node.pId = (int) filter.ParentId;
                node.name = filter.FilName;

                bool isHasChild =
                    FunFilterDao.ExistsEntity(f => f.MyappId == 1 && f.ParentId == node.id && f.CompNum == compNum);
                if (isHasChild)
                {
                    node.isParent = true;
                }

                nodes.Add(node);
            }
            return nodes;
        }

        #endregion

        #endregion

        #region 客户

        #region 获取客户信息列表,ligerUI分页处理 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户信息列表 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="selectFields">选择的字段（格式：new string[]{"id,cus_sname"}，id必须要有）</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="strWhere">筛选条件（字段名="值",字段名 in (值1,值2)）</param>
        /// <param name="filedOrder">排序字段（字段名）</param>
        /// <param name="recordCount">总数</param>
        /// <returns>DataTable</returns>
        public DataTable GetCustomerLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder, out int recordCount)
        {
            DataTable table = CusBaseDao.GetCustomerLsit(compNum, selectFields, pageIndex, pageSize, strWhere,
                filedOrder, out recordCount);

            return table;

        }

        #endregion

        #region 获取一条客户信息

        /// <summary>
        /// 获取一条客户信息
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="customerId"></param>
        /// <returns></returns>
        public Dictionary<string,object> GetCustomer(string compNum, int customerId)
        {
            var count = 0;
            var cusTable= CusBaseDao.GetCustomerLsit(compNum, new string[0], 1, 1,
                String.Format("id={0} AND comp_num={1}", customerId, compNum),
                "id", out count);

          return    DataTableHelper.DataTableToListDictory(cusTable).FirstOrDefault();

        }

        #endregion

        #region 获取客户扩展字段信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户扩展字段信息(MyappId==1代表客户扩展字段) 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        public List<TFunExpand> GetCustomerExpandFields(string compNum)
        {
            //MyappId==1代表客户扩展字段
            var customerExpandFields = FunExpandDao.GetList(e => e.CompNum == compNum && e.MyappId == 1);
            if (customerExpandFields.Count > 0)
            {
                LogHelper.Info("客户扩展字段获取成功，共" + customerExpandFields.Count + "个字段。");
            }
            else
            {
                LogHelper.Error("客户扩展字段为空。");
            }
            return customerExpandFields;
        }

        #endregion

        #region 获取客户操作列表

        /// <summary>
        /// 获取客户操作列表 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        public List<TFunOperating> GetCustomerOperating(string compNum)
        {
            return FunOperatingDao.GetList(o => o.CompNum == compNum && o.MyappId == 1);
        }

        #endregion

        #region 更改客户状态 2014-09-05 14:58:50 By 唐有炜

        /// <summary>
        /// 使用where sql语句更改客户状态(只更改主表) 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="strSet">要更新的字段</param>
        /// <param name="strWhere">条件</param>
        /// <returns></returns>
        public bool UpdateCustomerStatusByWhere(string strSet, string strWhere)
        {
            if (String.IsNullOrEmpty(strSet) || String.IsNullOrEmpty(strWhere))
            {
                return false;
            }

            return CusBaseDao.UpdateCustomerStatusByWhere(strSet, strWhere);
        }

        /// <summary>
        /// 使用LINQ更改客户状态（只更改主表） 2014-09-05 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="fields">要更新的字段</param>
        /// <param name="predicate">条件</param>
        /// <returns></returns>
        public bool UpdateCustomerStatusByLINQ(Dictionary<string, object> fields,
            Expression<Func<TCusBase, bool>> predicate)
        {
            if (null == fields || null == predicate)
            {
                return false;
            }
            return CusBaseDao.UpdateCustomerStatusByLINQ(fields, predicate);
        }

        #endregion

        #region 添加客户信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 添加客户信息 2014-08-30 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="cusBase">客户信息</param>
        /// <param name="cusCon">主联系人信息</param>
        /// <returns></returns>
        public bool AddCustomer(TCusBase cusBase, TCusCon cusCon)
        {
            return CusBaseDao.AddCustomer(cusBase, cusCon);
        }

        #endregion

        #endregion

        #region 联系人

        #region 获取联系人信息列表 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取联系人信息列表 2014-09-01 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">企业编号</param>
        /// <param name="selectFields">选择的字段（格式：new string[]{"id,cus_sname"}，id必须要有）</param>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">每页的数目</param>
        /// <param name="strWhere">筛选条件（字段名="值",字段名 in (值1,值2)）</param>
        /// <param name="filedOrder">排序字段（字段名）</param>
        /// <param name="recordCount"></param>
        /// <returns>DataTable</returns>
        public DataTable GetContactLsit(string compNum, string[] selectFields, int pageIndex, int pageSize,
            string strWhere, string filedOrder,out int recordCount)
        {
               DataTable table = CusConDao.GetContactLsit(compNum, selectFields, pageIndex, pageSize, strWhere,
                filedOrder, out recordCount);
            return table;
        }

        #endregion

        #region 获取一条联系人信息

        /// <summary>
        /// 获取一条联系人信息
        /// </summary>
        /// <param name="compNum"></param>
        /// <param name="conId">联系人id</param>
        /// <returns></returns>
        public Dictionary<string, object> GetMainContact(string compNum, int conId)
        {
            var count = 0;
            var conTable = CusConDao.GetContactLsit(compNum, new string[0], 1, 1,
                String.Format("id={0}", conId),
                "id", out count);

            return DataTableHelper.DataTableToListDictory(conTable).FirstOrDefault();

        }


        #region 获取客户联系人扩展字段信息 2014-08-29 14:58:50 By 唐有炜

        /// <summary>
        /// 获取客户联系人扩展字段信息(MyappId==2代表联系人扩展字段) 2014-08-29 14:58:50 By 唐有炜
        /// </summary>
        /// <param name="compNum">公司编号</param>
        /// <returns></returns>
        public List<TFunExpand> GetContactExpandFields(string compNum)
        {
            //MyappId==2代表联系人扩展字段
            var contactExpandFields = FunExpandDao.GetList(e => e.CompNum == compNum && e.MyappId == 2);
            if (contactExpandFields.Count > 0)
            {
                LogHelper.Info("联系人扩展字段获取成功,共" + contactExpandFields.Count + "个字段。");
            }
            else
            {
                LogHelper.Error("联系人扩展字段为空。");
            }
            return contactExpandFields;
        }

        #endregion

        #endregion

        #endregion

        #region 验证

        #region 验证手机号是否存在 2014-09-01 14:58:50 By 唐有炜

        /// <summary>
        /// 验证手机号是否存在 2014-09-01  14:58:50 By 唐有炜
        /// </summary>
        /// <param name="cus_tel">手机号</param>
        /// <returns></returns>
        public bool ValidatePhone(string cus_tel)
        {
            bool IsExist = CusBaseDao.ExistsEntity(b => b.CusTel == cus_tel);
            return !IsExist;
        }

        #endregion

        #endregion
    }
}