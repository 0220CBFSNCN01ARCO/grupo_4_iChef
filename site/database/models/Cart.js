module.exports = (sequelize, DataTypes) => {
    let alias = "Cart";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        cantidad_items : {
            type: DataTypes.INTEGER
        },
        neto_total : {
            type: DataTypes.FLOAT
        },
        subtotal : {
            type: DataTypes.FLOAT
        },
        importe_descuentos : {
            type: DataTypes.FLOAT
        },
        total : {
            type: DataTypes.FLOAT
        },
        fecha : {
            type: DataTypes.DATE
        },
        estado : {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName : "cart",
        timestamps : false
    };

    const Cart = sequelize.define(alias, cols, config);

    /*Cart.associate = function(models){
        /*Cart - StatursCart
        Cart.belongsTo(models.StatusCart, {
            as: "estado",
            foreignKey: "estado"
        });

        /*Cart - CarDetail
        Cart.hasMany(models.CarDetail, {
            as: "detallesCarrito",
            foreignKey: "cart_id"
        });

        /*Cart - User
        Cart.belongsTo(models.User, {
            as: "usuario",
            foreignKey: "user_id"
        });               
    }*/
  
    return Cart;
}
