var passwordHandler = require('../../bin/pass-crypt');
var connection = require('../../connection/sql');

module.exports = function(req, res, next) {

    var hashedPass = passwordHandler.encryptPassword(req.body.password);

    var sql = 'SELECT login FROM users WHERE passwordHash="'+ hashedPass + '"';

    connection.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            if (err.code === "ER_DUP_ENTRY") {
                console.log(err.code);
                res.send('fail')
            } else {
                console.log('err on post /registerUser= ', err);
                res.send('fail')
            }
        } else {
            if (result && result.length > 0) {
                if (req.body.login == result[0].login) {
                    console.log("Login!");
                    req.session.login = req.body.login;
                    res.end();
                } else {
                    console.log("Fail Login!");
                    res.send('fail');
                }
            } else {
                console.log("Not Found!");
                res.send('fail');
            }
        }
    });
};