let express = require('express');
let router = express.Router();
let dbConnection = require('../config/db');

//display book page
router.get('/', (req, res, next) => {
    dbConnection.query('SELECT * FROM category ORDER BY category_ID', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('manage-category', { data: '' });
        } else {
            res.render('manage-category/indexCat', { data: rows })
            
        }
    })
})

//display add book page
router.get('/addCat', (req, res, next) => {
    res.render('manage-category/addCat', {
        category_type: '',
        img_url:''
    })
})

//add a new book
router.post('/addCat', (req, res, next) => {
    let category_type = req.body.category_type || '';
    let img_url = req.body.img_url || '';
    let errors = false;

    if (category_type.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', 'Please enter category');
        // render to add.ejs with flash message
        res.render('manage-category/addCat', {
            img_url:img_url,
            category_type: category_type
        })
    }

    //if no error
    if (!errors) {
        let form_data = {
            category_type: category_type,
            img_url:img_url
        }

        //insert query
        dbConnection.query('INSERT INTO category SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('manage-category/addCat', {
                    category_type: form_data.category_type,
                    img_url:form_data.img_url
                })
            } else {
                req.flash('success', 'Category successfully added')
                res.redirect('/manage-category');
            }
        });

    }
})

//display edit book page
router.get('/editCat/:category_ID', (req, res, next) => {
    let category_ID = req.params.category_ID;

    dbConnection.query('SELECT * FROM category WHERE category_ID = ' + category_ID, (err, rows, field) => {
        if (err) {
            req.flash('error', err);
            res.redirect('/manage-category');
        } else if (rows.length <= 0) {
            req.flash('error', 'Category not found with category_ID = ' + category_ID);
            res.redirect('manage-category/editCat');
        } else {
            res.render('manage-category/editCat', {
                title: 'Edit Category',
                category_ID: rows[0].category_ID,
                img_url: rows[0].img_url,
                category_type: rows[0].category_type
            });            
        }
    });
})


//update book page
router.post('/update/:category_ID', (req, res, next) => {
    let category_ID = req.params.category_ID;
    let category_type = req.body.category_type;
    let img_url = req.body.img_url;
    let errors = false;

    if(category_type === 0) {
        errors = true;
        req.flash('error', 'Please enter name and category');
        res.render('manage-category/editCat', {
            category_ID: req.params.category_ID,
            img_url: img_url,
            category_type: category_type

        })
    }
    //if no error
    if (!errors) {
        let form_data = {
            category_type: category_type,
            img_url: img_url

        }
        //update query
        dbConnection.query("UPDATE category SET ? WHERE category_ID = " + category_ID, form_data, (err, result) => {
            if (err) {
                req.flash('error', err),
                res.render('manage-category/editCat', {
                    category_ID: req.params.category_ID,
                    img_ur: img_ur,
                    category_type: form_data.category_type
                })
            } else {
                req.flash('success', 'Category successfully Update! ID = ' + category_ID);
                res.redirect('/manage-category')
            }
        })
        
    }
})

//delete book
router.get('/delete/:category_ID', (req, res, next) => {
    let category_ID = req.params.category_ID;

    dbConnection.query('DELETE FROM category WHERE category_ID = ' + category_ID, (err, result) => {
        if (err) {
            req.flash('error', err),
            res.redirect('/manage-category');
        } else {
            req.flash('success', 'Category successfully deleted! ID = ' + category_ID);
            res.redirect('/manage-category');
        }
    })
})


module.exports = router;