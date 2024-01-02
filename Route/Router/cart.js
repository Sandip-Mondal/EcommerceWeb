const UserMongoModel = require("../../Models/userModels");



const addTocart = async (req, res) => {
    try {
        const { productId, count } = req.params;
        const userId = req.userId;
        const isExit = await UserMongoModel.findOne(
            { $and: [{ _id: userId }, { "carts.product": productId }] }
        );

        if (!isExit) {
            const data = await UserMongoModel.findByIdAndUpdate(userId,
                {
                    $push: { carts: { $each: [{ product: productId, amount: Number(count) }] } }
                },
                {
                    new: true
                }
            )
            res.status(210).json(data);
        }
        else {
            const obj = isExit.carts.find((item) => {
                return item.product.toString() === productId;
            });

            await UserMongoModel.updateOne(
                { $and: [{ _id: userId }, { "carts.product": productId }] },
                { $set: { "carts.$.amount": obj.amount + Number(count) } }
            );
            res.status(201).json({ mdg: 'successfull .... ' });
        }
    }
    catch (e) {
        console.log(e);
    }
};



const deletecart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userId;
        const data = await UserMongoModel.findByIdAndUpdate({ _id: userId },
            { $pull: { carts: { product: productId } } }
        )
        res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
    }
};


const getCarts = async (req, res) => {
    try {
        const userId = req.userId;
        const data = await UserMongoModel.findOne({ _id: userId })
            .select({ carts: 1 }).populate("carts.product");
        res.status(201).json(data.carts);
    } catch (e) {
        console.log(e)
    }
};

module.exports = { addTocart, deletecart, getCarts };