const express = require('express')
const multer = require('multer')
const path = require('path')

const controller = require('../controllers/upload-controller')
const constant = require('../utils/constant')

const router = express.Router()
// 存储上传文件的目录
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, constant.FILES_DIR)
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname)
        const fileName = path.basename(file.originalname, extname); // 获取没有后缀的文件名
        cb(null, fileName + '-' + Date.now() + extname)
    }
})

const multerInstance = multer({ storage })

router
    .post('/upload', multerInstance.single('file'), controller.upload) // 上传文件（formData）
    .post('/upload/binary', controller.uploadByBinary) // 上传文件（二进制）
    .post('/upload/deleteFile/:filename', controller.deleteFile) // 删除文件
    .post('/upload/multipart', multerInstance.any(), controller.multipart)

module.exports = router