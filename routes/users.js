const express = require('express')
const { body } = require('express-validator')

const controller = require('../controllers/users-controller')

const router = express.Router()

const validator = [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空')
        .isLength({ min: 6 }).withMessage('密码不能小于6位')
]

const resetPasswordValidator = [
    body('username').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空')
        .isLength({ min: 6 }).withMessage('密码不能小于6位'),
    body('lodPassword').notEmpty().withMessage('旧密码不能为空')
        .isLength({ min: 6 }).withMessage('旧密码不能小于6位'),
]

router
    .post('/register', validator, controller.register) // 注册
    .post('/login', validator, controller.login) // 登录
    .get('/getUserInfo', controller.getUserInfo) // 获取用户信息
    .post('/updateUserInfo', controller.updateUserInfo) // 修改用户信息
    .post('/resetPassword', resetPasswordValidator, controller.resetPassword) // 重置密码
module.exports = router