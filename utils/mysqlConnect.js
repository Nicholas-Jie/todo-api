const e = require('express')
const mysql = require('mysql')

const config = require('../db/dbConfig')

const connection = mysql.createConnection({ ...config })

module.exports = connection