const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to the SQLite database (create sample.db in the backend folder)
const db = new sqlite3.Database('./sample.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

app.post('/ask', async (req, res) => {
    const query = req.body.query;
    console.log('Received query:', query);

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ answer: `Executed query. Found ${rows.length} results.`, data: rows });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});