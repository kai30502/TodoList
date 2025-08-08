const express = require('express');
const mysql = require('mysql2/promise');

const verifyToken = require('../middlewares/verifytoken');


const router = express.Router();

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
};

// 取得所有待辦事項
router.get('/', verifyToken, async (req: any, res: any) => {
    let connection;
    if (!req.user) {
        return res.status(403).json({ message: '未授權訪問' });
    }
    try {
        connection = await mysql.createConnection(dbconfig);
        const userId = req.user.id;
        let sql = 'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC';
        const [rows] = await connection.execute(sql,[userId]);
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
router.get('/todaytasks', verifyToken, async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const userId = req.user.id;
        let sql = 'SELECT * FROM todos WHERE DATE(due_date) = CURDATE() AND user_id = ? ORDER BY created_at DESC';
        const [rows] = await connection.execute(sql,[userId]);
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

// 取得已完成的待辦事項
router.get('/completedtasks', verifyToken, async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const userId = req.user.id;
        let sql = 'SELECT * FROM todos WHERE is_completed = 1 AND user_id = 5 ORDER BY created_at DESC';
        const [rows] = await connection.execute(sql,[userId]);
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

// 取得未完成的待辦事項
router.get('/completedtasks', verifyToken, async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const userId = req.user.id;
        let sql = 'SELECT * FROM todos WHERE is_completed = 0 AND user_id = 5 ORDER BY created_at DESC';
        const [rows] = await connection.execute(sql,[userId]);
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