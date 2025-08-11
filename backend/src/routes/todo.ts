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
        let sql = 'SELECT * FROM todos WHERE is_completed = 1 AND user_id = ? ORDER BY created_at DESC';
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
router.get('/incompletetasks', verifyToken, async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const userId = req.user.id;
        let sql = 'SELECT * FROM todos WHERE is_completed = 0 AND user_id = ? ORDER BY created_at DESC';
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

// 取得單一待辦事項
router.get('/:id', verifyToken, async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const taskId = req.params.id;
        const userId = req.user.id;
        let sql = 'SELECT * FROM todos WHERE id = ? AND user_id = ? ORDER BY created_at DESC';
        const [rows] = await connection.execute(sql,[taskId, userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "找不到該任務或你沒有權限存取" });
        }

        res.json(rows[0]);
    } catch (err) {
        console.log("連線失敗", err);
        res.status(500).json({message : "連線失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// 更新待辦事項為完成
router.patch('/:id/complete', verifyToken, async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const taskId = req.params.id;
        const userId = req.user.id;
        let sql = 'UPDATE todos SET is_completed = 1 WHERE (id = ? AND user_id = ?);';
        const [rows] = await connection.execute(sql,[taskId, userId]);
        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "找不到該任務或你沒有權限存取" });
        }
        res.json({ message: "任務已標記為完成" });
    } catch (err) {
        console.log("連線失敗", err);
        res.status(500).json({message : "連線失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// 更新待辦事項為未完成
router.patch('/:id/incomplete', verifyToken, async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const taskId = req.params.id;
        const userId = req.user.id;
        let sql = 'UPDATE todos SET is_completed = 0 WHERE (id = ? AND user_id = ?);';
        const [rows] = await connection.execute(sql,[taskId, userId]);
        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "找不到該任務或你沒有權限存取" });
        }
        res.json({ message: "任務已標記為未完成" });
    } catch (err) {
        console.log("連線失敗", err);
        res.status(500).json({message : "連線失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// 刪除待辦事項
router.delete('/:id', verifyToken, async (req: any, res: any) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbconfig);
        const taskId = req.params.id;
        const userId = req.user.id;
        let sql = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
        const [rows] = await connection.execute(sql,[taskId, userId]);
        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "找不到該任務或你沒有權限存取" });
        }
        res.json({ message: "任務已刪除" });
    } catch (err) {
        console.log("連線失敗", err);
        res.status(500).json({message : "連線失敗"});
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

// 新增待辦事項
router.post('/', verifyToken, async (req: any, res: any) => {
    let connection;
    if (!req.user) {
        return res.status(403).json({ message: '未授權訪問' });
    }
    try {
        connection = await mysql.createConnection(dbconfig);
        const { title, description, color, due_date } = req.body;
        const userId = req.user.id;

        if (!title || !due_date) {
            return res.status(400).json({ message: '標題和截止日期是必填的' });
        }

        let sql = 'INSERT INTO todos (title, description, color, due_date, user_id) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [title, description, color, due_date, userId]);

        res.status(201).json({ message: '任務已新增'});
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