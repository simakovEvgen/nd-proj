var path = require('path');
var fs = require('fs');
var sharp = require('sharp');
var connection = require('../../connection/sql');

function getFile(req, res) {

    // загруженный файл доступен через свойство req.file
    console.log(req.file);
    console.log(req.body);

    // файл временного хранения данных
    var tmp_path = req.file.path;

    // место, куда файл будет загружен
    var target_path = path.join('public/'+req.file.destination, req.file.originalname);

    console.log(req.file.destination);

    // загрузка файла
    var dest = fs.createWriteStream(target_path);
    var src = fs.createReadStream(tmp_path);

    // Read image data from readableStream,
    // resize to 700x500 pixels wide,
    // emit an 'info' event with calculated dimensions
    // and finally write image data to writableStream
    var transformer = sharp()
        .resize(700, 500)
        .on('info', function(info) {
            console.log('Image height is ' + info.height);
        });
    src.pipe(transformer).pipe(dest);

    src.on('end', function() {

        // удалить файл временного хранения данных
        fs.unlink(tmp_path);

        // добавить в проект в БД
        connection.getConnection(function(err, conn){

            if (err) {
                console.log(err.stack);
                return;
            }

            var date = new Date();
            var curr_date = date.getDay();
            var curr_month = date.getMonth() + 1;
            var curr_year = date.getFullYear();
            var dateStr = curr_year + "-" + curr_month + "-" + curr_date;

            console.log(dateStr);

            var sql = 'INSERT INTO `projects` (`title`, `author`, `category`, `description`, `src`, `date`) VALUES ("'+req.body.title+'", "'+req.body.author+'", "'+req.body.category+'", "'+req.body.description+'", "'+req.file.destination+'/'+req.file.originalname+'", "'+ dateStr +'")';
            conn.query(sql, function(err, rows) {

                if (err) console.log(err.stack);

                res.redirect('/home');

                conn.release();
            });
        });
    });
    src.on('error', function(err) {

        // удалить файл временного хранения данных
        fs.unlink(tmp_path);
        res.send('error');
    });

};

module.exports = getFile;