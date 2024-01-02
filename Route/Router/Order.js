const UserMongoModel = require("../../Models/userModels");



const addToOrder = async (req, res) => {
    try {
        const { productId, count, email, pin, place } = req.params;
        const userId = req.userId;
        await UserMongoModel.findByIdAndUpdate(userId,
            {
                $set: {
                    email: email,
                    pin: pin,
                    place: place
                },
                $push: { orders: { $each: [{ product: productId, count: count, date: new Date().toLocaleDateString() }] } }
            },
            {
                new: true
            }
        );
        res.status(200).json({ msg: "successfull ... " });
    }
    catch (e) {
        console.log(e);
    }
};



const getAllOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const data = await UserMongoModel.findOne({ _id: userId })
            .select({ orders: 1 }).populate("orders.product");
        res.status(201).json(data.orders);
    }
    catch (e) {
        console.log(e);
    }
};



module.exports = { addToOrder, getAllOrders };


