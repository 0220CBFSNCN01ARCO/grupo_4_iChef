module.exports = (sequelize, DataTypes) => {
    let alias = "Photo";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Product',
                key: 'id'
            }
        }
    }
    let config = {
        tableName : "photos",
        timestamps : false
    };

    const Photo = sequelize.define(alias, cols, config);

    Photo.associate = function(models){
        /*Photo - Product*/
        Photo.belongsTo(models.Product, {
            as: "fotoProducto",
            foreignKey: "product_id"
        });

    }

    return Photo;
}