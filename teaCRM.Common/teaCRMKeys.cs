namespace teaCRM.Common
{
    public class teaCRMKeys
    {
        //系统版本
        /// <summary>
        /// 版本号全称
        /// </summary>
        public const string ASSEMBLY_VERSION = "1.0.0";
        /// <summary>
        /// 版本年号
        /// </summary>
        public const string ASSEMBLY_YEAR = "2014";
        //File======================================================
        /// <summary>
        /// 插件配制文件名
        /// </summary>
        public const string FILE_PLUGIN_XML_CONFING = "plugin.config";
        /// <summary>
        /// 站点配置文件名
        /// </summary>
        public const string FILE_SITE_XML_CONFING = "Configpath";
        /// <summary>
        /// URL配置文件名
        /// </summary>
        public const string FILE_URL_XML_CONFING = "Urlspath";
        /// <summary>
        /// 用户配置文件名
        /// </summary>
        public const string FILE_USER_XML_CONFING = "Userpath";
        /// <summary>
        /// 升级代码
        /// </summary>
        public const string FILE_URL_UPGRADE_CODE = "267C2643EE401DD2F0A06084F7931C4DEC76E7CAA1996481FE8F5081A8936409058D07A6F5E2941C";
        /// <summary>
        /// 消息代码
        /// </summary>
        public const string FILE_URL_NOTICE_CODE = "267C2643EE401DD2F0A06084F7931C4DEC76E7CAA1996481FE8F5081A8936409D037BEA6A623A0A1";

        //Directory==================================================
        /// <summary>
        /// 主题目录
        /// </summary>
        public const string DIRECTORY_THEMES = "Themes";
       
        //Cache======================================================
        /// <summary>
        /// 站点配置
        /// </summary>
        public const string CACHE_SITE_CONFIG = "teacrm_cache_site_config";
        /// <summary>
        /// 用户配置
        /// </summary>
        public const string CACHE_USER_CONFIG = "teacrm_cache_user_config";
        /// <summary>
        /// 客户端站点配置
        /// </summary>
        public const string CACHE_SITE_CONFIG_CLIENT = "teacrm_cache_site_client_config";
      
        /// <summary>
        /// 升级通知
        /// </summary>
        public const string CACHE_OFFICIAL_UPGRADE = "teacrm_official_upgrade";
        /// <summary>
        /// 官方消息
        /// </summary>
        public const string CACHE_OFFICIAL_NOTICE = "teacrm_official_notice";

        //Session=====================================================
           /// <summary>
        /// 企业会员用户
        /// </summary>
        public const string SESSION_USER_COMPANY_INFO_ID = "teacrm_session_user_company_info_id";
        
        //Cookies=====================================================
        public const string COOKIE_REMEMBER_USER_COMPANY_REMEMBER = "remember";
        /// <summary>
        /// 记住企业会员用户名
        /// </summary>
        public const string COOKIE_USER_COMPANY_NAME_REMEMBER = "userName";
        /// <summary>
        /// 记住企业会员密码
        /// </summary>
        public const string COOKIE_USER_COMPANY_PWD_REMEMBER = "userPassword";
    }
}
