let infoController = {
    getContact: function (req, res, next) {
      return res.render('contact', { title: 'iChef - Contacto',
                                     usuario: req.session.usuarioLogueado });
    },
    getNosotros: function (req, res, next) {
        res.render('nosotros', { title: 'iChef - Nosotros',
                                 usuario: req.session.usuarioLogueado });
      },
    getStaff: function (req, res, next) {
        res.render('staff', { title: 'iChef - Staff',
                              usuario: req.session.usuarioLogueado });
      },
    getGuest: function (req, res, next) {
        res.render('guest', { title: 'iChef - Invitado',
                              usuario: req.session.usuarioLogueado });
    },
    getZonas: function (req, res, next) {
      res.render('zonas', { title: 'iChef - Zonas de entrega',
                            usuario: req.session.usuarioLogueado });
  }

};

module.exports = infoController;