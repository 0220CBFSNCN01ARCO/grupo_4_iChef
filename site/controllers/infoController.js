let db = require('../database/models');


let infoController = {
    getContact: function (req, res, next) {

        db.User.findAll()
        .then(function(usuarios){
          return res.render('contact', { title: 'Contacto',
                                         listaUsuarios: usuarios,
                                         usuario: req.session.usuarioLogueado });
        });
    },
    getNosotros: function (req, res, next) {
        res.render('nosotros', { title: 'Nosotros',usuario: req.session.usuarioLogueado });
      },
    getStaff: function (req, res, next) {
        res.render('staff', { title: 'Staff',usuario: req.session.usuarioLogueado });
      },
    getGuest: function (req, res, next) {
        res.render('guest', { title: 'Invitado', usuario: req.session.usuarioLogueado });
    }

};

module.exports = infoController;