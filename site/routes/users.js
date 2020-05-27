var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const {check, validationResult, body} = require('express-validator');

/* GET users listing. */
router.get('/', usersController.userList);

router.get('/register', usersController.userRegister);
router.get('/login', usersController.userLogin);

module.exports = router;
