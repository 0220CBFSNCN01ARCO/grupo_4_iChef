var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const moment = require('moment');

const usersController = require('../controllers/usersController');
const {check, validationResult, body} = require('express-validator');
let guestMiddleware = require('../middleware/guestMiddleware')
/*let authMiddleware = require('../middleware/authMiddleware')*/

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
router.get('/', usersController.userList);

router.get('/register' , guestMiddleware ,usersController.userRegister);

router.post('/create', upload.single('fotoPerfil'), usersController.createUser);

router.get('/login', usersController.userLogin);

router.post('/login', usersController.loguearUsuario)

module.exports = router;
