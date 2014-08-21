USE [teaCRM]

SET IDENTITY_INSERT [dbo].[T_sys_power] ON
INSERT [dbo].[T_sys_power] ([id], [module], [power_nav], [power_action]) VALUES (1, 1, N'1', N'1')
SET IDENTITY_INSERT [dbo].[T_sys_power] OFF

/****** Object:  Table [dbo].[T_sys_department]    Script Date: 08/21/2014 18:21:47 ******/
SET IDENTITY_INSERT [dbo].[T_sys_department] ON
INSERT [dbo].[T_sys_department] ([id], [parent_id], [dep_name], [dep_num], [dep_respon], [dep_skills], [dep_note]) VALUES (1, 0, N'ºº ı≤ø', 1, N'1', N'1', N'1')
SET IDENTITY_INSERT [dbo].[T_sys_department] OFF

SET IDENTITY_INSERT [dbo].[T_sys_role] ON
INSERT [dbo].[T_sys_role] ([id], [role_name], [role_type], [pow_id], [role_date], [role_issys]) VALUES (1, N'1', 1, 1, N'2014-01-01', 1)
SET IDENTITY_INSERT [dbo].[T_sys_role] OFF