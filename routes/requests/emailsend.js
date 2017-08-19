var hbs = require("nodemailer-express-handlebars");
var nodemailer = require("nodemailer");

module.exports = function(req, res, next) {
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

//использование шаблонов
    transporter.use('compile', hbs({
        viewPath: './views/email',
        extName: '.hbs'
    }));

//отправка 1 сообщения пользователю
    transporter.sendMail({
        from: 'simakov.evgens@gmail.com',
        to: req.body.email,
        subject: 'Feedback',
        template: "mail",
        context: {},
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
            console.log("Message send");
        }

    });


//отправка 2 сообщения администратору
    transporter.sendMail({
        from: 'simakov.evgens@gmail.com',
        to: 'info@dinamicka.com',
        subject: 'New message from contact',
        template: "admin-message",
        context: {
            'name': req.body.name,
            'email': req.body.email,
            'subject': req.body.subject,
            'textarea': req.body.messageText
        },
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
            console.log("Message send");
        }

    });
    res.end();
};

