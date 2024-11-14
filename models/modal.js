const {Sequelize,DataTypes} =require("sequelize")
const sequelize = new Sequelize(process.env.uri);
// const sequelize = new Sequelize('sql', 'postgres', '1234', {
//     dialect: 'postgres',
//     host: 'locahost',
//   });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const tp=require("./helper");
console.log(typeof(tp));


db.userDetails = require("./helper")(sequelize, Sequelize);
db.globalDb=require("./globalDb")(sequelize,Sequelize)
// db.tutorials = Tutorial(sequelize, Sequelize);


// module.exports = db;

module.exports={db};

