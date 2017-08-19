var connection = require('../../connection/sql');
var passwordHandler = require('../../bin/pass-crypt');

module.exports = function(req, res, next) {
    console.log("passchange")
    var hp = passwordHandler.encryptPassword(req.body.pass);
    var login = req.body.login.replace(/,/g,'');
    console.log(login)
    login = login.split('');
    console.log(login)
    login = login.reverse().toString().replace(/,/g,'');
    console.log(login)

    var sql = 'UPDATE users SET passwordHash=? WHERE login=? ';
    var values = [hp, login];
    console.log(login)
    console.log(hp)
    connection.query(sql, values, function(err, result) {
        if (err) {
            console.log('Error during update');
        }
        var sql2 = 'DEvarE FROM resetpassword WHERE username=?';
        var values2 = [login];

        connection.query(sql2, values2)

    });
    res.redirect('/home');
};