module.exports = (sequelize, DataTypes) => {
    let alias = "Brand";
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
        tableName : "brand",
        timestamps : false
    };

    const Brand = sequelize.define(alias, cols, config);

    /*Brand.associate = function(models){
        Product.hasMany(models.Product, {
            as: "marcaProductos",
            foreignKey: "marca_id"
        });
                
    }*/


    return Brand;
}