---------------------------------------------------------
-- create database todo_db and set charset utf8
---------------------------------------------------------
DROP DATABASE IF EXISTS todo_db;
CREATE DATABASE IF NOT EXISTS todo_db CHARACTER SET utf8;

---------------------------------------------------------
-- use database
---------------------------------------------------------
USE todo_db;

---------------------------------------------------------
-- create sys_user table
---------------------------------------------------------
CREATE TABLE `sys_user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `username` varchar(50) NOT NULL DEFAULT '' COMMENT '用户账号',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT '用户密码',
  `nickname` varchar(50) DEFAULT '' COMMENT '昵称',
  `avator` varchar(50) DEFAULT '' COMMENT '用户头像',
  `address` varchar(50) DEFAULT '' COMMENT '用户地址',
  `sex` varchar(20) DEFAULT '' COMMENT '性别: u:未知, m:男, w:女',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COMMENT='用户表';


---------------------------------------------------------
-- create tasks table
---------------------------------------------------------
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `title` varchar(256) DEFAULT '' COMMENT '清单标题',
  `content` varchar(512) DEFAULT '' COMMENT '清单内容',
  `status` varchar(20) DEFAULT '0' COMMENT '清单状态: 0:待办 1:完成 2: 延期 10:删除',
  `deadline` datetime DEFAULT NULL COMMENT '截至日期',
  `user_id` bigint DEFAULT NULL COMMENT '用户id',
  `create_time` datetime DEFAULT NULL COMMENT '创建日期',
  `update_time` datetime DEFAULT NULL COMMENT '更新日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COMMENT='任务清单表'