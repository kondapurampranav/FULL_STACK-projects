const bcrypt = require("bcrypt")
const validator = require("validator")

const db = require("../config/db")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const {email, password} = req.body

    // validate
    if(!email || !password || !email.trim() || !password.trim()){
        return res.status(400).json({message: "Email and password are required"})
    }

    try{
    // no same user
    const [userExist] = await db.execute("SELECT * FROM accounts WHERE email = ?", [email])
    if(userExist.length > 0){
        return res.status(409).json({error: "Email already exists"})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({error: "Invalid email format"})
    }

    if(password.length < 8){
        return res.status(400).json({error: "Password must be at least 8 characters"})
    }

    // hashing
    const hashedPassword = await bcrypt.hash(password, 10)

    // insert
    const [result] = await db.execute("INSERT INTO accounts (email, password) VALUES (?, ?)", [email, hashedPassword])
    res.status(200).json({message: "Registration successfull"})

    }
    catch(err){
        return res.status(500).json({error: err.message})
    }
}



exports.login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !email.trim() || !password || !password.trim()){
        return res.status(400).json({error: "Email and password are required"})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({error: "Invalid email format"})
    }
    
    try{
        const [isUser] = await db.execute("SELECT * FROM accounts WHERE email = ?", [email])

        if(isUser.length === 0){
            return res.status(404).json({error: "User not found"})
        }

        const userPassword = isUser[0].password

        const verify = await bcrypt.compare(password, userPassword)
        if(!verify){
            return res.status(409).json({error: "Wrong password"})
        }

        const token = jwt.sign(
            {
                id: isUser[0].id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1m"
            }
        )
        res.status(200).json({
            message: "Login Successful",
            token: token
        })
    }catch(err){
        res.status(500).json({error: err.message})
    }


}



// {
//   "email": "ram@gmail.com",
//   "password": "ram1234"
// }