const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserMongoSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    carts: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'productmodels'
            },
            amount: {
                type: Number
            }
        }
    ],
    orders: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'productmodels'
            },
            count: {
                type: Number
            },
            date: {
                type: String
            }
        }
    ],
    pin: {
        type: String,
    },
    place: {
        type: String,
    }

}, { timestamps: true });


UserMongoSchema.pre("save", async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    }
    catch (e) {
        console.log(e);
    }
});



UserMongoSchema.methods.addToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}


const UserMongoModel = mongoose.model("usermodel", UserMongoSchema);


module.exports = UserMongoModel;










