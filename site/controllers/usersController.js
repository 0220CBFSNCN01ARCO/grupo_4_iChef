const fs = require('fs');
const {check, validationResult, body} = require('express-validator');
const bcrypt = require('bcrypt');
const saltNumber = 10;
const db = require('../database/models');
const jwt = require('jsonwebtoken');

const generateToken = (datoUser) => {
  let privateKey = "secret"
  jwt.sign(
    { user: { email: datoUser}  },
    privateKey,
    { expiresIn: '1h' },
    function(err, token) {
      return res.json(token);
    });
}

let usersController = {
    userRegister: function (req, res, next) {
        res.render('register', { title: 'iChef - Registro',
                                 subtitle: 'Registro usuario',
                                 usuario: req.session.usuarioLogueado});
    },
    createUser: function (req, res, next) {
      let errores = validationResult(req);
      //console.log(errores);
      if(errores.isEmpty()){
        if(req.body.passwordUser != req.body.repeatPasswordUser){
          return res.render('register', { title: 'iChef - Registro',
                                          errores: [{ value: '',
                                                      msg: 'Las contraseñas no coinciden.',
                                                      param: 'passwordUser',
                                                      location: 'body'
                                                    }] });
        }else {
            try{
              let usuario = db.User.findOne({where: {email: req.body.emailUsuario}});
              console.log(usuario);
              if (usuario){
                return res.render('register', { title: 'Registro',
                                          errores: [{ value: '',
                                                      msg: 'El email ingresado ya existe.',
                                                      param: 'emailUser',
                                                      location: 'body'
                                                    }] });
              }else{
                db.User.create({
                  nombre: req.body.nombreUser,
                  apellido: req.body.apellidoUser,
                  email: req.body.emailUser.toLowerCase(),
                  password: bcrypt.hashSync(req.body.passwordUser, saltNumber),
                  nroTelefono: req.body.nroTelefonoUser,
                  categorie_id: 4,
                  avatar: req.file.filename
                });
                return res.render('userMsg', { title: 'Usuario',
                                                tipo: 'success',
                                                mensaje: newUsuario.nombre,
                                                errores: errores.errors,
                                                usuario: req.session.usuarioLogueado });
              }
          }catch(error){
              return res.render('errordb', { title: 'Error',
                                                      error: error,
                                                      usuario: req.session.usuarioLogueado });
                    }
        }
      } else{
        return res.render('register',{ title: 'Registro',
                                    errores: errores.errors });
      }
    },
    userLogin: function (req, res, next) {
        return res.render('login', { title: 'iChef - Login',
                              usuario: req.session.usuarioLogueado });
    },
    loguearUsuario: async function(req, res, next) {
      let errores = validationResult(req);
      //console.log(errores);
      //console.log("loguear usuario");
      if(errores.isEmpty()){
        try{
            let usuarioLoguear = await db.User.findOne({where: {email: req.body.emailUsuario}});
            if(usuarioLoguear === null){
              return res.render('login', {  title: 'iChef - Login',
                                            errores: [{ value: '',
                                                      msg: 'El email ingresado no existe.',
                                                      param: 'emailUsuario',
                                                      location: 'body'}
                                                    ],
                                            emailIngresado: req.body.emailUsuario,
                                            usuario: req.session.usuarioLogueado });
            }else {
                //console.log(usuarioLoguear);
                if (bcrypt.compareSync(req.body.passwordUsuario,usuarioLoguear.password))
                {
                  req.session.usuarioLogueado = usuarioLoguear;
                  if(req.body.checkRecordame != undefined){
                    res.cookie('recordame', usuarioLoguear.email, { maxAge: 120000 })
                  }

                  return res.redirect(301, '/');
                }else{
                    return res.render('login', { title: 'Login',
                                                errores: [{ value: '',
                                                              msg: 'Contraseña incorrecta.',
                                                              param: 'passwordUsuario',
                                                              location: 'body'}
                                                            ],
                                                emailIngresado: req.body.emailUsuario,
                                                usuario: req.session.usuarioLogueado });
                }
            }
        }catch(error){
              console.log(error);
              return res.render('login', { title: 'Login',
                                             errores: [{ value: '',
                                                          msg: 'Error al validar usuario.',
                                                          param: 'passwordUsuario',
                                                          location: 'body'}
                                                        ],
                                             emailIngresado: req.body.emailUsuario,
                                             usuario: req.session.usuarioLogueado });
            }
      }else{
            return res.render('login',{ title: 'Login',
                                        errores: errores.errors });
      }
    },
    userList: function (req, res, next) {
      db.User.findAll(
        {include:[{association: "categoriaUsuario"},
                  {association: "estadoUsuario"} ]}
      )
      .then(function(usuarios){
        return res.render('usersList', { title: 'iChef - Usuarios',
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
        return res.render('userProfile', { title: 'iChef - Perfil usuario',
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
        return res.render('userProfile', { title: 'iChef - Editar perfil',
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
        res.render('message', { title: 'iChef - Usuario',
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
          return res.render('changePassword', { title: 'iChef - Cambiar contraseña',
                                                usuarioEdit: usuarioEdit,
                                                usuario: req.session.usuarioLogueado });
        })
      .catch(function(error){
        return res.render('errordb', { title: 'Error',
                                        error: error,
                                        usuario: req.session.usuarioLogueado });
      });
    },
    updatePassword: async function (req, res, next) {
      let errores = validationResult(req);
      console.log(errores)
      if(errores.isEmpty()){
        try {
          let usuario = await db.User.findByPk(req.params.id);
          let checkPass = bcrypt.compareSync(req.body.passwordUser,usuario.password);
          if(!checkPass){
            return res.render('changePassword', { title: 'iChef - Cambiar contraseña',
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
              let newPasswor = bcrypt.hashSync(req.body.passwordUser, saltNumber);
              db.User.update({password: newPasswor},
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
        }catch(error){
              return res.render('errordb', { title: 'Error',
                                        error: error,
                                        usuario: req.session.usuarioLogueado });
        }
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
        return res.render('userAccount', { title: 'iChef - Cuenta usuario',
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