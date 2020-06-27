module.exports = (sequelize, DataTypes) => {
    let alias = "PhotoProduct";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_foto : {
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
        tableName : "photos_products"
    };

    const PhotoProduct = sequelize.define(alias, cols, config);
    /*
    PhotoProduct.associate = function(models){
        /*PhotoProduct - Photo
        PhotoProduct.belongsTo(models.Photo, {
            as: "foto",
            foreignKey: "id_foto"
        });

        /*PhotoProduct - Product
        PhotoProduct.hasMany(models.Product, {
            as: "fotoProductos",
            foreignKey: "foto_id"
        });
    }*/

    return PhotoProduct;
}