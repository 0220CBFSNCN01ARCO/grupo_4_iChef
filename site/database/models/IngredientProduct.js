module.exports = (sequelize, DataTypes) => {
    return sequelize.define("IngredientProduct", {
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
    }, {
        tableName : "ingredients_products"
    });

     /*IngredientProduct.associate = function(models){
        IngredientProduct - Product
        IngredientProduct.hasMany(models.Product, {
            as: "productos",
            foreignKey: "ingredientes_id"
        });

        IngredientProduct - Ingredient
        IngredientProduct.belongsTo(models.Ingredient, {
            as: "ingrediente",
            foreignKey: "id_ingredients"
        });*/
    }
