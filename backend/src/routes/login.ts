import crypto = require("crypto");
import consumers = require("stream/consumers");

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const router = express.Router();

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
};

// 使用者登入
router.post('/', async (req: any, res: any) => {

    async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    }

    const { username, password } = req.body;
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const [rows] = await connection.execute(
            'SELECT password_hash FROM users WHERE username = ?',
            [username]
        );
        
        const isValid = await verifyPassword(password, rows[0].password_hash);
        if (!isValid) {
            return res.status(401).json({message: "使用者名稱或密碼錯誤"});
        }
        res.status(200).json({message: "使用者登入成功"});
    } catch (err) {
        console.log("使用者登入失敗", err);
        res.status(500).json({message: "使用者登入失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

module.exports = router;