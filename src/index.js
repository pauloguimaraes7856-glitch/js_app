import express from "express"
import { logMiddleware } from "./middleware/middleware.js"
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "./controllers/userController.js"

const app = express()
const PORT = 3000

app.use(express.json())

// Routes
app.get("/users", logMiddleware, getAllUsers)
app.get("/users/:id", getUserById)
app.post("/users", createUser)
app.put("/users/:id", updateUser)
app.delete("/users/:id", deleteUser)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
