using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Spring.Context;
using Spring.Context.Support;
using teaCRM.Entity;
using teaCRM.Service.Settings;


namespace teaCRM.Web.Controllers.Api.Settings
{
    public class RoleController : ApiController
    {
        //spring 创建service依赖
        private ISysRoleService RoleService =
            ContextRegistry.GetContext().GetObject("sysRoleService") as ISysRoleService;

        #region 角色列表 14-09-11 By 唐有炜

        [HttpPost] // POST /api/settings/role/GetAllRoles
        //compNum 10000
        //current 1
        //rowCount 10
        //sort[RoleName]
        //searchPhrase 
        //public string GetAllRoles([FromBody] RoleListParameter p)
        public string GetAllRoles([FromBody] string value)
        {
            HttpContextBase context = (HttpContextBase) Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string compNum = request.Params.Get("compNum");
            int current = int.Parse(request.Params.Get("current"));
            int rowCount = int.Parse(request.Params.Get("rowCount"));
            string sort = request.Params.AllKeys.SingleOrDefault(a => a.Contains("sort"));
            //string sortName = sort.Split('[')[0];
            string sortField = sort.Split('[')[1].TrimEnd(']');
            string sortType = request.Params.GetValues(sort).SingleOrDefault();
            string searchPhrase = request.Params.Get("searchPhrase");

            var total = 0;
            IEnumerable<TSysRole> roles;

            //排序
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders =
                new Dictionary<string, teaCRMEnums.OrderEmum>();

            orders.Add(sortType == "desc"
                ? new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Desc)
                : new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Asc));


            //搜索
            if (!String.IsNullOrEmpty(searchPhrase))
            {
                roles = RoleService.GetRoleLsit(compNum, current, rowCount, out total, orders,
                    r =>r.CompNum==compNum&& r.RoleName.Contains(searchPhrase));
            }
            else
            {
                roles = RoleService.GetRoleLsit(compNum, current, rowCount, out total, orders, r => r.CompNum == compNum);
            }

            return JsonConvert.SerializeObject(new
            {
                current = current,
                rowCount = rowCount,
                rows = roles,
                total = total
            });
        }

        #endregion

        #region 获取角色 14-09-12 By 唐有炜

        // GET /api/settings/role/getRole/1
        //id 1
        public TSysRole GetRole(int id)
        {
            return RoleService.GetRole(id);
        }

        #endregion

        #region 添加角色 14-09-11 By 唐有炜

        // POST //api/settings/role/addRole
        [HttpPost]
        public ResponseMessage AddRole([FromBody] TSysRole role)
        {
            ResponseMessage rmsg = new ResponseMessage();
            if (RoleService.AddRole(role))
            {
                rmsg.Status = true;
            }
            else
            {
                rmsg.Status = false;
            }


            return rmsg;
        }

        #endregion

        #region 修改角色 14-09-11 By 唐有炜

        //
        // POST /api/settings/role/editRole/
        // TSysRole role
        [HttpPost]
        public ResponseMessage EditRole([FromBody] TSysRole role)
        {
            ResponseMessage rmsg = new ResponseMessage();
            if (RoleService.UpdateRole(role))
            {
                rmsg.Status = true;
            }
            else
            {
                rmsg.Status = false;
            }


            return rmsg;
        }

        #endregion

        #region 删除角色 14-09-11 By 唐有炜

        // GET /api/settings/role/deleteRole/5
        [HttpGet]
        public ResponseMessage DeleteRole(int id)
        {
            ResponseMessage rmsg = new ResponseMessage();
            if (RoleService.DeleteRole(id))
            {
                rmsg.Status = true;
            }
            else
            {
                rmsg.Status = false;
            }


            return rmsg;
        }

        #endregion
    }
}