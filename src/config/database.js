import Database from "better-sqlite3";
import config from "./config.js";
import fs from "fs";

let db = null;


export const getDb = () => db;

export const initializeDatabase = async () => {
    const dbPath = config.databaseUrl;


    const folder = dbPath.substring(0, dbPath.lastIndexOf("/"));
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }


    db = new Database(dbPath);
    console.log("📁 Database initialized at:", dbPath);


    const User = (await import("../models/User.js")).default;
    const Car = (await import("../models/Car.js")).default;


    User.createTable();
    Car.createTable();


    User.seed();
    Car.seed();
};

export default db;