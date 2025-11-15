import express from "express";
import config from "./config/config.js";
import { initializeDatabase } from "./config/database.js";
import { logMiddleware } from "./middleware/logger.js";
import { validateApiKey } from "./middleware/apiKey.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

await initializeDatabase();

app.use(express.json());
app.use(logMiddleware);

app.get("/healthz", (req, res) => {
    res.status(200).send("OK");
});


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        environment: config.nodeEnv,
        endpoints: {
            users: "/users"
        }
    });
});


app.use("/users", validateApiKey, userRoutes);


const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

