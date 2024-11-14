const { Sequelize, DataTypes, where } = require("sequelize");
const sequelize = new Sequelize(process.env.uri);
const { db } = require("../models/modal");
console.log("ssa", typeof (db));
const user = db.userDetails;
const globaluserData = db.globalDb;
const { userauthentication, loginUser, tokenGeneration } = require("../middelware/authentication");
const bcrypt = require("bcryptjs");

const reguseruploadscontacts = async (req, res) => {
    try {
        const authentication = await userauthentication(req, res)
        if (authentication == 200) {
            const Data = req.body;
            await sequelize.authenticate();
            await sequelize.sync();
            const createData = await globaluserData.create(Data);
            console.log(createData);
            res.send("created")
        }
        else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while deleting the data" })
    }

}

const createUser = async (req, res) => {
    try {
        console.log("inside create ");
        const Data = req.body;
        const token = await tokenGeneration(Data.phoneNumber);
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000)
        });
        console.log("Token in cookie:", token);
        console.log(Data.password);
        const hasedPassword = await bcrypt.hash(Data.password, 10)
        console.log("hsedpas is ", hasedPassword);
        const userData = {
            name: Data.name,
            phoneNumber: Data.phoneNumber,
            email: Data.email,
            password: hasedPassword
        };
        console.log("Data to be saved:", userData);
        await sequelize.authenticate();
        console.log("Database connection successful");
        await user.create(userData);
        await globaluserData.create(userData)
        res.status(200).send({ message: "User created successfully", token });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "Failed to create user", message: error.message });
    }
};


const getAllData = async (req, res) => {
    try {
        const authentication = await userauthentication(req, res)
        console.log("wasd ", authentication);
        if (authentication == 200) {
            const data = await user.findAll();
            console.log('All users:', JSON.stringify(data));
            res.json(data)
        }
        else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while deleting the data" })

    }
}

const getSpecificData = async (req, res) => {
    try {
        const authentication = await userauthentication(req, res)
        if (authentication == 200) {
            const findData = req.params.id;

            const data = await user.findAll({
                raw: true,
                where: { id: findData }
            });
            console.log((data))
            res.json(data)
        }
        else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while deleting the data" })
    }

}

const updateData = async (req, res) => {
    try {
        const authentication = await userauthentication(req, res)
        if (authentication == 200) {
            const num = req.params.id;
            const newName = req.params.name;
            const data = await user.update({
                name: newName
            }, {
                where: { id: num }
            })
            res.json(data)
        }
        else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while deleting the data" })
    }
}


const deleteData = async (req, res) => {
    try {
        const authentication = await userauthentication(req, res)
        if (authentication == 200) {
            const userid = req.params.id;
            await user.destroy({
                where: {
                    id: userid
                }
            })
            res.send("DELETED")
        }
        else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while deleting the data" })
    }
}

const deleteAllData = async (req, res) => {
    try {
        const authentication = await userauthentication(req, res)
        if (authentication == 200) {
            await user.destroy({
                where: {},
                truncate: true,
                restartIdentity: true
            });
            // await user.query('ALTER TABLE users id = 0');
            res.json({ message: "All the Data in the user db, is deleted" })
        }
        else {
            return res.status(403).send({ message: "Forbidden: Invalid token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while deleting the data" })
    }
}

const testTransaction = async (req, res) => {
    let tran = await sequelize.transaction();
    try {
        console.log("hello");
        const data = await user.create({ name: "Vaibhav", age: 20 }, { transaction: tran })
        if (data != String) { // to force error, to check if transaction is working properly
            throw Error;
        }
        res.send("done")
        await tran.commit();

    } catch (error) {
        await tran.rollback();
        console.log("error");

    }
}

module.exports = { createUser, getAllData, getSpecificData, updateData, deleteAllData, deleteData, testTransaction, reguseruploadscontacts, loginUser }

// module.exports={createData}