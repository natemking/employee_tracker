//** Dependencies ***//
//===================//
var mysql = require('mysql');

//*** MySQL Pool Connection ***//
//=============================//
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_db'
});

module.exports = pool;