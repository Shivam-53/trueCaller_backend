const cors=require("cors");
const express=require("express");
const routerr=express.Router()

const {createDatainBulk,createData,markanumberspam}=require("../controllers/global")

routerr.post("/globaldata",createDatainBulk);
routerr.post("/postSingleData",createData)
routerr.get("/user/spam/?",markanumberspam)
module.exports={routerr}