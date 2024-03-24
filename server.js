const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const ejs = require('ejs'); // Correct 

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


let flash = require('express-flash');
let session = require('express-session');
let db = require('./config/db')

var booksRouter = require('./routes/books');
var CategoryRouter = require('./routes/category');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  cookie: { maxAge:60000 },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))

app.use(flash());


app.use('/manage-product', booksRouter);
app.use('/manage-category',  CategoryRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// Function to fetch products from the database
function fetchProducts() {
    return new Promise((resolve, reject) => {
        // Query to fetch products
        db.query('SELECT * FROM product', (error, results, fields) => {
            if (error) {
                reject(error); // Reject the promise if there's an error
            } else {
                resolve(results); // Resolve the promise with the fetched products
            }
        });
    });
}

//render home page
app.get('/', async (req, res) => {
    try {
        // Fetch products from the database
        const products = await fetchProducts();

        // Render the home page and pass products to the template
        res.render('user/home', { products: products });
    } catch (error) {
        // Handle any errors that occur during product fetching
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

//go to all-category
app.get('/all-category', async (req, res) => {
    try {
        // Fetch products from the database
        const products = await fetchProducts();

        // Render the home page and pass products to the template
        res.render('user/all_category', { products: products });
    } catch (error) {
        // Handle any errors that occur during product fetching
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});


//go to comics
app.get('/comics', async (req, res) => {
    try {
        // Fetch products from the database
        const products = await fetchProducts();

        // Render the home page and pass products to the template
        res.render('user/comics', { products: products });
    } catch (error) {
        // Handle any errors that occur during product fetching
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

//go to fiction
app.get('/fiction', async (req, res) => {
    try {
        // Fetch products from the database
        const products = await fetchProducts();

        // Render the home page and pass products to the template
        res.render('user/fiction', { products: products });
    } catch (error) {
        // Handle any errors that occur during product fetching
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

//go to languages
app.get('/lang', async (req, res) => {
    try {
        // Fetch products from the database
        const products = await fetchProducts();

        // Render the home page and pass products to the template
        res.render('user/languages', { products: products });
    } catch (error) {
        // Handle any errors that occur during product fetching
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

//go to manage-product
app.get('/views/manage-category', (req, res) => {
    res.render('/manage_category/indexCat');
});







































//go to top-product
app.get('/top-product', (req, res) => {
    res.render('admin/top_product');
});

//go to bill-summary
app.get('/bill-summary', (req, res) => {
    res.render('admin/bill_summary');
});

//go to staff-login
app.get('/staff-login', (req, res) => {
    res.render('admin/staff_login');
});

//go to staff-order
app.get('/staff-order', (req, res) => {
    res.render('admin/staff_order');
});

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
app.get('/staff-setting', (req, res) => {
    res.render('admin/staff_setting');
});
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


app.get('/test', (req, res) => {
    res.render('user/test');
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



//go to cart-page
app.get('/cart', (req, res) => {
    res.render('user/cart_page');
});




//go to contact
app.get('/contact', (req, res) => {
    res.render('user/contact');
});

//go to home
app.get('/', (req, res) => {
    res.render('user/home');
});

//go to login
app.get('/login', (req, res) => {
    res.render('user/login');
});

//go to product-page
app.get('/product-page', (req, res) => {
    res.render('user/product_page');
});

//go to registration
app.get('/registration', (req, res) => {
    res.render('user/registration');
});

//go to home(signout)
app.get('/sign-out', (req, res) => {
    res.render('user/home');
});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
  
  
  module.exports = app;

  //all page link use wehn all page for html finished

//Home start page

