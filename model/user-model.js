const conn = require('../utils/mysqlConnect')

module.exports = {
    findUserByUsername(username) {
        const sql = `select username from sys_user where username='${username}'`
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res[0])
                }
            })
        })
    },
    insertUser(user) {
        const sql = `insert into sys_user set ?`
        return new Promise((resolve, reject) => {
            conn.query(sql, user, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },
    getUserInfo({ username, password }) {
        const sql = `select * from sys_user where username='${username}' and password='${password}'`
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res[0])
                }
            })
        })
    },
    updateUserInfo(userInfo) {
        const sql = `update sys_user set ? where id=${userInfo.id}`
        return new Promise((resolve, reject) => {
            conn.query(sql, userInfo, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },
    getUserInfoById(id) {
        const sql = `select * from sys_user where id=${id}`
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res[0])
                }
            })
        })
    },
    resetPassword({ password, username }) {
        const sql = `update sys_user set password='${password}' where username='${username}'`
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res[0])
                }
            })
        })
    }
}