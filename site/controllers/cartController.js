let cartController = {
    getCart: function (req, res, next) {
        return res.render('productCart', { title: 'iChef - Carrito compras',
                                    subtitle: 'Mi Carrito',
                                    usuario: req.session.usuarioLogueado });
    },
    addcart: function (req, res, next) {
        console.log("producto agregado");

        



        return res.redirect("back");
    }
};

module.exports = cartController;