const conn = require('../utils/mysqlConnect')
const { formatTime } = require('../utils')

const taskModel = {
    insertTask(data, callback) {
        const sql = `insert into tasks set ?`
        conn.query(sql, data, callback)
    },
    updateTask(data, callback) {
        const sql = `update tasks set ? where id=${data.id}`
        conn.query(sql, data, callback)
    },
    deleteTask(ids, callback) {
        const sql = `update tasks
                     set status='10'
                         ,update_time='${formatTime(new Date())}'
                     where id in (${ids.join(',')})`
        conn.query(sql, callback)
    },
    getTasks(params, callback) {
        const { limit, page, title, status } = params

        const offset = limit * (page - 1)
        const sql = `select *
                     from tasks
                     where title like '%${title}%'
                           ${ (status || status === '0') ? `and status='${status}'` : '' }
                     order by update_time
                     limit ${offset},${limit}`
        const sql2 = `select count(*) total from tasks`

        conn.query(sql, (err, list) => {
            if (err) return callback(err)
            conn.query(sql2, (err, result) => {
                if (err) return callback(err)
                const [{ total }] = result

                callback(null, {
                    list,
                    total,
                    currentPage: page,
                    totalPage: Math.ceil(total / limit)
                })
            })
        })
    }
}

module.exports = taskModel