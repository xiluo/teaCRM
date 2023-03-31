teaCRM
======

使用Spring .NET、ASP .NET MVC、ELinq作为基本项目架构，同时使用Unit Test单元测试、Glimpse作为性能测试、Log4Net日志记录、MySql作为数据库、T4模板代码自动生成，Bootstrape作为前端框架，适合大型企业多用户、高并发、高性能、基于云平台。

版本信息
-------
>版本: V1.0     
>开发工具：Microsoft Visual Studio 2010、Microsoft Visual Studio 2013      


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
  ` <compilation debug="false" targetFramework="4.0" />
   `     
>5、应用类别的配置在
/Themes/default/base/js/category.js
===================================





  
