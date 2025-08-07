const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

const todos = require('./routes/todo');
const users = require('./routes/users');
const login = require('./routes/login');

app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/login', login);

app.listen(
    port, '0.0.0.0', () => {
        console.log(`伺服器已啟動於 http://localhost:${port}`);
    }
)