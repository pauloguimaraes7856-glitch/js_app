import express from "express";
import config from "./config/config.js";
import { initializeDatabase } from "./config/database.js";
import { logMiddleware } from "./middleware/logger.js";
import { validateApiKey } from "./middleware/apiKey.js";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import cors from "cors";

const app = express();

await initializeDatabase();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(logMiddleware);

app.get("/healthz", (req, res) => {
    res.status(200).send("OK");
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        environment: config.nodeEnv,
        endpoints: {
            users: "/users",
            cars: "/cars"
        }
    });
});

app.use("/users", validateApiKey, userRoutes);
app.use("/cars", validateApiKey, carRoutes);

const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});