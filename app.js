const express = require('express')
const chalk = require('chalk')
const bodyParser = require('body-parser')
// const { Buffer } = require('buffer')
const cors = require('cors');

const routes = require('./routes')

const app = express()

app.use(cors()) // 处理跨域问题
app.use(bodyParser.json()) // 解析json格式数据
app.use(bodyParser.urlencoded({ extended: true })) // 解析form表单提交的数据application/x-www-form-urlencoded

// handle binary file data
// 这里会和 multer 冲突，通过 /upload/binary 上传时放开
// app.use(function(req, res, next) {
//     let data = Buffer.from([]);
//     req.on('data', function(chunk) {
//         data = Buffer.concat([data, chunk]);
//    })
//    req.on('end', function() {
//        req.binaryData = data;
//        next();
//    });
// })

app.use(express.static('public'))

app.use('/', routes) // 注册路由

app.listen(8888, () => {
    console.log(chalk.yellow('服务启动成功 http://localhost:8888'));
})