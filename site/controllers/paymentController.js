const mercadopago = require("mercadopago");
mercadopago.configure({
    sandbox: true,
    access_token: process.env.TOKEN,
    platform_id: 'ICHEF-WEB',
    integrator_id: 'ICHEF',
    corporation_id: 'ICHEF'
});

const moment = require('moment');
const { Product, Order, OrderDetail } = require("../database/models");

const processCheckoutAndGeneratePreference = async (req, res) => {
  let cart = req.session.cart;
  let user = req.session.usuarioLogueado;

  const mpProducts = cart.items.map(product => generateMPItemFromProduct(product));
  const orderId = await generateOrder(cart,user);
  const mercadoPagoPreferenceStructure = generatePreferenceStructure(orderId, mpProducts, user);
  try {
    const mpPreferency = await mercadopago.preferences.create(mercadoPagoPreferenceStructure);
    console.log("Response MP: ",mpPreferency.response);

    return res.redirect(mpPreferency.response.init_point)
  } catch (error) {
     console.log(error);
  }
};

const generateMPItemFromProduct = (product) => {
  return {
    id: product.id,
    title: product.descripcion,
    quantity: product.qty,
    description: product.descripcion,
    currency_id: "ARS",
    unit_price: (product.precioUnit - product.descuentoUnit),
  };
};

const generatePreferenceStructure = (orderId, mercadoPagoProducts, user) => {
  return {
    items: mercadoPagoProducts,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
        {
          id: "atm",
        }
      ],
    },
    external_reference: String(orderId),
    binary_mode: true,
    auto_return: "all",
    back_urls: {
      pending: "http://localhost:3030/payment/pending/",
      failure: "http://localhost:3030/payment/failure/",
      success: "http://localhost:3030/payment/success/",
    },
    payer: {
        name: user.nombre,
        surname: user.apellido,
        email: user.mail,
    },
  };
};

const generateOrder = async (cart,user) => {
  let dateCreate = moment().format('YYYY-MM-DD hh:mm:ss');
  try {
    const order = await Order.create({ user_id: user.id,
              cantidad_items: cart.items.length,
              subtotal: cart.subtotal,
              importe_descuentos: cart.descuentoTotal,
              total: cart.total,
              fecha: dateCreate,
              estado: 2
          });
    cart.items.forEach(item => {
      generateOrderDetail(order.id, item);
    });
    return order.id
  } catch (error) {
    console.log(error)
  }
}

const generateOrderDetail = async (orderId,item) => {
    try {
        //console.log("Orden creada: ", orderId);
        await OrderDetail
          .create({
              order_id: orderId,
              id_producto: item.id,
              cantidad: item.qty,
              precio_unitario: item.precioUnit,
              subtotal: (item.precioUnit * item.qty),
              descuentos: item.descuentoUnit,
              total: item.totalItem
          })
      } catch (error) {
        console.log(error)
      }
}

const successPayment = async (req, res) => {
    console.log(req.query);
    let statusPay = req.query.collection_status;
    let nroOrden = Number(req.query.external_reference);
    try {
        const order = await Order.findByPk(nroOrden);
        order.estado = 1;
        await order.save();

        if(statusPay == 'approved') {
            req.session.cart = {
                items: [],
                subtotal: 0.00,
                descuentoTotal: 0.00,
                total: 0.00
            };
            return res.render('paymentResult',{
                    title: 'iChef - Pago',
                    mensaje: 'El pago fue aprobado y acreditado.',
                    typeMsg: 'success',
                    nroOrden });
        }
    } catch (error) {
        return res.render('paymentResult',{
            title: 'iChef - Pago',
            mensaje: 'Error al procesar pago.',
            typeMsg: 'danger',
            nroOrden });
    }
  };

const failedPayment = async (req, res) => {
    console.log(req.query);
    let statusPay = req.query.collection_status;
    let nroOrden = Number(req.query.external_reference);
    let mensaje = '';
    try {
        const order = await Order.findByPk(nroOrden);
        order.estado = 3;
        await order.save();
        switch (statusPay) {
            case 'rejected':
                mensaje = 'El pago fue rechazado. Reintentar el pago.'
                break;
            case 'cancelled':
                mensaje = 'El pago fue cancelado ó el pago expiró.'
                break;
            case 'refunded':
                mensaje = 'El pago fue devuelto.'
                break;
            default:
                mensaje = 'El pago fue rechazado. Error.'
                break;
        }
        return res.render('paymentResult',{
                    title: 'iChef - Pago',
                    mensaje,
                    typeMsg: 'danger',
                    nroOrden });
    } catch (error) {
        return res.render("paymentResult",{
            title: 'iChef - Pago',
            mensaje: 'Error al procesar pago.',
            typeMsg: 'danger',
            nroOrden });
    }
};

const pendingPayment = async (req, res) => {
    console.log(req.query);
    let statusPay = req.query.collection_status;
    let nroOrden = Number(req.query.external_reference);
    try {
        const order = await Order.findByPk(nroOrden);
        order.estado = 2;
        await order.save();

        if(statusPay == 'pending') {
            return res.render("paymentResult",{
                    title: 'iChef - Pago',
                    mensaje: 'El pago aun no fue confirmado.',
                    typeMsg: 'warning',
                    nroOrden });
        }
    } catch (error) {
        return res.render("paymentResult",{
            title: 'iChef - Pago',
            mensaje: 'Error al procesar pago.',
            typeMsg: 'danger',
            nroOrden });
    }
};

module.exports = { processCheckoutAndGeneratePreference, successPayment, failedPayment , pendingPayment};

/*
Recibiremos por parámetros los siguientes datos

"collection_status"
  Estado del pago. Los valores podrán ser:
  "pending"
      El usuario no completo el proceso de pago todavía.
  "approved"
      El pago fue aprobado y acreditado.
  "rejected"
    El pago fue rechazado. El usuario podría reintentar el pago.
  "cancelled"
  El pago fue cancelado por una de las partes o el pago expiró.
  "refunded"
    El pago fue devuelto al usuario.



  "external_reference": Id de nuestra base de datos para individualizar el pago
*/