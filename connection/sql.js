var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit : 1,
    queueLimit      : 100,
    aquireTimeout   : 5000,
    user            : 'root',
    password        : 'root',
    database        : 'data'
});
/*host            : 'localhost',
 port            : 8889,*/
module.exports = pool;