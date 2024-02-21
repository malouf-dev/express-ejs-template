const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});


// Create messages table
const messagesSchema = 'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, message TEXT NOT NULL);';
db.run(messagesSchema, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Table created or already exists.');
});


module.exports = db;
