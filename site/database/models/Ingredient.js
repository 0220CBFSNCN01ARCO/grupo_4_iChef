module.exports = (sequelize, DataTypes) => {
    let alias = "Ingredient";
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
        tableName : "ingredients",
        timestamps : false
    };

    const Ingredient = sequelize.define(alias, cols, config);

    Ingredient.associate = function(models){

       Ingredient.belongsToMany(models.Product, {
           as:'productos',
           through: models.IngredientProduct,
           foreignKey: 'id_ingredients',
           otherKey: 'id_product'
       });


    }


    return Ingredient;
}