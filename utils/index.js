const path = require('path')
const fs = require('fs')

const formatTime = date => {
    date = date instanceof Date ? date : new Date(date)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

//文件重命名
const renameFile = (dir, oldName, newName) => {
    const oldPath = path.resolve(dir, oldName)
    const newPath = path.resolve(dir, newName)
    fs.renameSync(oldPath, newPath)
}

/**
 * 合并分片文件
 * @param {String} filename 生成文件的文件名
 * @param {String} chunkPath 缓存文件路径
 * @param {String} chunkCount 缓存文件数量
 * @param {String} fileToken 文件token
 * @param {String} dataPath 可选，生成文件的绝对路径
 */
const mergeChunkFile = (filename, chunkPath, chunkCount, fileToken, dataPath = chunkPath) => {
    if (!fs.existsSync(chunkPath)) return

    const targetPath = path.join(dataPath, filename)
    const writeStream = fs.createWriteStream(targetPath)
    let mergeChunkCount = 0

    return mergeCore()

    function mergeCore() {
        if (mergeChunkCount >= chunkCount) return // 结束标志为已合并数量大于总数（mergeChunkCount从0开始）

        const curChunkPath = path.resolve(chunkPath, `${fileToken}-${mergeChunkCount}-${filename}-tmp`)
        const curChunkReadStream = fs.createReadStream(curChunkPath)
        curChunkReadStream.pipe(writeStream, { end: false }) //end = false 则可以连续给writeStream 写数据
        curChunkReadStream.on('end', () => {
            fs.unlinkSync(curChunkPath) // 删除合并的chunk文件
            mergeChunkCount += 1
            mergeCore()
        })
    }
}

module.exports = {
    formatTime,
    renameFile,
    mergeChunkFile
}