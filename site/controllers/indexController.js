
let indexController = {
    getIndex: function (req, res, next) {
        //console.log("Usuario logueado: " + req.session);
        //console.log("Usuario logueado: " + req.session.usuarioLogueado);
        res.render('index', { title: 'iChef', usuario: req.session.usuarioLogueado });
    }
};

module.exports = indexController;


