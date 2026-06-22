exports.validateUser = (req, res, next) => {
    const {name, email} = req.body

    if(!name || !name.trim() || !email || !email.trim()){
        return res.status(400).json({message: "All values are required"})
    }
    if(name.trim().length < 3){
        return res.status(400).json({message: "Name must be atleast 3 characters"})
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({message: "Invalid email"})
    }
    req.cleanedData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: req.body.role
    }
    next()
}

exports.validateupdateUser = (req, res, next) => {
    const id = Number(req.params.id)
    const {name, email} = req.body

    if(isNaN(id)){
        return res.status(400).json({message: "ID must be a number"})
    }

    if(!name || !name.trim() || !email || !email.trim()){
        return res.status(400).json({message: "All values are required"})
    }
    if(name.trim().length < 3){
        return res.status(400).json({message: "Name must be atleast 3 characters"})
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({message: "Invalid email"})
    }
    req.cleanedData = {
        id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: req.body.role
    }
    next()
}

exports.validatedeleteUser = (req, res, next) => {
    const id = Number(req.params.id)

    if(isNaN(id)){
        return res.status(400).json({message: "ID must be a number"})
    }
    next()
}