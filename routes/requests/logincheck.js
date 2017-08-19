var connection = require('../../connection/sql');
var nodemailer = require("nodemailer");
var passwordHandler = require('../../bin/pass-crypt');

module.exports = function(req, res, next) {
    /* Функция Отправки письма для восстановления пароля, сработает в случае успешного нахождения пользователя в бд */
    function sendEmail() {
        var token = passwordHandler.crypt();
        var exp = Date.now() + 10 * 60000;
        var sql = 'INSERT INTO resetpassword (login, hash, expire) VALUES(?,?,?)';
        var values = [req.body.login, token, exp];
        connection.query(sql, values);
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                clientId: "549274437987-4p7p60n13jprur7svppp686hltcr4em7.apps.googleusercontent.com",
                clientSecret: "iOvJ-4Bo-h0q_Td1BWF6O3M8"
            }
        });

        transporter.sendMail({
            from: 'simakov.evgens@gmail.com',
            to: 'info@dinamicka.com',
            subject: 'Recover Password',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to compvare the process:\n\n' +
            'http://' + req.headers.host + '/passrecover/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            auth: {
                user: 'simakov.evgens@gmail.com',
                refreshToken: "1/eHSqkLqDVWRHcGIuOUIPQi7SakQwEigBbr6IhE7Nje5ReDoZ5jiKz6Ly8BGH19-4",
                accessToken: 'ya29.GlurBMiy9zmCJlyYVHRmX6tgFUHGgEQ8FMlXeSjLsI1mCDgtlTVJ7bJ-WL3hEkmO-WF673N8UDw82hK14amXB0lz2y4yL7-c5GnjLEqoDfZ3c6-jFy_SgtZ5xZEH',
                expires: 1484314697598
            }
        }, function(err, res) {
            if (err) {
                console.log("Error sending mail")
            } else {
                console.log("Message sent");
            }
        });
    }

    var sql = 'SELECT * FROM users WHERE login="' + req.body.login + '"';
    connection.query(sql, function (err, result) {

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
                    console.log("Founded!");
                    res.end();
                    sendEmail();
                } else {
                    console.log("Fail Login!");
                    res.send('fail');
                }
            } else {
                console.log("Not Found!");
                res.send('fail');
            }
        }
    })
};