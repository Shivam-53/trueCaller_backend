const {DataTypes}=require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const globalDb = sequelize.define("globalDb", {
        name: DataTypes.STRING,
        phoneNumber:DataTypes.STRING,
        email:DataTypes.STRING,
        spam:DataTypes.INTEGER
    });
    return globalDb;
  };