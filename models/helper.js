const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const userDetails = sequelize.define("userDetails", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return userDetails;
};