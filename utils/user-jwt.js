const jwt = require('jsonwebtoken'); // 引入验证jsonwebtoken模块
const expressJwt = require('express-jwt'); // 引入express-jwt模块
const { PRIVATE_KEY } = require('./constant'); // 引入自定义的jwt密钥

// 验证token是否过期
const jwtAuth = expressJwt({
    secret: PRIVATE_KEY, // 设置密钥
    algorithms: ['HS256'], // 设置算法
    credentialsRequired: true, // 设置为true表示校验，false表示不校验
}).unless({
    // 设置jwt认证白名单
    path: [
        '/',
        '/api/login',
        '/api/register',
        '/api/resetPassword',
        '/api/upload/multipart',
    ]
})

// jwt-token解析
function decodeJwt(req) {
    const token = req.get('Authorization')
    return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
    jwtAuth,
    decodeJwt
}