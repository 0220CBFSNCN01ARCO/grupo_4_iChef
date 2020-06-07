
let indexController = {
    getIndex: function (req, res, next) {

        let usuario;
        res.render('index', { title: 'iChef' });
      }
};

module.exports = indexController;


