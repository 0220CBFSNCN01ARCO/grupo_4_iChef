var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
//const moment = require('moment');
//const bcrypt = require('bcrypt');

const usersController = require('../controllers/usersController');
const {check, validationResult, body} = require('express-validator');
const guestMiddleware = require('../middleware/guestMiddleware')
const {userNotLogged } = require('../middleware/authMiddleware');

const recordameMiddleware = require ('../middleware/recordameMiddleware');

const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      let dest = 'public/images/users'
      if(!fs.existsSync(dest)){
        fs.mkdirSync(dest)
      }
      callback(null, dest)
    },
    filename: function (req, file, callback) {
      //console.log("filename: ",req.file);
      //console.log("file: ",file)

      //let fecha = moment().format('DD-MM-YYYY');
      let nombre = req.body.emailUser.split('@');
      //console.log(nombre);
      let fileName = nombre[0] + '-userFile' + path.extname(file.originalname);
      callback(null, fileName)
    },
    fileFilter: function (req, file, callback) {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "image/gif") {
        callback(null, true);
      } else {
        callback(null, false);
        return callback(new Error('Solamente .png, .jpg .jpeg .gif formatos permitidos!'));
      }
    }
  });

const upload = multer({ storage: storage }).single("fotoPerfil");

/* GET users listing. */
router.get('/',userNotLogged, usersController.userList);

router.get('/register' , guestMiddleware ,usersController.userRegister);

router.post('/create', upload,
[
  check("nombreUser")
    .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres.")
    .isString().withMessage("El nombre debe contener solo letras.")
    .notEmpty().withMessage("El nombre no puede estar vacio."),
  check("apellidoUser")
    .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres.")
    .notEmpty().withMessage("El apellido no puede estar vacio."),
  check("nroTelefonoUser")
    .matches(/\d/).withMessage("Solo se permiten números.")
    .isLength({ min: 7 }).withMessage("El numero de telefono debe tener al menos 7 caracteres.")
    .notEmpty().withMessage("El nro. de telefono no puede estar vacio."),
  check("emailUser")
    .isEmail().withMessage("Debe ingresar un email valido.")
    .notEmpty().withMessage("El email no puede estar vacio.")
    .normalizeEmail(),
  check("passwordUser")
    //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial.")
    .notEmpty().withMessage("El password no puede estar vacio."),
  check("repeatPasswordUser")
    //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial.")
    .notEmpty().withMessage("El password no puede estar vacio.")
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
router.get('/:id/userprofile', userNotLogged, usersController.userProfile);

router.get('/:id/userAccount', userNotLogged, usersController.userAccount);

router.get('/:id/edit', userNotLogged, usersController.userEdit);
router.put('/:id/edit', upload, userNotLogged,
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

router.get('/:id/changePassword', userNotLogged, usersController.changePassword);
router.put('/:id/changePassword', userNotLogged,
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

router.delete('/:idUser', userNotLogged, usersController.deleteUserById);

router.get('/register' , guestMiddleware ,usersController.userRegister);

router.get('/userAdd', userNotLogged, usersController.userAdd);

router.post('/userAdd', upload,
[
  check("nombreUser")
    .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres.")
    .isString().withMessage("El nombre debe contener solo letras.")
    .notEmpty().withMessage("El nombre no puede estar vacio."),
  check("apellidoUser")
    .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres.")
    .notEmpty().withMessage("El apellido no puede estar vacio."),
  check("nroTelefonoUser")
    .matches(/\d/).withMessage("Solo se permiten números.")
    .isLength({ min: 7 }).withMessage("El numero de telefono debe tener al menos 7 caracteres.")
    .notEmpty().withMessage("El nro. de telefono no puede estar vacio."),
  check("emailUser")
    .isEmail().withMessage("Debe ingresar un email valido.")
    .notEmpty().withMessage("El email no puede estar vacio.")
    .normalizeEmail(),
  check("passwordUser")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial.")
    .notEmpty().withMessage("El password no puede estar vacio."),
  check("repeatPasswordUser")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("La contraseña debe tener un minimo de 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial.")
    .notEmpty().withMessage("El password no puede estar vacio."),
  check("rolUser")
    .isInt({min:1,max:10}).withMessage("Debe seleccionar una categoria."),
  check("estadoUsr")
    .isInt({min:1,max:10}).withMessage("Debe seleccionar un estado para el usuario.")
], usersController.userSave);

router.post('/userEdit/:id', upload,
[
  check("nombreUser")
    .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres.")
    .isString().withMessage("El nombre debe contener solo letras.")
    .notEmpty().withMessage("El nombre no puede estar vacio."),
  check("apellidoUser")
    .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres.")
    .notEmpty().withMessage("El apellido no puede estar vacio."),
  check("nroTelefonoUser")
    .matches(/\d/).withMessage("Solo se permiten números.")
    .isLength({ min: 7 }).withMessage("El numero de telefono debe tener al menos 7 caracteres.")
    .notEmpty().withMessage("El nro. de telefono no puede estar vacio."),
  check("emailUser")
    .isEmail().withMessage("Debe ingresar un email valido.")
    .notEmpty().withMessage("El email no puede estar vacio.")
    .normalizeEmail(),
  check("rolUser")
    .isInt({min:1,max:10}).withMessage("Debe seleccionar una categoria."),
  check("estadoUsr")
    .isInt({min:1,max:10}).withMessage("Debe seleccionar un estado para el usuario.")
], usersController.saveEdit);

module.exports = router;
