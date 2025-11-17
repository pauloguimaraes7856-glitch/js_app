import Database from "better-sqlite3"
import config from "./config.js"
import fs from "fs"

let db

export const initializeDatabase = async () => {
    const dbPath = config.databaseUrl

    const folder = dbPath.substring(0, dbPath.lastIndexOf("/"))
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true })
    }

    db = new Database(dbPath)

    const User = (await import("../models/User.js")).default
    const Car = (await import("../models/Car.js")).default

    User.createTable()
    User.seed()

    Car.createTable()
    Car.seed()
}

export const getDb = () => db
export default db