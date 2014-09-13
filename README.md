teaCRM
======

我开发的灵活、高效、强大的CRM系统。使用Spring .NET、ASP .NET MVC、ELinq作为基本项目架构，同时使用Unit Test单元测试、Glimpse作为性能测试、Log4Net日志记录、MySql作为数据库、T4模板代码自动生成，Bootstrape作为前端框架，适合大型企业多用户、高并发、高性能、基于云平台。

版本信息
-------
>版本: V1.0     
>开发工具：Microsoft Visual Studio 2010、Microsoft Visual Studio 2013      
>作者: Terwer,Huang   
>作者邮箱: cbgtyw@gmail.com   

项目简介
-------
>我开发的灵活、高效、强大的CRM系统。

技术架构
-------
>1、本程序基于Asp .Net 4.0和.NET MVC4，编译版本为VS2010，最低运行版本为.Net 4.0，IIS 6.0+；  
>2、支持多数据库:使用 ELinq、NLite作为ORM框架，详见：http://elinq.codeplex.com/  
>3、项目演示地址：http://crm.ucs123.com     
>4、兼容IE6、7、8+、Firefox、Chrome、Safari

更新历史
=======
2014-09-11~13
----------
>1、角色全部完成   

2014-09-7~10
----------
>1、部门全部完成   

2014-09-06
----------
>1、树形列表更换为ZTree   
>2、添加移动版支持。

2014-09-05
----------
>1、需求薪资麦凯66表格

2014-09-04
----------
>1、分页优化。    

2014-09-02~03
----------
>1、客户添加完成。       
>2、彻底修复验证。

2014-09-01
----------
>1、客户添加完成。

2014-08-30~31
----------
>1、增加客户
>事务处理

2014-08-29
----------
>1、增加客户
>增加客户扩展字段要新建表，并且还有新建外键管理

2014-08-28
----------
>1、增加日志记录模块 
  
2014-08-27
----------
>1、继续客户模块        
>2、完成依赖注入

2014-08-26
----------
>1、继续客户模块        
>2、引入Spring .NET框架，优化系统架构

2014-08-23~25
----------
>1、开始客户模块  
>2、后期树形缓存ZTree

2014-08-22
----------
>1、完成登录。  
>2、数据库采用MySql  

程序发布
=============================
>1、.NET MVC项目Session需要额外配置        
 `
<system.web>  
  <sessionState mode="StateServer" stateConnectionString="tcpip=127.0.0.1:42424" sqlConnectionString="data source=127.0.0.1;Trusted_Connection=yes" cookieless="false" timeout="720" />   
  </system.web>  
 `           
>2、Log4Net发布到IIS后需要对User用户加上写入权限      
>3
注意：生成完毕后，必须执行\teaCRM\teaCRM.Tools\bin\Debug下面的teaCRM.Tools.exe，否则无法使用MVC动态Model，详情：见参考资料11              
====================================================================================================================      
>4、要使用压缩必须修改     
  ` <compilation debug="false" targetFramework="4.0" /> `

参考资料
=======
>1、.NET 版的SSH（ASP.NET MVC+NHibernate+String .NET）    
http://www.cnblogs.com/fly_dragon/archive/2010/09/06/1819422.html    
>2、Common.Logging使用      
http://www.cnblogs.com/guyoung/archive/2011/10/17/2215109.html   
>3、Spring .NET结合.NET MVC  
http://www.cnblogs.com/steven9801/archive/2011/12/11/2283894.html    
>4、Spring.NET学习笔记——目录(原)           
http://www.cnblogs.com/GoodHelper/archive/2009/11/20/SpringNet_Index.html      
>5、Log4Net使用     
http://www.cnblogs.com/kissazi2/p/3389551.html      
http://www.cnblogs.com/24la/p/log4net-simplly-config.html         
>6、开启MySql日志跟踪        
http://www.cnblogs.com/wuyifu/p/3328024.html     
>7、在C#代码中应用Log4Net，将Log4Net正确地封装在自己的类库中并进行调用    
http://www.cnblogs.com/kissazi2/p/3394430.html   
>8、项目架构评析    
http://www.cnblogs.com/legendxian/archive/2012/06/18/2553111.html#!comments    
>9、sql多个值拼接成一行字符串    
http://blog.163.com/zhi_qingfang%40126/blog/static/11747756320132693434495/        
(select stuff((select ','+user_tname from t_sys_user WHERE id IN (17,21) for xml path ('')),1,1,''))       
>10、jquery validate错误    
http://stackoverflow.com/questions/14896205/validator-validator-methodsmethod-is-undefined  
>11、动态LINQ解决查询   
http://weblogs.asp.net/scottgu/dynamic-linq-part-1-using-the-linq-dynamic-query-library   
>12、Mono.Cecil 解决视图动态Model     
http://blog.zhaojie.me/2011/09/aspnet-mvc-dynamic-model-mono-cecil.html     
>13、LinqKit    
http://www.albahari.com/nutshell/linqkit.aspx   






  
