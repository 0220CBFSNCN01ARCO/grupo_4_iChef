
let productController = {
    productDetail: function (req, res, next) {
        res.render('productDetail', { title: 'Listado productos' });
      },
    productAdd: function (req, res, next) {
        res.render('productAdd', { title: 'Formulario producto' });
      },
    productCart: function (req, res, next) {
        res.render('productCart', { title: 'Carrito compras' });
      }


};

module.exports = productController;