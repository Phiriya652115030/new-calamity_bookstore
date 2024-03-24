let mysql = require('mysql2')
let db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Tun-48449",
    database: "data-book"
})

db.connect(error => {
    if(!!error) {
        console.log(error);
    } else {
        console.log('DB Connected..')
    }
})

module.exports = db;