const fs = require('fs');
const multer = require('multer');

let productController = {
    productDetail: function (req, res, next) {
        res.render('productDetail', { title: 'Detalle productos', subtitle: 'Detalle producto' });
    },
    product_boxDetail: function (req, res, next) {
        res.render('product-boxDetail', { title: 'Detalle caja', subtitle: 'Detalle caja' });
    },
    productCart: function (req, res, next) {
        res.render('productCart', { title: 'Carrito compras', subtitle: 'Mi Carrito' });
    },
    productMarket: function (req, res, next) {
      let productosJson = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
      let productos = JSON.parse(productosJson);    

        res.render('market', { title: 'Market', subtitle: 'Market productos', productos });
    },
    listProduct: function (req, res, next) {
      let productosJSON = fs.readFileSync('./data/products.json',{ encoding:'utf-8'});
      let productos;

      if(productosJSON == ""){
        productos = [];
      }else{
        productos = JSON.parse(productosJSON);
      }

      //console.log(productos);

      res.render('productList', { title: 'Listado productos',
                                  subtitle: 'Listado producto',
                                  product: productos });
    },
    getProductById: function (req, res, next) {
      res.render('productAdd', { title: 'Producto id', subtitle: 'Detalle producto' });
    },
    createProduct: function (req, res, next) {
      const body = req.body;
      let productosJson = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
      let productos = JSON.parse(productosJson);
      const ultimoItem = productos[productos.length-1];

      

      const productoAguardar = {
        codigo: ultimoItem.codigo + 1,
        nombre: body.nombreProducto,
        tipo: body.tipo,
        precio: body.precioProducto,
        oferta: body.oferta,
        precioOferta: body.precioOferta,
        descuentoOferta: body.descuento,
        grupo: body.grupo,
        marca: body.marca,
        descripcion: body.txtDescripcion,
        comensales: body.radioPersonas,
        ingredientes: body.ingredientes,
        calorias: body.calorias,
        peso: body.peso,
        fotos: req.filename,
        receta: body.receta
      };

      productos.push(productoAguardar);
      fs.writeFileSync('./data/products.json', JSON.stringify(productos));
      res.render('productAdd', { title: 'Crear producto', subtitle: 'Formulario alta' });
    },
    editProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Editar', subtitle: 'Formulario edición'  });
    },
    saveProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Guardar' });
    },
    deleteProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Delete' });
    }

};


module.exports = productController;