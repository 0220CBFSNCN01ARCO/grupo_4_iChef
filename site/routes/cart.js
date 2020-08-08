const express = require('express');
const router = express.Router();
const {userNotLogged } = require('../middleware/authMiddleware');

const cartController = require('../controllers/cartController');

router.get('/',userNotLogged, cartController.getCart);

router.post('/add/:id',userNotLogged, cartController.addcart);

router.post('/emptyCart',userNotLogged, cartController.emptyCart);

router.get('/deleteItem/:id',userNotLogged, cartController.deleteItem);

//Borra todos los items del carrito
router.delete('/', userNotLogged, function(req, res, next) {});

module.exports = router;