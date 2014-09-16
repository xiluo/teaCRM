using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Spring.Context.Support;
using teaCRM.Entity;
using teaCRM.Service.Settings;

namespace teaCRM.Web.Controllers.Api.Settings
{
    public class UsersController : ApiController
    {

        //spring 创建service依赖
        private ISysUserService UserService =(ISysUserService) ContextRegistry.GetContext().GetObject("sysUserService");

        #region 用户列表 14-09-15 By 唐有炜

        [HttpPost] // POST /api/settings/users/GetAllUsers
        //compNum 10000
        //current 1
        //rowCount 10
        //sort[UserName]
        //searchPhrase 
        //public string GetAllUsers([FromBody] UserListParameter p)
        public string GetAllUsers([FromBody] string value)
        {
            HttpContextBase context = (HttpContextBase)Request.Properties["MS_HttpContext"]; //获取传统context
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
            IEnumerable<TSysUser> users;

            //排序
            IDictionary<string, teaCRM.Entity.teaCRMEnums.OrderEmum> orders =
                new Dictionary<string, teaCRMEnums.OrderEmum>();

            orders.Add(sortType == "desc"
                ? new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Desc)
                : new KeyValuePair<string, teaCRMEnums.OrderEmum>(sortField, teaCRMEnums.OrderEmum.Asc));


            //搜索制定关键字
            if (!String.IsNullOrEmpty(searchPhrase))
            {
                if (searchPhrase.Contains("dep_id"))
                {
                    int DepId = int.Parse(searchPhrase.Split('=')[1]);
                    users = UserService.GetUserLsit(compNum, current, rowCount, out total, orders,
                        u => u.CompNum == compNum && u.DepId == DepId);
                }
                else
                {
                    users = UserService.GetUserLsit(compNum, current, rowCount, out total, orders,
                r => r.CompNum == compNum && r.UserLname.Contains(searchPhrase));
                }
            
            }
            else//全部
            {
            
                    users = UserService.GetUserLsit(compNum, current, rowCount, out total, orders, u => u.CompNum == compNum);
                
            }
            return JsonConvert.SerializeObject(new
            {
                current = current,
                rowCount = rowCount,
                rows = users,
                total = total
            });
        }

        #endregion

        #region 用户名是否存在 14-09-12 By 唐有炜

        // GET /api/settings/users/existsUser/
        //UserLName terwer
        //compNum 10000
        [HttpGet]
        public bool ExistsUser()
        {
            HttpContextBase context = (HttpContextBase)Request.Properties["MS_HttpContext"]; //获取传统context
            HttpRequestBase request = context.Request; //定义传统request对象
            string UserLName = request.Params.Get("UserLName");
            string compNum = request.Params.Get("compNum");
            return UserService.ExistsUser(UserLName,compNum);
        }

        #endregion


        #region 获取用户 14-09-12 By 唐有炜

        // GET api/settings/users/getUser/1
        //id 1
        public TSysUser GetUser(int id)
        {
//            return UserService.GetUser(id);
            return null;
        }

        #endregion

        #region 添加用户 14-09-15 By 唐有炜

        // POST /api/settings/users/addUser
        [HttpPost]
        public ResponseMessage AddUser([FromBody] TSysUser user)
        {
            ResponseMessage rmsg = new ResponseMessage();
            if (UserService.AddUser(user))
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

        #region 修改用户 14-09-15 By 唐有炜

        //
        // POST api/settings/users/editUser/
        // TSysUser user
        [HttpPost]
        public ResponseMessage EditUser([FromBody] TSysUser user)
        {
            ResponseMessage rmsg = new ResponseMessage();
//            if (UserService.UpdateUser(user))
//            {
//                rmsg.Status = true;
//            }
//            else
//            {
//                rmsg.Status = false;
//            }


            return rmsg;
        }

        #endregion

        #region 删除用户 14-09-15 By 唐有炜

        // GET api/settings/users/deleteUser/5
        [HttpGet]
        public ResponseMessage DeleteUser(int id)
        {
            ResponseMessage rmsg = new ResponseMessage();
//            if (UserService.DeleteUser(id))
//            {
//                rmsg.Status = true;
//            }
//            else
//            {
//                rmsg.Status = false;
//            }
//
//
           return rmsg;
        }

        #endregion
    }
}
