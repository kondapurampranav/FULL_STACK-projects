const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pranav@34",
    database: "user_management"
})

db.connect((err) => {
    if(err){
        console.log("Connection Error:", err)
    }
    else{
        console.log("MySQL Connected")
    }
})

module.exports = db