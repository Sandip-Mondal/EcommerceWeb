const jwt = require("jsonwebtoken");
const mongooseModel = require("../Models/userModels");


const middleware = async (req, res, next) => {
    try {
        const token = req.cookies.userCookie;

        const verify = jwt.verify(token, process.env.SECRET_KEY);
        const User = await mongooseModel.findOne({ _id: verify._id, token: token })
            .select({ "-password": 1, "-token": 1 });
        if (!User) {
            throw new Error;
        }
        req.userId = User._id;
        req.user = User;
        next();
    } catch (err) {
        res.status(400).json([]);
    }
};

module.exports = middleware;