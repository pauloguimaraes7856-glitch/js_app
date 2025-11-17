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
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    static findAll() {
        const db = getDb();
        return db.prepare("SELECT * FROM users ORDER BY id").all();
    }

    static findById(id) {
        const db = getDb();
        return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    }

    static create(data) {
        const db = getDb();
        const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        const info = stmt.run(data.name, data.email || null);
        return this.findById(info.lastInsertRowid);
    }

    static delete(id) {
        const db = getDb();
        const stmt = db.prepare("DELETE FROM users WHERE id = ?");
        return stmt.run(id).changes > 0;
    }

    static seed() {
        const db = getDb();
        const count = db.prepare("SELECT COUNT(*) AS total FROM users").get().total;
        if (count === 0) {
            ["Alice", "Bob", "Charlie"].forEach(name => {
                this.create({ name, email: `${name.toLowerCase()}@test.com` });
            });
        }
    }
}

export default User;