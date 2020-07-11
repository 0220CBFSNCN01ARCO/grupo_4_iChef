module.exports = (sequelize, DataTypes) => {
    let alias = "UserStatus";
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
        tableName : "users_status",
        timestamps : 0
    };

    const UserStatus = sequelize.define(alias, cols, config);

    UserStatus.associate = function(models){
        /*UserStatus - User*/
        UserStatus.hasMany(models.User, {
            as: "estadoUsuario",
            foreignKey: "estado"
        });
    }


    return UserStatus;
}