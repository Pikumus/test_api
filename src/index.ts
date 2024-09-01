import express from 'express';
import connectToDatabase from './db';

const app = express();
const port = 3000;

app.use(express.json());

// Эндпоинт для получения всех продуктов
app.get('/api/products', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const products = await db.all('SELECT * FROM users'); // Получение всех продуктов
        await db.close();

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
