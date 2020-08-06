const { Product} = require('../database/models');

const inCart = (productID, cart) => {
    let found = false;
    cart.items.forEach(item => {
       if(item.id === productID) {
           found = true;
       }
    });
    return found;
}

let cartController = {
    getCart: function (req, res, next) {
        return res.render('productCart', { title: 'iChef - Carrito compras',
                                    subtitle: 'Mi Carrito',
                                    usuario: req.session.usuarioLogueado });
    },
    addcart: async function (req, res, next) {
        let itemAdd = {};
        let qty = req.body.qtyAdd;
        let cart = req.session.cart

        try {
            const productBD = await Product.findByPk(req.body.idProduct);

            itemAdd = {
                idProduct: productBD.id_product,
                qty: qty
            }

        } catch (error) {
            console.log(error);
        }

        //console.log("producto agregado");

        return res.redirect("back");
    }
};

module.exports = cartController;