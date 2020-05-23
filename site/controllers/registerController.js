
let registerController = {
    getRegister: function (req, res, next) {
        res.render('register', { title: 'Registro' });
      }


};

module.exports = registerController;