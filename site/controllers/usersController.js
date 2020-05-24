const fs = require('fs');


let usersController = {
    userRegister: function (req, res, next) {
        res.render('register', { title: 'Registro',
                                 subtitle: 'Registro usuario' });
      },
    userList: function (req, res, next) {
        let usuariosJSON = fs.readFileSync('./data/users.json',{ encoding:'utf-8'});
        let users;
        if(usuariosJSON == ""){
          users = [];
        }else{
          users = JSON.parse(usuariosJSON);
        }
        console.log(users);

        res.render('usersList', { title: 'Usuarios',
                                  subtitle: 'Listado usuarios',
                                  usuarios: users });
      }
};

module.exports = usersController;