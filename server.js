const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const ejs = require('ejs'); // Correct 

app.use(bodyParser.json());

app.use(express.static('front-end Project/Back-end/19.Edit-product Page'));

app.set('view engine', 'ejs');

// access to css / photo file
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Comfirm17295",
    database: "fe_bookstore"
});

app.get('/', (req, res) => {
    res.render('admin/products/manage_product');
});

app.get('/add-category', (req, res) => {
    res.render('admin/category/add_category', {name:'Add'});
});

app.get('/add-product', (req, res) => {
    res.render('admin/products/add_product', {name:'Add'});
})

app.get('/edit-product', (req, res) => {
    res.render('admin/products/edit_product', {name:'Edit'});
})

console.log("connected to daatbase");

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  }); 


  //all page link use wehn all page for html finished

//Home start page
app.get('/', (req, res) => {
   res.render('user/home');
});
