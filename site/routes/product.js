const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require ('../middleware/authMiddleware');

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
router.get('/cart', authMiddleware, productController.productCart);
router.get('/list/:tipo', productController.listarProductos);
router.get('/productDelete', productController.productDelete);


//1. /products​ (GET) - Listado de productos
router.get('/', authMiddleware,productController.listProduct);

//2. /products/create​ (GET)  Formulario de creación de productos 
router.get('/create', authMiddleware,productController.productAdd);

//3. /products/​:id​ ​(GET) Detalle de un producto particular 
router.get('/:id', productController.getProductById);

//4. /products​ (POST)  Acción de creación (a donde se envía el formulario) 
//router.post('/create', productController.createProduct);

router.post('/create', authMiddleware, upload.array('fotos') , productController.createProduct);

//5. /products/​:id​/edit ​(GET)  Formulario de edición de productos 
router.get('/:id/edit', authMiddleware, productController.editProductById);

//6. /products/​:id​ (PUT)  Acción de edición (a donde se envía el formulario): 
router.put('/:id/edit',authMiddleware, productController.saveProductById);

//7. /products/​:id​ (DELETE) Acción de borrado
router.delete('/:idProducto', authMiddleware, productController.deleteProductById);

//8. /products/​search ​(GET) Busca productos 
//router.get('/search', productController.searchProduct);

module.exports = router;