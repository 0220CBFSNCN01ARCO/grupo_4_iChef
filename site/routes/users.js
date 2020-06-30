var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

const usersController = require('../controllers/usersController');
const {check, validationResult, body} = require('express-validator');
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require ('../middleware/authMiddleware');

const db = require('../database/models');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      //console.log(req);
      let fecha = moment().format('DD-MM-YYYY');

      let nombre = req.body.emailUser.split('@');
      //console.log(nombre);

      cb(null, nombre[0] + '-' + fecha + path.extname(file.originalname))
    }
  })

var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/',authMiddleware, usersController.userList);

router.get('/register' , guestMiddleware ,usersController.userRegister);

router.post('/create',
[
  check("nombreUser").isLength({ min: 4 }).withMessage("Debe ingresar un nombre valido."),
  check("apellidoUser").isLength({ min: 4 }).withMessage("Debe ingresar un apellido valido."),
  check("nroTelefonoUser").isLength({ min: 10 }).withMessage("Debe ingresar un número de telefono."),
  check("emailUser").isEmail().withMessage("Debe ingresar un email valido."),
  check("passwordUser").isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo de 8 caracteres."),
  check("repeatPasswordUser").isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo de 8 caracteres."),
  body("emailUser").custom(function(value){
    db.User.findOne({
      where: {
        email: value
      }
    }
    )
    .then(function(usuario){
      if(usuario){
        return false;
      }
      return true;
    }).catch(function(error){
      //console.log(error);
      return false;
    });
  }).withMessage("El email ingresado ya existe."),
  body("fotoPerfil").custom(function(value){
      //console.log("Dato foto:" + value);
      if(value == ''){
        return false;
      }
      return true;
  }).withMessage("Debe seleccionar una imagen de perfil.")
]

,upload.single('fotoPerfil'), usersController.createUser);

router.get('/login', usersController.userLogin);

router.post('/login',
[
check("emailUsuario").isEmail().withMessage("Debe ingresar un email valido."),
check("passwordUsuario").isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo de 8 caracteres."),
body("emailUsuario").custom(function(value){
  return db.User.findOne({
      where: {
        email: value
      }
  })
  .then(function(usuario){
    if(usuario == null){
      Promise.reject("El email ingresado no existe.")}
  })
  .catch(function(error){
    //console.log(error);
    return false;
  });
  })
]
,usersController.loguearUsuario);

router.get('/logout', usersController.logoutUser);

router.get('/userprofile', usersController.userprofile);

router.get('/:id/edit', usersController.userEdit);

router.put('/:id/edit', usersController.updateUser);

router.delete('/:idUser', usersController.deleteUserById);

module.exports = router;
