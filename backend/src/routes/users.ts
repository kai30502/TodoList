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

// 註冊會員
router.post('/', async (req: any, res: any) => {

    async function hashPassword(plainPassword: string):Promise<string> {
        const saltRounds = 10;
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    }

    const { username, email, password } = req.body;
    let connection;
    try {
        const hashedPassword = await hashPassword(password);
        connection = await mysql.createConnection(dbconfig);
        await connection.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.status(201).json({message: "使用者註冊成功"});
    } catch (err) {
        console.log("使用者註冊失敗", err);
        res.status(500).json({message : "使用者註冊失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});


module.exports = router;