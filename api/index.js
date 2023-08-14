const express = require('express');
const connection = require('./modules/connection');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const usersRoutes = require('./routes/usersRoutes')


// Set up express
const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// register a view engine
app.set('view engine', 'ejs');
app.listen(4000);

// Get all Users
app.get('/', (req, res) => {
    res.redirect('/users');
});

// USERS ROUTES
app.use(usersRoutes);
