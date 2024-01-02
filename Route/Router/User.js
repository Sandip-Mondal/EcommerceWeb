const bcrypt = require("bcryptjs");
const UserMongoModel = require("../../Models/userModels");




const Register = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        if (!name || !phone || !password) {
            res.status(400).json({ msg: "fill the data" });
        }
        else {
            const isexit = await UserMongoModel.findOne({ phone });
            if (!isexit) {
                const data = new UserMongoModel({
                    name, phone, email: " ", password, pin: " ", place: " "
                });
                await data.save();
                res.status(200).json({ msg: "successfull ... " });
            }
            else {
                res.status(401).json({ msg: "Exit ... " });
            }
        }
    }
    catch (e) {
        console.log(e);
    }
};


const Login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password) {
            res.status(401).json({ msg: "fill the data" });
        }
        else {
            const user = await UserMongoModel.findOne({ phone });
            if (user) {
                const isExit = await bcrypt.compare(password, user.password);

                if (isExit) {
                    const token = await user.addToken();
                    res.cookie("userCookie", token);
                    res.status(301).json({ msg: "Successfull ... " });
                }
                else {
                    res.status(402).json({ msg: "Invalid Email and Password" });
                }
            }
            else {
                res.status(403).json({ msg: "Register at first" });
            }
        }
    } catch (e) {
        console.log(e);
    }
};


const userDetails = async (req, res) => {
    try {
        const User = req.user;
        res.status(200).send([User]);
    }
    catch (e) {
        console.log(e);
    }
};


const UpdateProfile = async (req, res) => {
    try {
        const { name, email, pin, place } = req.body;
        const userId = req.userId;
        const user = await UserMongoModel.updateOne({ _id: userId },
            {
                $set: {
                    name: name,
                    email: email,
                    pin: pin,
                    place: place
                }
            }
        )
        res.status(200).json({ msg: "Good .... " });
    }
    catch (e) {
        console.log(e);
    }
};


module.exports = { Register, Login, userDetails, UpdateProfile };
