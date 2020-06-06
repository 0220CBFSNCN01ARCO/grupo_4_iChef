const fs = require('fs');
const bcrypt = require('bcrypt');
const saltNumber = 10;

let usersController = {
    userRegister: function (req, res, next) {
        res.render('register', { title: 'Registro',
                                 subtitle: 'Registro usuario' });
      },
    createUser: function (req, res, next) {
      //console.log(req);

      if(req.body.passwordUser != req.body.repeatPasswordUser){
        res.render('register', { title: 'Registro',
        subtitle: 'Registro usuario' });
      }else {
          let usuariosJson = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});
          let usuarios = JSON.parse(usuariosJson);

          let idUser = usuarios.length + 1;

          let passEncriptado = bcrypt.hashSync(req.body.passwordUser, saltNumber);

          let newUser = {
            id: idUser,
            nombre: req.body.nombreUser,
            apellido: req.body.apellidoUser,
            email: req.body.emailUser,
            password: passEncriptado,
            nroTelefono: req.body.nroTelefonoUser,
            rol: 2,
            imagen: req.file.filename
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

    loguearUsuario: function(req, res, next) {

      let usuariosJSON = fs.readFileSync('./data/users.json',{ encoding:'utf-8'});
      let users;
      if(usuariosJSON == ""){
        users = [];
      }else{
        users = JSON.parse(usuariosJSON);
      }

      let usuarioLoguear = users.find(function(user){
          return user.email == req.body.emailUsuario && bcrypt.compareSync (req.body.passwordUsuario,user.password);
      });

      if(usuarioLoguear == undefined){
          res.render('error',{ title: 'Usuario' });
      }


      console.log(req.body);

      console.log(usuarioLoguear);
      req.session.usuarioLogueado = usuarioLoguear;
      res.render('index', { title: 'iChef' });
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