## 前言
NodeJS基于`Node + Express + Mysql`实现restful API，[参考项目](https://github.com/jackchen0120/todo-nodejs-api)

已完成接口:
> user
- 登录
- 注册
- 重置密码
- 获取用户信息
- 修改用户信息
> todo task
- 新增任务清单
- 编辑任务清单
- 删除任务清单
- 获取任务清单列表
> upload
- 文件上传（form-data）
- 文件上传（binary）
- 文件上传（分片上传）
- 删除文件

## Project setup
```bash
npm install
```

## init mysql data
```mysql
-------------------------------------
-- workspaceFolder：本地工作目录的绝对路径
-------------------------------------
source ${workspaceFolder}/db/init.sql
```

## Project start
```bash
npm start
```

## Project APIDoc build
```bash
npm run apidoc or npm run autoBuildDoc
```
打包后查看api文档：http://localhost:8888/doc

