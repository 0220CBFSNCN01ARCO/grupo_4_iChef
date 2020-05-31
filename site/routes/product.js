const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productController = require('../controllers/productController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


router.get('/detail', productController.productDetail);
router.get('/detail-box', productController.product_boxDetail);
router.get('/cart', productController.productCart);
router.get('/market', productController.productMarket);

//1. /products​ (GET) - Listado de productos
router.get('/', productController.listProduct);
//2. /products/create​ (GET)  Formulario de creación de productos 
router.get('/create', productController.createProduct);

//3. /products/​:id​ ​(GET)  Detalle de un producto particular 
router.get('/:id', productController.getProductById);
//4. /products​ (POST)  Acción de creación (a donde se envía el formulario) 
router.post('/create', upload.single('fotos'), productController.createProduct);

//5. /products/​:id​/edit ​(GET)  Formulario de edición de productos 
router.get('/:id/edit', productController.editProductById);
//6. /products/​:id​ (PUT)  Acción de edición (a donde se envía el formulario): 
router.post('/:id', productController.saveProductById);
//7. /products/​:id​ (DELETE) Acción de borrado
router.delete('/:id', productController.deleteProductById);

module.exports = router;