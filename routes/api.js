const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/messages', (req, res) => {
    const limit = 20;
    const page = req.query.page ? Number(req.query.page) : 1;
    const offset = (page - 1) * limit;

    if(page < 1 || !Number.isInteger(page)) {
        res.status(400).json({error: 'Invalid page number'});
        return
    }

    db.get(`SELECT COUNT(*) AS total FROM messages`, [], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({error: "Internal Server Error while fetching messages"});
            return;
        }

        const totalResults = result.total;
        const totalPages = Math.ceil(totalResults / limit);

        if(page > totalPages) {
            res.status(400).json({error: 'Requested page exceeds total page count'});
            return
        }

        db.all(`SELECT first_name, last_name, email, message FROM messages LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: "Internal Server Error while fetching messages"});
                return;
            }
            res.json({
                data: rows,
                currentPage: page,
                totalPages: totalPages,
            });
        });
    });
});

router.post('/messages', (req, res) => {
    const { first_name, last_name, email, message } = req.body;
    
    if (!first_name || !last_name || !email || !message) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    const query = `INSERT INTO messages (first_name, last_name, email, message) VALUES (?, ?, ?, ?)`;
    db.run(query, [first_name, last_name, email, message], function(err) {
        if (err) {
            if (err.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: messages.email') {
                res.status(400).json({ error: "Email already exists" });
            } else {
                console.error(err.message);
                res.status(500).json({ error: "Internal Server Error while creating message" });
            }
            return;
        }
        res.status(201).json({ id: this.lastID, message: 'Message recieved' });
    });
});

module.exports = router;