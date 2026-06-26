const jwt = require("jsonwebtoken")

exports.authMiddleware = (req, res, next) => {
    const auth_Middleware = req.header("Authorization")

    if(!auth_Middleware){
        return res.status(400).json({error: "Token required"})
    }

    const token = auth_Middleware.split(" ")[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    }
    catch(err){
        return res.status(500).json({error: "Invald token"})
    }
    

}

exports.adminMiddleware = (req, res, next) => {
    const {role} = req.user

    if(role !== "admin"){
        return res.status(403).json({error: "Forbidden"})
    }

    next()
}