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
    password: "Tun-48449",
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

//render home page
app.get('/', (req, res) => {
    res.render('user/home');
});

//go to add-category
app.get('/add-category', (req, res) => {
    res.render('admin/category/add_category', {name:'Add'});
});

//go to edit-category
app.get('/edit-product', (req, res) => {
    res.render('admin/products/edit_product', {name:'Edit'});
});

//go to manage-category

//go to add-product
app.get('/add-product', (req, res) => {
    res.render('admin/products/add_product', {name:'Add'});
});

//go to edit-product

//go to manage-product
app.get('/manage-product', (req, res) => {
    res.render('admin/products/manage_product');
});

//go to top-product

//go to bill-summary

//go to dashboard

//go to staff-login
app.get('/staff-login', (req, res) => {
    res.render('admin/staff_login');
});

//go to staff-order

//go to staff-product

//go to staff-setting

//go to address-book
app.get('/address-book', (req, res) => {
    res.render('user/address_book');
});

//go to my-order
app.get('/my-order', (req, res) => {
    res.render('user/my_order');
});

//go to my-wishlist
app.get('/wishlist', (req, res) => {
    res.render('user/my_wishlist');
});

//go to track-order
app.get('/track-order', (req, res) => {
    res.render('user/track_order');
});

//go to about-us
app.get('/about_us', (req, res) => {
    res.render('user/about_us');
});

//go to account-info
app.get('/account-info', (req, res) => {
    res.render('user/account_info');
});

//go to all-category
app.get('/all-category', (req, res) => {
    res.render('user/all_category');
});

//go to cart-page
app.get('/cart', (req, res) => {
    res.render('user/cart_page');
});

//go to comics
app.get('/comics', (req, res) => {
    res.render('user/comics');
});

//go to contact
app.get('/contact', (req, res) => {
    res.render('user/contact');
});

//go to home
app.get('/home', (req, res) => {
    res.render('user/home');
});

//go to login
app.get('/login', (req, res) => {
    res.render('user/login');
});

//go to product-page

//go to registration
app.get('/registration', (req, res) => {
    res.render('user/registration');
});

//go to home(signout)
app.get('/sign-out', (req, res) => {
    res.render('user/home');
});
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


console.log("connected to daatbase");

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });

  //all page link use wehn all page for html finished

//Home start page

