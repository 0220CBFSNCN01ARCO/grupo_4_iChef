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
            reference: {
                model: 'Product',
                key: 'id'
            }

        },
        id_ingredients : {
            type: DataTypes.INTEGER,
            reference: {
                model: 'Ingredient',
                key: 'id'
            }
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
        tableName : "ingredients_products",
        timestamps : 0
    };

    const IngredientProduct = sequelize.define(alias, cols, config);

    IngredientProduct.associate = function(models){
        IngredientProduct.belongsTo(models.Product, {
            as: 'productos',
            foreignKey: 'id_product'
        });
        IngredientProduct.belongsTo(models.Ingredient, {
            as: 'ingredientes',
            foreignKey: 'id_ingredients'
        });
    }

    return IngredientProduct;

}
