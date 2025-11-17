import { getDb } from "../config/database.js"

class User {
    static tableName = 'users'

    static get db() {
        return getDb()
    }

    static createTable() {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
    }

    static findAll() {
        return this.db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`).all()
    }

    static findById(id) {
        return this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id)
    }

    static findByEmail(email) {
        return this.db.prepare(`SELECT * FROM ${this.tableName} WHERE email = ?`).get(email)
    }

    static emailExists(email, excludeId = null) {
        if (excludeId) {
            return this.db
                .prepare(`SELECT id FROM ${this.tableName} WHERE email = ? AND id != ?`)
                .get(email, excludeId) !== undefined
        }

        return this.db
            .prepare(`SELECT id FROM ${this.tableName} WHERE email = ?`)
            .get(email) !== undefined
    }

    static create({ name, email }) {
        const stmt = this.db.prepare(`
            INSERT INTO ${this.tableName} (name, email)
            VALUES (?, ?)
        `)
        const result = stmt.run(name, email || null)
        return this.findById(result.lastInsertRowid)
    }

    static update(id, { name, email }) {
        const updates = []
        const values = []

        if (name !== undefined) {
            updates.push('name = ?')
            values.push(name)
        }

        if (email !== undefined) {
            updates.push('email = ?')
            values.push(email)
        }

        updates.push('updated_at = CURRENT_TIMESTAMP')

        const stmt = this.db.prepare(`
            UPDATE ${this.tableName}
            SET ${updates.join(', ')}
            WHERE id = ?
        `)

        values.push(id)
        stmt.run(values)

        return this.findById(id)
    }

    static delete(id) {
        const result = this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id)
        return result.changes > 0
    }

    static count() {
        return this.db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`).get().count
    }

    static seed() {
        if (this.count() === 0) {
            const samples = [
                { name: 'Alice', email: 'alice@example.com' },
                { name: 'Bob', email: 'bob@example.com' },
                { name: 'Charlie', email: 'charlie@example.com' },
                { name: 'Dave', email: 'dave@example.com' }
            ]
            samples.forEach(u => this.create(u))
        }
    }
}

export default User