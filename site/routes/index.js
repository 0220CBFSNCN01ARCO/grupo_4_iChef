const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.getIndex);
router.get('/up', indexController.up);


module.exports = router;
