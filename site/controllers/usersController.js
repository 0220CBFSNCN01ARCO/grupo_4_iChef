const fs = require('fs');
const {check, validationResult, body} = require('express-validator');
const bcrypt = require('bcrypt');
const saltNumber = 10;

let usersController = {
    userRegister: function (req, res, next) {
        res.render('register', { title: 'Registro',
                                 subtitle: 'Registro usuario',
                                 usuario: req.session.usuarioLogueado});
      },
    createUser: function (req, res, next) {
      //console.log(req);
      if(req.body.passwordUser != req.body.repeatPasswordUser){
        res.render('register', { title: 'Registro',
        subtitle: 'Registro usuario',
        usuario: req.session.usuarioLogueado });
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
                                        mensaje: mensaje,
                                        usuario: req.session.usuarioLogueado });
      }
    },

    userLogin: function (req, res, next) {
        res.render('login', { title: 'Login',
                              usuario: req.session.usuarioLogueado });
    },

    loguearUsuario: function(req, res, next) {

      let errores = validationResult(req);
      console.log(errores);

      if(errores.isEmpty()){
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
          return res.render('login',{ title: 'Login'});
        }
        //console.log(req.body);
        //console.log(usuarioLoguear);
        req.session.usuarioLogueado = usuarioLoguear;
        if(req.body.checkRecordame != undefined){
          res.cookie('recordame', usuarioLoguear.email, { maxAge: 120000 })
        }
        //res.render('index', { title: 'iChef', usuario: usuarioLoguear });
        return res.redirect('/');
      }else{
        return res.render('login',{ title: 'Login',
                             errores: errores.errors });
      }

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
                                  usuarios: users,
                                  usuario: req.session.usuarioLogueado });
      },
      logoutUser: function (req, res, next) {
        //req.session.destroy();
        //res.redirect('/');
        req.session.destroy((error) => {
          res.redirect('/users/login')
        });
      },
      userprofile: function (req, res, next) {
        res.render('userProfile', { title: 'Perfil',
                              usuario: req.session.usuarioLogueado });
      }
};

module.exports = usersController;