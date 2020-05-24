
let productController = {
    productDetail: function (req, res, next) {
        res.render('productDetail', { title: 'Detalle productos', subtitle: 'Detalle producto' });
    },
    product_boxDetail: function (req, res, next) {
        res.render('product-boxDetail', { title: 'Detalle caja', subtitle: 'Detalle caja' });
    },
    productAdd: function (req, res, next) {
        res.render('productAdd', { title: 'Formulario producto', subtitle: 'Formulario alta' });
    },
    productCart: function (req, res, next) {
        res.render('productCart', { title: 'Carrito compras', subtitle: 'Carrito' });
    },
    productMarket: function (req, res, next) {
        res.render('market', { title: 'Market', subtitle: 'Market productos' });
    },
    listProduct: function (req, res, next) {
      res.render('productList', { title: 'Listado productos', subtitle: 'Listado producto' });
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
    deleteProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Delete' });
    }

};

module.exports = productController;