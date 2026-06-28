const express = require("express")
const router = express.Router()

const {getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getAllAccounts,
    promoteAccounts,
    demoteAccounts
} = require("../controllers/userController")
const {validateUser, validateupdateUser, validatedeleteUser} = require("../middleware/userValidation")

const {authMiddleware, adminMiddleware} = require("../middleware/authMiddleware")

router.get("/users",authMiddleware, getAllUsers)

router.get("/user/:id",authMiddleware, getUserById)

router.post("/adduser",authMiddleware, validateUser, addUser)

router.put("/updateUser/:id",authMiddleware, validateupdateUser, updateUser)

router.delete("/deleteUser/:id",authMiddleware, validatedeleteUser, deleteUser)

// admin - only routes

router.get("/admin/users", getAllAccounts)

router.patch("/admin/promote/:id", authMiddleware, adminMiddleware, promoteAccounts)

router.patch("/admin/demote/:id", authMiddleware, adminMiddleware, demoteAccounts)

module.exports = router