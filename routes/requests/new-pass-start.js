// проверка токена
var connection = require('../../connection/sql');
var passwordHandler = require('../../bin/pass-crypt');

module.exports = function(req, res) {
    var sql = 'SELECT * FROM resetpassword WHERE hash=?';
    var values = [req.params.token];
    connection.query(sql, values, function(err, rows) {
        if (err) console.log("Error during reset password");
        //если с данным хешем нашли пользователя
        if (rows.length > 0) {
            var arr = rows[0].login.split('');
            arr.reverse();
            console.log(arr);
            //если дата валидности ссылки больше чем текущая, то выполняем действия
            if (rows[0].expire > Date.now()) {
                res.render('passwordRecovery', {
                    login: arr.toString()
                })
            } else {
                console.log("Link is invalid");
                res.render('layout/pass-recover', {
                    info: "Link is invalid"
                })
            }
        } else {
            console.log("Error.We can not find any user with this hash");
            res.render('forgotpass', {
                info: "We can not find any user with this hash. Check your link from email."
            })
        }
    });

};
