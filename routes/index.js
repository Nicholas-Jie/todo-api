const express = require('express')

const userRouter = require('./users')
const taskRouter = require('./tasks')
const uploadRouter = require('./upload')
const { jwtAuth } = require('../utils/user-jwt')

const router = express.Router()

router.use(jwtAuth); // 注入认证模块
router.use('/api', userRouter) // 注入用户路由模块
router.use('/api', taskRouter) // 注入任务清单路由模块
router.use('/api', uploadRouter) // 注入上传文件路由模块

// 自定义统一异常处理中间件
router.use((err, req, res, next) => {
    console.log('%c [ err ]-14', 'font-size:13px; background:pink; color:#bf2c9f;', err)

    // 自定义用户认证失败的错误返回
    if (err && err.name === 'UnauthorizedError') {
        // 抛出401异常
        res.status(err.status).json({
            code: err.status,
            message: 'token失效，请重新登录',
            data: null
        })
    } else {
        const code = err.status || err.code
        const message = err.message
        res.status(code).json({ code, message })
    }

})

module.exports = router