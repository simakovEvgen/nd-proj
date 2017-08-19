var connection = require('../../connection/sql');

function viewId(req, res, next) {

    if(req.session.login){
        connection.getConnection(function(err, conn){

            if (err) {
                console.log(err.stack);
                return;
            }

            var value = req.params.id;
            console.log(value)

            var sql = 'SELECT * FROM `projects` WHERE `ID`=' + '"' + value + '"';
            conn.query(sql, value, function(err, rows) {

                if (err) console.log(err.stack);

                var data = rows[0];

                res.render('edit', data);

                conn.release();
            });
        });
    }
    else {
        res.redirect('/autorization');
    }
};

module.exports = viewId;