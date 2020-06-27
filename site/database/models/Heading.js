module.exports = (sequelize, DataTypes) => {
    let alias = "Heading";
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
        tableName : "heading",
        timestamps : false
    };

    const Heading = sequelize.define(alias, cols, config);

     Heading.associate = function(models){
        Heading.hasMany(models.Product, {
            as: "rubroProductos",
            foreignKey: "rubro_id"
        });
    }


    return Heading;
}