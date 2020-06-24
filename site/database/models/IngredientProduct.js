module.exports = (sequelize, DataTypes) => {
    let alias = "IngredientProduct";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_product : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_ingredients : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        createdAt : {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt : {
            type: DataTypes.DATE,
            field: 'updatedAt'
        }
    }
    let config = {
        tableName : "ingredients_products"
    };

    const IngredientProduct = sequelize.define(alias, cols, config);

    return IngredientProduct;
}