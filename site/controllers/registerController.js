
let registerController = {
    getRegister: function (req, res, next) {
        res.render('register', { title: 'Formulario registro' });
      }


};

module.exports = registerController;