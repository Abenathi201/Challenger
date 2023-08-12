const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Set up express
const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// register a view engine
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: 'b5rq8jou4zpwbo2rtu5o-mysql.services.clever-cloud.com',
    user: 'ues7wqzmnkxusiwi',
    password: 'iL02EESyGOD4O2hLROOj',
    database:'b5rq8jou4zpwbo2rtu5o'
})

app.listen(4000);

connection.connect((err) => {
      if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // You are connected to the database, so you can perform your operations here
  // For example: execute your queries (SELECT, INSERT, UPDATE, DELETE) here

  // Don't forget to end the connection when you're done
});

app.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if (result) {
            res.render('index', { result })
        }
        else {
            console.log(err);
        }
    })
});

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
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
    })
})


// connection.end((err) => {
//     if (err) console.error('Error disconnecting from MySQL database:', err);
//     console.log('Disconnected from MySQL database');
// });