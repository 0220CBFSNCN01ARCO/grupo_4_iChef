const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require ('../middleware/authMiddleware');

const productController = require('../controllers/productController');

const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        if (file.originalname.match(/\.(pdf)$/)){
          cb(null, 'public/recetas')
        }else{
          cb(null, `public/images/products/${req.body.tipo}`)
        }
      },
      filename: function (req, file, cb) {
        if (file.originalname.match(/\.(pdf)$/)){
          cb(null, 'Receta-' + req.body.codigoProducto + path.extname(file.originalname))
        }else {
          cb(null, req.body.tipo + '-' + req.body.codigoProducto + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
        }
      },
      fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" || file.mimetype == "image/gif") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Solamente .png, .jpg .jpeg .gif (.pdf para recetas) formatos permitidos!'));
        }
      }
  })

  const upload = multer({ storage: storage })

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

router.post('/create', upload.fields([{ name: 'image_uploads', maxCount: 5 },
                                      { name: 'pdfFile', maxCount: 1}]),
[
  check("codigoProducto")
  .isInt()
  .withMessage("Debe ingresar un codigo para el producto"),
  check("nombreProducto")
  .isLength({min:5})
  .withMessage("El nombre del producto debe tener al menos 5 caracteres"),
  check("tipo")
  .isInt({min:1,max:2})
  .withMessage("Debe seleccionar un tipo de producto."),
  check("precioProducto")
  .isFloat()
  .withMessage("Debe ingresar un precio"),
  check("grupo")
  .isInt()
  .withMessage("Debe seleccionar un rubro."),
  check("marca")
  .isInt()
  .withMessage("Debe seleccionar una marca."),
  check("txtDescripcion")
  .isLength({min:20})
  .withMessage("La descripcion del producto debe tener al menos 20 caracteres"),
  check("calorias")
  .isFloat()
  .withMessage("Ingrese cantidad calorias."),
  check("calorias")
  .isFloat()
  .withMessage("Ingrese peso en kilogramos")
],
                       productController.createProduct);

//5. /products/​:id​/edit ​(GET)  Formulario de edición de productos 
router.get('/:id/edit', authMiddleware, productController.editProductById);

//6. /products/​:id​ (POST)  Acción de edición (a donde se envía el formulario): 
router.post('/:id/edit',upload.fields([{ name: 'image_uploads', maxCount: 5 },
                                       { name: 'pdfFile', maxCount: 1}]),
                        authMiddleware,
                        [
                          check("codigoProducto")
                          .isInt()
                          .withMessage("Debe ingresar un codigo para el producto"),
                          check("nombreProducto")
                          .isLength({min:5})
                          .withMessage("El nombre del producto debe tener al menos 5 caracteres"),
                          check("tipo")
                          .isInt({min:1,max:2})
                          .withMessage("Debe seleccionar un tipo de producto."),
                          check("precioProducto")
                          .isFloat()
                          .withMessage("Debe ingresar un precio"),
                          check("grupo")
                          .isInt()
                          .withMessage("Debe seleccionar un rubro."),
                          check("marca")
                          .isInt()
                          .withMessage("Debe seleccionar una marca."),
                          check("txtDescripcion")
                          .isLength({min:20})
                          .withMessage("La descripcion del producto debe tener al menos 20 caracteres"),
                          check("calorias")
                          .isFloat()
                          .withMessage("Ingrese cantidad calorias."),
                          check("calorias")
                          .isFloat()
                          .withMessage("Ingrese peso en kilogramos")
                        ],
                        productController.saveProductById);

//7. /products/​:id​ (DELETE) Acción de borrado
router.delete('/:idProducto', authMiddleware, productController.deleteProductById);

//8. /products/​search ​(GET) Busca productos 
router.post('/search', productController.searchProduct);

module.exports = router;