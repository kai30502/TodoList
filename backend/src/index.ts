const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const todos = require('./routes/todo');

app.use('/api/todos', todos);

app.listen(
    port, '0.0.0.0', () => {
        console.log(`伺服器已啟動於 http://localhost:${port}`);
    }
)