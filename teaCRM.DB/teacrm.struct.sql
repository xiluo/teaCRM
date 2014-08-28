/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.6.17 : Database - teacrm
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`teacrm` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `teacrm`;

/*Table structure for table `t_con_expvalue` */

DROP TABLE IF EXISTS `t_con_expvalue`;

CREATE TABLE `t_con_expvalue` (
  `con_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '?????????',
  `exp_g_leibie` varchar(100) DEFAULT NULL COMMENT '?????',
  PRIMARY KEY (`con_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n  ??????????\r\n\r\n ?????????????????????????';

/*Table structure for table `t_cus_base` */

DROP TABLE IF EXISTS `t_cus_base`;

CREATE TABLE `t_cus_base` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '?????????',
  `cus_no` varchar(40) CHARACTER SET utf8 NOT NULL COMMENT '???????????',
  `comp_num` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `cus_name` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '???? ??/????',
  `cus_sname` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '???????',
  `cus_lastid` int(11) DEFAULT NULL COMMENT '?????????',
  `cus_tel` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '?????????',
  `cus_city` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '??????',
  `cus_address` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '??????',
  `cus_note` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '????',
  `con_id` int(11) NOT NULL COMMENT '??????',
  `user_id` int(11) NOT NULL COMMENT '?????',
  `con_team` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '???????',
  `con_is_pub` int(11) NOT NULL COMMENT '0 ? 1? ??????',
  `con_back` int(11) NOT NULL COMMENT '?????????0 ? 1?',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COMMENT='\r\n ??????????\r\n\r\n ???? id ?????????????????';

/*Table structure for table `t_cus_con` */

DROP TABLE IF EXISTS `t_cus_con`;

CREATE TABLE `t_cus_con` (
  `id` int(11) NOT NULL COMMENT '??id',
  `cus_id` int(11) NOT NULL COMMENT '???????id',
  `con_name` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '?????',
  `con_tel` varchar(50) DEFAULT NULL COMMENT '???????',
  `con_qq` varchar(40) DEFAULT NULL COMMENT 'QQ?',
  `con_email` varchar(100) DEFAULT NULL COMMENT '???????',
  `con_bir` datetime DEFAULT NULL COMMENT '????????',
  `con_note` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '????',
  `con_is_main` int(11) NOT NULL COMMENT '0? 1?',
  `user_id` int(11) NOT NULL COMMENT '???id',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_5` (`cus_id`),
  CONSTRAINT `FK_Reference_5` FOREIGN KEY (`cus_id`) REFERENCES `t_cus_base` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT=' \r\n ???????????????????';

/*Table structure for table `t_cus_expvalue_10000` */

DROP TABLE IF EXISTS `t_cus_expvalue_10000`;

CREATE TABLE `t_cus_expvalue_10000` (
  `cus_id` int(11) NOT NULL COMMENT '?????????',
  `exp_is_marry` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '?????',
  `exp_evaluate` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `exp_nation` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `exp_email` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `exp_age` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n  ?????????\r\n\r\n ????????????????????????';

/*Table structure for table `t_cus_expvalue_99999` */

DROP TABLE IF EXISTS `t_cus_expvalue_99999`;

CREATE TABLE `t_cus_expvalue_99999` (
  `cus_id` int(11) NOT NULL COMMENT '?????????',
  `exp_url` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '?????',
  `exp_nimabi` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `exp_sex` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `exp_attach` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `exp_addtime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n  ?????????\r\n\r\n ????????????????????????';

/*Table structure for table `t_cus_log` */

DROP TABLE IF EXISTS `t_cus_log`;

CREATE TABLE `t_cus_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '????id',
  `cus_id` int(11) NOT NULL COMMENT '??????',
  `cus_type` varchar(50) NOT NULL COMMENT '1. ???? 2.???? 3??????????',
  `cus_info` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '??/??/??/??/?????',
  `user_id` int(11) DEFAULT NULL COMMENT '?????',
  `cus_addtime` datetime NOT NULL COMMENT '??????',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='\r\n ?????????????????????????????????';

/*Table structure for table `t_fun_app` */

DROP TABLE IF EXISTS `t_fun_app`;

CREATE TABLE `t_fun_app` (
  `id` int(11) NOT NULL COMMENT '???????',
  `app_name` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '?????',
  `app_author` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '????????',
  `app_adddate` datetime DEFAULT NULL COMMENT '??????',
  `app_imgurl` varchar(200) NOT NULL COMMENT '?????????',
  `app_ver` float NOT NULL COMMENT '???????',
  `app_link` varchar(200) NOT NULL COMMENT '???????',
  `app_high` float NOT NULL COMMENT '???????',
  `app_upnote` varchar(300) CHARACTER SET utf8 DEFAULT NULL COMMENT '??????',
  `app_lastdate` datetime DEFAULT NULL COMMENT '????????',
  `app_ind` int(11) NOT NULL COMMENT '?????',
  `app_is_hot` int(11) NOT NULL DEFAULT '0' COMMENT '0 ?? 1??',
  `app_is_red` int(11) NOT NULL DEFAULT '0' COMMENT '0 ?? 1??',
  `app_is_my` int(11) NOT NULL DEFAULT '0' COMMENT '0 ??? 1 ???',
  `app_is_sys` int(11) NOT NULL DEFAULT '0' COMMENT '0 ?? 1??',
  `app_price` float NOT NULL DEFAULT '0' COMMENT '????',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='???????';

/*Table structure for table `t_fun_expand` */

DROP TABLE IF EXISTS `t_fun_expand`;

CREATE TABLE `t_fun_expand` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '????id?',
  `myapp_id` int(11) NOT NULL COMMENT '???????????',
  `comp_num` varchar(20) DEFAULT NULL,
  `exp_name` varchar(50) NOT NULL COMMENT '??????????',
  `exp_title` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '??????title',
  `exp_ctype` varchar(50) NOT NULL COMMENT '1 ?? 2 ??? 3 ?? 4 ?? 5??? 6??? 7??? 8 ?? 9?? 10?? ',
  `exp_dtype` varchar(50) NOT NULL COMMENT '????? varchar char?',
  `exp_length` int(11) DEFAULT NULL COMMENT '??????',
  `exp_place` char(20) DEFAULT '0' COMMENT '?????',
  `exp_option` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '????? ??? ?|?,',
  `exp_default` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '???',
  `exp_is_null` int(11) NOT NULL COMMENT '????? ',
  `exp_is_pw` int(11) NOT NULL COMMENT '??????',
  `exp_is_html` int(11) NOT NULL COMMENT '????html??',
  `exp_etype` int(11) DEFAULT NULL COMMENT '0 ??? 1???',
  `exp_tipmsg` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '????????',
  `exp_errmsg` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '???????',
  `exp_pattern` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '???????',
  `exp_sortid` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '?????',
  `exp_css` varchar(100) DEFAULT NULL COMMENT '??????',
  `exp_is_sys` int(11) NOT NULL COMMENT '?????????0? 1?',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_7` (`myapp_id`),
  CONSTRAINT `FK_Reference_7` FOREIGN KEY (`myapp_id`) REFERENCES `t_fun_myapp` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COMMENT='???????';

/*Table structure for table `t_fun_filters` */

DROP TABLE IF EXISTS `t_fun_filters`;

CREATE TABLE `t_fun_filters` (
  `id` int(11) NOT NULL COMMENT '?????????',
  `parent_id` int(11) DEFAULT NULL,
  `comp_num` varchar(20) DEFAULT NULL,
  `fil_name` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '???????',
  `myapp_id` int(11) NOT NULL COMMENT '????',
  `fil_where` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'sql where????',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_9` (`myapp_id`),
  CONSTRAINT `FK_Reference_9` FOREIGN KEY (`myapp_id`) REFERENCES `t_fun_myapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='?????? ';

/*Table structure for table `t_fun_myapp` */

DROP TABLE IF EXISTS `t_fun_myapp`;

CREATE TABLE `t_fun_myapp` (
  `id` int(11) NOT NULL COMMENT '???????????',
  `parent_id` int(11) NOT NULL COMMENT '??????????',
  `myapp_name` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '??????? ????',
  `myapp_link` varchar(100) DEFAULT NULL COMMENT '????????????',
  `myapp_note` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '???????',
  `myapp_action` varchar(100) DEFAULT NULL COMMENT '?????????',
  `myapp_date` varchar(200) NOT NULL COMMENT '????????????????',
  `myapp_is_nav` int(11) NOT NULL COMMENT '???????? 0?? 1?',
  `myapp_is_sys` int(11) NOT NULL COMMENT '0 ?? 1? ??????????',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='???????';

/*Table structure for table `t_fun_operating` */

DROP TABLE IF EXISTS `t_fun_operating`;

CREATE TABLE `t_fun_operating` (
  `id` int(11) NOT NULL COMMENT '????id',
  `myapp_id` int(11) NOT NULL COMMENT '??????????',
  `myapp_name` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '??????',
  `ope_action` varchar(100) NOT NULL COMMENT '?????? add edit list show?',
  `ope_is_sys` int(11) NOT NULL COMMENT '????????? 0??',
  `ope_is_status` int(11) NOT NULL COMMENT '??????   0 ??',
  `ope_is_fast` int(11) NOT NULL COMMENT '?????????? 0????',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_6` (`myapp_id`),
  CONSTRAINT `FK_Reference_6` FOREIGN KEY (`myapp_id`) REFERENCES `t_fun_myapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='???????';

/*Table structure for table `t_fun_tags` */

DROP TABLE IF EXISTS `t_fun_tags`;

CREATE TABLE `t_fun_tags` (
  `id` int(11) NOT NULL COMMENT '?????',
  `myapp_id` int(11) NOT NULL COMMENT '??????',
  `tag_name` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '????',
  `tag_value` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '???',
  `tag_color` varchar(30) NOT NULL COMMENT '??????',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_8` (`myapp_id`),
  CONSTRAINT `FK_Reference_8` FOREIGN KEY (`myapp_id`) REFERENCES `t_fun_myapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='???????';

/*Table structure for table `t_sys_company` */

DROP TABLE IF EXISTS `t_sys_company`;

CREATE TABLE `t_sys_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '??id',
  `comp_num` varchar(20) NOT NULL,
  `comp_tname` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`,`comp_num`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COMMENT='??????????????';

/*Table structure for table `t_sys_department` */

DROP TABLE IF EXISTS `t_sys_department`;

CREATE TABLE `t_sys_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '????id',
  `parent_id` int(11) NOT NULL COMMENT '????id',
  `comp_num` varchar(20) DEFAULT NULL,
  `dep_name` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '??????',
  `dep_num` int(11) DEFAULT NULL COMMENT '????',
  `dep_respon` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '200????????',
  `dep_skills` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '200????????',
  `dep_note` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '????????',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT=' \r\n ??????\r\n\r\n ??? ????';

/*Table structure for table `t_sys_log` */

DROP TABLE IF EXISTS `t_sys_log`;

CREATE TABLE `t_sys_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '????id',
  `user_id` int(11) NOT NULL COMMENT '????id',
  `user_lname` varchar(40) NOT NULL COMMENT '?????',
  `log_action` varchar(50) NOT NULL COMMENT '????(?? ?? ??)???',
  `log_remark` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '?? ?? ?? ???????',
  `log_ip` varchar(50) DEFAULT NULL COMMENT '??ip????',
  `log_place` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `log_time` datetime DEFAULT NULL COMMENT '????????',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=latin1 COMMENT=' \r\n ????????\r\n\r\n ??ip ???? ???? ?????';

/*Table structure for table `t_sys_power` */

DROP TABLE IF EXISTS `t_sys_power`;

CREATE TABLE `t_sys_power` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '??id??',
  `module` int(11) NOT NULL COMMENT '????id',
  `power_nav` varchar(200) NOT NULL COMMENT '????????',
  `power_action` varchar(100) NOT NULL COMMENT '?? ?? ?? ?? ?????',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COMMENT=' \r\n ??????????????????????????  \r\n\r\n ???show ';

/*Table structure for table `t_sys_role` */

DROP TABLE IF EXISTS `t_sys_role`;

CREATE TABLE `t_sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '??id??',
  `role_name` varchar(30) CHARACTER SET utf8 NOT NULL COMMENT '???? ?????',
  `role_type` int(11) NOT NULL COMMENT '0 ????? 1?????',
  `pow_id` int(11) NOT NULL COMMENT '????id',
  `role_date` varchar(200) NOT NULL COMMENT '?1,2,? ??? ????/?? ????',
  `role_issys` int(11) NOT NULL COMMENT '0 ?? 1???? ?????????',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_1` (`pow_id`),
  CONSTRAINT `FK_Reference_1` FOREIGN KEY (`pow_id`) REFERENCES `t_sys_power` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COMMENT='???????????\r\n\r\n???????????\r\n\r\n1. ??????\r\n';

/*Table structure for table `t_sys_user` */

DROP TABLE IF EXISTS `t_sys_user`;

CREATE TABLE `t_sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '???????(??)',
  `comp_num` varchar(20) DEFAULT NULL,
  `user_lname` varchar(20) NOT NULL COMMENT '?????',
  `user_password` varchar(100) NOT NULL COMMENT '????',
  `user_tname` varchar(20) CHARACTER SET utf8 DEFAULT NULL COMMENT '????',
  `user_sex` int(11) NOT NULL DEFAULT '0' COMMENT '???0 ? 1 ? 2 ??',
  `user_phone` varchar(20) DEFAULT NULL COMMENT '?????',
  `user_email` varchar(50) DEFAULT NULL COMMENT '????',
  `user_tel` varchar(20) DEFAULT NULL COMMENT '????',
  `user_qq` varchar(20) DEFAULT NULL COMMENT 'QQ??',
  `dep_id` int(11) NOT NULL COMMENT '?????(1?2)',
  `user_position` varchar(30) CHARACTER SET utf8 DEFAULT NULL COMMENT '???????',
  `user_jobstatus` int(11) DEFAULT '1' COMMENT '1?? 2?? 3?? 4??',
  `role_id` int(11) NOT NULL COMMENT '????? ',
  `user_enable` int(11) NOT NULL DEFAULT '1' COMMENT '0 ?? 1?? ',
  PRIMARY KEY (`id`),
  KEY `AK_Key_2` (`comp_num`),
  KEY `FK_Reference_3` (`role_id`),
  KEY `FK_Reference_4` (`dep_id`),
  CONSTRAINT `FK_Reference_3` FOREIGN KEY (`role_id`) REFERENCES `t_sys_role` (`id`),
  CONSTRAINT `FK_Reference_4` FOREIGN KEY (`dep_id`) REFERENCES `t_sys_department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1 COMMENT='??????\r\n\r\n?????????????????????';

/*Table structure for table `v_company_user` */

DROP TABLE IF EXISTS `v_company_user`;

/*!50001 DROP VIEW IF EXISTS `v_company_user` */;
/*!50001 DROP TABLE IF EXISTS `v_company_user` */;

/*!50001 CREATE TABLE  `v_company_user`(
 `user_id` int(11) NOT NULL  default '0' ,
 `comp_id` int(11) NOT NULL  default '0' ,
 `comp_num` varchar(20) NOT NULL ,
 `user_lname` varchar(20) NOT NULL ,
 `user_password` varchar(100) NOT NULL ,
 `user_tname` varchar(20) NULL ,
 `comp_tname` varchar(30) NULL ,
 `user_sex` int(11) NOT NULL  default '0' ,
 `user_phone` varchar(20) NULL ,
 `user_email` varchar(50) NULL ,
 `user_tel` varchar(20) NULL ,
 `user_qq` varchar(20) NULL ,
 `dep_id` int(11) NOT NULL ,
 `user_position` varchar(30) NULL ,
 `user_jobstatus` int(11) NULL  default '1' ,
 `role_id` int(11) NOT NULL ,
 `user_enable` int(11) NOT NULL  default '1' 
)*/;

/*View structure for view v_company_user */

/*!50001 DROP TABLE IF EXISTS `v_company_user` */;
/*!50001 DROP VIEW IF EXISTS `v_company_user` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_company_user` AS (select `t_sys_user`.`id` AS `user_id`,`t_sys_company`.`id` AS `comp_id`,`t_sys_company`.`comp_num` AS `comp_num`,`t_sys_user`.`user_lname` AS `user_lname`,`t_sys_user`.`user_password` AS `user_password`,`t_sys_user`.`user_tname` AS `user_tname`,`t_sys_company`.`comp_tname` AS `comp_tname`,`t_sys_user`.`user_sex` AS `user_sex`,`t_sys_user`.`user_phone` AS `user_phone`,`t_sys_user`.`user_email` AS `user_email`,`t_sys_user`.`user_tel` AS `user_tel`,`t_sys_user`.`user_qq` AS `user_qq`,`t_sys_user`.`dep_id` AS `dep_id`,`t_sys_user`.`user_position` AS `user_position`,`t_sys_user`.`user_jobstatus` AS `user_jobstatus`,`t_sys_user`.`role_id` AS `role_id`,`t_sys_user`.`user_enable` AS `user_enable` from (`t_sys_company` join `t_sys_user` on((`t_sys_company`.`comp_num` = `t_sys_user`.`comp_num`)))) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
