var connection = require('../../connection/sql');

function putEdit(req, res, next) {

    connection.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        var value = req.params.id;
        console.log(value)

        var sql = 'UPDATE `projects` SET `author`="' + req.body.author + '", `description`="' + req.body.desc + '", `title`="' + req.body.title + '", `category`="' + req.body.category + '" WHERE `ID`="' + value + '"';
        conn.query(sql, value, function(err, rows) {

            if (err) console.log(err.stack);

            var data = rows[0];

            res.end();

            conn.release();
        });
    });
};

module.exports = putEdit;