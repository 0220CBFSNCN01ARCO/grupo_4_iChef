const express = require('express');
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware');

const cartController = require('../controllers/cartController');


router.get('/', authMiddleware, cartController.getCart);
//Borra todos los items del carrito
router.delete('/', authMiddleware, function(req,res,next){});

module.exports = router;