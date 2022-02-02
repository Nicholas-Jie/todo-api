const { CODE_ERROR, CODE_SUCCESS } = require('../utils/constant')
const { formatTime } = require('../utils')
const { insertTask, updateTask, deleteTask, getTasks } = require('../model/task-model')

const controller = {
    addTask(req, res) {
        const user_id = req.user.id
        const create_time = formatTime(new Date())

        insertTask({ ...req.body, user_id, create_time }, (err, result) => {
            if (err) {
                res.json({
                    code: CODE_ERROR,
                    message: '新增失败',
                    data: null
                })
            } else {
                res.json({
                    code: CODE_SUCCESS,
                    message: '新增成功',
                    data: null
                })
            }
        })
    },
    editTask(req, res) {
        updateTask({ ...req.body, update_time: formatTime(new Date()) }, (err) => {
            if (err) {
                res.json({
                    code: CODE_ERROR,
                    message: '操作失败',
                    data: null
                })
            } else {
                res.json({
                    code: CODE_SUCCESS,
                    message: '操作成功',
                    data: null
                })
            }
        })
    },
    deleteTask(req, res) {
        deleteTask(req.body, (err) => {
            if (err) {
                res.json({
                    code: CODE_ERROR,
                    message: '操作失败',
                    data: null
                })
            } else {
                res.json({
                    code: CODE_SUCCESS,
                    message: '操作成功',
                    data: null
                })
            }
        })
    },
    getTasks(req, res) {
        const { limit = 10, page = 1, title, status } = req.query
        const params = { limit, page, title, status }

        getTasks(params, (err, { list, ...data }) => {
            if (err) {
                res.json({
                    code: CODE_ERROR,
                    message: '查询失败',
                    data: null
                })
            } else {
                list.forEach(item => {
                    if (item.deadline) item.deadline = formatTime(item.deadline)
                    if (item.create_time) item.create_time = formatTime(item.create_time)
                    if (item.update_time) item.update_time = formatTime(item.update_time)
                })
                res.json({
                    code: CODE_SUCCESS,
                    message: 'success',
                    data: {
                        list,
                        ...data
                    }
                })
            }
        })
    }
}

module.exports = controller