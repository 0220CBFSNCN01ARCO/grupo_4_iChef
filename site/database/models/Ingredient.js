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

    return Ingredient;
}