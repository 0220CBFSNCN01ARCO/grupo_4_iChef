const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/detail', productController.productDetail);
router.get('/detail-box', productController.product_boxDetail);
router.get('/add', productController.productAdd);
router.get('/cart', productController.productCart);
router.get('/market', productController.productMarket);

module.exports = router;