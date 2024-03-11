const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

app.use(bodyParser.json());

app.use(express.static('front-end Project/Back-end/19.Edit-product Page'));

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Comfirm17295",
    database: "fe_bookstore"
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end Project/Back-end/19.Edit-product Page', 'Edit-product.html'));
});

console.log("connected to daatbase");

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  }); 

