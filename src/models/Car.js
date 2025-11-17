import { getDb } from "../config/database.js";

class Car {
    static createTable() {
        const db = getDb();
        db.exec(`
            CREATE TABLE IF NOT EXISTS cars (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                brand TEXT NOT NULL,
                model TEXT NOT NULL,
                year INTEGER NOT NULL
            )
        `);
    }

    static findAll() {
        const db = getDb();
        return db.prepare("SELECT * FROM cars").all();
    }

    static seed() {
        const db = getDb();
        const count = db.prepare("SELECT COUNT(*) AS total FROM cars").get().total;
        if (count === 0) {
            const stmt = db.prepare("INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)");
            stmt.run("Tesla", "Model S", 2022);
            stmt.run("Toyota", "Supra", 2020);
            stmt.run("BMW", "M4", 2021);
        }
    }
}

export default Car;