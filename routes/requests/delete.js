var connection = require('../../connection/sql');

function deleteId(req, res, next) {
    if(req.session.login){
        connection.getConnection(function(err, conn){

            if (err) {
                console.log(err.stack);
                return;
            }

            var value = req.params.id;
            console.log(value)

            var sql = 'DELETE FROM `projects` WHERE `ID`="' + value + '"';
            conn.query(sql, value, function(err, rows) {

                if (err) console.log(err.stack);

                res.render('index');

                conn.release();
            });
        });
    } else {
        res.send('fail');
    }
};

module.exports = deleteId;