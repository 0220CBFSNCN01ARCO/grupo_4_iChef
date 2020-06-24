module.exports = (sequelize, DataTypes) => {
    let alias = "Product";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo : {
            type: DataTypes.INTEGER
        },
        descripcion : {
            type: DataTypes.STRING
        },
        product_type_id : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        precio : {
            type: DataTypes.FLOAT
        },
        oferta : {
            type: DataTypes.INTEGER
        },
        precio_oferta : {
            type: DataTypes.FLOAT
        },
        descuento_oferta : {
            type: DataTypes.FLOAT
        },        
        rubro_id : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },        
        marca_id : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        detalle : {
            type: DataTypes.STRING
        },
        cant_comensales : {
            type: DataTypes.INTEGER
        },
        ingredientes_id : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        calorias : {
            type: DataTypes.FLOAT
        },
        peso : {
            type: DataTypes.FLOAT
        },
        foto_id : {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        receta : {
            type: DataTypes.STRING
        }
    }
    let config = {
        tableName : "product",
        timestamps : false
    };

    const Product = sequelize.define(alias, cols, config);

    /*Product.associate = function(models){
        
    }*/

    return Product;
}
