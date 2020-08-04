let indexController = {
    getIndex: function (req, res, next) {
        //console.log(req.session.usuarioLogueado)
        if(!req.session.cart) {
            req.session.cart = {
                items: [],
                userId: 0,
                total: 0.00 };
            console.log("index","Se crea el carrito vacio");
        }else {
            console.log("index","el carrito ya existe");
        }
        res.render('index', { title: 'iChef',
                              usuario: req.session.usuarioLogueado,
                              cart: req.session.cart });
    }
};

module.exports = indexController;


