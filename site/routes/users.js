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
  check("nombreUser").isLength({ min: 8 }).withMessage("Debe ingresar un nombre de usuario valido."),
  check("apellidoUser").isLength({ min: 8 }).withMessage("Debe ingresar un apellido de usuario valido."),
  check("nroTelefonoUser").isNumeric({ no_symbols: false }).withMessage("Debe ingresar un numero de telefono."),
  check("emailUser").isEmail().withMessage("Debe ingresar un email valido."),
  check("passwordUser").isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo de 8 caracteres."),
  check("repeatPasswordUser").isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo de 8 caracteres."),
  body("emailUser").custom(function(value){
    let usuariosJSON = fs.readFileSync('./data/users.json',{ encoding:'utf-8'});
    let users;
    if(usuariosJSON == ""){
      users = [];
    }else{
      users = JSON.parse(usuariosJSON);
    }
    for(let i = 0;i< users.length ;i++){
      if(users[i].email == value){
        return false;
      }
    }
    return true;
  }).withMessage("El email ingresado ya existe.")
]

,upload.single('fotoPerfil'), usersController.createUser);

router.get('/login', usersController.userLogin);

router.post('/login',
[
check("emailUsuario").isEmail().withMessage("Debe ingresar un email valido."),
check("passwordUsuario").isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo de 8 caracteres."),
body("emailUsuario").custom(function(value){
    let usuariosJSON = fs.readFileSync('./data/users.json',{ encoding:'utf-8'});
    let users;
    if(usuariosJSON == ""){
      users = [];
    }else{
      users = JSON.parse(usuariosJSON);
    }
    for(let i = 0;i< users.length ;i++){
      if(users[i].email == value){
        return true;
      }
    }
    return false;
  }).withMessage("El email ingresado no existe.")
]
,usersController.loguearUsuario);

router.get('/logout', usersController.logoutUser);

router.get('/userprofile', usersController.userprofile);

module.exports = router;
