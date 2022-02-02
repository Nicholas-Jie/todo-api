/**
 *
 * @api {Post} /api/upload 文件上传
 * @apiName upload
 * @apiGroup Upload
 * @apiVersion  1.0.0
 *
 * @apiHeader {string} Content-Type multipart/form-data
 *
 * @apiBody {binary} file 文件流
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "code": 0,
 *     "message": "success",
 *     "data": {
 *         "filename": "7b9226408ee0cca9d23fb6f306e64851_t-1643721730746.gif",
 *         "url": "/upload/7b9226408ee0cca9d23fb6f306e64851_t-1643721730746.gif",
 *         "size": 13253,
 *         "mimetype": "image/gif"
 *     }
 * }
 *
 */


/**
 *
 * @api {Post} /api/upload/binary 文件上传（二进制）
 * @apiName uploadByBinary
 * @apiGroup Upload
 * @apiVersion  1.0.0
 *
 * @apiBody {binary} file 二进制流
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "code": 0,
 *     "message": "success",
 *     "data": {
 *         "filename": "1643721730746.gif",
 *         "url": "/upload/1643721730746.gif",
 *         "size": 13253,
 *         "mimetype": "image/jpg"
 *     }
 * }
 *
 */


/**
 *
 * @api {Post} /api/upload/deleteFile/:filename 删除文件
 * @apiName deleteFile
 * @apiGroup Upload
 * @apiVersion  1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "code": 0,
 *     "message": "删除成功",
 *     "data": null
 * }
 *
 */


/**
 *
 * @api {Post} /api/upload/multipart 分片上传
 * @apiName multipart
 * @apiGroup Upload
 * @apiVersion  1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "code": 0,
 *     "message": "success",
 *     "data": {
 *         filename: 'xxx.jpg',
 *         url: '/upload/xxx.jpg'
 *     }
 * }
 *
 */
