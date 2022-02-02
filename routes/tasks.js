const express = require('express')
const controller = require('../controllers/tasks-controller')

const router = express.Router()

router
    .post('/addTask', controller.addTask) // 新增任务清单
    .post('/updateTask', controller.editTask) // 编辑任务清单
    .post('/deleteTask', controller.deleteTask) // 删除任务清单
    .get('/getTasks', controller.getTasks) // 获取任务清单列表

module.exports = router