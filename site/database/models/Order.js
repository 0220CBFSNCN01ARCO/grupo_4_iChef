module.exports = (sequelize, DataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        cantidad_items: {
            type: DataTypes.INTEGER
        },
        neto_total: {
            type: DataTypes.FLOAT
        },
        subtotal: {
            type: DataTypes.FLOAT
        },
        importe_descuentos: {
            type: DataTypes.FLOAT
        },
        total: {
            type: DataTypes.FLOAT
        },
        fecha: {
            type: DataTypes.DATE
        },
        estado: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName : "order",
        timestamps : false
    };

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models){
        /*Order - OrderStatus*/
        Order.belongsTo(models.OrderStatus, {
            as: "estadoOrder",
            foreignKey: "estado"
        });

        /*Order - OrderDetail*/
        Order.hasMany(models.OrderDetail, {
            as: "detallesOrden",
            foreignKey: "order_id"
        });

        /*Cart - User*/
        Order.belongsTo(models.User, {
            as: "usuarioOrder",
            foreignKey: "user_id"
        });
    }
    return Order;
}
