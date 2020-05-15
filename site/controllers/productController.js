
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
      }
};

module.exports = productController;