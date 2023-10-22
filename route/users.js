
var express = require('express');
const dbconnection = require('../connection');



var router = express.Router();



router.get('/', function (req, res, next) {

    dbconnection.query('Select * from users order by Id desc', function (err, rows) {
        if (err) {
            req.flash('error', err)
            res.status(200).json({ data: '' });
        }
        else {
            res.status(200).json({ data: rows })
        }
    })
});



router.post('/', function (req,res, next) {

    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let errors = false;

    if (name.length === 0 || email.length === 0 || position === 0) {
        errors = true;
        res.json({"status": "Success", "message": "done"})
    }

    if (!errors) {
        var form_data = {
            name: name,
            email: email,
            position: position
        }

        dbconnection.query('insert into users SET ?', form_data, function (err, result) {
            if (err) {
                res.json({"status": "error", "message": "Failed"});
            }
            else {
                res.json({"status": "success", "message": "Created successfully"});
            }

        })
    }
})

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    dbconnection.query('Select * from users where id = ' + id, function (err, rows, fields) {

        if (err) throw err
        if (rows.length == 0) {
            req.flash('err', 'User not Found with id=' + id)
            res.redirect('/users')
        }
        else {
            res.json({ data: rows[0]})

        }
    })
})



router.put('/:id', function (req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let position = req.body.position;
    let email = req.body.email
    let errors = false;

    if (!errors) {
        var form_data = {
            name: name,
            email: email,
            position: position
        }

        dbconnection.query(`update users set? where id= ${id}`, form_data, function (err, result) {
            if (err) {
                console.error('****')
                console.error(err)
                res.json({"status": "error", "message": "Failed"});
            }
            else {
                res.json({"status": "success", "message": "Updated successfully"});
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