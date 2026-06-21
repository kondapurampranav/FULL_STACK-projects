const PORT = 3000
const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const user_router = require("./routers/userRouter")
app.use(user_router)

app.listen(PORT, () => {
    console.log("server is running")
})