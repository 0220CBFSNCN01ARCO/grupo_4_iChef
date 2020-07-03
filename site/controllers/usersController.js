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
      console.log(errores);
      if(errores.isEmpty()){
        if(req.body.passwordUser != req.body.repeatPasswordUser){
          return res.render('register', { title: 'Registro',
                                          errores: [{ value: '',
                                                      msg: 'Las contraseñas no coinciden.',
                                                      param: 'passwordUser',
                                                      location: 'body'
                                                    }] });
        }else {
            console.log(req.body);
            console.log(req.file);
            let newUser = db.User.create({
                                        nombre: req.body.nombreUser,
                                        apellido: req.body.apellidoUser,
                                        email: req.body.emailUser,
                                        password: bcrypt.hashSync(req.body.passwordUser, saltNumber),
                                        nroTelefono: req.body.nroTelefonoUser,
                                        categorie_id: 4,
                                        avatar: req.file.filename
                                      })
                                      .then(function(newUsuario){
                                          return res.render('userMsg', { title: 'Usuario',
                                                                      tipo: 'success',
                                                                      mensaje: newUsuario.nombre,
                                                                      errores: errores.errors,
                                                                      usuario: req.session.usuarioLogueado });
                                        })
                                      .catch(function(error){
                                        return res.render('errordb', { title: 'Error',
                                                                        error: error,
                                                                        usuario: req.session.usuarioLogueado });
                                      });
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
      console.log(errores);
      console.log("loguear usuario");
      if(errores.isEmpty()){
        db.User.findAll()
          .then(function (users){
              let usuarioLoguear = users.find(function(user){
                  return user.email == req.body.emailUsuario && bcrypt.compareSync (req.body.passwordUsuario,user.password);
              });
              if(usuarioLoguear == undefined){
                return res.render('login',{ title: 'Login'});
              }else{
                  //console.log(req.body);
                  //console.log(usuarioLoguear);
                  req.session.usuarioLogueado = usuarioLoguear;
                  if(req.body.checkRecordame != undefined){
                    res.cookie('recordame', usuarioLoguear.email, { maxAge: 120000 })
                  }
                //res.render('index', { title: 'iChef', usuario: usuarioLoguear });
                return res.redirect('/');
              }
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
    userProfile: function (req, res, next) {
      //console.log(req.session.usuarioLogueado.id);
      db.User.findByPk(req.params.id)
      .then(function(usuarioEdit){
        return res.render('userProfile', { title: 'Perfil usuario',
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
        return res.render('userProfile', { title: 'Editar perfil',
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
      //console.log(req.file)
      db.User.update({
          nombre: req.body.nombreUser,
          apellido: req.body.apellidoUser,
          email: req.body.emailUser,
          nroTelefono: req.body.nroTelefonoUser
          //avatar: req.file.filename
      },
      { where:{
          id: req.params.id
        }})
      .then(function(usuarioEdit){
        //console.log(usuarioEdit)
        return res.redirect(301, 'userAccount' );
      })
      .catch(function(error){
        //console.log(error);
        return res.render('errordb', { title: 'Error',
                                        error: error,
                                        usuario: req.session.usuarioLogueado });
      });
    },
    deleteUserById: function (req, res, next) {
      db.User.destroy({
        where: {id: req.params.idUser }
      })
      .then(function(result){
        //console.log(result)
        let mensaje = "Usuario eliminado correctamente"
        res.render('message', { title: 'Usuario',
                                tipo: 'success',
                                mensaje: mensaje,
                                usuario: req.session.usuarioLogueado });
      })
      .catch(function(error){
          return res.render('errordb', { title: 'Error',
                                          error: error,
                                          usuario: req.session.usuarioLogueado });
        });
    },
    changePassword: function (req, res, next) {
      db.User.findByPk(req.params.id)
      .then(function(usuarioEdit){
          return res.render('changePassword', { title: 'Cambiar contraseña',
                                                usuarioEdit: usuarioEdit,
                                                usuario: req.session.usuarioLogueado });
        })
      .catch(function(error){
        return res.render('errordb', { title: 'Error',
                                        error: error,
                                        usuario: req.session.usuarioLogueado });
      });
    },
    updatePassword: function (req, res, next) {
      let errores = validationResult(req);
      console.log(errores)
      if(errores.isEmpty()){
        db.User.findByPk(req.params.id)
        .then(function(usuario){
            let checkPass = bcrypt.compareSync(req.body.passwordUser,usuario.password);
            if(!checkPass){
              return res.render('changePassword', { title: 'Cambiar contraseña',
                                                    usuarioEdit: usuario,
                                                    errores: [{ value: '',
                                                                msg: 'Las contraseña anterior no coincide.',
                                                                param: 'passwordUser',
                                                                location: 'body'}],
                                                    usuario: req.session.usuarioLogueado });
            }else {
              if (req.body.passwordUserNew != req.body.repeatPasswordUserNew){
                  return res.render('changePassword', { title: 'Cambiar contraseña',
                                                    usuarioEdit: usuario,
                                                    errores: [{ value: '',
                                                                msg: 'Las contraseñas no coinciden.',
                                                                param: 'passwordUserNew',
                                                                location: 'body'},
                                                                { value: '',
                                                                  msg: 'Las contraseñas no coinciden.',
                                                                  param: 'repeatPasswordUserNew',
                                                                  location: 'body'}
                                                              ],
                                                    usuario: req.session.usuarioLogueado });
              }else{
                db.User.update({
                  password: req.body.passwordUser
                  },
                  { where:{
                      id: req.params.id
                    }})
                  .then(function(usuarioEdit){
                      return res.redirect(301, 'userAccount' );
                    })
                  .catch(function(error){
                      return res.render('errordb', { title: 'Error',
                                                    error: error,
                                                    usuario: req.session.usuarioLogueado });
                });
              }
            }
        })
        .catch(function(error){
        return res.render('errordb', { title: 'Error',
                                        error: error,
                                        usuario: req.session.usuarioLogueado });
        });
      } else {
          return res.render('changePassword',{ title: 'Cambiar contraseña',
                                             errores: errores.errors,
                                             usuario: req.session.usuarioLogueado });
        }
    },
    userAccount: function (req, res, next) {
      //console.log(req.session.usuarioLogueado.id);
      db.User.findByPk(req.params.id)
        .then(function(usuarioEdit){
        return res.render('userAccount', { title: 'Cuenta usuario',
                                            usuarioEdit: usuarioEdit,
                                            usuario: req.session.usuarioLogueado });
        })
        .catch(function(error){
        return res.render('errordb', { title: 'Error',
                                        error: error,
                                        usuario: req.session.usuarioLogueado });
      });
    }
};

module.exports = usersController;