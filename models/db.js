const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Cria a tabela de itens recicláveis, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS recyclable_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      material TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      collection_point TEXT,
      collected INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
});

module.exports = db;
