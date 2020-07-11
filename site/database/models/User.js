module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: 1
        },
        nombre: {
            type: DataTypes.STRING
        },
        apellido: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        nroTelefono: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        categorie_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }
    let config = {
        tableName : "users",
        timestamps: 0
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        //User - Cart
        User.hasMany(models.Cart, {
            as: "carritos",
            foreignKey: "user_id"
        });

        //User - UserCategorie
        User.belongsTo(models.UserCategorie, {
            as: "categoriaUsuario",
            foreignKey: "categorie_id"
        });

        //User - UserStatus
        User.belongsTo(models.UserStatus, {
            as: "estadoUsuario",
            foreignKey: "estado"
        });

    }

    return User;
}
