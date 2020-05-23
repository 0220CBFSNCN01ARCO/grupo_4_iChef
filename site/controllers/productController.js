
let productController = {
    productDetail: function (req, res, next) {
        res.render('productDetail', { title: 'Detalle productos' });
    },
    product_boxDetail: function (req, res, next) {
        res.render('product-boxDetail', { title: 'Detalle caja' });
    },
    productAdd: function (req, res, next) {
        res.render('productAdd', { title: 'Formulario producto' });
    },
    productCart: function (req, res, next) {
        res.render('productCart', { title: 'Carrito compras' });
    },
    productMarket: function (req, res, next) {
        res.render('market', { title: 'Market' });
    },
    listProduct: function (req, res, next) {
      res.render('productList', { title: 'Listado productos' });
    },
    getProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Producto id' });
    },
    createProduct: function (req, res, next) {

      res.render('productAdd', { title: 'Crear producto' });
    },
    editProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Editar' });
    },
    saveProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Guardar' });
    },
    deleteProductById: function (req, res, next) {

      res.render('productAdd', { title: 'Delete' });
    }

};

module.exports = productController;