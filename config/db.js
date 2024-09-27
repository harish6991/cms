const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./config/blog.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});


// db.run(`CREATE TABLE IF NOT EXISTS users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   username TEXT NOT NULL,
//   role TEXT NOT NULL,
//   password TEXT NOT NULL,
//   timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
// )`);

module.exports = db;
