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

    return Heading;
}