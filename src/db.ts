import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Открытие базы данных с использованием open() и sqlite3
async function connectToDatabase() {
    try {
        const db = await open({
            filename: './users.db', // Путь к файлу базы данных SQLite
            driver: sqlite3.Database
        });

        console.log('Connected to the database');
        return db;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
}

// Экспорт функции для подключения к базе данных
export default connectToDatabase;
