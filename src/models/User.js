import db from '../config/database.js'

class User {
  static tableName = 'users'

  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    db.exec(sql)
  }

  static findAll() {
    const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`)
    return stmt.all()
  }

  static findById(id) {
    const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
    return stmt.get(id)
  }

  static findByEmail(email) {
    const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE email = ?`)
    return stmt.get(email)
  }

  static emailExists(email, excludeId = undefined) {
    let stmt
    if (excludeId) {
      stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE email = ? AND id != ?`)
      return stmt.get(email, excludeId) !== undefined
    } else {
      stmt = db.prepare(`SELECT id FROM ${this.tableName} WHERE email = ?`)
      return stmt.get(email) !== undefined
    }
  }

  static create(userData) {
    const { name, email } = userData
    const stmt = db.prepare(`INSERT INTO ${this.tableName} (name, email) VALUES (?, ?)`)
    const result = stmt.run(name, email || null)
    return this.findById(result.lastInsertRowid)
  }

  static update(id, userData) {
    const { name, email } = userData
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

    const stmt = db.prepare(
      `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`
    )
    values.push(id)
    stmt.run(values)

    return this.findById(id)
  }

  static delete(id) {
    const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
    const result = stmt.run(id)
    return result.changes > 0
  }

  static count() {
    const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
    return stmt.get().count
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
