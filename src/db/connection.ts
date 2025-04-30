import mysql from 'mysql2/promise';
import "dotenv/config";
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root123',
    database: process.env.DB_NAME || 'tricos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default pool;