const fs = require('fs');

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
        res.render('market', { title: 'Market', subtitle: 'Market productos' });
    },
    listProduct: function (req, res, next) {
      let productosJSON = fs.readFileSync('./data/products.json',{ encoding:'utf-8'});
      let productos;

      if(productosJSON == ""){
        productos = [];
      }else{
        productos = JSON.parse(productosJSON);
      }

      res.render('productList', { title: 'Listado productos',
                                  product: productos });
    },
    getProductById: function (req, res, next) {
      res.render('productAdd', { title: 'Producto id', subtitle: 'Detalle producto' });
    },
    createProduct: function (req, res, next) {
      res.render('productAdd', { title: 'Crear producto', subtitle: 'Formulario alta' });
    },
    editProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Editar', subtitle: 'Formulario edición'  });
    },
    saveProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Guardar' });
    },
    productDelete:function (req, res, next) {

      res.render('productDelete', { title: 'Producto borrado' });
    },
    deleteProductById: function (req, res, next) {
      let idProducto = req.params.idProducto;
      let productosJSON = fs.readFileSync('./data/products.json',{ encoding:'utf-8'});
      let productos;

      if(productosJSON == ""){
        productos = [];
      }else{
        productos = JSON.parse(productosJSON);
      }

      let newPorductos = productos.filter(function (producto) {
        return producto.codigo != idProducto;
      });

      let productoBorrado = productos.find(function (producto) {
        return producto.codigo == idProducto;
      });

      fs.writeFileSync('./data/products.json', JSON.stringify(newPorductos, { encoding: 'UTF-8'}) );

      res.render('productDelete', { title: 'Producto borrado',
                                    product: productoBorrado });
    }
};

module.exports = productController;