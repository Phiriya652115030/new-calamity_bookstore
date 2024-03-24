let express = require('express');
let router = express.Router();
let dbConnection = require('../config/db');

//display book page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM product ORDER BY product_ID', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('manage-product', { data: '' });
        } else {
            res.render('manage-product/index', { data: rows })
            
        }
    })
})

//display add book page
router.get('/add', (req, res, next) => {
    res.render('manage-product/add', {
        product_name: '',
        category_type: ''
    })
})

//add a new book
router.post('/add', (req, res, next) => {
    let product_name = req.body.product_name || ''; 
    let category_type = req.body.category_type || '';
    let errors = false;

    if (product_name.length === 0 || category_type.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', 'Please enter name and category');
        // render to add.ejs with flash message
        res.render('manage-product/add', {
            product_name: product_name,
            category_type: category_type
        })
    }

    //if no error
    if (!errors) {
        let form_data = {
            product_name: product_name,
            category_type: category_type
        }

        //insert query
        dbConnection.query('INSERT INTO product SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('manage-product/add', {
                    product_name: form_data.product_name,
                    category_type: form_data.category_type
                })
            } else {
                req.flash('success', 'Book successfully added')
                res.redirect('/manage-product');
            }
        });

    }
})

//display edit book page
router.get('/edit/:product_ID', (req, res, next) => {
    let product_ID = req.params.product_ID;

    dbConnection.query('SELECT * FROM product WHERE product_ID = ' + product_ID, (err, rows, field) => {
        if (err) {
            req.flash('error', err);
            res.redirect('/books');
        } else if (rows.length <= 0) {
            req.flash('error', 'Book not found with product_ID = ' + product_ID);
            res.redirect('/manage-product');
        } else {
            res.render('manage-product/edit', {
                title: 'Edit book',
                product_ID: rows[0].product_ID,
                product_name: rows[0].product_name,
                category_type: rows[0].category_type
            });            
        }
    });
})


//update book page
router.post('/update/:product_ID', (req, res, next) => {
    let product_ID = req.params.product_ID;
    let product_name = req.body.product_name;
    let category_type = req.body.category_type;
    let errors = false;

    if(product_name.length === 0 || category_type === 0) {
        errors = true;
        req.flash('error', 'Please enter name and category');
        res.render('manage-product/edit', {
            product_ID: req.params.product_ID,
            product_name: product_name,
            category_type: category_type
        })
    }
    //if no error
    if (!errors) {
        let form_data = {
            product_name: product_name,
            category_type: category_type
        }
        //update query
        dbConnection.query("UPDATE product SET ? WHERE product_ID = " + product_ID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err),
                res.render('manage-product/edit', {
                    product_ID: req.params.product_ID,
                    product_name: form_data.product_name,
                    category_type: form_data.category_type
                })
            } else {
                req.flash('success', 'Books successfully Update! ID = ' + product_ID);
                res.redirect('/manage-product')
            }
        })
        
    }
})

//delete book
router.get('/delete/:product_ID', (req, res, next) => {
    let product_ID = req.params.product_ID;

    dbConnection.query('DELETE FROM product WHERE product_ID = ' + product_ID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/manage-product');
        } else {
            req.flash('success', 'Book successfully deleted! ID = ' + product_ID);
            res.redirect('/manage-product');
        }
    })
})


module.exports = router;