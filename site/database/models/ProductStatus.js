module.exports = (sequelize, DataTypes) => {
    let alias = "ProductStatus";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING
        }
    }
    let config = {
        tableName : "product_status",
        timestamps : 0
    };

    const ProductStatus = sequelize.define(alias, cols, config);

    ProductStatus.associate = function(models){
        ProductStatus.hasMany(models.Product, {
            as: "productoEstado",
            foreignKey: "estado"
        });
    }

    return ProductStatus;
}