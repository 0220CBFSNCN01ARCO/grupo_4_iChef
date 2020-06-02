const fs = require('fs');
const bcrypt = require('bcrypt');
const saltNumber = 10;

let usersController = {
    userRegister: function (req, res, next) {
        res.render('register', { title: 'Registro',
                                 subtitle: 'Registro usuario' });
      },
    createUser: function (req, res, next) {
      //console.log(req.body);

      if(req.body.passwordUser != req.body.repeatPasswordUser){
        res.render('register', { title: 'Registro',
        subtitle: 'Registro usuario' });
      }else {
          let usuariosJson = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});
          let usuarios = JSON.parse(usuariosJson);

          let idUser = usuarios.length;

          let passEncriptado = bcrypt.hashSync(req.body.passwordUser, saltNumber);

          let newUser = {
            id: idUser,
            nombre: req.body.nombreUser,
            apellido: req.body.apellidoUser,
            email: req.body.emailUser,
            password: passEncriptado,
            nroTelefono: req.body.nroTelefonoUser,
            rol: 2,
            imagen: req.body.fotoPerfil
          };

          usuarios.push(newUser);
          fs.writeFileSync('./data/users.json', JSON.stringify(usuarios));

          mensaje = newUser.nombre;
          res.render('userMsg', { title: 'Usuario',
                                        tipo: 'success',
                                        mensaje: mensaje });
      }
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