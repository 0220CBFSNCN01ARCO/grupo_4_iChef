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
        timestamps : 0
    };

    const UserCategorie = sequelize.define(alias, cols, config);

    UserCategorie.associate = function(models){
        /*UserCategorie - User*/
        UserCategorie.hasMany(models.User, {
            as: "usuarios",
            foreignKey: "categorie_id"
        });
    }


    return UserCategorie;
}