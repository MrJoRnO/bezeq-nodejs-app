const express = require('express');
const sql = require('mssql');
const app = express();
const port = process.env.PORT || 3000;


const dbConfig = {
    url: process.env.DATABASE_URL, // מוזרק מה-Secret Manager
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/api/data', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig.url);
        let result = await pool.request().query('SELECT TOP 10 * FROM Applications');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Bezeq API listening at http://localhost:${port}`);
});