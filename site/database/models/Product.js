module.exports = (sequelize, DataTypes) => {
    let alias = "Product";
    let cols = {
        id_product : {
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
        calorias : {
            type: DataTypes.FLOAT
        },
        peso : {
            type: DataTypes.FLOAT
        },
        receta: {
            type: DataTypes.STRING
        }
    }
    let config = {
        tableName : "product",
        timestamps : 0
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        /*Product - ProductType*/
        Product.belongsTo(models.ProductType, {
            as: "productType",
            foreignKey: "product_type_id"
        });

        /*Product - Brand*/
        Product.belongsTo(models.Brand, {
            as: "marca",
            foreignKey: "marca_id"
        });

        /*Product - Heading*/
        Product.belongsTo(models.Heading, {
            as: "rubro",
            foreignKey: "rubro_id"
        });

        /*Product - CarDetail*/
        Product.hasMany(models.CarDetail, {
            as: "detallesCarrito",
            foreignKey: "id_producto"
        });

        /*Product - Photo */
        Product.hasMany(models.Photo, {
            as: "fotos",
            foreignKey: "id_producto"
        });

        /*Product - Ingredient */
        Product.belongsToMany(models.Ingredient, {
                as:'ingredientes',
                through: 'ingredients_products',
                foreignKey: 'product_id',
                otherKey: 'ingredient_id',
                timestamps: 0
        });

    }

    return Product;
}
