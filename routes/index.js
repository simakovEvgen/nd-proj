var express = require('express');
var router = express.Router();
var multer = require('multer');

var upload = multer({dest: 'uploads'});
var type = upload.single('sample_file');

var home = require('./requests/home');
var contact = require('./requests/contact');

router.get('/', function(req,res,next) {res.redirect('/home');});
router.get('/home', require('./requests/home'));
router.get('/contact', require('./requests/contact'));
router.get('/view/:id', require('./requests/view-id'));
router.get('/edit/:id', require('./requests/edit-id'));
router.get('/new', require('./requests/new-project'));
router.get('/all', require('./requests/portfolio-show-requests').all);
router.get('/print', require('./requests/portfolio-show-requests').print);
router.get('/photo', require('./requests/portfolio-show-requests').photo);
router.get('/web', require('./requests/portfolio-show-requests').web);
router.get('/app', require('./requests/portfolio-show-requests').app);
router.get('/autorization', require('./requests/autorization'));
router.get('/forgotpass', require('./requests/forgotpass'));
router.get('/passrecover/:token', require('./requests/new-pass-start'));

router.post('/upload', type, require('./requests/file-put'));
router.post('/email', require('./requests/emailsend'));
router.post('/login', require('./requests/login'));
router.post('/logincheck', require('./requests/logincheck'));
router.post('/newpass', require('./requests/new-pass-end'));

router.put('/edit/:id', require('./requests/edit-put'));

router.delete('/delete/:id', require('./requests/delete'));

module.exports = router;
