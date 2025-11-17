import { getDb } from "../config/database.js";

class Car {
    static createTable() {
        const db = getDb();
        db.prepare(`
            CREATE TABLE IF NOT EXISTS cars (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                brand TEXT NOT NULL,
                model TEXT NOT NULL,
                year INTEGER NOT NULL
            )
        `).run();
    }

    static seed() {
        const db = getDb();
        const count = db.prepare("SELECT COUNT(*) AS total FROM cars").get().total;

        if (count === 0) {
            const stmt = db.prepare("INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)");
            stmt.run("Tesla", "Model S", 2022);
            stmt.run("BMW", "M4", 2021);
            stmt.run("Toyota", "Supra", 2020);
        }
    }
}

export default Car;