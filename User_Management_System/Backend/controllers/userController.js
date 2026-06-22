const db = require("../config/db")

exports.getAllUsers = async (req, res) => {
    try{
        const [rows] = await db.execute("SELECT * FROM users")
        res.status(200).json(rows)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.addUser = async (req, res) => {
    const { name, email, role } = req.cleanedData

    try{
        const [rows] = await db.execute("INSERT INTO users (name, email, role) VALUES (?, ?, ?)",[name, email, role])
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