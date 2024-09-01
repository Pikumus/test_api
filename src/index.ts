import express from 'express';
import connection from './db';
import connectToDatabase from "./db";

const querystring = require('querystring');
const url = require('url');

const app = express();
const port = 3000;
app.use(express.json());


app.get('/api/products', async (req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    let query = parsedQs['query'];
    const db = await connectToDatabase();
    try {
        const rows = await db.all(query);
        res.json(rows);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        await db.close();
    }
});

// Пример API для получения данных
app.get('/api/kirill', (req, res) => {
    res.json('жопу побрил');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
