const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const authMiddleware = require ('../middleware/authMiddleware');

const productController = require('../controllers/productController');

const {check, validationResult, body} = require('express-validator');


let countImage = 0;
const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        let dest;
        if (file.originalname.match(/\.(pdf)$/)){
          dest = `public/images/products/recetas/${req.body.codigoProducto}`
        }else{
          dest = `public/images/products/${req.body.tipo}/${req.body.codigoProducto}`
        }
        if(!fs.existsSync(dest)){
          fs.mkdirSync(dest)
        }
        callback(null, dest)
      },
      filename: async function (req, file, callback) {
        //console.log("BODY:",file)
        let fileName;
        if (file.originalname.match(/\.(pdf)$/)){
          fileName = `Receta-${req.body.codigoProducto}${path.extname(file.originalname)}`
        }else {
          fileName = `foto-${req.body.codigoProducto}${countImage}${path.extname(file.originalname)}`
          countImage++;
        }
        //callback(null, fileName)
        await sharp(file.buffer)
        .resize(800, 800)
        .toFormat("png")
        .jpeg({ quality: 90 })
        .toFile(fileName);

      },
      fileFilter: function (req, file, callback) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" || file.mimetype == "image/gif") {
          callback(null, true);
        } else {
          callback(null, false);
          return callback(new Error('Solamente .png, .jpg .jpeg .gif (.pdf para recetas) formatos permitidos!'));
        }
      }
})

const upload = multer({ storage: storage }).fields([{
  name: 'image_uploads', maxCount: 4}, {
  name: 'pdfFile', maxCount: 1}])

router.get('/detail', productController.productDetail);
router.get('/detail-box', productController.product_boxDetail);
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

router.post('/create',
upload,
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
  check("peso")
  .isFloat()
  .withMessage("Ingrese el peso en kilogramos.")
], productController.createProduct);

//5. /products/​:id​/edit ​(GET)  Formulario de edición de productos 
router.get('/:id/edit', authMiddleware, productController.editProductById);

//6. /products/​:id​ (POST)  Acción de edición (a donde se envía el formulario): 
router.post('/:id/edit',upload,
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