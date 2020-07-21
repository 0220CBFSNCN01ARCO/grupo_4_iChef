var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const bcrypt = require('bcrypt');

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
    },
    fileFilter: function (req, file, cb) {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "image/gif") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Solamente .png, .jpg .jpeg .gif formatos permitidos!'));
      }
    }
  })

var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/',authMiddleware, usersController.userList);

router.get('/register' , guestMiddleware ,usersController.userRegister);

router.post('/create', upload.single('fotoPerfil'),
[
  check("nombreUser")
    .isLength({ min: 2 })
    .withMessage("Debe ingresar un nombre valido."),
  check("apellidoUser")
    .isLength({ min: 2 })
    .withMessage("Debe ingresar un apellido valido."),
  check("nroTelefonoUser")
    .isLength({ min: 7 })
    .withMessage("Debe ingresar un número de telefono."),
  check("emailUser")
    .isEmail()
    .normalizeEmail()
    .withMessage("Debe ingresar un email valido."),
  check("passwordUser")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."),
  check("repeatPasswordUser")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."),
  body("fotoPerfil")
    .custom(function(value){
      //console.log("Dato foto:" + value);
      if(value == ''){
        return false;
      }
      return true;
    })
    .withMessage("Debe seleccionar una imagen de perfil.")
]

, usersController.createUser);

router.get('/login', usersController.userLogin);

router.post('/login',
[
check("emailUsuario")
  .isEmail()
  .normalizeEmail()
  .withMessage("Debe ingresar un email valido.")
],
usersController.loguearUsuario);

router.get('/logout', usersController.logoutUser);
router.get('/:id/userprofile', usersController.userProfile);

router.get('/:id/userAccount', usersController.userAccount);

router.get('/:id/edit', usersController.userEdit);
router.put('/:id/edit', upload.single('fotoPerfil'),
[
  check("nombreUser")
    .isLength({ min: 2 })
    .withMessage("Debe ingresar un nombre valido."),
  check("apellidoUser")
    .isLength({ min: 2 })
    .withMessage("Debe ingresar un apellido valido."),
  check("nroTelefonoUser")
    .isLength({ min: 7 })
    .withMessage("Debe ingresar un número de telefono.")
]
 ,usersController.updateUser);

router.get('/:id/changePassword', usersController.changePassword);
router.put('/:id/changePassword',
[
  check("passwordUser")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."),
  check("passwordUserNew")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."),
  check("repeatPasswordUserNew")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial.")
  ]
 ,usersController.updatePassword);

router.delete('/:idUser', usersController.deleteUserById);

module.exports = router;
