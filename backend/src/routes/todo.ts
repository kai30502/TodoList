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

router.get('/', async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        let sql = 'SELECT * FROM todolist.todos';
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