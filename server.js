const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const ejs = require('ejs'); // Correct 

app.use(bodyParser.json());

app.set('view engine', 'ejs');

// access to css / photo file
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Comfirm17295",
    database: "fe_bookstore"
});


app.post('/product/add', (req, res) => {
    const { productName, category, author, publicationDate, quantity, regularPrice, salePrice, description, imageURL } = req.body; 
    const sql = 'INSERT INTO products (product_name, category_type, product_author, public_date, quantity, price, price_discount, description, imgurl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'; 

    db.execute(sql, [productName, category, author, publicationDate, quantity, regularPrice, salePrice, description, imageURL], (error, results) => { 
        if (error) {
            console.error('Error inserting into the database: ', error);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Inserted product into database:', results);
        res.redirect('/'); 
    });
});

app.get('/', (req, res) => {
    res.render('user/home');
});



//go to all category
app.get('/all-category', (req, res) => {
    res.render('user/all_category');
});

//go to comics
app.get('/comics', (req, res) => {
    res.render('user/comics');
});

//go to  manage products
app.get('/manage-product', (req, res) => {
    res.render('admin/products/manage_product');
});

//for go to the product click the image
// do it later

app.get('/add-category', (req, res) => {
    res.render('admin/category/add_category', {name:'Add'});
});


app.get('/add-product', (req, res) => {
    res.render('admin/products/add_product', {name:'Add'});
})

app.get('/edit-product', (req, res) => {
    res.render('admin/products/edit_product', {name:'Edit'});
})

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


console.log("connected to daatbase");

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });

  //all page link use wehn all page for html finished

//Home start page

