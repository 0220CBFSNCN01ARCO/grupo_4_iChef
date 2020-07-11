module.exports = (sequelize, DataTypes) => {
    let alias = "CartStatus";
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
        tableName : "cart_status",
        timestamps : 0
    };

    const StatusCart = sequelize.define(alias, cols, config);

    StatusCart.associate = function(models){
        StatusCart.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "estado"
        });
    }

    return StatusCart;
}