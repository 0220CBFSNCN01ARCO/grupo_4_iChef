
let indexController = {
    getIndex: function (req, res, next) {
        res.render('index', { title: 'iChef' });
      },
    up: function (req, res, next) {
        res.render('uploadImage', { title: 'Load' });
      }

};

module.exports = indexController;


