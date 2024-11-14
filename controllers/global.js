const { Sequelize, DataTypes, where } = require("sequelize")
const sequelize = new Sequelize(process.env.uri);
const { db } = require("../models/modal")
const globaluserData = db.globalDb;
const {userauthentication}=require("../middelware/authentication")

const createDatainBulk = async (req, res) => {
    try {
        const auth=await userauthentication(req.res);
        if(auth==200){
        const Data = req.body;
        await sequelize.authenticate();
        await sequelize.sync();
        const bulkData = await globaluserData.bulkCreate(Data);
        console.log(bulkData);
        res.send("created")
        }else{
            res.status(403).json({message:"Token is Invalid"})
        }
    } catch (error) {
        res.status(500).json({message:"Something's Wrong on our side"})
    }

}

const createData = async (req, res) => {
    try {
        const auth=await userauthentication(req,res);
        if(auth==200){

        const Data = req.body;
        await sequelize.authenticate();
        await sequelize.sync();
        const createData = await globaluserData.create(Data);
        console.log(createData);
        res.send("created")
        }
        else{
            res.status(403).json({message:"Token is Invalid"})
        }

    } catch (error) {
        res.status(500).json({message:"Something's Wrong on our side"})
    }

}


const markanumberspam = async (req, res) => {
    try {
        const auth=await userauthentication(req,res);
        if(auth==200){
        const numbertosearch = req.query.number;
        const isSpam = req.query.spam;
        const k = await globaluserData.findAll({
            raw: true,
            where: { phoneNumber: numbertosearch }
        });
    
        console.log("data is",k.length);
        
        if (k.length!=0) {
            const update = await globaluserData.update({
                spam: isSpam
            },
                { where: { phoneNumber: numbertosearch } })
    
                res.status(200).json({message:"The Phone number is succesfully marked as a Spam Number 1, Thanks for the Community Service"})
        }else{
            const createNumber=await globaluserData.create({
                phoneNumber:numbertosearch,
                spam:100
            })
            console.log(createNumber);
            
            res.status(200).json({message:"The Phone number is succesfully marked as a Spam Number 2, Thanks for the Community Service"})
    
        }
        console.log("globalll  ", k);
        }
        else{
            res.status(403).json({message:"Token is Invalid"})
        }
    } catch (error) {
        res.status(500).json({message:"Something's Wrong on our side"})

    }
}

module.exports = { createDatainBulk, createData, markanumberspam }