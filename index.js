const Sequelize =require("sequelize")
const cors=require("cors")
const sequelize = new Sequelize(process.env.uri);
// const sequelize = new Sequelize('sql', 'postgres', '1234', {
//     dialect: 'postgres',
//     host: 'locahost',
//   });
  
  
const {db}=require("./models/modal.js")
const sync=async()=>{
    await db.sequelize.sync()
}
sync();

const express=require("express");
const {router}=require("./routes/router.js");
const {routerr}=require("./routes/globalRoutes.js")
const app=express()
app.use(express.json())
app.use(router);
app.use(routerr)
app.use(cors())
app.listen(process.env.PORT,()=>{
    console.log("Server listening on port 3000");
    
})