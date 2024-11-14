const jwt = require("jsonwebtoken");
const { db } = require("../models/modal");
const { Sequelize } = require("sequelize");
const user = db.userDetails;
const sequelize=new Sequelize(process.env.uri)
const bcrypt=require("bcryptjs")


const tokenGeneration = async (phoneNumber) => {
    try {
        const token = jwt.sign({ message: phoneNumber }, process.env.token, { expiresIn: '1h' });
        console.log("Token issued:", token);
        console.log("Token type:", typeof token);
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};

const userauthentication = async (req, res) => {
    try {
        const bearerToken = req.headers['authorization'];
        console.log("bearerToken:", bearerToken);
        const btoken = bearerToken.split(" ");
        console.log("Split token:", btoken);

        const bTokenInString = btoken[1];
        console.log("Token in string:", bTokenInString);

        const verification = jwt.verify(bTokenInString, process.env.token);
        console.log("Verification result:", verification);

        if (verification) {
            return 200;
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return 404;
    }
};

const loginUser = async (req, res) => {
    try {
        const loginData = req.body.phoneNumber;
        console.log();
        const plaintextPassword=req.body.password
        console.log("wasdd",loginData);
        await sequelize.authenticate()
        console.log("done");
        await sequelize.sync()
        const data = await user.findAll({
            raw: true,
            where: { phoneNumber: loginData }
        });
        console.log("data is",data);

        if (data.length!=0) {
            console.log("seasd");

            const hashedPassword=data[0].password;
            const passwordCheck=await bcrypt.compare(plaintextPassword,hashedPassword)
            if(passwordCheck==true){
            console.log("hashedPassword is ",hashedPassword," " ,passwordCheck);
            
            const token = await tokenGeneration(loginData.phoneNumber);
            console.log(token);

            res.status(200).json({ message: "Token is created", token })
            }
            else{
                res.status(404).send("User does not exist or the phone number is incorrect")

            }
        }
        else {
            res.status(404).send("User does not exist or the phone number is incorrect")
        }

    } catch (error) {
        console.log(error);
        
        res.status(501).send("Somethings Wrong on our side"
        )
    }
}

module.exports = { userauthentication, loginUser,tokenGeneration }