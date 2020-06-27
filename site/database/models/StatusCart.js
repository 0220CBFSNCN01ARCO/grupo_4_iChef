module.exports = (sequelize, DataTypes) => {
    let alias = "StatusCart";
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
        tableName : "status_cart",
        timestamps : false
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