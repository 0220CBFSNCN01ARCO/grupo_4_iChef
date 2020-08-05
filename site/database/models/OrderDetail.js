module.exports = (sequelize, DataTypes) => {
    let alias = "OrderDetail";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_producto : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        cantidad : {
            type: DataTypes.INTEGER
        },
        precio_unitario : {
            type: DataTypes.FLOAT
        },
        neto_total : {
            type: DataTypes.FLOAT
        },
        descuentos : {
            type: DataTypes.FLOAT
        },
        subtotal : {
            type: DataTypes.FLOAT
        },
        total : {
            type: DataTypes.FLOAT
        }
    }
    let config = {
        tableName : "Order_detail",
        timestamps : false
    };

    const OrderDetail = sequelize.define(alias, cols, config);

    OrderDetail.associate = function(models){

        /*OrderDetail - Product*/
        OrderDetail.belongsTo(models.Product, {
            as: "producto",
            foreignKey: "id"
        });

        /*OrderDetail - Cart*/
        OrderDetail.belongsTo(models.Order, {
            as: "orden",
            foreignKey: "order_id"
        });
    }


    return OrderDetail;
}
