const categoryDb = require('../config/db');

categoryDb.run(`CREATE TABLE IF NOT EXISTS cateogry (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  imgsrc TEXT NOT NULL,
  user TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = categoryDb;
