/**
 *
 * @api {Post} /api/addTask 新增任务清单
 * @apiName addTask
 * @apiGroup Task
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader {String} Authorization Bearer [token]
 *
 * @apiBody {String} title 清单标题
 * @apiBody {String} content 清单内容
 * @apiBody {String} deadline 截止日期
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     code: 0,
 *     message: '新增成功'
 *     data: null
 * }
 *
 */


/**
 *
 * @api {Post} /api/editTask 编辑任务清单
 * @apiName editTask
 * @apiGroup Task
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader {String} Authorization Bearer [token]
 *
 * @apiBody {String} id 清单id
 * @apiBody {String} title 清单标题
 * @apiBody {String} content 清单内容
 * @apiBody {String} deadline 截止日期
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     code: 0,
 *     message: '操作成功'
 *     data: null
 * }
 *
 */


/**
 *
 * @api {Post} /api/deleteTask 删除任务清单
 * @apiName deleteTask
 * @apiGroup Task
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} Authorization Bearer [token]
 *
 * @apiBody {Array} ids id列表
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     code: 0,
 *     message: '操作成功'
 *     data: null
 * }
 *
 */


/**
 *
 * @api {Get} /api/getTasks 查询任务清单列表
 * @apiName getTasks
 * @apiGroup Task
 * @apiVersion  1.0.0
 *
 * @apiHeader {String} Authorization Bearer [token]
 *
 * @apiParam {String} limit 每页条数
 * @apiParam {String} page 页码
 * @apiParam {String} title 清单标题
 * @apiParam {String} status 清单状态: 0:待办 1:完成 2: 延期 10:删除
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "code": 0,
 *     "message": "success",
 *     "data": {
 *         "list": [
 *             {
 *                 "id": 3,
 *                 "title": "任务清单01",
 *                 "content": "任务清单内容...",
 *                 "status": "10",
 *                 "deadline": "2022-10-01 00:00:00",
 *                 "user_id": 20,
 *                 "create_time": "2022-02-01 15:18:21",
 *                 "update_time": "2022-02-01 16:12:14"
 *             }
 *         ],
 *         "total": 4,
 *         "currentPage": "1",
 *         "totalPage": 1
 *     }
 * }
 *
 */