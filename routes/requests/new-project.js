module.exports = function(req, res, next) {
    if(req.session.login){
        res.render('new', { title: 'Express' });
    } else {
        res.render('autorization', { title: 'Express' });
    }
};