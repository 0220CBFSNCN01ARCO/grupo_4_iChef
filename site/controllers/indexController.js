
let indexController = {
    getIndex: function (req, res, next) {
        res.render('index', { title: 'iChef' });
      }
};

module.exports = indexController;


