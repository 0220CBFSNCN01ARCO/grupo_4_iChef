let indexController = {
    getIndex: function (req, res, next) {
        if(!req.session.cart) {
            req.session.cart = {
                items: [],
                total: 0.00 };
        }
        res.render('index', { title: 'iChef',
                              usuario: req.session.usuarioLogueado,
                              cart: req.session.cart });
    }
};

module.exports = indexController;


