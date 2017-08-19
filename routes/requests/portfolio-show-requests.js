var connection = require('../../connection/sql');

function All(req, res, next) {

    connection.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        var sql = 'SELECT * FROM `projects`';
        conn.query(sql, function(err, rows) {

            if (err) console.log(err.stack);

            var data = [];

            for(let i = 0; i < rows.length; i++) {
                data.push(rows[i]);
            }

            res.header('Content-Type', 'application/json');
            res.status(200).send(data);

            console.log('query to database successful');
            conn.release();
        });
    });
};

function Print(req, res, next) {

    connection.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        var sql = 'SELECT * FROM `projects` WHERE CATEGORY="print"';
        conn.query(sql, function(err, rows) {

            if (err) console.log(err.stack);

            var data = [];

            for(let i = 0; i < rows.length; i++) {
                data.push(rows[i]);
            }

            res.header('Content-Type', 'application/json');
            res.status(200).send(data);

            console.log('query to database successful');
            conn.release();
        });
    });
};

function Photo(req, res, next) {

    connection.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        var sql = 'SELECT * FROM `projects` WHERE CATEGORY="photography"';
        conn.query(sql, function(err, rows) {

            if (err) console.log(err.stack);

            var data = [];

            for(let i = 0; i < rows.length; i++) {
                data.push(rows[i]);
            }

            res.header('Content-Type', 'application/json');
            res.status(200).send(data);

            console.log('query to database successful');
            conn.release();
        });
    });
};

function Web(req, res, next) {

    connection.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        var sql = 'SELECT * FROM `projects` WHERE CATEGORY="web"';
        conn.query(sql, function(err, rows) {

            if (err) console.log(err.stack);

            var data = [];

            for(let i = 0; i < rows.length; i++) {
                data.push(rows[i]);
            }

            res.header('Content-Type', 'application/json');
            res.status(200).send(data);

            console.log('query to database successful');
            conn.release();
        });
    });
};

function App(req, res, next) {

    connection.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        var sql = 'SELECT * FROM `projects` WHERE CATEGORY="applications"';
        conn.query(sql, function(err, rows) {

            if (err) console.log(err.stack);

            var data = [];

            for(let i = 0; i < rows.length; i++) {
                data.push(rows[i]);
            }

            res.header('Content-Type', 'application/json');
            res.status(200).send(data);

            console.log('query to database successful');
            conn.release();
        });
    });
};

module.exports = {
    all: All,
    print: Print,
    photo: Photo,
    web: Web,
    app: App
};