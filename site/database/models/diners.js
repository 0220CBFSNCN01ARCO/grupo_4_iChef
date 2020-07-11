module.exports = (sequelize, DataTypes) => {
    let alias = "Diners";
    let cols = {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nro_comensales : {
            type: DataTypes.STRING
        }
    }
    let config = {
        tableName : "diners",
        timestamps : 0
    };

    const Diners = sequelize.define(alias, cols, config);

    return Diners;
}