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

function updateQtyCart(productID, cart, qty) {
    cart.items.forEach(item => {
        if (item.id == productID) {
            item.qty += qty;
        }
    });
}

function calcularTotales(cart) {
    cart.total = 0.00;
    cart.items.forEach(item => {
        try {
            let price = item.price;
            let qty = item.qty;
            let amount = price * qty;

            cart.totals += amount;
        } catch (error) {
            console.log(error);
        }

    });
    this.setFormattedTotals(cart);
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
        impDescuento = (precioFinal * descuento_oferta) / 100;
        precioFinal = precioFinal - impDescuento;
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
            subtitle: 'Mi Carrito',
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
            let pPrecio = Number(productBD.precio);
            let pPrecioOf = Number(productBD.precio_oferta);
            let pdescuento = Number(productBD.descuento_oferta);
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
                    descuentoUnit: impDescuento,
                    totalItem: precioFinal * qtyAdd
                }
                cart.items.push(itemAdd);
                cart.subtotal += (precioFinal * qtyAdd);
                cart.descuentoTotal += impDescuento
                cart.total += ((precioFinal * qtyAdd) - cart.descuentoTotal);

                //console.log("Precio item: ", productBD.precio);
                //console.log("Precio oferta item: ", productBD.precio_oferta);
                //console.log("descuento item: ", productBD.descuento_oferta);
                //console.log("Descuento Total: ", cart.descuentoTotal);
                //console.log("Total: ", cart.total);
                //console.log("Product add: ", itemAdd)
            } else {
                updateQtyCart(productBD.id_product, cart, qtyAdd);
                cart.subtotal += (precioFinal * qtyAdd);
                cart.descuentoTotal += impDescuento;
                cart.total += ((precioFinal * qtyAdd) - cart.descuentoTotal);
            }
        } catch (error) {
            console.log(error);
        }

        //console.log("producto agregado");

        return res.redirect("back");
    }
};

module.exports = cartController;