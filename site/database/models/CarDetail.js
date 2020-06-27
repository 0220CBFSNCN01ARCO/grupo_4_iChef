module.exports = (sequelize, DataTypes) => {
    let alias = "CarDetail";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id : {
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
        tableName : "car_detail",
        timestamps : false
    };

    const CarDetail = sequelize.define(alias, cols, config);

    CarDetail.associate = function(models){

        /*CarDetail - Product*/
        CarDetail.belongsTo(models.Productos, {
            as: "producto",
            foreignKey: "id_producto"
        });

        /*CarDetail - Cart*/
        CarDetail.belongsTo(models.Cart, {
            as: "carrito",
            foreignKey: "cart_id"
        });      
    }

   
    return CarDetail;
}
