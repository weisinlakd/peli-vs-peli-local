var mysql = require('mysql');
require('../config/config');


var connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT_SQL,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database:  process.env.DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


module.exports = connection;

