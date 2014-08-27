--客户视图
SELECT * FROM t_cus_base AS cb INNER JOIN teacrm.t_cus_expvalue_10000 AS ce ON cb.id=ce.cus_id;

--插入客户主表
INSERT  INTO `t_cus_base`(`cus_no`,`comp_num`,`cus_name`,`cus_sname`,`cus_lastid`,`cus_tel`,`cus_city`,`cus_address`,`cus_note`,`con_id`,`user_id`,`con_team`,`con_is_pub`,`con_back`) VALUES ('1',NULL,'ccc','郑州优创科技软件有限公司',NULL,'13893882883','河南省郑州市','西三环建设路南300米路西(西湖东岸)1号楼3单元3楼东户','1',1,1,NULL,1,1);

--插入客户扩展包

insert  into `t_cus_expvalue_10000`(`cus_id`,`exp_is_marry`,`exp_evaluate`,`exp_nation`,`exp_email`,`exp_age`) values (1,'1',NULL,'中国','cyutyw@126.com',1);