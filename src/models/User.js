import db from "../config/database.js";

class User {
    static tableName = "users";

    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE,
                car_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (car_id) REFERENCES cars(id)
            )
        `;
        db.exec(sql);
    }

    static findAll() {
        return db.prepare(`
            SELECT users.*, cars.brand, cars.model, cars.year
            FROM users
            LEFT JOIN cars ON users.car_id = cars.id
            ORDER BY users.id
        `).all();
    }

    static findById(id) {
        return db.prepare(`
            SELECT users.*, cars.brand, cars.model, cars.year
            FROM users
            LEFT JOIN cars ON users.car_id = cars.id
            WHERE users.id = ?
        `).get(id);
    }

    static create(data) {
        const stmt = db.prepare(`
            INSERT INTO users (name, email, car_id)
            VALUES (?, ?, ?)
        `);
        const result = stmt.run(data.name, data.email || null, data.car_id || null);
        return this.findById(result.lastInsertRowid);
    }

    static update(id, data) {
        const stmt = db.prepare(`
            UPDATE users
            SET name = ?, email = ?, car_id = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `);
        stmt.run(data.name, data.email, data.car_id, id);

        return this.findById(id);
    }

    static delete(id) {
        return db.prepare(`DELETE FROM users WHERE id = ?`).run(id).changes > 0;
    }
}

export default User;