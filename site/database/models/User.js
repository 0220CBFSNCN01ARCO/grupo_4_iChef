module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre : {
            type: DataTypes.STRING
        },
        apellido : {
            type: DataTypes.STRING
        },
        email : {
            type: DataTypes.STRING
        },
        password : {
            type: DataTypes.STRING
        },
        nroTelefono : {
            type: DataTypes.STRING
        },
        avatar : {
            type: DataTypes.STRING
        },
        categorie_id : {
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
        tableName : "users"
    };

    const User = sequelize.define(alias, cols, config);

    return User;
}
