const express = require("express")
const router = express.Router()

const {getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} = require("../controllers/userController")
const {validateUser, validateupdateUser, validatedeleteUser} = require("../middleware/userValidation")

router.get("/users", getAllUsers)

router.get("/user/:id", getUserById)

router.post("/adduser", validateUser, addUser)

router.put("/updateUser/:id", validateupdateUser, updateUser)

router.delete("/deleteUser/:id", validatedeleteUser, deleteUser)

module.exports = router