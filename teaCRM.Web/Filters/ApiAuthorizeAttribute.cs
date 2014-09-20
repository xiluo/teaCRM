using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace teaCRM.Web.Filters
{
    /// <summary>
    ///Api授权过滤器 2014-09-21 14:58:50 By 唐有炜
    /// </summary>
    public class ApiAuthorizeAttribute : FilterAttribute, IAuthorizationFilter
    {
        public Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext,
            CancellationToken cancellationToken,
            Func<Task<HttpResponseMessage>> continuation)
        {
            return null;
        }
    }
}