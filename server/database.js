const Database = require("better-sqlite3");
const db = new Database("database.db"); // Define database filename

db.exec(`
    CREATE TABLE IF NOT EXISTS watchlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tmdb_id INTEGER UNIQUE,
        title TEXT,
        overview TEXT,
        poster_path TEXT,
        rating REAL,
        added_at TEXT
    )
`);

module.exports = db;