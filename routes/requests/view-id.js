var connection = require('../../connection/sql');

function viewId(req, res, next) {

    connection.getConnection(function(err, conn){

        if (err) {
            console.log(err.stack);
            return;
        }

        var value = req.params.id;
        var sql = 'SELECT * FROM `projects` WHERE `ID`=' + '"' + value + '"';
        conn.query(sql, value, function(err, rows) {

            if (err) console.log(err.stack);

            var data = rows[0];

            var readableDate = new Date(data.date);
            // Трансформируем дату
            data.date = readableDate.toLocaleDateString('en-GB', { year: 'numeric', day: 'numeric', month: 'long' });

            res.render('view', data);

            conn.release();
        });
    });
};

module.exports = viewId;