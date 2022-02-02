/**
 *
 * @api {Post} /api/register 注册
 * @apiName register
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 *
 * @apiBody {String} username 用户名
 * @apiBody {String} password 密码
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     code: 0,
 *     message: '注册成功'
 *     data: token
 * }
 *
 */


/**
 *
 * @api {Post} /api/login 登录
 * @apiName login
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 *
 * @apiBody {String} username 用户名
 * @apiBody {String} password 密码
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     code: 0,
 *     message: '登录成功'
 *     data: token
 * }
 *
 */


/**
 *
 * @api {Get} /api/getUserInfo 获取用户信息
 * @apiName getUserInfo
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization Bearer [token]
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     code: 0,
 *     data: {
 *         id: 1,
 *         username: 'Jack',
 *         nickname: '法外狂徒'
 *     }
 * }
 *
 */


/**
 *
 * @api {Post} /api/updateUserInfo 修改用户信息
 * @apiName updateUserInfo
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization Bearer [token]
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     code: 0,
 *     message: '操作成功'
 *     data: token
 * }
 *
 */


/**
 *
 * @api {Post} /api/resetPassword 重置密码
 * @apiName resetPassword
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 *
 * @apiBody {String} username 账号
 * @apiBody {String} lodPassword 旧密码
 * @apiBody {String} password 新密码
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     code: 0,
 *     message: '重置密码成功',
 *     data: null
 * }
 *
 */