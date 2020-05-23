
let usersController = {
    userRegister: function (req, res, next) {
        res.render('register', { title: 'Registro' });
      },
    userList: function (req, res, next) {
        res.render('usersList', { title: 'Usuarios' });
      }
};

module.exports = usersController;