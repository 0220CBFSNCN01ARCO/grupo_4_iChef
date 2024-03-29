let indexController = {
    getIndex: function(req, res, next) {
        //console.log(req.session.usuarioLogueado)
        if (!req.session.cart) {
            req.session.cart = {
                items: [],
                subtotal: 0.00,
                descuentoTotal: 0.00,
                total: 0.00
            };
            //console.log("index", "Se crea el carrito vacio");
        } else {
            //console.log("index", "el carrito ya existe");
            //console.log("Contenido: ", req.session.cart)
        }
        res.render('index', {
            title: 'iChef',
            usuario: req.session.usuarioLogueado,
            itemCart: req.session.cart
        });
    }
};

module.exports = indexController;