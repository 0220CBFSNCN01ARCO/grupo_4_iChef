
let indexController = {
    getIndex: function (req, res, next) {
        res.render('index', { title: 'iChef' });
      },
    getContact: function (req, res, next) {
      res.render('contact', { title: 'iChef' });
    }
};

module.exports = indexController;


