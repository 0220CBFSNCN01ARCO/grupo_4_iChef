
let infoController = {
    getContact: function (req, res, next) {
      res.render('contact', { title: 'Contacto' });
    },
    getNosotros: function (req, res, next) {
        res.render('nosotros', { title: 'Contacto' });
      },
    getStaff: function (req, res, next) {
        res.render('staff', { title: 'Contacto' });
      }

};

module.exports = infoController;