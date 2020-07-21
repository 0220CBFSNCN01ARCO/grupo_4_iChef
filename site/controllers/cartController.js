let cartController = {
    getCart: function (req, res, next) {
        res.render('productCart', { title: 'iChef - Carrito compras',
                                    subtitle: 'Mi Carrito',
                                    usuario: req.session.usuarioLogueado });
    },
    addcart: function (req, res, next) {
        console.log("producto agregado");
        res.redirect(301,"/");
    }
};

module.exports = cartController;