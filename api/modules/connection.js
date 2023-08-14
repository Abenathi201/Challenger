const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'b5rq8jou4zpwbo2rtu5o-mysql.services.clever-cloud.com',
    user: 'ues7wqzmnkxusiwi',
    password: 'iL02EESyGOD4O2hLROOj',
    database:'b5rq8jou4zpwbo2rtu5o'
});

connection.connect((err) => {
    if (err) {
  console.error('Error connecting to MySQL database:', err);
  return;
} else {
  console.log('Connected to MySQL database');
}
});

module.exports = connection;