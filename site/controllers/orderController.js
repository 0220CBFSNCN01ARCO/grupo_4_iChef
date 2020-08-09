const { Product, Order, OrderDetail } = require("../database/models");
const Sequelize = require('sequelize');

let orderController = {
    getOrders: async function(req, res, next) {
        try {
            const orders = await Order.findAll({
                attributes: ["Order.id","Order.cantidad_items","Order.total",
                [Sequelize.fn('date_format', Sequelize.col('Order.fecha'), '%Y-%m-%d %H:%i:%s'), 'fecha'],
                "usuarioOrder.nombre","usuarioOrder.apellido","estadoOrder.descripcion"],
                include: [{ association: "usuarioOrder" ,
                            attributes: ["nombre","apellido"]},
                          { association: "estadoOrder",
                            attributes: ["descripcion"] } ],
                            raw:true});

            //console.log("ordenes: ",orders);

            return res.render('orders', {
                title: 'iChef - Ordenes',
                orders,
                usuario: req.session.usuarioLogueado,
                itemCart: req.session.cart
            });
        } catch (error) {
            console.log(error);
        }

    }

};

module.exports = orderController;