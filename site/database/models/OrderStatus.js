module.exports = (sequelize, DataTypes) => {
    let alias = "OrderStatus";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion : {
            type: DataTypes.STRING
        }
    }
    let config = {
        tableName : "order_status",
        timestamps : 0
    };

    const OrderStatus = sequelize.define(alias, cols, config);

    OrderStatus.associate = function(models){
        OrderStatus.hasMany(models.Order, {
            as: "orden",
            foreignKey: "estado"
        });
    }

    return OrderStatus;
}