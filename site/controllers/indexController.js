let indexController = {
    getIndex: function (req, res, next) {
        res.render('index', { title: 'iChef', usuario: req.session.usuarioLogueado });
    }
};

module.exports = indexController;


