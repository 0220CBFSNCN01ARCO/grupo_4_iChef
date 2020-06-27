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
        /*Ingredient - IngredientProduct*/
        Ingredient.hasMany(models.IngredientProduct, {
            as: "ingredientesProd",
            foreignKey: "id_ingredients"
        });
    }


    return Ingredient;
}