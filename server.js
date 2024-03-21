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
    database: "fe_book"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
    // Now you can start fetching products
    fetchProducts();
   
});

// Function to fetch Allproducts
function fetchProducts() {
    db.query('SELECT * FROM product', (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return;
        }
        /*console.log('Products:', results);*/
        // Pass products to render
        app.locals.products = results;
    });
}

//render home page
app.get('/', (req, res) => {
    res.render('user/home', { product : app.locals.products });
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
app.get('/manage-category', (req, res) => {
    res.render('admin/manage_category');
});
//go to add-product
app.get('/add-product', (req, res) => {
    res.render('admin/products/add_product', {name:'Add'});
});

//go to edit-product

//go to manage-product
app.get('/manage-product', (req, res) => {
    res.render('admin/manage_product');
});

//go to top-product
app.get('/top-product', (req, res) => {
    res.render('admin/top_product');
});

//go to bill-summary
app.get('/bill-summary', (req, res) => {
    res.render('admin/bill_summary');
});

//go to dashboard


//go to staff-login
app.get('/staff-login', (req, res) => {
    res.render('admin/staff_login');
});

//go to staff-order


//go to staff-product-dashboard
app.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});
//go to staff-product-product
app.get('/staff-product', (req, res) => {
    res.render('admin/staff_product');
});
//go to staff-product-order
app.get('/staff-order', (req, res) => {
    res.render('admin/staff_order');
});
//go to staff-product-setting
app.get('/staff-setting', (req, res) => {
    res.render('admin/staff_setting');
});

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




app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });

  //all page link use wehn all page for html finished

//Home start page

