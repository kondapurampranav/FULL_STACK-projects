require("dotenv").config()

const PORT = 3000
const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const user_router = require("./routers/userRouter")
app.use(user_router)

const auth_router = require("./routers/authRoutes")
app.use("/auth", auth_router)

app.listen(PORT, () => {
    console.log("server is running")
})