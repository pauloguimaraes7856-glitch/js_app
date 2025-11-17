import { getDb } from "../config/database.js";

class User {
    static tableName = "users";

    static createTable() {
        const db = getDb();
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE,
                car_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (car_id) REFERENCES cars(id)
            );
        `);
    }

    static seed() {
        const db = getDb();
        const count = db.prepare(`SELECT COUNT(*) as c FROM users`).get().c;
        if (count === 0) {
            const stmt = db.prepare(`INSERT INTO users (name, email, car_id) VALUES (?, ?, ?)`);
            stmt.run("Alice", "alice@test.com", 1);
            stmt.run("Bob", "bob@test.com", 2);
            stmt.run("Charlie", "charlie@test.com", null);
        }
    }

    static findAll() {
        const db = getDb();
        return db.prepare(`
            SELECT users.*, cars.brand, cars.model, cars.year
            FROM users LEFT JOIN cars ON users.car_id = cars.id
        `).all();
    }
}

export default User;