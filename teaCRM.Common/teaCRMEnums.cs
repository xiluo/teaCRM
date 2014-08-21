namespace teaCRM.Common
{
    public class teaCRMEnums
    {
        /// <summary>
        /// 统一管理操作枚举
        /// </summary>
        public enum ActionEnum
        {
            /// <summary>
            /// 所有
            /// </summary>
            All,

            /// <summary>
            /// 查看
            /// </summary>
            View,

            /// <summary>
            /// 添加
            /// </summary>
            Add,

            /// <summary>
            /// 修改
            /// </summary>
            Edit,

            /// <summary>
            /// 删除
            /// </summary>
            Delete,

            /// <summary>
            /// 回收站
            /// </summary>
            Trash,

            /// <summary>
            /// 还原
            /// </summary>
            Recover,

            /// <summary>
            /// 取消
            /// </summary>
            Cancel,
        }

        /// <summary>
        /// 属性类型枚举
        /// </summary>
        public enum AttributeEnum
        {
            /// <summary>
            /// 输入框
            /// </summary>
            Text,

            /// <summary>
            /// 下拉框
            /// </summary>
            Select,

            /// <summary>
            /// 单选框
            /// </summary>
            Radio,

            /// <summary>
            /// 复选框
            /// </summary>
            CheckBox
        }

        /// <summary>
        /// 用户生成码枚举
        /// </summary>
        public enum CodeEnum
        {
            /// <summary>
            /// 邮箱验证注册
            /// </summary>
            RegVerify,

            /// <summary>
            /// 邀请注册
            /// </summary>
            Register,

            /// <summary>
            /// 取回密码
            /// </summary>
            Password
        }

        /// <summary>
        /// 金额类型枚举
        /// </summary>
        public enum AmountTypeEnum
        {
            /// <summary>
            /// 系统赠送
            /// </summary>
            SysGive,

            /// <summary>
            /// 在线充值
            /// </summary>
            Recharge,

            /// <summary>
            /// 用户消费
            /// </summary>
            Consumption,

            /// <summary>
            /// 购买商品
            /// </summary>
            BuyGoods,

            /// <summary>
            /// 积分兑换
            /// </summary>
            Convert
        }

        /// <summary>
        /// 日志枚举
        /// </summary>
        public enum LogActionEnum
        {
            /// <summary>
            /// 登陆
            /// </summary>
            Login
        }
    }
}