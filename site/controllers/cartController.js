let cartController = {
    getCart: function (req, res, next) {
        res.render('productCart', { title: 'iChef - Carrito compras',
                                    subtitle: 'Mi Carrito',
                                    usuario: req.session.usuarioLogueado });
    },
};

module.exports = cartController;