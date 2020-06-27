const fs = require('fs');
const {check, validationResult, body} = require('express-validator');
const bcrypt = require('bcrypt');
const saltNumber = 10;
const db = require('../database/models');

let usersController = {
    userRegister: function (req, res, next) {
        res.render('register', { title: 'Registro',
                                 subtitle: 'Registro usuario',
                                 usuario: req.session.usuarioLogueado});
    },
    createUser: function (req, res, next) {
      let errores = validationResult(req);

      //console.log(req.body);
      //console.log(errores.errors);

      if(errores.isEmpty()){
        if(req.body.passwordUser != req.body.repeatPasswordUser){
          return res.render('register', { title: 'Registro',
                                          errores: errores.errors });
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
                                          errores: errores.errors,
                                          usuario: req.session.usuarioLogueado });
        }
      }
      else{
        return res.render('register',{ title: 'Registro',
                                    errores: errores.errors });
      }
    },

    userLogin: function (req, res, next) {
        return res.render('login', { title: 'Login',
                              usuario: req.session.usuarioLogueado });
    },

    loguearUsuario: function(req, res, next) {

      let errores = validationResult(req);
      //console.log(errores);

      if(errores.isEmpty()){
        db.User.findOne({
          where: {
            email: req.body.emailUsuario
          }
          }
        )
        .then(function(usuario){

          if(bcrypt.compareSync(req.body.passwordUsuario,usuario.password)){
            req.session.usuarioLogueado = usuario;
            if(req.body.checkRecordame != undefined){
              res.cookie('recordame', usuario.email, { maxAge: 120000 })
            }
            return res.redirect('/');
          }else{
              return res.render('login',{ title: 'Login',
                                      errores: [
                                        {
                                          value: '',
                                          msg: 'Contraseña invalida.',
                                          param: 'passwordUsuario',
                                          location: 'body'
                                        }
                                      ] });
          }
        }).catch(function(error){
          //console.log(error);
          return res.render('login',{ title: 'Login',
                                      errores: errores.errors });
        });
      }else{
        return res.render('login',{ title: 'Login',
                             errores: errores.errors });
      }

    },

    userList: function (req, res, next) {
        db.User.findAll(
          {include:[{association: "categoriaUsuario"}]}
        )
        .then(function(usuarios){
          return res.render('usersList', { title: 'Usuarios',
                                          usuarios: usuarios,
                                          usuario: req.session.usuarioLogueado });
        }).catch(function(error){
          //console.log(error);
          return res.render('errordb', { title: 'Error',
                                         error: error,
                                         usuario: req.session.usuarioLogueado });
        });
      },
      logoutUser: function (req, res, next) {
        //req.session.destroy();
        //res.redirect('/');
        req.cookies.recordame = undefined;
        req.session.destroy((error) => {
          return res.redirect('/users/login')
        });
      },
      userprofile: function (req, res, next) {
        //console.log(req.session.usuarioLogueado.id);
        db.User.findByPk(req.session.usuarioLogueado.id)
        .then(function(usuarioEdit){
          return res.render('userProfile', { title: 'Perfil',
                                             usuarioEdit: usuarioEdit,
                                             usuario: req.session.usuarioLogueado });
          }).catch(function(error){
          return res.render('errordb', { title: 'Error',
                                         error: error,
                                         usuario: req.session.usuarioLogueado });
        });
      },
      userEdit: function (req, res, next) {
        db.User.findByPk(req.params.id)
        .then(function(usuarioEdit){
          //console.log(usuarioEdit)
          return res.render('userEdit', { title: 'Editar perfil',
                                    usuarioEdit: usuarioEdit,
                                    usuario: req.session.usuarioLogueado });
        }).catch(function(error){
          //console.log(error);
          return res.render('errordb', { title: 'Error',
                                         error: error,
                                         usuario: req.session.usuarioLogueado });
        });
      },
      updateUser: function (req, res, next) {
        db.User.findByPk(req.params.id)
        .then(function(usuarioEdit){
          //console.log(usuarioEdit)
          return res.render('userEdit', { title: 'Editar perfil',
                                    usuarioEdit: usuarioEdit,
                                    usuario: req.session.usuarioLogueado });
        }).catch(function(error){
          //console.log(error);
          return res.render('errordb', { title: 'Error',
                                         error: error,
                                         usuario: req.session.usuarioLogueado });
        });
      }
};

module.exports = usersController;