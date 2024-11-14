const cors=require("cors");
const express=require("express");
const router=express.Router()

const {createUser,getAllData,getSpecificData,updateData,deleteAllData,deleteData,testTransaction,reguseruploadscontacts}=require("../controllers/index")
const{loginUser}=require("../middelware/authentication")
// const {createData}=require("../controllers/index")

router.post("/register",createUser);
router.get("/get",getAllData);
router.post("/user/login",loginUser)
router.post("/user/upload",reguseruploadscontacts)
router.get("/get/:id",getSpecificData);
router.patch("/update/:id/:name",updateData);
router.delete("/delete/:id/",deleteData);
router.delete("/detleteAll",deleteAllData)
router.get("/transaction",testTransaction);

module.exports = { router };