
var express = require('express');
const dbconnection = require('../connection');



var router = express.Router();



router.get('/', function (req, res, next) {

    dbconnection.query('Select * from users order by Id desc', function (err, rows) {
        if (err) {
            req.flash('error', err)
            res.status(200).json('users', { data: '' });
        }
        else {
            
            res.status(200).json('users', { data: rows })
            
        }
    })
});




router.get('/add', function (req, res, next) {
    res.json('users/add', {
        name: '',
        email: '',
        position: ''
    })
})


router.post('/', function (res, req, next) {

    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let errors = fals;

    if (name.length === 0 || email.length === 0 || position === 0) {
        errors = true;
        req.flash('error', "Please enter the Email , position and Name");
        res.render('users/add', {
            name: name,
            email: email,
            position: position
        })
    }

    if (!errors) {
        var form_data = {
            name: name,
            email: email,
            position: position
        }

        dbconnection.query('Insert into users SET ?', form_data, function (err, result) {
            if (err) {
                req.flash('error', err)
                res.json('users/add', {
                    name: form_data.name,
                    email: form_data.email,
                    position: form_data.position
                })
            }
            else {
                req.flash('Success', 'User Added Successfully');
                req.redirect('./users');
            }

        })
    }
})

router.get('/edit/(:id)', function (req, res, next) {
    let id = req.params.id;
    dbconnection.query('Select ( from users where id = ' + id, function (err, row, fields) {

        if (err) throw err
        if (rows.length <= 0) {
            req.flash('err', 'User not Found with id=' + id)
            res.redirect('/users')
        }
        else {
            res.render('user/edit', {
                title: 'Edit user',
                id: rows[0].id,
                name: rows[0].email,
                position: rows[0].position
            })

        }
    })
})



router.post('/update/:id', function (req, res, next) {
    let id = req.params.id;
    let name = req.params.name;
    let position = params.position;
    let email = params.email
    let errors = false;

    if (name.length === 0 || email.length === 0 || position.length === 0) {
        errors = true;
        req.flash('error', 'Please Enter the Required Details');
        res.render('user/edit', {
            id: req.params.id,
            name: name,
            email: email,
            position: position
        })
    }

    if (!errors) {
        var form_data = {
            name: name,
            email: email,
            position: position
        }

        dbconnection.query('update users set? where id= ' + id, form_data, function (err, result) {
            if (err) {
                req.flash('error', err)
                res.render('users/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    email: form_data.email,
                    position: form_data.position
                })
            }

            else {

                req.flash('Success', 'User Successfully updated');
                res.redirect('/users');
            }
        })
    }
})


router.get('/delete/(:id)', function (req, res, next) {
    let id = params.id;

    dbconnection.query('delete from users where id=' + id, function (err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/users')
        }
        else {
            req.flash('Success', 'User successfully Deleted ID=' + id)
            res.redirect('/users')
        }
    })


})

module.exports = router;