import express from "express"
import config from "./config/config.js"
import { initializeDatabase } from "./config/database.js"
import { logMiddleware } from "./middleware/logger.js"
import userRoutes from "./routes/userRoutes.js"
import { validateApiKey } from "./middleware/apiKey.js"

const app = express()

await initializeDatabase()

app.use(express.json())
app.use(logMiddleware)

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        env: config.nodeEnv,
        endpoints: {
            users: "/users"
        }
    })
})

app.use("/health", (req, res) => {
    res.json({ status: "OK" })
})

app.use("/users", validateApiKey, userRoutes)

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
})
