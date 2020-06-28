module.exports = (sequelize, DataTypes) => {
    let alias = "ProductType";
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
        tableName : "product_type",
        timestamps : false
    };

    const ProductType = sequelize.define(alias, cols, config);

    ProductType.associate = function(models){
        ProductType.hasMany(models.Product, {
            as: "productosTipos",
            foreignKey: "product_type_id"
        });
    }


    return ProductType;
}