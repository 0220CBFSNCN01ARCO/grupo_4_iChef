let infoController = {
    getContact: function (req, res, next) {
      return res.render('contact', { title: 'Contacto',
                                     usuario: req.session.usuarioLogueado });
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