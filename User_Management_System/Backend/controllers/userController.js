const db = require("../config/db")

exports.getAllUsers = async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM users")
    console.log({rows})
}

exports.addUser = (req, res) => {
    const {name, email, role} = req.body
    console.log(req.body)
    users.push({
        name: name,
        email: email,
        role: role
    })
    res.json({message: "Data added"})
}