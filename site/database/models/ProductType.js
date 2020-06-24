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

    return ProductType;
}