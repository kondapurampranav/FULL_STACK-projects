const mysql = require("mysql2/promise")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Pranav@34",
    database: "user_management"
})

module.exports = db
