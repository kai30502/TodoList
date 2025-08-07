import type { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');


const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'token不存在' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err: Error | null, decoded: any) => {
        if (err) {
            res.clearCookie('token')
            return res.status(401).json({ message: '無效token' });
        }
        const { id } = decoded;
        let connection;
        try {
            connection = await mysql.createConnection(dbconfig);
            const [rows] = await connection.execute('SELECT id, username, email FROM users WHERE id = ?',
                [id]
            );
                
            if (rows.length === 0) {
                return res.status(404).json({ message: '使用者不存在' });
            }
            req.user = rows[0];
        } catch (error) {
            console.error("資料庫連接錯誤", error);
            return res.status(500).json({ message: '內部伺服器錯誤' });
        } finally {
            if (connection) {
                connection.end();
            }
        }
        next();
    });
};

module.exports = verifyToken;