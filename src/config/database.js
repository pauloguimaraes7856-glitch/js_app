import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import config from "./config.js";

let db;

export const initializeDatabase = async () => {
    const folder = path.resolve("data");
    const dbPath = path.join(folder, "database.sqlite");

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    db = new Database(dbPath);

    // Load models after DB is created
    const User = (await import("../models/User.js")).default;
    const Car = (await import("../models/Car.js")).default;

    User.createTable();
    User.seed();

    Car.createTable();
    Car.seed();
};

export default db;