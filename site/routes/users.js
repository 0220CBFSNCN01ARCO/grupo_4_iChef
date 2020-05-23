var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.userList);

router.get('/register', usersController.userRegister);


module.exports = router;
