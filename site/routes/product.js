const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/detail', productController.productDetail);
router.get('/add', productController.productAdd);
router.get('/cart', productController.productCart);

module.exports = router;