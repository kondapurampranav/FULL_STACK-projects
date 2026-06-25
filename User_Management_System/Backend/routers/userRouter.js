const express = require("express")
const router = express.Router()

const {getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} = require("../controllers/userController")
const {validateUser, validateupdateUser, validatedeleteUser} = require("../middleware/userValidation")

const {authMiddleware} = require("../middleware/authMiddleware")

router.get("/users",authMiddleware, getAllUsers)

router.get("/user/:id",authMiddleware, getUserById)

router.post("/adduser",authMiddleware, validateUser, addUser)

router.put("/updateUser/:id",authMiddleware, validateupdateUser, updateUser)

router.delete("/deleteUser/:id",authMiddleware, validatedeleteUser, deleteUser)

module.exports = router