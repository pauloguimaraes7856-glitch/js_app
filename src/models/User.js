import { getDb } from "../config/database.js";

class User {
    static createTable() {
        const db = getDb();
        db.prepare(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT,
                car_id INTEGER,
                FOREIGN KEY (car_id) REFERENCES cars(id)
            )
        `).run();
    }

    static seed() {
        const db = getDb();
        const count = db.prepare("SELECT COUNT(*) AS total FROM users").get().total;

        if (count === 0) {
            const stmt = db.prepare(`
                INSERT INTO users (name, email, car_id) VALUES (?, ?, ?)
            `);

            stmt.run("Alice", "alice@test.com", 1);   // Tesla
            stmt.run("Bob", "bob@test.com", 2);       // BMW
            stmt.run("Charlie", "charlie@test.com", 3); // Supra
        }
    }

    static findAllWithCars() {
        const db = getDb();
        return db.prepare(`
            SELECT 
                users.id,
                users.name,
                users.email,
                cars.brand,
                cars.model,
                cars.year
            FROM users
            LEFT JOIN cars ON users.car_id = cars.id
            ORDER BY users.id
        `).all();
    }
}

export default User;