import express from 'express';
import connection from './db';
import connectToDatabase from "./db";
const querystring = require('querystring');
const url = require('url');

const app = express();
const port = 3000;
app.use(express.json());


app.get('/api/universal', async (req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    let query = parsedQs['query'];
    const db = await connectToDatabase();
    try {
        const rows = await db.all(query);
        res.json(rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
    finally {
        await db.close();
    }
    // connectToDatabase.query(query, (err, results) => {
    //     if (err) {
    //         res.status(500).send(err);
    //         return;
    //     }
    //     res.json(results);
    // })
});

// Пример API для получения данных
app.get('/api/ping', (req, res) => {
    res.json('pong');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
