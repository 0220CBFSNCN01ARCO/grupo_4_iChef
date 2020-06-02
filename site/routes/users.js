var express = require('express');
var router = express.Router();
const multer = require('multer');

const usersController = require('../controllers/usersController');
const {check, validationResult, body} = require('express-validator');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })

var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', usersController.userList);

router.get('/register' ,usersController.userRegister);

router.post('/create', upload.single('fotoPerfil'), usersController.createUser);

router.get('/login', usersController.userLogin);

module.exports = router;
