var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 1,
    queueLimit      : 100,
    aquireTimeout   : 5000,
    host            : 'localhost',
    port            : 8889,
    user            : 'root',
    password        : 'root',
    database        : 'data'

});

module.exports = pool;