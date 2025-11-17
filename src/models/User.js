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
            const stmt = db.prepare(`
                INSERT INTO users (name, email, car_id)
                VALUES (?, ?, ?)
            `);
            stmt.run("Alice", "alice@test.com", 1);
            stmt.run("Bob", "bob@test.com", 2);
            stmt.run("Charlie", "charlie@test.com", null);
        }
    }

    static findAll() {
        const db = getDb();
        return db.prepare(`
            SELECT users.*, cars.brand, cars.model, cars.year
            FROM users
            LEFT JOIN cars ON users.car_id = cars.id
            ORDER BY users.id ASC
        `).all();
    }

    static findById(id) {
        const db = getDb();
        return db.prepare(`
            SELECT users.*, cars.brand, cars.model, cars.year
            FROM users
            LEFT JOIN cars ON users.car_id = cars.id
            WHERE users.id = ?
        `).get(id);
    }

    static create({ name, email, car_id = null }) {
        const db = getDb();

        const stmt = db.prepare(`
            INSERT INTO users (name, email, car_id)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(name, email, car_id);
        return this.findById(result.lastInsertRowid);
    }

    static insertMany(users) {
        const db = getDb();

        const stmt = db.prepare(`
            INSERT INTO users (name, email, car_id)
            VALUES (?, ?, ?)
        `);

        const insertMany = db.transaction((list) => {
            for (const u of list) {
                stmt.run(u.name, u.email || null, u.car_id || null);
            }
            return list.length;
        });

        return insertMany(users);
    }

    static update(id, { name, email, car_id }) {
        const db = getDb();

        db.prepare(`
            UPDATE users
            SET name = ?, email = ?, car_id = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `).run(name, email, car_id, id);

        return this.findById(id);
    }

    static delete(id) {
        const db = getDb();
        const result = db.prepare(`DELETE FROM users WHERE id = ?`).run(id);
        return result.changes > 0;
    }
}

export default User;