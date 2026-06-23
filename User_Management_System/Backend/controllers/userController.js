const db = require("../config/db")

exports.getUserById = async (req, res) => {
    const id = Number(req.params.id)

    if (isNaN(id) || id < 1) {
        return res.status(400).json({error: "Invalid user id"})
    }
    
    try{
        const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id])

        if(rows.length === 0){
            return res.status(404).json({message: "User not found"})
        }
        res.json(rows)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.getAllUsers = async (req, res) => {
    const {search, field, sort, order, page, limit} = req.query
    const account_id = req.user.id

    let query = "SELECT * FROM users WHERE account_id = ?"
    let values = [account_id];

    // search and field
    if(search && ["name", "email", "role"].includes(field)){
        query += ` WHERE ${field} LIKE ?`
        values.push(`%${search}%`)
    }
    else if(search){
        return res.status(400).json({error: "Invalid search field"})
    }

    // sort and order
    const sortorder = order ? order.toUpperCase() : "ASC"
    if(order && !["ASC", "DESC"].includes(sortorder)){
        return res.status(400).json({error: "Invalid order key"})
    }

    if(sort && ["id", "name", "email", "role"].includes(sort)){
        query += ` ORDER BY ${sort} ${sortorder}`
    }

    // page and limit
    if(page || limit){
        const pageNum = page ? Number(page) : 1
        const limitNum = limit ? Number(limit) : 10
        if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
            return res.status(400).json({error: "Invalid page or limit"})
        }

        if (limitNum > 100) {
            return res.status(400).json({error: "Limit cannot exceed 100"})
        }

        const offset = (pageNum - 1) * limitNum
        query += ` LIMIT ${limitNum} OFFSET ${offset}`
    }

    try{
        const [rows] = await db.execute(query, values)
        res.status(200).json(rows)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.addUser = async (req, res) => {
    const { name, email, role } = req.cleanedData
    const account_id = req.user.id

    try{
        const [rows] = await db.execute("INSERT INTO users (name, email, role, account_id) VALUES (?, ?, ?, ?)",
            [name, email, role, account_id])
        res.status(201).json({message: "Enrollment Successfull"})
    }
    catch(err){
        if(err.code === "ER_DUP_ENTRY"){
            return res.status(409).json({message: "Email already exists"})
    }
        res.status(500).json({error: err.message})
    }
}

exports.updateUser = async (req, res) => {
    const {id, name, email, role } = req.cleanedData

    try{
        const [rows] = await db.execute("UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
            [name, email, role, id])
        
        if(rows.affectedRows === 0){
            return res.status(404).json({message: "User not found"})
        }
        
        res.status(200).json({message: "User update successfull"})
    }
    catch(err) {
        if(err.code === "ER_DUP_ENTRY"){
            return res.status(409).json({message: "Email already exists"})
    }
        res.status(500).json({error: err.message})
    }
}



exports.deleteUser = async (req, res) => {
    const {id} = req.params
    try{
        const [rows] = await db.execute("DELETE FROM users WHERE id = ?", [id])
        if(rows.affectedRows === 0){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({message: "User deleted successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}