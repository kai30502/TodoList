const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
};

// 取得所有待辦事項
router.get('/', async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        let sql = 'SELECT * FROM todos ORDER BY created_at DESC';
        const [rows] = await connection.execute(sql);
        res.json(rows);
    } catch (err) {
        console.log("連線失敗", err);
        res.status(500).json({message : "連線失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// 取得今天過期的待辦事項
router.get('/todaytasks', async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
         let sql = 'SELECT * FROM todos WHERE DATE(due_date) = CURDATE() ORDER BY created_at DESC';
        const [rows] = await connection.execute(sql);
        res.json(rows);
    } catch (err) {
        console.log("連線失敗", err);
        res.status(500).json({message : "連線失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

module.exports = router;