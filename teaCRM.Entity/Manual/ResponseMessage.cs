namespace teaCRM.Entity
{
    /// <summary>
    /// 返回结果封装类 2014-09-05 14:58:50 By 唐有炜
    /// </summary>
    public class ResponseMessage
    {
        /// <summary>
        /// 操作类型(teaCRMEnums.ActionEnum的字符串形式)
        /// </summary>
        public string Action { get; set; }

        /// <summary>
        /// 返回状态
        /// </summary>
        public bool Status { get; set; }

        /// <summary>
        /// 返回结果
        /// </summary>
        public string Result { get; set; }

        /// <summary>
        /// 自定义提示信息
        /// </summary>
        public string Msg { get; set; }
    }
}