const { Product } = require('../database/models');

function inCart(productID, cart) {
    let found = false;
    cart.items.forEach(item => {
        if (item.id == productID) {
            found = true;
        }
    });
    return found;
}

const updateQtyCart = (productID, cart, qty) => {
    cart.items.forEach(item => {
        if (item.id == productID) {
            item.qty += qty;
            item.totalItem = (item.precioUnit * item.qty)
            return item.qty;
        }
    });
}

const updateTotales = (cart) => {
    cart.subtotal = 0.00;
    cart.descuentoTotal = 0.00;
    cart.total = 0.00;
    cart.items.forEach(item => {
        cart.subtotal += (item.totalItem);
        cart.descuentoTotal += (item.descuentoUnit * item.qty);
    });
    cart.total = (cart.subtotal - cart.descuentoTotal);
}

function calcularPrice(precio, precio_oferta, descuento_oferta) {
    let precioFinal = 0;
    let impDescuento = 0;

    if (precio_oferta < precio && precio_oferta > 0) {
        precioFinal = precio_oferta
    } else {
        precioFinal = precio;
    }
    if (descuento_oferta > 0) {
        impDescuento = ((precioFinal * descuento_oferta) / 100)*-1;
    }
    //console.log("calulado impDescuento: ", impDescuento);
    //console.log("calculado precioFinal: ", precioFinal);
    return {
        precioFinal,
        impDescuento
    }
}

let cartController = {
    getCart: function(req, res, next) {
        return res.render('cart', {
            title: 'iChef - Carrito compras',
            usuario: req.session.usuarioLogueado,
            itemCart: req.session.cart
        });
    },
    addcart: async function(req, res, next) {
        let itemAdd = {};
        let cart = req.session.cart
        let qtyAdd = Number(req.body.qtyAdd)
        try {
            const productBD = await Product
                .findByPk(req.params.id, {
                    include: [{ association: "fotos" }]
                });
            let pPrecio = Number(productBD.precio)
            let pPrecioOf = Number(productBD.precio_oferta)
            let pdescuento = Number(productBD.descuento_oferta)
            const { precioFinal, impDescuento } = calcularPrice(pPrecio, pPrecioOf, pdescuento);

            if (!inCart(productBD.id_product, cart)) {
                itemAdd = {
                    id: productBD.id_product,
                    codigo: productBD.codigo,
                    tipo: productBD.product_type_id,
                    descripcion: productBD.descripcion,
                    foto: productBD.fotos[0].nombre,
                    precioUnit: precioFinal,
                    qty: qtyAdd,
                    descuentoUnit: impDescuento*-1,
                    totalItem: precioFinal * qtyAdd
                }
                cart.items.push(itemAdd);
                updateTotales(cart);
                //cart.total = (Math.round(Number(cart.total) * 100) / 100).toFixed(2)
                console.log("cart ", cart);
            } else {
                updateQtyCart(productBD.id_product, cart, qtyAdd);
                updateTotales(cart);
                //cart.total = (Math.round(Number(cart.total) * 100) / 100).toFixed(2)
                console.log("cart update ", cart);
            }
        } catch (error) {
            console.log(error);
        }

        //console.log("producto agregado");

        return res.redirect("back");
    }
};

module.exports = cartController;