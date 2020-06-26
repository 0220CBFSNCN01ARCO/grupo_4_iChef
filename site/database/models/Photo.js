module.exports = (sequelize, DataTypes) => {
    let alias = "Photo";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre : {
            type: DataTypes.STRING
        }
    }
    let config = {
        tableName : "photos",
        timestamps : false
    };

    const Photo = sequelize.define(alias, cols, config);

    /*Photo.associate = function(models){
        /*Photo - PhotoProduct*/
        /*Photo.hasMany(models.PhotoProduct, {
            as: "fotos",
            foreignKey: "id_foto"
        });
    }

        */

    return Photo;
}