import crypto = require("crypto");
import consumers = require("stream/consumers");

const express = require('express');

const router = express.Router();

// 使用者登出
router.post('/', async (req: any, res: any) => {
    res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'lax' });
    res.status(200).json({ message: "使用者登出成功" });
});

module.exports = router;