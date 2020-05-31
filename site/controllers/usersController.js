const fs = require('fs');

let usersController = {
    userRegister: function (req, res, next) {
        res.render('register', { title: 'Registro',
                                 subtitle: 'Registro usuario' });
      },
    userLogin: function (req, res, next) {
        res.render('login', { title: 'Login',
                                 subtitle: 'Login usuario' });
      },

    userList: function (req, res, next) {
        let usuariosJSON = fs.readFileSync('./data/users.json',{ encoding:'utf-8'});
        let users;
        if(usuariosJSON == ""){
          users = [];
        }else{
          users = JSON.parse(usuariosJSON);
        }

        res.render('usersList', { title: 'Usuarios',
                                  usuarios: users });
      }
};

module.exports = usersController;