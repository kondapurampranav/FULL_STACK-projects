const express = require("express")
const router = express.Router()

const {getAllUsers,
    addUser,
    updateUser,
    deleteUser
} = require("../controllers/userController")
const {validateUser, validateupdateUser, validatedeleteUser} = require("../middleware/userValidation")

router.get("/users", getAllUsers)

router.post("/adduser", validateUser, addUser)

router.put("/updateUser/:id", validateupdateUser, updateUser)

router.delete("/deleteUser/:id", validatedeleteUser, deleteUser)

module.exports = router