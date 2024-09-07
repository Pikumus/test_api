import express from 'express';
import connectToDatabase from './db';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Эндпоинт для получения всех продуктов
app.get('/api/products', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const products = await db.all('SELECT * FROM products'); // Получение всех продуктов
        await db.close();

        res.json(products);
    } catch (err) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.get('/api/cart', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const products = await db.all('SELECT * FROM cart');
        await db.close();
    }
    catch (err) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.post('/api/cart', async (req, res) => {
    const { product_id, quantity } = req.body;

    if (!product_id || quantity < 1) {
        return res.status(400).json({ error: 'Invalid product ID or quantity' });
    }

    try {
        const db = await connectToDatabase();

        // Проверяем, существует ли продукт в корзине
        const existingProduct = await db.get('SELECT * FROM cart WHERE product_id = ?', [product_id]);

        if (existingProduct) {
            // Если продукт уже в корзине, обновляем его количество
            await db.run('UPDATE cart SET quantity = quantity + ? WHERE product_id = ?', [quantity, product_id]);
        } else {
            // Если продукта нет в корзине, добавляем его
            await db.run('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [product_id, quantity]);
        }

        await db.close();
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
