module.exports = (sequelize, DataTypes) => {
    let alias = "UserCategorie";
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
        tableName : "users_categories",
        timestamps : false
    };

    const UserCategorie = sequelize.define(alias, cols, config);

    return UserCategorie;
}