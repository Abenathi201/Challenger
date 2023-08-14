const express = require('express');
const connection = require('../modules/connection');

const router = express.Router();

// Get all users
router.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if (result) {
            res.render('index', { result });
            // console.log('index', result);
        }
        else {
            console.log(err);
        }
    })
});

router.get('/single/:id', (req, res) => {
    const singleID = req.params.id;
    connection.query('SELECT * FROM users WHERE userID = ?', singleID,  (err, result) => {
        if(result.length > 0) {
            const user = result[0];
            res.render('single', { user });
            console.log('single', result);
        }
        else {
            console.log(err);
        }
    })
});

router.get('/create', (req, res) => {
    res.render('create')
});

// Create a user by filling out the above form
router.post('/create', (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        userDOB: req.body.userDOB,
        emailAdd: req.body.emailAdd,
        userPass: req.body.userPass,
        profileUrl: req.body.profileUrl
    }
    console.log(newUser);

    connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error inserting data');
        } else {
            res.render('create', { result });
        };
        res.redirect('/');
    });
});

router.delete('/single/:id', (req, res) => {
    const del = req.params.id;

    connection.query('DELETE FROM users WHERE userID = ?', del, (err, result) => {
        if (err) {
            console.log(err);
            // console.log();
            res.status(500).json({ error: 'Error deleting user' });
        } else {
            // req.flash('success', 'Data removed :' + del);
            // res.redirect('/');
            console.log({ message: 'Successfully deleted user with ID ' + del });
            res.redirect('/users');
        }
    });
});

// Exporting the routs
module.exports = router