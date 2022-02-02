const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const { findUserByUsername, insertUser, getUserInfo, updateUserInfo,
    getUserInfoById, resetPassword } = require('../model/user-model')
const { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { formatTime } = require('../utils')
const md5 = require('../utils/md5')

module.exports = {
    // 注册
    register(req, res) {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            const [{ msg }] = result.errors
            res.json({
                code: 400,
                message: msg
            })
        } else {
            let { username, password } = req.body
            password = md5(password)

            findUserByUsername(username).then(data => {
                if (data) {
                    res.json({
                        code: CODE_ERROR,
                        message: '用户已存在',
                        data: null
                    })
                } else {
                    const create_time = formatTime(new Date())

                    insertUser({ username, password, create_time }).then(result => {
                        getUserInfo({ username, password }).then(user => {
                            const { password, ...userInfo } = user
                            const token = jwt.sign(
                                userInfo,
                                PRIVATE_KEY,
                                { expiresIn: JWT_EXPIRED }
                            )

                            res.json({
                                code: CODE_SUCCESS,
                                message: '注册成功',
                                data: token
                            })
                        })
                    }).catch(err => {
                        console.log('%c [ err ]-43', 'font-size:13px; background:pink; color:#bf2c9f;', err)
                        res.json({
                            code: CODE_ERROR,
                            message: '注册失败',
                            data: null
                        })
                    })
                }
            })
        }
    },
    // 登录
    login(req, res) {
        const result = validationResult(req)

        if (!result.isEmpty()) {
            const [{ msg }] = result.errors
            res.json({
                code: 400,
                message: msg
            })
        } else {
            let { username, password } = req.body
            password = md5(password)
            findUserByUsername(username).then(result => {
                if (!result) {
                    res.json({
                        code: CODE_ERROR,
                        message: '账号不存在',
                        data: null
                    })
                } else {
                    getUserInfo({ username, password }).then(user => {
                        if (!user) {
                            res.json({
                                code: CODE_ERROR,
                                message: '密码错误',
                                data: null
                            })
                        } else {
                            const { password, ...userInfo } = user
                            const token = jwt.sign(
                                userInfo,
                                PRIVATE_KEY, // 私钥
                                { expiresIn: JWT_EXPIRED } // 设置过期时间
                            )

                            res.json({
                                code: CODE_SUCCESS,
                                message: '登录成功',
                                data: token
                            })
                        }
                    })
                }
            })
        }
    },
    // 获取用户信息
    getUserInfo(req, res) {
        res.json({
            code: CODE_SUCCESS,
            data: {
                ...req.user,
                create_time: formatTime(req.user.create_time),
                update_time: formatTime(req.user.update_time)
            }
        })
    },
    // 更新用户信息
    updateUserInfo(req, res) {
        const update_time = formatTime(new Date())
        updateUserInfo({ ...req.body, update_time }).then(result => {
            getUserInfoById(req.body.id).then(({ password, ...userInfo}) => {
                const token = jwt.sign(
                    userInfo,
                    PRIVATE_KEY, // 私钥
                    { expiresIn: JWT_EXPIRED } // 设置过期时间
                )
                res.json({
                    code: CODE_SUCCESS,
                    message: '操作成功',
                    data: token
                })
            });
        }).catch(err => {
            res.json({
                code: CODE_ERROR,
                message: '操作失败',
                data: null
            })
        })
    },
    // 重置密码
    resetPassword(req, res) {
        const result = validationResult(req)

        if (!result.isEmpty()) {
            const [{ msg }] = result.errors
            res.json({
                code: 400,
                message: msg
            })
        } else {
            let { username, password, lodPassword } = req.body
            password = md5(password)
            lodPassword = md5(lodPassword)

            findUserByUsername(username).then((result) => {
                if (!result) {
                    res.json({
                        code: CODE_ERROR,
                        message: '账号不存在'
                    })
                } else {
                    getUserInfo({ username, password: lodPassword }).then(user => {
                        if (!user) {
                            res.json({
                                code: CODE_ERROR,
                                message: '密码错误',
                                data: null
                            })
                        } else {
                            resetPassword({ username, password }).then(() => {
                                res.json({
                                    code: CODE_SUCCESS,
                                    msg: '重置密码成功',
                                    data: null
                                })
                            }).catch(() => {
                                res.json({
                                    code: CODE_ERROR,
                                    message: '重置密码失败',
                                    data: null
                                })
                            })
                        }
                    })
                }
            })
        }
    }
}