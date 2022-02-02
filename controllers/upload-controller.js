const fs = require('fs')
const { CODE_ERROR, CODE_SUCCESS } = require('../utils/constant')
const { formatTime, renameFile, mergeChunkFile } = require('../utils')
const constant = require('../utils/constant')
const { fromBuffer } = require('file-type')
const { Readable } = require('stream');

const controllers = {
    upload(req, res) {
        const { filename, size, mimetype } = req.file

        res.json({
            code: CODE_SUCCESS,
            message: 'success',
            data: {
                filename,
                url: `/upload/${filename}`,
                size,
                mimetype
            }
        })
    },
    async uploadByBinary(req, res) {
        try {
            const binaryData = req.binaryData
            // 根据 buffer 获取 文件类型
            const { ext, mime: mimetype } = await fromBuffer(binaryData)
            const filename = `${Date.now()}.${ext}`

            const wt = fs.createWriteStream(`${constant.FILES_DIR}${filename}`)
            Readable.from(binaryData).pipe(wt)

            res.json({
                code: CODE_ERROR,
                message: 'success',
                data: {
                    filename,
                    url: `/upload/${filename}`,
                    size: binaryData.length,
                    mimetype
                }
            })
        } catch(err) {
            res.json({
                code: CODE_ERROR,
                message: '上传失败',
                data: null
            })
        }
    },
    deleteFile(req, res) {
        fs.unlink(constant.FILES_DIR + req.params.filename, (err) => {
            if (err) {
                res.json({
                    code: CODE_ERROR,
                    message: '删除失败',
                    data: null
                })
            } else {
                res.json({
                    code: CODE_SUCCESS,
                    message: '删除成功',
                    data: null
                })
            }
        })
    },
    multipart(req, res) {
        const { type, name, token, index, filename, chunkCount } = req.body;
        if (type === 'merge') {
            mergeChunkFile(filename, constant.FILES_DIR, chunkCount, token)
            res.json({
                code: CODE_SUCCESS,
                message: 'success',
                data: {
                    filename,
                    url: `/upload/${filename}`
                }
            })
        } else if (type === 'upload') {
            renameFile(constant.FILES_DIR, req.files[0]?.filename, `${token}-${index}-${name}-tmp`)
            res.json({
                code: CODE_SUCCESS,
                message: 'success',
                data: null
            })
        }
    }
}

module.exports = controllers